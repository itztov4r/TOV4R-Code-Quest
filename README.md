# TOV4R Code Quest

**Apprends. Code. Explore.** Une aventure pédagogique pour découvrir HTML, CSS et JavaScript dans un navigateur.

![Les trois mondes de Code Quest](assets/quest-world.webp)

## Une vraie boucle d’apprentissage

1. Choisir un pseudo, son niveau, son premier langage, son objectif et son avatar.
2. Démarrer automatiquement la mission recommandée.
3. Lire une courte leçon et son exemple.
4. Répondre à une question puis construire une solution dans l’éditeur.
5. Exécuter le code, lire les contrôles, gagner XP et étoiles, débloquer la suite.

**30 missions** : 10 HTML, 10 CSS, 10 JavaScript ; dans chaque monde, 4 premiers pas, 3 missions intermédiaires et 3 missions plus avancées, dont un mini-projet final.

## Fonctions

- Tableau de bord, carte des missions, progression par monde.
- Leçons en français, 30 questions, 79 contrôles de code et 2 indices par mission.
- Éditeur avec Tab et Ctrl/⌘ + Entrée ; aperçu HTML/CSS séparé, console JavaScript en Web Worker.
- Arrêt des essais JavaScript après 2 secondes ; 40 lignes de console affichées au maximum.
- XP attribués une seule fois par mission, meilleur score d’étoiles conservé.
- 8 badges, niveau de joueur, objectif quotidien et série de jours d’apprentissage.
- Laboratoire libre HTML/CSS/JS et lexique de 16 termes.
- Profil, réglage de niveau, avatar, sons facultatifs activables.
- Sauvegarde locale versionnée, export et restauration JSON validée.
- Mise en page responsive, contrôles clavier et prise en compte de la réduction des animations.

## Lancer en local

Les fichiers sont statiques, sans dépendance à installer. Utiliser un petit serveur HTTP pour que la console Worker et le stockage fonctionnent dans des conditions cohérentes :

```bash
python -m http.server 8000
```

Ouvrir `http://localhost:8000`. Le site se publie également sur GitHub Pages depuis la branche `main`, dossier `/ (root)`.

## Architecture

| Fichier | Rôle |
| --- | --- |
| `index.html` | Structure et dialogues natifs |
| `style.css` | Identité visuelle, adaptations tablette/mobile |
| `curriculum.js` | Contenu des 30 missions |
| `core.js` | État, validation de sauvegarde, XP, progression, règles de code |
| `app.js` | Navigation, interface, éditeur, aperçu, Worker, export/import |
| `assets/` | Illustration originale et déclinaisons WebP optimisées |
| `tests/core.test.js` | Tests de contenu, progression, points et sauvegardes |

## Vérifier

```bash
node --test tests/core.test.js
node --check app.js
```

10 tests automatisés couvrent la structure du cours, les solutions, l’exécution des 10 solutions JavaScript, le déblocage, les niveaux de départ, l’absence de multiplication d’XP en rejouant, les séries de jours, les sauvegardes et les imports invalides. GitHub Actions les exécute à chaque push et pull request.

## Règles et limites

- Les niveaux de départ sont auto-déclarés : ils proposent un point d’entrée sans attribuer d’XP aux missions sautées.
- Les contrôles de code sont pédagogiques et partiellement syntaxiques ; ce ne sont pas des tests exhaustifs ni une certification.
- Les missions JavaScript enseignent les fondamentaux du langage dans un Worker, sans DOM, `document` ou `window`. HTML/CSS disposent d’un aperçu en iframe sandboxée.
- L’application ne demande aucun mot de passe et ne crée pas de compte distant. Le profil reste dans le navigateur. Aucun classement global ni synchronisation multi-appareils automatique.
- Une suppression du stockage navigateur efface la partie locale ; l’export JSON permet de la restaurer.
- Les temps d’étude sont indicatifs. Le parcours est une introduction pratique, pas une couverture exhaustive des trois langages.

## Crédits

Projet préparé pour **Mehdi Hmaiss / TOV4R**, avec assistance IA pour le code, le contenu pédagogique, les tests et l’illustration.

Illustration originale générée pour ce projet : trois îles de programmation et robot explorateur, palette nuit/mint/lilas/ambre. Déclinaisons `html-island.webp`, `css-island.webp`, `js-island.webp` et `robot.webp` issues du même visuel. Aucun asset tiers distant requis.

Licence du code : MIT — voir [LICENSE](LICENSE).
