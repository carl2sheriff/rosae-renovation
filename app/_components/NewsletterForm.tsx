"use client";

import { useState } from "react";

export function NewsletterForm({ source = "journal" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error" | "duplicate">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source }),
      });
      const data = await res.json();

      if (res.status === 409) {
        setStatus("duplicate");
      } else if (!res.ok) {
        setErrorMsg(data.error ?? "Une erreur s'est produite.");
        setStatus("error");
      } else {
        setStatus("ok");
        setEmail("");
      }
    } catch {
      setErrorMsg("Impossible de joindre le serveur.");
      setStatus("error");
    }
  }

  return (
    <div>
      {status === "ok" ? (
        <p
          className="text-sm leading-[1.9]"
          style={{ color: "var(--text-2)" }}
        >
          Inscription confirmée. Vous recevrez le prochain Carnet Rosae.
        </p>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md">
            <label htmlFor="newsletter-email" className="sr-only">
              Adresse email
            </label>
            <input
              id="newsletter-email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre adresse email"
              required
              disabled={status === "loading"}
              className="flex-1 border px-4 py-3 text-sm bg-transparent outline-none transition-colors duration-200 placeholder:opacity-50"
              style={{
                borderColor: "var(--line)",
                color: "var(--text-1)",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--text-1)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--line)")}
            />
            <button
              type="submit"
              disabled={status === "loading" || !email.trim()}
              className="text-[11px] uppercase tracking-[0.18em] border px-6 py-3 transition-all duration-300 shrink-0 disabled:opacity-40"
              style={{
                borderColor: "var(--text-1)",
                color: "var(--text-1)",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                if (!(e.currentTarget as HTMLButtonElement).disabled) {
                  e.currentTarget.style.background = "var(--text-1)";
                  e.currentTarget.style.color = "var(--bg)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--text-1)";
              }}
            >
              {status === "loading" ? "…" : "S'abonner"}
            </button>
          </div>

          {status === "duplicate" && (
            <p className="mt-3 text-[12px]" style={{ color: "var(--accent)" }}>
              Cette adresse est déjà inscrite.
            </p>
          )}
          {status === "error" && (
            <p className="mt-3 text-[12px]" style={{ color: "var(--accent)" }}>
              {errorMsg}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
