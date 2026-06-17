"use client";

import { useState, type FormEvent } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = {
      nom: (form.elements.namedItem("nom") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      telephone: (form.elements.namedItem("telephone") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      projet_type: (form.elements.namedItem("projet_type") as HTMLSelectElement).value,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        const body = await res.json();
        setErrorMsg(body.error || "Une erreur est survenue.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Impossible d'envoyer le formulaire. Réessayez.");
      setStatus("error");
    }
  }

  const fieldBase: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid var(--line)",
    borderRadius: 0,
    padding: "10px 0",
    fontSize: "14px",
    color: "var(--text-1)",
    outline: "none",
    fontFamily: "var(--font-inter), sans-serif",
  };

  if (status === "success") {
    return (
      <div className="py-6 max-w-md">
        <p className="font-serif italic text-[17px]" style={{ color: "var(--text-1)" }}>
          Message reçu.
        </p>
        <p className="mt-3 text-sm leading-[1.9]" style={{ color: "var(--text-2)" }}>
          Nous vous recontacterons dans les meilleurs délais.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-md">
      <div className="flex flex-col gap-7">
        <div>
          <label
            htmlFor="nom"
            className="block text-[10px] uppercase tracking-[0.12em] mb-2"
            style={{ color: "var(--accent)" }}
          >
            Nom *
          </label>
          <input
            id="nom"
            name="nom"
            type="text"
            required
            placeholder="Votre nom"
            style={fieldBase}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-[10px] uppercase tracking-[0.12em] mb-2"
            style={{ color: "var(--accent)" }}
          >
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="votre@email.com"
            style={fieldBase}
          />
        </div>

        <div>
          <label
            htmlFor="telephone"
            className="block text-[10px] uppercase tracking-[0.12em] mb-2"
            style={{ color: "var(--accent)" }}
          >
            Téléphone
          </label>
          <input
            id="telephone"
            name="telephone"
            type="tel"
            placeholder="+33 6 00 00 00 00"
            style={fieldBase}
          />
        </div>

        <div>
          <label
            htmlFor="projet_type"
            className="block text-[10px] uppercase tracking-[0.12em] mb-2"
            style={{ color: "var(--accent)" }}
          >
            Type de projet
          </label>
          <select
            id="projet_type"
            name="projet_type"
            style={{ ...fieldBase, cursor: "pointer" }}
          >
            <option value="">— Sélectionner</option>
            <option value="complet">Rénovation complète</option>
            <option value="partiel">Rénovation partielle</option>
            <option value="amenagement">Aménagement</option>
            <option value="autre">Autre</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-[10px] uppercase tracking-[0.12em] mb-2"
            style={{ color: "var(--accent)" }}
          >
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Décrivez votre projet — surface approximative, quartier, contraintes particulières..."
            style={{
              ...fieldBase,
              resize: "vertical",
              minHeight: "110px",
            }}
          />
        </div>

        {status === "error" && (
          <p className="text-sm" style={{ color: "#a0281a" }}>
            {errorMsg}
          </p>
        )}

        <div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="text-[11px] uppercase tracking-[0.18em] border px-6 py-3 transition-all duration-300 hover:bg-[var(--text-1)] hover:text-[var(--bg)] disabled:opacity-50"
            style={{
              borderColor: "var(--text-1)",
              color: "var(--text-1)",
              background: "transparent",
              cursor: status === "loading" ? "wait" : "pointer",
              fontFamily: "var(--font-inter), sans-serif",
            }}
          >
            {status === "loading" ? "Envoi en cours…" : "Envoyer le message"}
          </button>
        </div>
      </div>
    </form>
  );
}
