# Médias des projets

Dépose tes fichiers dans le dossier du projet correspondant. **Aucune configuration** : ils sont détectés automatiquement au build.

| Fichier            | Rôle                                                                 |
|--------------------|----------------------------------------------------------------------|
| `cover.jpg`        | Vignette de la carte (16:9 conseillé, ~1280×720). Sinon `01.jpg` est utilisée. |
| `01.jpg`, `02.jpg`… | Galerie de captures (carrousel + lightbox), dans l'ordre numérique. Formats : jpg, png, webp, avif. |
| `demo.mp4`         | Vidéo de démo : lecture au survol sur la carte, lecteur dans la fiche. (`demo.webm` accepté) |
| `demo.gif`         | Alternative à la vidéo (plus lourd — préfère mp4). Si `demo.mp4` existe, il est prioritaire. |
| `poster.jpg`       | Image affichée avant la lecture de la vidéo (optionnel).             |

Dossiers : `copilote-devis`, `jumeau-numerique-exosquelette`, `financial-inclusion`, `ai-emergency-savior`, `genai-rag-agent`, `microservices-cicd`,
`secure-transaction-api`, `sales-forecasting`, `llm-ticket-classification`.

Conseils : mp4 H.264, ≤ 8 Mo, sans son ; captures ≤ 300 Ko chacune (largeur 1600 px max).

## Section « Hackathons & International » (une seule photo par entrée)

| Dossier                            | Fichier     | Entrée                                             |
|------------------------------------|-------------|----------------------------------------------------|
| `hackathon-accede/`                | `photo.jpg` | Hackathon ACCEDE Internationale (1er Prix)         |
| `aiesec-turquie/`                  | `photo.jpg` | AIESEC — Professeur d'anglais, Gaziantep, Turquie  |
| `eje-relations-internationales/`   | `photo.jpg` | ENSI Junior Enterprise — Relations Internationales |

Format 4:3 conseillé (ex. 1600×1200), ≤ 400 Ko. Sans photo, l'entrée s'affiche sans image (ACCEDE garde son trophée animé).

### Autres hackathons (mosaïque)

`public/media/autres-hackathons/01.jpg`, `02.jpg`, `03.jpg` (… autant que tu veux, dans l'ordre). 3 photos = une rangée de 3 cartes égales ; 4 et plus = grille responsive. Clic = agrandissement (lightbox). Format 4:3 conseillé.
