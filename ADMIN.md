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
2. Cliquez sur le bouton **Créer une nouvelle Réalisation** (en haut à droite)
3. Remplissez les champs :
   - **Titre** — ex : *Appartement — Paris 16e*
   - **Sous-titre** — ex : *Rénovation complète · 95 m²*
   - **Image principale** — uploadez la photo principale
   - **Galerie photos** — ajoutez d'autres photos si vous le souhaitez
   - **Identifiant URL** (colonne de droite) — ex : `appartement-paris-16e` *(sans accents, sans espaces, tirets à la place)*
   - **Ordre d'affichage** — chiffre pour choisir la position (1 = premier)
   - **Publié** — cochez pour que le projet soit visible sur le site
4. Cliquez sur **Sauvegarder les modifications**

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
3. Cliquez sur **Sauvegarder les modifications**

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

## Récapitulatif rapide

| Action | Où aller dans l'admin |
|--------|----------------------|
| Modifier la grande photo d'accueil | Paramètres → Page d'accueil |
| Modifier le texte d'intro | Paramètres → Page d'accueil |
| Modifier les coordonnées | Paramètres → Contact |
| Ajouter / modifier un projet | Contenu → Réalisations |
| Modifier un service | Contenu → Services |
| Modifier un engagement | Contenu → Engagements |
| Gérer les photos | Contenu → Médias |
