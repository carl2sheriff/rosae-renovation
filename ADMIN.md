# Guide d'administration — Rosae Rénovation

Bienvenue dans votre espace de gestion. Ce guide vous explique comment modifier votre site sans aucune aide technique.

---

## 1. Se connecter

1. Ouvrez votre navigateur et allez à : **https://rosae-renovation.vercel.app/admin**
2. Entrez votre adresse e-mail : `rosaerenovation@gmail.com`
3. Entrez votre mot de passe (transmis séparément de façon sécurisée)
4. Cliquez sur **Se connecter**

> Si vous avez oublié votre mot de passe, cliquez sur **Mot de passe oublié ?** sur la page de connexion.

---

## 2. Changer une photo

### Photo principale d'un projet (réalisation)

1. Dans le menu de gauche, cliquez sur **Réalisations**
2. Cliquez sur la réalisation à modifier
3. Dans le champ **Image principale**, cliquez sur **Retirer** pour supprimer l'ancienne photo
4. Cliquez sur **Ajouter** puis choisissez votre photo depuis votre ordinateur
5. Remplissez le champ **Texte alternatif** (ex : *Salon après rénovation, Paris 7e*)
6. Cliquez sur **Sauvegarder les modifications** en haut à droite

> **Format recommandé :** JPEG ou WebP, entre 1 Mo et 5 Mo, paysage (format large).

### Photo hero (grande photo d'accueil)

1. Dans le menu de gauche, section **Paramètres**, cliquez sur **Page d'accueil**
2. Dans le champ **Image hero**, cliquez sur **Ajouter / Modifier**
3. Choisissez ou uploadez votre photo
4. Cliquez sur **Sauvegarder les modifications**

---

## 3. Ajouter une réalisation

1. Dans le menu de gauche, cliquez sur **Réalisations**
2. Cliquez sur **Créer une nouvelle Réalisation** (en haut à droite)
3. Remplissez les champs principaux :
   - **Titre** — ex : *Appartement — Paris 16e*
   - **Sous-titre** — ex : *Rénovation complète · 95 m²* (optionnel)
   - **Image principale** — uploadez la photo de couverture
   - **Galerie photos** — ajoutez les photos supplémentaires
4. Champs détaillés (nouveaux) :
   - **Lieu** — ex : *Paris 7e* ou *Neuilly-sur-Seine*
   - **Surface (m²)** — ex : `120`
   - **Durée des travaux** — ex : *14 semaines*
   - **Année de livraison** — ex : `2024`
   - **Type d'intervention** — choisissez dans la liste
   - **Architecte associé** — si vous avez travaillé avec un architecte
   - **Crédit photographe** — nom du photographe si applicable
   - **Description narrative** — texte détaillé du projet (éditeur de texte riche)
   - **Points clés** — liste à puces courte (ex : *Parquets massifs en chêne fumé*)
5. Colonne de droite :
   - **Identifiant URL** — ex : `appartement-paris-16e` *(sans accents, sans espaces)*
   - **Ordre d'affichage** — 1 = premier dans la liste
   - **Publié** — cochez pour rendre visible
   - **Mis en avant** — cochez pour mettre en valeur dans la grille
6. Cliquez sur **Sauvegarder les modifications**

> Le site se met à jour automatiquement dans la minute suivant la sauvegarde.

---

## 4. Modifier les coordonnées

1. Dans le menu de gauche, section **Paramètres**, cliquez sur **Contact**
2. Modifiez les champs :
   - **Titre de la section contact** — ex : *Parlons de votre projet.*
   - **Texte sous le titre** — description courte
   - **Numéro de téléphone** — ex : *+33 1 23 45 67 89*
   - **Adresse email** — ex : *rosaerenovation@gmail.com*
   - **Adresse** (optionnel)
   - **Lien Cal.com** — voir section suivante
3. Cliquez sur **Sauvegarder les modifications**

---

## 4b. Activer la prise de rendez-vous en ligne (Cal.com)

Le site supporte Cal.com pour permettre aux prospects de réserver un créneau directement depuis la page Contact.

### Étape 1 — Créer votre compte Cal.com

1. Allez sur [cal.com](https://cal.com) et créez un compte avec votre email professionnel
2. Créez un "Event Type" nommé **Devis 30 min** (ou similaire)
3. Configurez vos disponibilités
4. Notez l'URL de votre lien de réservation — elle ressemble à : `cal.com/rosae-renovation/devis`

### Étape 2 — Connecter Cal.com au site

1. Dans l'admin Payload, section **Paramètres**, cliquez sur **Contact**
2. Dans le champ **Lien Cal.com**, saisissez uniquement la partie après `cal.com/`
   - Exemple : si votre lien est `cal.com/rosae-renovation/devis`, saisissez `rosae-renovation/devis`
3. Cliquez sur **Sauvegarder les modifications**
4. Visitez `/contact` sur le site — le bouton "Choisir un créneau →" apparaît et ouvre Cal.com en popup

### Si Cal.com n'est pas configuré

Si le champ **Lien Cal.com** est vide, la page Contact affiche deux boutons alternatifs (Appeler et Écrire) à la place du calendrier. Le site reste toujours fonctionnel.

---

## 4c. Modifier la citation du fondateur (page d'accueil)

1. Dans le menu de gauche, section **Paramètres**, cliquez sur **Page d'accueil**
2. Les champs disponibles :
   - **Citation fondateur (texte)** — la citation de Stéphane Beilin
   - **Nom de l'auteur** — par défaut *Stéphane Beilin*
   - **Titre de l'auteur** — par défaut *Fondateur · Rosae*
3. Cliquez sur **Sauvegarder les modifications**

> Si le champ citation est vide, le texte par défaut intégré dans le site s'affiche automatiquement.

---

## 5. Changer un texte

### Texte d'introduction (paragraphe principal)

1. Dans le menu de gauche, section **Paramètres**, cliquez sur **Page d'accueil**
2. Modifiez le champ **Texte d'introduction**
3. Cliquez sur **Sauvegarder les modifications**

### Services (liste des prestations)

1. Dans le menu de gauche, cliquez sur **Services**
2. Cliquez sur le service à modifier
3. Modifiez le **Titre** ou la **Description**
4. Cliquez sur **Sauvegarder les modifications**

### Engagements

1. Dans le menu de gauche, cliquez sur **Engagements**
2. Cliquez sur l'engagement à modifier
3. Modifiez le **Titre** ou la **Description**
4. Cliquez sur **Sauvegarder les modifications**

---

## 6. Que faire si je casse quelque chose

**Si le site affiche encore les anciennes données** — attendez 1 à 2 minutes, le site se met à jour automatiquement.

**Si vous avez supprimé quelque chose par erreur** — contactez Carl immédiatement (voir section 7). Les données supprimées ne sont pas récupérables automatiquement, mais une sauvegarde peut être restaurée.

**Si vous ne pouvez plus vous connecter** — utilisez **Mot de passe oublié ?** sur la page `/admin`. Si ça ne fonctionne pas, contactez Carl.

**Si le site est entièrement inaccessible** — le site est hébergé sur Vercel avec une disponibilité de 99,9 %. En cas de panne, attendez quelques minutes. Si la panne dure plus de 15 minutes, contactez Carl.

> **Règle d'or :** Ne supprimez jamais une réalisation, un service ou un engagement sans en être sûr. Il est beaucoup plus simple de décocher **Publié** pour le masquer temporairement sans le supprimer.

---

## 7. À qui s'adresser pour de l'aide

**Carl Smith-Thomas** — développeur du projet Rosae  
📧 carl@sheriffprojects.com  
📱 Disponible pour toute question technique

N'hésitez pas à contacter Carl pour :
- Réinitialiser un mot de passe
- Restaurer une donnée supprimée
- Modifier la structure du site (nouvelle section, nouveau champ)
- Tout problème technique que ce guide ne couvre pas

---

## 5b. Ajouter un témoignage client

Les témoignages apparaissent sur la page d'accueil (section « Ce que disent nos clients »), dans l'ordre défini.

1. Dans le menu de gauche, cliquez sur **Témoignages**
2. Cliquez sur **Créer un nouveau Témoignage**
3. Remplissez les champs :
   - **Nom du client** — prénom ou initiales (ex : *Marie D.*)
   - **Projet** — référence optionnelle (ex : *Appartement — Paris 7e*)
   - **Texte du témoignage** — la citation complète
   - **Note** — 3/5, 4/5 ou 5/5 (optionnel)
4. Dans la colonne de droite :
   - **Publié** — cochez pour afficher sur le site
   - **Ordre d'affichage** — 1 = premier affiché
5. Cliquez sur **Sauvegarder les modifications**

> Si aucun témoignage n'est publié, la section n'apparaît pas sur la page d'accueil.

---

## 5c. Consulter les demandes de contact (formulaire)

Les prospects qui remplissent le formulaire sur la page Contact sont enregistrés dans l'admin.

1. Dans le menu de gauche, section **Administration**, cliquez sur **Demandes de contact**
2. Chaque entrée contient : nom, email, téléphone, message, type de projet, date de réception
3. Vous pouvez les consulter ou les supprimer depuis cet écran

> **Ces demandes ne sont pas envoyées par email automatiquement.** Pensez à consulter l'admin régulièrement, ou contactez Carl pour mettre en place une notification email.

---

## Récapitulatif rapide

| Action | Où aller dans l'admin |
|--------|----------------------|
| Modifier la grande photo d'accueil | Paramètres → Page d'accueil |
| Modifier le texte d'intro | Paramètres → Page d'accueil |
| Modifier la citation Stéphane Beilin | Paramètres → Page d'accueil |
| Modifier les coordonnées | Paramètres → Contact |
| Activer Cal.com (prise de RDV) | Paramètres → Contact → Lien Cal.com |
| Ajouter / modifier un projet | Contenu → Réalisations |
| Modifier un service | Contenu → Services |
| Modifier un engagement | Contenu → Engagements |
| Ajouter un témoignage | Contenu → Témoignages |
| Voir les demandes de contact | Administration → Demandes de contact |
| Gérer les photos | Contenu → Médias |
