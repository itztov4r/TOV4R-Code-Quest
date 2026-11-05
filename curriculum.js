/* TOV4R Code Quest — curriculum pédagogique en français.
 * Les contrôles sont des repères syntaxiques pour apprendre, pas une preuve
 * complète de correction, de sécurité, d’accessibilité ou de qualité du code.
 */
(function (root) {
  'use strict';
  const tracks = [
    {id:'html', title:'HTML', description:'Bâtis les fondations : structure, liens, médias et formulaires accessibles.', color:'#ffad70', icon:'⌘'},
    {id:'css', title:'CSS', description:'Donne vie aux interfaces : couleurs, mise en page, responsive et animations.', color:'#8db8ff', icon:'✦'},
    {id:'js', title:'JavaScript', description:'Programme les règles du jeu : données, boucles, fonctions, objets et calculs.', color:'#f8d77a', icon:'ϟ'}
  ];
  const missions = [];
  function mission(track, n, title, subtitle, concepts, lesson, example, question, options, answer, explanation, prompt, starter, solution, hints, checks) {
    const level = n <= 4 ? 1 : n <= 7 ? 2 : 3;
    missions.push({id:track+'-'+String(n).padStart(2,'0'), track, type:track, level, title, subtitle, xp:level===1?60:level===2?80:100, estimatedMinutes:level===1?5:level===2?7:10, concepts, lesson, example,
      quiz:{question, options, answer, explanation}, challenge:{prompt, starter, solution, hints, checks}});
  }
  const check = (pattern, label, flags='i') => ({pattern, label, flags});

  mission('html',1,'Le premier bloc','Écris ta première page.', ['balise','titre','paragraphe'],
    'HTML décrit la structure du contenu. Une balise ouvrante, du contenu et une balise fermante forment souvent un élément : <p>Bonjour</p>. Le navigateur interprète ces éléments pour afficher la page. Un titre <h1> indique le sujet principal ; un paragraphe <p> développe une idée. Les balises ne sont pas des commandes de style : leur rôle est de donner du sens. Pour cette première mission, construis un petit message d’accueil. Observe les signes < et > et le / de la fermeture. Tu pourras ensuite modifier les mots sans changer cette structure.',
    '<h1>Mon aventure web</h1>\n<p>Je construis ma première page.</p>',
    'Quelle balise représente un paragraphe ?', ['<p>','<img>','<title>','<br>'],0,'<p> représente un paragraphe. <title> nomme le document dans l’onglet.',
    'Crée un titre principal h1 avec le texte « Mon aventure web », puis un paragraphe non vide.',
    '<!-- Ajoute ton titre et ton paragraphe ici. -->',
    '<h1>Mon aventure web</h1>\n<p>Je commence ma quête de développeur.</p>',
    ['Un titre principal s’écrit entre <h1> et </h1>.','Place ton texte de présentation entre <p> et </p>.'],
    [check('<h1\\b[^>]*>\\s*Mon aventure web\\s*</h1>','Un titre h1 contient « Mon aventure web ».'),check('<p\\b[^>]*>\\s*[^<\\s][\\s\\S]*?</p>','Un paragraphe contient du texte.')]);

  mission('html',2,'L’ossature du document','Donne un cadre à ta page.', ['doctype','head','body','lang'],
    'Une page HTML complète commence par <!doctype html>, qui demande au navigateur d’utiliser le mode standard. L’élément <html> contient tout le document ; lang="fr" indique que son contenu est en français. Dans <head>, on place des informations comme l’encodage UTF-8 et le titre de l’onglet. Le contenu visible se trouve dans <body>. Cette séparation évite de confondre les informations du document avec son affichage. L’encodage UTF-8 permet notamment de représenter correctement les accents. Même si le navigateur peut réparer certaines omissions, apprendre la structure explicite rend ton code plus prévisible et plus lisible.',
    '<!doctype html>\n<html lang="fr">\n<head><meta charset="utf-8"><title>Ma page</title></head>\n<body><h1>Bienvenue</h1></body>\n</html>',
    'Où place-t-on le contenu visible principal ?', ['Dans <head>','Dans <body>','Dans <!doctype>','Dans l’attribut lang'],1,'Le corps du document, <body>, contient le contenu affiché à l’utilisateur.',
    'Écris une structure complète : doctype, html avec lang="fr", head avec le title « Ma quête », puis body avec un h1.',
    '<!-- Construis la structure complète du document. -->',
    '<!doctype html>\n<html lang="fr">\n<head><meta charset="utf-8"><title>Ma quête</title></head>\n<body><h1>Bienvenue dans ma quête</h1></body>\n</html>',
    ['Le doctype précède la balise html.','Place <title>Ma quête</title> dans head et ton h1 dans body.'],
    [check('<!doctype\\s+html\\s*>[\\s\\S]*<html\\b[^>]*lang\\s*=\\s*["\']fr["\']','Le document déclare HTML et la langue française.'),check('<head\\b[^>]*>[\\s\\S]*<title>\\s*Ma quête\\s*</title>[\\s\\S]*</head>','Le head contient le titre « Ma quête ».'),check('<body\\b[^>]*>[\\s\\S]*<h1\\b[^>]*>[\\s\\S]+?</h1>[\\s\\S]*</body>','Le body contient un titre h1.')]);

  mission('html',3,'Les portes du web','Relie tes pages entre elles.', ['lien','href','navigation'],
    'Un lien transforme un texte ou un élément en porte vers une destination. La balise <a> utilise l’attribut href pour indiquer cette destination. Une URL complète comme https://developer.mozilla.org mène vers un autre site. Un chemin comme contact.html mène vers un fichier du projet ; #contact vise un élément ayant id="contact" dans la même page. Le texte du lien doit annoncer sa destination : « Documentation HTML » est plus clair que « Clique ici ». Le visiteur peut activer un vrai lien avec une souris ou un clavier. Pour une action dans l’interface, on emploiera plutôt un bouton.',
    '<a href="contact.html">Me contacter</a>\n<a href="#projets">Voir mes projets</a>',
    'Quel attribut indique la destination d’un lien ?', ['src','class','href','alt'],2,'href définit la référence vers laquelle pointe le lien.',
    'Ajoute un lien vers https://developer.mozilla.org avec le texte « Documentation HTML », puis un lien interne vers #contact.',
    '<nav>\n  <!-- Ajoute tes deux liens. -->\n</nav>',
    '<nav>\n  <a href="https://developer.mozilla.org">Documentation HTML</a>\n  <a href="#contact">Me contacter</a>\n</nav>',
    ['Utilise <a href="adresse">texte</a>.','Pour une ancre interne, la valeur de href commence par #.'],
    [check('<a\\b[^>]*href\\s*=\\s*["\']https://developer\\.mozilla\\.org/?["\'][^>]*>\\s*Documentation HTML\\s*</a>','Le lien externe mène vers la documentation.'),check('<a\\b[^>]*href\\s*=\\s*["\']#contact["\'][^>]*>[\\s\\S]+?</a>','Un lien interne cible #contact.')]);

  mission('html',4,'L’inventaire','Range tes idées en listes.', ['ul','ol','li'],
    'Les listes regroupent des éléments de même nature. <ul> crée une liste sans ordre imposé, comme un inventaire d’outils. <ol> crée une liste ordonnée, utile pour les étapes d’une recette ou d’une procédure. Chaque élément est placé dans <li>. Le navigateur affiche souvent des puces ou des numéros, mais ce style peut ensuite être changé en CSS. Le sens de la liste reste utile aux technologies d’assistance. Ne simule pas une liste avec une succession de tirets et de retours à la ligne : utilise les éléments adaptés. Une liste peut aussi contenir d’autres listes pour représenter une hiérarchie.',
    '<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n  <li>JavaScript</li>\n</ul>',
    'Quelle combinaison crée une liste ordonnée ?', ['<ul> avec <p>','<ol> avec <li>','<list> avec <item>','<div> avec <br>'],1,'<ol> représente l’ordre et <li> chaque élément.',
    'Crée une liste ul contenant au moins trois éléments li : HTML, CSS et JavaScript.',
    '<!-- Construis ton inventaire de langages. -->',
    '<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n  <li>JavaScript</li>\n</ul>',
    ['Place les éléments dans une balise ul.','Chaque langage doit être dans sa propre balise li.'],
    [check('<ul\\b[^>]*>[\\s\\S]*</ul>','La liste utilise ul.'),check('<li\\b[^>]*>\\s*HTML\\s*</li>[\\s\\S]*<li\\b[^>]*>\\s*CSS\\s*</li>[\\s\\S]*<li\\b[^>]*>\\s*JavaScript\\s*</li>','Trois éléments présentent HTML, CSS et JavaScript dans cet ordre.')]);

  mission('html',5,'Le monde en images','Affiche un média avec du sens.', ['img','src','alt','figure'],
    'Une image s’insère avec <img>. Son attribut src indique l’adresse du fichier et alt décrit son contenu lorsque cette information est utile. L’image est un élément vide : elle n’a pas de balise fermante. Une description alternative sert notamment aux personnes qui ne voient pas l’image et peut apparaître si le chargement échoue. Pour une image purement décorative, alt="" peut être approprié. Les attributs width et height aident le navigateur à réserver de l’espace. <figure> peut réunir une image et sa légende <figcaption>. Choisis toujours une description adaptée au rôle de l’image dans la page.',
    '<figure>\n  <img src="robot.svg" alt="Petit robot explorateur" width="240" height="240">\n  <figcaption>Mon compagnon de code.</figcaption>\n</figure>',
    'À quoi sert principalement alt ?', ['À changer la taille','À décrire l’image quand c’est utile','À définir un lien','À charger une animation'],1,'alt fournit une alternative textuelle au contenu de l’image.',
    'Dans une figure, ajoute une image robot.svg avec une description alt non vide et une légende figcaption.',
    '<figure>\n  <!-- Image et légende. -->\n</figure>',
    '<figure>\n  <img src="robot.svg" alt="Un robot qui apprend à programmer">\n  <figcaption>Mon compagnon de quête.</figcaption>\n</figure>',
    ['La balise img possède src et alt dans sa balise ouvrante.','Ajoute la légende avec <figcaption>…</figcaption>.'],
    [check('<img\\b(?=[^>]*src\\s*=\\s*["\']robot\\.svg["\'])(?=[^>]*alt\\s*=\\s*["\'][^"\']+?["\'])[^>]*>','L’image robot.svg a une alternative textuelle.'),check('<figure\\b[^>]*>[\\s\\S]*<figcaption\\b[^>]*>[^<]+</figcaption>[\\s\\S]*</figure>','La figure possède une légende.')]);

  mission('html',6,'La carte de la page','Choisis des éléments qui ont un rôle.', ['header','nav','main','footer','sémantique'],
    'Les éléments sémantiques décrivent la fonction des zones de la page. <header> introduit une page ou une section. <nav> regroupe des liens de navigation importants. <main> contient le contenu principal ; une page doit généralement avoir un seul main visible. <footer> accueille des informations de fin, comme les crédits ou les liens de contact. Ces éléments peuvent avoir une apparence identique à des div avant l’ajout de CSS, mais leur sens améliore la compréhension et la navigation. Un bon document raconte déjà son organisation sans mise en forme. Utilise un titre explicite pour le contenu principal et garde les liens descriptifs.',
    '<header><nav><a href="#contenu">Explorer</a></nav></header>\n<main id="contenu"><h1>Ma carte du web</h1></main>\n<footer>Créé par un explorateur.</footer>',
    'Quel élément représente le contenu principal ?', ['<footer>','<nav>','<main>','<aside>'],2,'<main> identifie la partie principale du document.',
    'Crée un header avec un nav, un main contenant un h1, puis un footer non vide.',
    '<!-- Organise les trois grandes zones de ta page. -->',
    '<header><nav><a href="#contenu">Accueil</a></nav></header>\n<main id="contenu"><h1>Code Quest</h1></main>\n<footer>Une création TOV4R.</footer>',
    ['Le header doit contenir ton nav.','Place le h1 dans main, puis termine par footer.'],
    [check('<header\\b[^>]*>[\\s\\S]*<nav\\b[^>]*>[\\s\\S]*</nav>[\\s\\S]*</header>','Le header contient une navigation.'),check('<main\\b[^>]*>[\\s\\S]*<h1\\b[^>]*>[^<]+</h1>[\\s\\S]*</main>','Le main possède un titre principal.'),check('<footer\\b[^>]*>\\s*[^<\\s][\\s\\S]*?</footer>','Un footer termine le contenu.')]);

  mission('html',7,'Le message au camp','Construis un formulaire compréhensible.', ['form','label','input','button'],
    'Un formulaire recueille des informations. <label> donne un nom visible au champ ; son attribut for doit correspondre exactement à l’id du champ. Un input de type email demande une adresse et permet au navigateur de vérifier une syntaxe de base. required rend le champ obligatoire lors d’une soumission normale. Un bouton de type submit déclenche la soumission. Cela ne crée pas automatiquement un serveur ni un envoi de message : il faudra un traitement adapté pour stocker ou transmettre les données. Ici, le but est d’écrire les éléments du formulaire. La validation du navigateur aide l’utilisateur mais ne remplace pas les contrôles côté serveur.',
    '<form>\n  <label for="email">Adresse email</label>\n  <input id="email" type="email" required>\n  <button type="submit">Envoyer</button>\n</form>',
    'Comment associer un label à un input ?', ['Même class sur les deux','for du label égal à id du champ','Même texte dans les deux','Avec une balise br'],1,'L’association explicite utilise la correspondance for/id.',
    'Crée un form avec le label « Email » associé à id="email", un input type email obligatoire et un bouton submit.',
    '<form>\n  <!-- Ajoute le label, le champ et le bouton. -->\n</form>',
    '<form>\n  <label for="email">Email</label>\n  <input id="email" type="email" required>\n  <button type="submit">Envoyer</button>\n</form>',
    ['Écris <label for="email">Email</label>.','Le champ a besoin de id="email", type="email" et required.'],
    [check('<label\\b[^>]*for\\s*=\\s*["\']email["\'][^>]*>[^<]+</label>','Un label est associé à email.'),check('<input\\b(?=[^>]*id\\s*=\\s*["\']email["\'])(?=[^>]*type\\s*=\\s*["\']email["\'])(?=[^>]*\\brequired\\b)[^>]*>','Le champ email est identifié et obligatoire.'),check('<form\\b[^>]*>[\\s\\S]*<button\\b[^>]*type\\s*=\\s*["\']submit["\'][^>]*>[^<]+</button>[\\s\\S]*</form>','Le formulaire contient un bouton de soumission.')]);

  mission('html',8,'Les archives','Présente de vraies données tabulaires.', ['table','caption','thead','tbody','th','scope'],
    'Un tableau sert à comparer des données organisées en lignes et colonnes, pas à placer les blocs d’une page. <caption> nomme le tableau. <thead> regroupe les lignes d’en-tête, tandis que <tbody> contient les données. Une ligne utilise <tr>, une cellule ordinaire <td> et un en-tête <th>. L’attribut scope="col" précise qu’un en-tête décrit sa colonne. Cette structure aide à comprendre la relation entre les valeurs, notamment avec un lecteur d’écran. Le CSS pourra ensuite ajouter les espacements et les bordures. Commence par un tableau simple avec une colonne pour le langage et une autre pour le nombre de missions.',
    '<table>\n<caption>Mes missions</caption>\n<thead><tr><th scope="col">Langage</th><th scope="col">Missions</th></tr></thead>\n<tbody><tr><td>HTML</td><td>10</td></tr></tbody>\n</table>',
    'Quel élément nomme le tableau ?', ['<summary>','<legend>','<caption>','<label>'],2,'<caption> donne un titre ou une description directement associé au tableau.',
    'Crée un tableau avec une caption, un thead contenant un th scope="col", et un tbody contenant une ligne de données.',
    '<table>\n  <!-- Titre, en-tête et données. -->\n</table>',
    '<table>\n<caption>Progression des missions</caption>\n<thead><tr><th scope="col">Langage</th><th scope="col">Missions</th></tr></thead>\n<tbody><tr><td>HTML</td><td>10</td></tr></tbody>\n</table>',
    ['Ajoute caption directement dans table.','Utilise th pour les en-têtes et td pour les données.'],
    [check('<caption\\b[^>]*>[^<]+</caption>','Le tableau possède une caption.'),check('<thead\\b[^>]*>[\\s\\S]*<th\\b[^>]*scope\\s*=\\s*["\']col["\'][^>]*>[^<]+</th>[\\s\\S]*</thead>','Le thead contient un en-tête de colonne.'),check('<tbody\\b[^>]*>[\\s\\S]*<tr\\b[^>]*>[\\s\\S]*<td\\b[^>]*>[^<]+</td>[\\s\\S]*</tr>[\\s\\S]*</tbody>','Le tbody possède une ligne de données.')]);

  mission('html',9,'Les portes accessibles','Utilise les bons contrôles.', ['button','details','summary','attributs'],
    'Le navigateur fournit déjà des contrôles interactifs accessibles. Un vrai button se déclenche avec le clavier et possède un rôle identifiable. Pour afficher ou masquer des informations complémentaires, <details> et son premier élément <summary> créent un composant natif sans JavaScript. Le texte du summary sert de commande visible. L’attribut open ouvre la section par défaut, mais n’est pas indispensable. Évite de transformer une simple div en bouton si un élément natif convient. L’accessibilité vient aussi des textes clairs et de la structure logique, pas seulement des attributs supplémentaires. Dans cette mission, crée une petite aide repliable et un bouton séparé.',
    '<details>\n  <summary>Comment gagner des XP ?</summary>\n  <p>Termine les missions pour progresser.</p>\n</details>\n<button type="button">Commencer</button>',
    'Quel composant peut se déplier sans JavaScript ?', ['<details> avec <summary>','<div> avec <span>','<a> sans href','<p> avec class'],0,'details/summary est un contrôle natif de divulgation d’informations.',
    'Crée un details contenant un summary et un paragraphe d’aide, puis un bouton type="button" intitulé « Commencer ».',
    '<!-- Une aide repliable et un bouton. -->',
    '<details>\n<summary>Besoin d’aide ?</summary>\n<p>Chaque défi réussi rapporte des XP.</p>\n</details>\n<button type="button">Commencer</button>',
    ['Le summary est placé à l’intérieur de details.','Utilise un vrai button et indique type="button".'],
    [check('<details\\b[^>]*>[\\s\\S]*<summary\\b[^>]*>[^<]+</summary>[\\s\\S]*<p\\b[^>]*>[^<]+</p>[\\s\\S]*</details>','L’aide repliable contient une commande et un texte.'),check('<button\\b[^>]*type\\s*=\\s*["\']button["\'][^>]*>\\s*Commencer\\s*</button>','Un vrai bouton permet de commencer.')]);

  mission('html',10,'Boss : ta carte d’explorateur','Assemble une page personnelle.', ['projet','structure','navigation','contenu'],
    'Tu peux maintenant assembler plusieurs éléments en un petit projet cohérent. Une page de profil commence par une identité claire, présente les compétences sous forme de liste et propose un moyen d’aller plus loin. Sépare les zones avec des éléments sémantiques. Choisis un seul titre principal et utilise des sous-titres pour les sections. Les liens doivent avoir une destination compréhensible. Ce boss vérifie quelques fondations, mais la qualité du résultat dépend aussi de la lisibilité du contenu et du soin apporté à sa structure. Construis d’abord le HTML, puis imagine comment le parcours CSS pourra transformer cette carte en une interface visuelle.',
    '<header><h1>Nova, explorateur web</h1></header>\n<main><h2>Compétences</h2><ul><li>HTML</li><li>Curiosité</li></ul><a href="https://developer.mozilla.org">Ma documentation</a></main>\n<footer>Mon premier projet.</footer>',
    'Quel ordre de travail aide à construire une page ?', ['Tout placer dans un titre','Structurer le contenu puis le mettre en forme','Utiliser seulement des div vides','Créer les couleurs avant le contenu'],1,'Commencer par le contenu et la structure rend la mise en forme plus cohérente.',
    'Boss : crée ta carte d’explorateur avec header et h1, main contenant une liste d’au moins deux compétences et un lien, puis un footer.',
    '<!-- Assemble ton premier mini-projet HTML. -->',
    '<header><h1>Nova, explorateur web</h1></header>\n<main>\n<h2>Mes compétences</h2>\n<ul><li>HTML</li><li>Créativité</li></ul>\n<a href="https://developer.mozilla.org">Ma documentation</a>\n</main>\n<footer>Une nouvelle aventure commence.</footer>',
    ['Réutilise header, main et footer pour les zones.','Dans main, ajoute ul avec au moins deux li et un lien a avec href.'],
    [check('<header\\b[^>]*>[\\s\\S]*<h1\\b[^>]*>[^<]+</h1>[\\s\\S]*</header>','L’identité est présentée dans header avec h1.'),check('<main\\b[^>]*>[\\s\\S]*<ul\\b[^>]*>[\\s\\S]*<li\\b[^>]*>[^<]+</li>[\\s\\S]*<li\\b[^>]*>[^<]+</li>[\\s\\S]*</ul>[\\s\\S]*<a\\b[^>]*href\\s*=\\s*["\'][^"\']+["\'][^>]*>[^<]+</a>[\\s\\S]*</main>','Le contenu principal présente compétences et lien.'),check('<footer\\b[^>]*>[^<]+</footer>','La page possède un footer.')]);

  mission('css',1,'La première couleur','Relie une règle à un élément.', ['sélecteur','propriété','valeur'],
    'CSS décrit la présentation des éléments HTML. Une règle contient un sélecteur et un bloc de déclarations entre accolades. Le sélecteur h1 cible les titres h1 ; la déclaration color: coral; change leur couleur de texte. Chaque déclaration associe une propriété à une valeur, séparées par deux-points, puis se termine par un point-virgule. Un sélecteur de classe commence par un point, par exemple .card. La même classe peut servir à plusieurs éléments. Pour cette mission, modifie deux propriétés du titre. Le contenu reste du HTML ; le CSS s’occupe de son apparence et peut évoluer sans réécrire les mots.',
    'h1 {\n  color: coral;\n  font-size: 32px;\n}',
    'Quel sélecteur cible la classe card ?', ['card','#card','.card','<card>'],2,'Le point désigne une classe CSS. Le dièse cible un identifiant.',
    'Écris une règle h1 avec color: coral et font-size: 32px.',
    'h1 {\n  /* Ajoute les deux propriétés. */\n}',
    'h1 {\n  color: coral;\n  font-size: 32px;\n}',
    ['Une déclaration utilise propriété: valeur;.','Place les deux déclarations dans les accolades de h1.'],
    [check('h1\\s*\\{[^}]*color\\s*:\\s*coral\\s*;','Le titre utilise la couleur coral.'),check('h1\\s*\\{[^}]*font-size\\s*:\\s*32px\\s*;','Le titre mesure 32px.')]);

  mission('css',2,'La boîte à outils','Maîtrise l’espace autour du contenu.', ['box model','padding','margin','border'],
    'Chaque élément est représenté par une boîte. Le contenu est entouré par le padding, puis la bordure, puis la margin. Le padding ajoute de l’espace à l’intérieur ; la margin sépare la boîte de ses voisines. Une bordure utilise une épaisseur, un style et une couleur, par exemple 1px solid #334155. Avec box-sizing: border-box, les dimensions width et height incluent le padding et la bordure, ce qui simplifie de nombreux calculs. Pour une carte lisible, on peut ajouter 24px de padding et 16px de marge. Observe ces espaces avant d’ajouter des effets visuels : ils organisent déjà l’interface.',
    '.card {\n  box-sizing: border-box;\n  padding: 24px;\n  margin: 16px;\n  border: 1px solid #334155;\n}',
    'Quelle propriété crée un espace à l’intérieur de la bordure ?', ['margin','padding','gap','outline'],1,'Le padding sépare le contenu de la bordure à l’intérieur de la boîte.',
    'Donne à .card un padding de 24px, une margin de 16px et box-sizing: border-box.',
    '.card {\n  /* Organise les espaces. */\n}',
    '.card {\n  box-sizing: border-box;\n  padding: 24px;\n  margin: 16px;\n}',
    ['Padding est l’espace intérieur ; margin est extérieur.','La valeur de box-sizing demandée est border-box.'],
    [check('\\.card\\s*\\{[^}]*padding\\s*:\\s*24px\\s*;','La carte possède 24px de padding.'),check('\\.card\\s*\\{[^}]*margin\\s*:\\s*16px\\s*;','La carte possède 16px de marge.'),check('box-sizing\\s*:\\s*border-box\\s*;','Les dimensions utilisent border-box.')]);

  mission('css',3,'Le texte lisible','Règle le rythme de lecture.', ['font-family','line-height','max-width'],
    'La typographie ne consiste pas seulement à agrandir les lettres. font-family choisit une famille de caractères et peut prévoir une solution de repli. system-ui utilise la police de l’interface du système ; sans-serif sert de secours. Une line-height sans unité est proportionnelle à la taille du texte : 1.6 donne un interligne d’environ 1,6 fois cette taille. Limiter la largeur d’un paragraphe évite les lignes trop longues. L’unité ch est liée à la largeur du caractère zéro de la police, ce qui en fait un repère pratique. Le contraste et la taille comptent aussi : garde une lecture confortable avant les effets.',
    'body { font-family: system-ui, sans-serif; line-height: 1.6; }\np { max-width: 65ch; }',
    'Que représente line-height: 1.6 sans unité ?', ['1,6 pixel','Une proportion de la taille de police','Un espacement de 1,6 cm','Une largeur fixe'],1,'Une valeur sans unité multiplie la taille de police de l’élément concerné.',
    'Applique à body la police system-ui et line-height: 1.6. Limite les paragraphes p à max-width: 65ch.',
    'body {\n}\np {\n}',
    'body {\n  font-family: system-ui, sans-serif;\n  line-height: 1.6;\n}\np { max-width: 65ch; }',
    ['La famille peut être system-ui, sans-serif.','La largeur maximale est définie par max-width, pas width.'],
    [check('body\\s*\\{[^}]*font-family\\s*:\\s*system-ui','Le body utilise system-ui.'),check('body\\s*\\{[^}]*line-height\\s*:\\s*1\\.6\\s*;','L’interligne vaut 1.6.'),check('p\\s*\\{[^}]*max-width\\s*:\\s*65ch\\s*;','Les paragraphes sont limités à 65ch.')]);

  mission('css',4,'L’alignement parfait','Place des éléments avec Flexbox.', ['flexbox','justify-content','align-items','gap'],
    'Flexbox organise les enfants directs d’un conteneur sur un axe principal. Avec display: flex, l’axe est horizontal par défaut. justify-content distribue les éléments sur cet axe ; align-items les aligne sur l’axe transversal. La valeur center sur les deux permet de centrer le contenu d’un bloc. gap crée un espacement régulier entre les enfants sans devoir leur donner des marges individuelles. Flexbox est utile pour une barre d’actions, une navigation ou un petit groupe de cartes. Les propriétés doivent être posées sur le conteneur, pas forcément sur chaque enfant. Pour changer l’axe principal, on utilisera flex-direction.',
    '.actions {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 16px;\n}',
    'Sur quel élément place-t-on display: flex ?', ['Le conteneur des éléments à organiser','Uniquement le premier enfant','L’élément title','Chaque mot du texte'],0,'Le conteneur devient un contexte Flexbox pour ses enfants directs.',
    'Transforme .actions en conteneur flex, centre les enfants sur les deux axes et ajoute un gap de 16px.',
    '.actions {\n  /* Aligne les boutons. */\n}',
    '.actions {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 16px;\n}',
    ['Utilise display: flex sur .actions.','Le centrage utilise justify-content et align-items, tous deux à center.'],
    [check('\\.actions\\s*\\{[^}]*display\\s*:\\s*flex\\s*;','Le conteneur utilise Flexbox.'),check('justify-content\\s*:\\s*center\\s*;[\\s\\S]*align-items\\s*:\\s*center\\s*;|align-items\\s*:\\s*center\\s*;[\\s\\S]*justify-content\\s*:\\s*center\\s*;','Les deux axes sont centrés.'),check('gap\\s*:\\s*16px\\s*;','L’espacement entre enfants vaut 16px.')]);

  mission('css',5,'La grille du monde','Construis des colonnes régulières.', ['grid','repeat','fr'],
    'CSS Grid organise le contenu selon des lignes et des colonnes. display: grid active ce mode sur le conteneur. grid-template-columns définit ses colonnes ; repeat(3, 1fr) crée trois colonnes partageant l’espace disponible. L’unité fr représente une fraction de cet espace, après les autres contraintes. gap espace les cellules. Pour des interfaces plus résistantes au débordement, minmax(0, 1fr) est souvent utile, mais nous commençons par une grille simple. Les enfants directs se placent automatiquement dans les cellules. Grid convient particulièrement aux galeries et aux tableaux de bord, tandis que Flexbox reste pratique pour aligner une rangée de commandes.',
    '.gallery {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n}',
    'Que crée repeat(3, 1fr) dans grid-template-columns ?', ['Trois colonnes de même fraction','Trois lignes de 1 pixel','Une colonne de 3 pixels','Trois images automatiquement'],0,'Cette écriture répète trois fois une piste de 1fr.',
    'Crée une grille .gallery de trois colonnes égales avec repeat(3, 1fr), et un gap de 20px.',
    '.gallery {\n}',
    '.gallery {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n}',
    ['Commence par display: grid.','Écris grid-template-columns: repeat(3, 1fr);.'],
    [check('\\.gallery\\s*\\{[^}]*display\\s*:\\s*grid\\s*;','La galerie utilise Grid.'),check('grid-template-columns\\s*:\\s*repeat\\(\\s*3\\s*,\\s*1fr\\s*\\)\\s*;','La grille possède trois colonnes égales.'),check('gap\\s*:\\s*20px\\s*;','Les cellules sont espacées de 20px.')]);

  mission('css',6,'Le petit écran','Adapte la page à la place disponible.', ['media query','responsive','max-width'],
    'Une interface responsive s’adapte à l’espace disponible au lieu de supposer que tous les écrans sont identiques. Une media query applique des règles sous certaines conditions. @media (max-width: 600px) concerne les fenêtres dont la largeur ne dépasse pas 600 pixels CSS. On peut alors transformer une grille de trois colonnes en une seule colonne. Le point de rupture doit être choisi selon le contenu, pas uniquement selon le nom d’un appareil. Les largeurs souples et les textes lisibles restent nécessaires. La media query complète la mise en page de base ; elle ne remplace pas toute la feuille de style.',
    '.gallery { display: grid; grid-template-columns: repeat(3, 1fr); }\n@media (max-width: 600px) {\n  .gallery { grid-template-columns: 1fr; }\n}',
    'Quand s’applique @media (max-width: 600px) ?', ['Seulement aux écrans de 600 cm','Quand la fenêtre mesure au plus 600 pixels CSS','Uniquement à l’impression','Quand la page contient 600 éléments'],1,'max-width inclut toutes les largeurs inférieures ou égales à la limite.',
    'Dans une media query max-width: 600px, fais passer .gallery à une seule colonne avec grid-template-columns: 1fr.',
    '.gallery { display: grid; grid-template-columns: repeat(3, 1fr); }\n/* Ajoute la règle responsive. */',
    '.gallery { display: grid; grid-template-columns: repeat(3, 1fr); }\n@media (max-width: 600px) {\n  .gallery { grid-template-columns: 1fr; }\n}',
    ['La syntaxe commence par @media (max-width: 600px).','La règle .gallery doit être placée dans les accolades de la media query.'],
    [check('@media\\s*\\(\\s*max-width\\s*:\\s*600px\\s*\\)\\s*\\{','Une media query cible 600px ou moins.'),check('@media[\\s\\S]*\\.gallery\\s*\\{[^}]*grid-template-columns\\s*:\\s*1fr\\s*;','La galerie utilise une colonne dans cette condition.')]);

  mission('css',7,'La palette magique','Centralise les valeurs de ton thème.', ['custom properties','var','root'],
    'Les propriétés personnalisées CSS évitent de répéter une valeur partout. Leur nom commence par deux tirets, comme --accent. Définies sur :root, elles sont disponibles dans le document par héritage, sauf si une règle les redéfinit dans un sous-ensemble. On les utilise avec var(--accent). Une valeur de repli peut être ajoutée : var(--accent, coral). Cette technique rend une palette cohérente plus facile à faire évoluer. Elle fonctionne aussi pour les espacements, les rayons ou d’autres valeurs CSS. Une propriété personnalisée n’est pas identique à une variable JavaScript : elle appartient à la cascade et peut changer selon le contexte de l’élément.',
    ':root { --accent: #7dd3fc; --radius: 16px; }\n.card { border-radius: var(--radius); border: 2px solid var(--accent); }',
    'Quelle syntaxe utilise la propriété personnalisée --accent ?', ['use(--accent)','var(--accent)','$accent','get.accent'],1,'La fonction CSS var() lit une propriété personnalisée.',
    'Déclare --accent: #7dd3fc dans :root, puis utilise var(--accent) pour la couleur de .badge.',
    ':root {\n}\n.badge {\n}',
    ':root { --accent: #7dd3fc; }\n.badge { color: var(--accent); }',
    ['Le nom doit commencer par deux tirets.','Dans .badge, écris color: var(--accent);.'],
    [check(':root\\s*\\{[^}]*--accent\\s*:\\s*#7dd3fc\\s*;','La couleur accent est centralisée dans :root.'),check('\\.badge\\s*\\{[^}]*color\\s*:\\s*var\\(\\s*--accent\\s*\\)\\s*;','Le badge utilise la couleur avec var().')]);

  mission('css',8,'Le retour visuel','Rends les interactions perceptibles.', ['hover','focus-visible','transition'],
    'Une interface doit montrer ce qui peut être activé et où se trouve le focus du clavier. :hover cible un élément survolé par un pointeur ; :focus-visible permet de proposer un indicateur de focus lorsque le navigateur le juge pertinent. Ne supprime pas les contours sans alternative visible. Une transition adoucit le passage entre deux valeurs ; mieux vaut nommer les propriétés animées, comme background-color, plutôt que tout animer sans distinction. Ces effets restent complémentaires : le texte, les couleurs et la structure doivent rester compréhensibles sans animation. Dans cette mission, le bouton change au survol et garde un contour clair lorsqu’on le parcourt au clavier.',
    '.button { transition: background-color 0.2s; }\n.button:hover { background-color: #2563eb; }\n.button:focus-visible { outline: 3px solid #fbbf24; outline-offset: 3px; }',
    'Pourquoi garder un focus visible ?', ['Pour décorer uniquement les images','Pour repérer le contrôle actif au clavier','Pour charger la page plus vite','Pour remplacer tous les labels'],1,'Le focus indique quel contrôle recevra l’action du clavier.',
    'Ajoute une transition background-color de 0.2s à .button, un fond #2563eb au hover et un outline de 3px solid #fbbf24 au focus-visible.',
    '.button {\n}\n.button:hover {\n}\n.button:focus-visible {\n}',
    '.button { transition: background-color 0.2s; }\n.button:hover { background-color: #2563eb; }\n.button:focus-visible { outline: 3px solid #fbbf24; outline-offset: 3px; }',
    ['Utilise trois règles : normale, :hover et :focus-visible.','Le contour demandé utilise outline, pas border.'],
    [check('\\.button\\s*\\{[^}]*transition\\s*:\\s*background-color\\s+0?\\.2s\\s*;','La couleur de fond possède une transition de 0.2s.'),check('\\.button:hover\\s*\\{[^}]*background-color\\s*:\\s*#2563eb\\s*;','Le bouton change de fond au survol.'),check('\\.button:focus-visible\\s*\\{[^}]*outline\\s*:\\s*3px\\s+solid\\s+#fbbf24\\s*;','Le focus clavier reste visible.')]);

  mission('css',9,'Le mouvement maîtrisé','Anime avec mesure.', ['keyframes','animation','prefers-reduced-motion'],
    'Une animation CSS fait varier des propriétés grâce à des étapes définies avec @keyframes. Les mots from et to représentent le début et la fin. Une animation de transform peut déplacer légèrement un élément sans modifier sa place dans le flux normal. Le mouvement doit servir l’interface et rester modéré. Certaines personnes préfèrent réduire les animations ; la media query prefers-reduced-motion: reduce permet de respecter ce choix. Une animation infinie ne doit pas être indispensable pour comprendre une information. Dans cette mission, tu crées un flottement léger puis le désactives lorsque la réduction des mouvements est demandée par le système.',
    '@keyframes float { from { transform: translateY(0); } to { transform: translateY(-8px); } }\n.robot { animation: float 2s ease-in-out infinite alternate; }\n@media (prefers-reduced-motion: reduce) { .robot { animation: none; } }',
    'Quelle préférence permet de réduire les mouvements ?', ['prefers-color-scheme','prefers-reduced-motion','max-animation-size','font-display'],1,'prefers-reduced-motion reflète la préférence de réduction des animations.',
    'Crée @keyframes float avec une transformation translateY, applique animation: float 2s ease-in-out infinite alternate à .robot, puis désactive-la avec prefers-reduced-motion: reduce.',
    '/* Anime le robot et respecte la préférence de mouvement. */',
    '@keyframes float {\n  from { transform: translateY(0); }\n  to { transform: translateY(-8px); }\n}\n.robot { animation: float 2s ease-in-out infinite alternate; }\n@media (prefers-reduced-motion: reduce) { .robot { animation: none; } }',
    ['Le nom de l’animation doit être identique à celui des keyframes.','Dans la media query, redéfinis animation: none sur .robot.'],
    [check('@keyframes\\s+float\\s*\\{[\\s\\S]*transform\\s*:\\s*translateY\\(','L’animation float modifie la translation verticale.'),check('\\.robot\\s*\\{[^}]*animation\\s*:\\s*float\\s+2s\\s+ease-in-out\\s+infinite\\s+alternate\\s*;','Le robot utilise le flottement demandé.'),check('@media\\s*\\(\\s*prefers-reduced-motion\\s*:\\s*reduce\\s*\\)[\\s\\S]*\\.robot\\s*\\{[^}]*animation\\s*:\\s*none\\s*;','L’animation est désactivée si les mouvements sont réduits.')]);

  mission('css',10,'Boss : le tableau de missions','Assemble une interface responsive.', ['mini-projet','grid','carte','responsive'],
    'Un tableau de missions combine une grille et des cartes faciles à parcourir. Les colonnes structurent l’ensemble ; le padding et les coins arrondis rendent chaque carte distincte. Sur un petit écran, une seule colonne évite de comprimer le contenu. Ce boss rassemble des outils déjà rencontrés au lieu d’ajouter une technique mystérieuse. Cherche la cohérence : même espacement, même famille de formes, texte lisible et contraste suffisant. Les contrôles de la mission vérifient les bases de la mise en page, mais ne remplacent pas un essai visuel sur plusieurs tailles. Tu peux ensuite personnaliser les couleurs pour créer l’univers de ton jeu.',
    '.quests { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }\n.quest { padding: 24px; border-radius: 16px; }\n@media (max-width: 600px) { .quests { grid-template-columns: 1fr; } }',
    'Qu’est-ce qui rend cette grille adaptée au petit écran ?', ['Un texte invisible','Le passage à une colonne quand l’espace diminue','Une largeur de 2000px','La suppression des liens'],1,'Une seule colonne préserve la largeur de lecture sur un écran étroit.',
    'Boss : crée .quests en grille de trois colonnes avec un gap de 20px. Donne 24px de padding et 16px de border-radius à .quest. Sous 600px, passe .quests à une colonne.',
    '.quests {\n}\n.quest {\n}\n/* Ajoute aussi la règle responsive. */',
    '.quests { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }\n.quest { padding: 24px; border-radius: 16px; }\n@media (max-width: 600px) { .quests { grid-template-columns: 1fr; } }',
    ['Tu peux repartir de la mission Grid puis ajouter les cartes.','La media query modifie seulement le nombre de colonnes de .quests.'],
    [check('\\.quests\\s*\\{(?=[^}]*display\\s*:\\s*grid\\s*;)(?=[^}]*grid-template-columns\\s*:\\s*repeat\\(\\s*3\\s*,\\s*1fr\\s*\\)\\s*;)(?=[^}]*gap\\s*:\\s*20px\\s*;)[^}]*\\}','La collection forme une grille de trois colonnes espacées.'),check('\\.quest\\s*\\{(?=[^}]*padding\\s*:\\s*24px\\s*;)(?=[^}]*border-radius\\s*:\\s*16px\\s*;)[^}]*\\}','Les cartes ont padding et coins arrondis.'),check('@media\\s*\\(\\s*max-width\\s*:\\s*600px\\s*\\)[\\s\\S]*\\.quests\\s*\\{[^}]*grid-template-columns\\s*:\\s*1fr\\s*;','La grille devient une colonne sous 600px.')]);

  mission('js',1,'Ton premier score','Stocke une valeur et fais-la évoluer.', ['let','const','nombre','console'],
    'JavaScript ajoute de la logique aux pages. Une variable associe un nom à une valeur. const convient à une liaison que l’on ne réaffectera pas ; let permet de changer sa valeur. Un nombre s’écrit sans guillemets, contrairement à une chaîne de caractères. L’opérateur + additionne des nombres, mais peut aussi concaténer des chaînes : vérifier le type évite les surprises. console.log affiche une information dans la console de développement. Pour cette mission, crée un score numérique, ajoute une récompense et affiche le résultat. Le point-virgule rend la séparation des instructions explicite, même s’il peut être omis dans certaines situations.',
    'let score = 0;\nscore = score + 10;\nconsole.log(score);',
    'Quel mot-clé permet de réaffecter la valeur d’une variable ?', ['let','html','return','style'],0,'Une variable déclarée avec let peut recevoir une nouvelle valeur.',
    'Déclare let score = 0, ajoute 10 avec score += 10 ou score = score + 10, puis affiche score avec console.log.',
    '// Crée et augmente ton score.\n',
    'let score = 0;\nscore += 10;\nconsole.log(score);',
    ['Le score est un nombre : ne mets pas 0 entre guillemets.','L’opérateur += ajoute une valeur à la variable existante.'],
    [check('let\\s+score\\s*=\\s*0\\s*;?','Le score commence à zéro.'),check('score\\s*(?:\\+=\\s*10|=\\s*score\\s*\\+\\s*10)\\s*;?','Le score augmente de dix.'),check('console\\.log\\(\\s*score\\s*\\)','Le score est affiché dans la console.')]);

  mission('js',2,'Le dialogue du héros','Construis une fonction qui répond.', ['fonction','paramètre','return','chaîne'],
    'Une fonction regroupe des instructions pour les réutiliser. Ses paramètres reçoivent les valeurs données lors de l’appel. Dans function saluer(nom), nom est un paramètre ; saluer("Nova") appelle la fonction avec la valeur "Nova". return renvoie un résultat et termine cette exécution. Une chaîne de caractères peut être assemblée avec + ou interpolée dans un template literal utilisant des accents graves. Une fonction qui retourne un texte ne l’affiche pas automatiquement sur la page : ce résultat pourra ensuite être utilisé par une autre instruction. Commence par une fonction simple et teste mentalement ce qu’elle renverrait pour plusieurs noms.',
    'function saluer(nom) {\n  return "Bonjour " + nom;\n}\nconsole.log(saluer("Nova"));',
    'À quoi sert return dans cette fonction ?', ['À choisir une couleur','À renvoyer le résultat de la fonction','À créer automatiquement un bouton','À effacer le paramètre'],1,'return fournit une valeur à l’instruction qui a appelé la fonction.',
    'Écris function saluer(nom) qui retourne « Bonjour » suivi du nom, avec une concaténation ou un template literal.',
    'function saluer(nom) {\n  // Renvoie le message.\n}',
    'function saluer(nom) {\n  return "Bonjour " + nom;\n}',
    ['Utilise return pour fournir le résultat.','Tu peux écrire "Bonjour " + nom ou `Bonjour ${nom}`.'],
    [check('function\\s+saluer\\s*\\(\\s*nom\\s*\\)','La fonction saluer reçoit le paramètre nom.'),check('return\\s+(?:["\']Bonjour\\s*["\']\\s*\\+\\s*nom|`Bonjour[^`]*\\$\\{\\s*nom\\s*\\}[^`]*`)','Le message renvoyé utilise Bonjour et le nom.')]);

  mission('js',3,'La porte du niveau','Prends une décision avec une condition.', ['if','comparaison','booléen'],
    'Une condition permet de choisir un comportement. if exécute un bloc si son expression est évaluée comme vraie ; else gère le cas contraire. Les comparateurs comme >=, < et === produisent des booléens. === compare sans conversion automatique de type : le nombre 5 et la chaîne "5" ne sont pas strictement égaux. Une règle de jeu peut ainsi autoriser le passage quand le score atteint un seuil. Garde les conditions faciles à lire et teste la frontière : un seuil de 100 doit-il accepter exactement 100 ? Dans cette mission, oui. Une fonction peut renvoyer un booléen directement ou le choisir avec if/else.',
    'function peutPasser(score) {\n  if (score >= 100) return true;\n  return false;\n}',
    'Quelle comparaison accepte 100 et toutes les valeurs supérieures ?', ['score > 100','score < 100','score >= 100','score === "100"'],2,'>= signifie supérieur ou égal, donc la valeur 100 est incluse.',
    'Crée function peutPasser(score) qui retourne true si score >= 100 et false sinon. Tu peux retourner directement la comparaison.',
    'function peutPasser(score) {\n  // Vérifie le seuil.\n}',
    'function peutPasser(score) {\n  return score >= 100;\n}',
    ['Le seuil est inclus : utilise >= et non >.','Une comparaison renvoie déjà true ou false.'],
    [check('function\\s+peutPasser\\s*\\(\\s*score\\s*\\)','La fonction reçoit un score.'),check('score\\s*>=\\s*100','La comparaison inclut le seuil 100.'),check('return\\s+(?:score\\s*>=\\s*100|true|false)','La fonction retourne un résultat booléen.')]);

  mission('js',4,'Le sac de récompenses','Parcours une collection de valeurs.', ['tableau','for...of','push'],
    'Un tableau rassemble plusieurs valeurs dans un ordre. Les éléments sont placés entre crochets et séparés par des virgules. Leur indice commence à zéro. La propriété length indique le nombre d’éléments ; push ajoute une valeur à la fin. Une boucle for...of fournit successivement les valeurs du tableau, ce qui est pratique pour afficher une liste ou calculer un total. Le tableau et la boucle sont deux notions distinctes : l’un conserve la collection, l’autre organise la répétition. Pour cette mission, prépare un petit inventaire puis affiche chaque élément. Plus tard, ces valeurs pourront devenir de vrais éléments de l’interface.',
    'const objets = ["Clé", "Carte", "Potion"];\nfor (const objet of objets) {\n  console.log(objet);\n}',
    'Quel est l’indice du premier élément d’un tableau ?', ['1','0','-1','Cela dépend de length'],1,'Les tableaux JavaScript commencent à l’indice zéro.',
    'Déclare un tableau const objets contenant Clé, Carte et Potion, puis parcours-le avec for...of et affiche chaque objet.',
    '// Prépare ton inventaire et parcours-le.\n',
    'const objets = ["Clé", "Carte", "Potion"];\nfor (const objet of objets) {\n  console.log(objet);\n}',
    ['Le tableau commence par [ et se termine par ].','La boucle peut s’écrire for (const objet of objets).'],
    [check('const\\s+objets\\s*=\\s*\\[\\s*["\']Clé["\']\\s*,\\s*["\']Carte["\']\\s*,\\s*["\']Potion["\']\\s*\\]','L’inventaire contient les trois objets.'),check('for\\s*\\(\\s*(?:const|let)\\s+objet\\s+of\\s+objets\\s*\\)','Une boucle for...of parcourt l’inventaire.'),check('console\\.log\\(\\s*objet\\s*\\)','Chaque objet est affiché.')]);

  mission('js',5,'La fiche du joueur','Modélise une entité avec un objet.', ['objet','propriété','accès'],
    'Un objet rassemble des propriétés nommées. Pour représenter un joueur, on peut conserver son nom, son niveau et ses points d’expérience dans la même structure. Les propriétés sont séparées par des virgules et associent une clé à une valeur. joueur.nom lit la propriété nom ; joueur.xp += 20 augmente les points. const empêche de réaffecter la variable joueur, mais n’empêche pas de modifier ses propriétés. Cette nuance est importante : la liaison et le contenu de l’objet ne sont pas la même chose. Choisis des noms explicites pour rendre ton modèle compréhensible. Un objet est utile quand plusieurs informations décrivent une seule entité.',
    'const joueur = { nom: "Nova", niveau: 1, xp: 0 };\njoueur.xp += 20;\nconsole.log(joueur.nom);',
    'Avec const joueur = { xp: 0 }, peut-on faire joueur.xp = 20 ?', ['Oui, la propriété peut changer','Non, const rend toujours tout immuable','Seulement dans HTML','Seulement si xp est une chaîne'],0,'const protège la liaison de la variable, pas toutes les propriétés de l’objet.',
    'Crée const joueur avec nom: "Nova", niveau: 1 et xp: 0, puis augmente joueur.xp de 20.',
    '// Crée la fiche et ajoute des XP.\n',
    'const joueur = { nom: "Nova", niveau: 1, xp: 0 };\njoueur.xp += 20;',
    ['Un objet utilise des accolades et des propriétés clé: valeur.','Accède aux points avec joueur.xp.'],
    [check('const\\s+joueur\\s*=\\s*\\{(?=[^}]*nom\\s*:\\s*["\']Nova["\'])(?=[^}]*niveau\\s*:\\s*1\\b)(?=[^}]*xp\\s*:\\s*0\\b)[^}]*\\}','La fiche décrit Nova, niveau 1, avec 0 XP.'),check('joueur\\.xp\\s*(?:\\+=\\s*20|=\\s*joueur\\.xp\\s*\\+\\s*20)','Le joueur gagne vingt XP.')]);

  mission('js',6,'Le total des récompenses','Additionne une collection avec une boucle.', ['boucle','accumulateur','for...of'],
    'Un accumulateur conserve un résultat qui évolue à chaque passage dans une boucle. Pour additionner des récompenses, on commence avec total égal à zéro, puis on ajoute chaque valeur. La boucle for...of fournit directement chaque élément du tableau, sans gérer son indice. Une fonction permet de réutiliser ce calcul pour plusieurs listes. Pense à placer return après la boucle : si tu le places dans la boucle, le calcul s’arrêtera dès le premier élément. Un tableau vide doit produire zéro, puisque aucune récompense n’a été ajoutée. Cette technique sert aussi à compter des éléments ou construire progressivement un texte.',
    'function totalXP(recompenses) {\n  let total = 0;\n  for (const xp of recompenses) { total += xp; }\n  return total;\n}\nconsole.log(totalXP([10, 20, 30]));',
    'Pourquoi placer return après la boucle ?', ['Pour attendre le traitement de toutes les valeurs','Pour ignorer le premier élément','Pour transformer le tableau en HTML','Pour supprimer les variables'],0,'Un return dans la boucle terminerait la fonction avant le traitement des autres éléments.',
    'Crée function totalXP(recompenses). Initialise let total = 0, ajoute chaque xp avec for...of, puis retourne total après la boucle.',
    'function totalXP(recompenses) {\n  // Additionne les récompenses.\n}\nconsole.log(totalXP([10, 20, 30]));',
    'function totalXP(recompenses) {\n  let total = 0;\n  for (const xp of recompenses) {\n    total += xp;\n  }\n  return total;\n}\nconsole.log(totalXP([10, 20, 30]));',
    ['Un total commence à zéro et doit pouvoir changer : utilise let.','Parcours recompenses avec for (const xp of recompenses), puis retourne total.'],
    [check('function\\s+totalXP\\s*\\(\\s*recompenses\\s*\\)','La fonction totalXP reçoit les récompenses.'),check('for\\s*\\(\\s*(?:const|let)\\s+xp\\s+of\\s+recompenses\\s*\\)[\\s\\S]*total\\s*(?:\\+=\\s*xp|=\\s*total\\s*\\+\\s*xp)','La boucle ajoute chaque récompense au total.'),check('return\\s+total\\s*;?','La fonction renvoie le total.')]);

  mission('js',7,'Le tri des missions','Transforme et filtre des données.', ['filter','map','méthode de tableau'],
    'Les méthodes de tableau décrivent des transformations fréquentes. filter construit un nouveau tableau avec les éléments dont le test est vrai. map construit un nouveau tableau en transformant chaque élément. Ces méthodes ne modifient pas automatiquement le tableau de départ. Dans scores.filter(score => score >= 50), seuls les scores d’au moins 50 sont conservés. On peut ensuite utiliser map pour transformer chaque score retenu, par exemple en le doublant. Une fonction fléchée courte peut retourner directement une expression, sans accolades ni mot return. Garde les noms de paramètres explicites pour que le traitement reste facile à expliquer.',
    'const scores = [20, 50, 80];\nconst retenus = scores.filter(score => score >= 50);\nconst doubles = retenus.map(score => score * 2);',
    'Quelle méthode conserve uniquement les éléments qui passent un test ?', ['push','filter','join','pop'],1,'filter sélectionne les éléments selon un prédicat et crée un nouveau tableau.',
    'À partir de const scores = [20, 50, 80], crée const retenus avec filter pour garder les scores >= 50, puis const doubles avec map pour les multiplier par 2.',
    'const scores = [20, 50, 80];\n// Filtre puis transforme les scores.\n',
    'const scores = [20, 50, 80];\nconst retenus = scores.filter(score => score >= 50);\nconst doubles = retenus.map(score => score * 2);',
    ['filter garde les valeurs pour lesquelles la condition est vraie.','map transforme chaque valeur retenue avec score * 2.'],
    [check('const\\s+retenus\\s*=\\s*scores\\.filter\\([\\s\\S]*?score\\s*>=\\s*50[\\s\\S]*?\\)','Les scores retenus sont filtrés au seuil 50.'),check('const\\s+doubles\\s*=\\s*retenus\\.map\\([\\s\\S]*?score\\s*\\*\\s*2[\\s\\S]*?\\)','Les scores retenus sont doublés avec map.')]);

  mission('js',8,'Le colis de données','Transforme un objet en JSON et retrouve-le.', ['JSON','stringify','parse'],
    'JSON est un format de texte pour représenter des données comme des objets, tableaux, chaînes, nombres et booléens. JSON.stringify convertit une structure compatible en texte JSON ; JSON.parse reconstruit une valeur à partir de ce texte. Le JSON impose des règles : les noms de propriétés sont entre guillemets doubles et les fonctions ne font pas partie du format. Convertir un objet en JSON ne le sauvegarde pas automatiquement et ne le transmet à aucun serveur. Cette étape prépare simplement des données à un stockage ou un échange ultérieur. Dans cette mission, tu réalises un aller-retour et vérifies une propriété dans la console.',
    'const progression = { nom: "Nova", xp: 120 };\nconst texte = JSON.stringify(progression);\nconst copie = JSON.parse(texte);\nconsole.log(copie.xp);',
    'Que fait JSON.stringify ?', ['Crée un compte en ligne','Convertit une valeur compatible en texte JSON','Chiffre un mot de passe','Modifie le CSS'],1,'JSON.stringify produit une représentation textuelle JSON de la valeur.',
    'Crée const progression = { nom: "Nova", xp: 120 }. Convertis-la en const texte avec JSON.stringify, puis reconstruis const copie avec JSON.parse et affiche copie.xp.',
    'const progression = { nom: "Nova", xp: 120 };\n// Effectue un aller-retour JSON.\n',
    'const progression = { nom: "Nova", xp: 120 };\nconst texte = JSON.stringify(progression);\nconst copie = JSON.parse(texte);\nconsole.log(copie.xp);',
    ['JSON.stringify reçoit l’objet progression.','JSON.parse doit recevoir le texte produit, puis console.log peut lire copie.xp.'],
    [check('const\\s+texte\\s*=\\s*JSON\\.stringify\\(\\s*progression\\s*\\)','L’objet progression est converti en texte JSON.'),check('const\\s+copie\\s*=\\s*JSON\\.parse\\(\\s*texte\\s*\\)','La copie est reconstruite avec JSON.parse.'),check('console\\.log\\(\\s*copie\\.xp\\s*\\)','Les XP reconstruits sont affichés.')]);

  mission('js',9,'Le bouclier des erreurs','Prévois un résultat si une conversion échoue.', ['try...catch','erreur','JSON.parse'],
    'Un programme peut rencontrer une erreur pendant son exécution. JSON.parse, par exemple, déclenche une exception si le texte n’est pas un JSON valide. try exécute un bloc d’instructions ; si une exception y survient, le bloc catch reçoit l’erreur et permet de choisir une réaction. Une fonction peut ainsi retourner une valeur de repli au lieu d’interrompre tout le parcours. Ne masque pas systématiquement les erreurs : dans une vraie application, un message utile peut aider à comprendre le problème. Ici, le résultat de repli est simplement null, une valeur qui signifie explicitement l’absence de donnée exploitable.',
    'function lireJSON(texte) {\n  try { return JSON.parse(texte); }\n  catch (erreur) { return null; }\n}\nconsole.log(lireJSON("incorrect"));',
    'Que peut faire catch après une exception dans try ?', ['Choisir une réaction ou une valeur de repli','Corriger automatiquement toutes les erreurs','Convertir tout texte en JSON valide','Relancer obligatoirement la boucle'],0,'catch permet de traiter l’exception ; il ne répare pas automatiquement la donnée.',
    'Crée function lireJSON(texte). Dans try, retourne JSON.parse(texte). Dans catch, retourne null pour les textes invalides.',
    'function lireJSON(texte) {\n  // Protège la conversion.\n}\nconsole.log(lireJSON("incorrect"));',
    'function lireJSON(texte) {\n  try {\n    return JSON.parse(texte);\n  } catch (erreur) {\n    return null;\n  }\n}\nconsole.log(lireJSON("incorrect"));',
    ['Entoure la conversion JSON.parse d’un bloc try.','Le bloc catch peut retourner null.'],
    [check('function\\s+lireJSON\\s*\\(\\s*texte\\s*\\)','La fonction lireJSON reçoit le texte.'),check('try\\s*\\{[^}]*return\\s+JSON\\.parse\\(\\s*texte\\s*\\)','La conversion est effectuée et renvoyée dans try.'),check('catch\\s*\\([^)]*\\)\\s*\\{[^}]*return\\s+null','Le traitement d’erreur renvoie null.')]);

  mission('js',10,'Boss : le bilan de la quête','Assemble un calcul de progression.', ['mini-projet','fonction','boucle','objet'],
    'Un système de progression peut être décomposé en petites opérations. Il reçoit une liste de récompenses, additionne les XP, puis calcule un niveau. Math.floor arrondit un nombre vers l’entier inférieur. Avec Math.floor(total / 100) + 1, le niveau commence à 1 et augmente tous les 100 XP. Une fonction peut enfin retourner un objet contenant les deux résultats, ce qui évite de mélanger les calculs et leur affichage. Ce boss assemble fonctions, boucle, nombres et objet. Il reste volontairement pur : il n’écrit pas dans une page et ne conserve rien après l’exécution. La même logique pourrait ensuite servir dans une interface de jeu.',
    'function bilanQuete(recompenses) {\n  let total = 0;\n  for (const xp of recompenses) { total += xp; }\n  const niveau = Math.floor(total / 100) + 1;\n  return { xp: total, niveau: niveau };\n}\nconsole.log(bilanQuete([60, 80, 100]));',
    'Quel niveau donne Math.floor(240 / 100) + 1 ?', ['1','2','3','4'],2,'240 / 100 vaut 2.4 ; floor donne 2, puis on ajoute 1 : niveau 3.',
    'Boss : crée function bilanQuete(recompenses). Additionne les récompenses dans let total, calcule const niveau = Math.floor(total / 100) + 1, puis retourne { xp: total, niveau: niveau }.',
    'function bilanQuete(recompenses) {\n  // Calcule les XP et le niveau.\n}\nconsole.log(bilanQuete([60, 80, 100]));',
    'function bilanQuete(recompenses) {\n  let total = 0;\n  for (const xp of recompenses) {\n    total += xp;\n  }\n  const niveau = Math.floor(total / 100) + 1;\n  return { xp: total, niveau: niveau };\n}\nconsole.log(bilanQuete([60, 80, 100]));',
    ['Réutilise le calcul du total de la mission 6.','Le niveau est calculé à partir de total ; retourne ensuite les résultats dans un objet.'],
    [check('function\\s+bilanQuete\\s*\\(\\s*recompenses\\s*\\)[\\s\\S]*for\\s*\\(\\s*(?:const|let)\\s+xp\\s+of\\s+recompenses\\s*\\)[\\s\\S]*total\\s*(?:\\+=\\s*xp|=\\s*total\\s*\\+\\s*xp)','La fonction additionne les récompenses.'),check('const\\s+niveau\\s*=\\s*Math\\.floor\\(\\s*total\\s*/\\s*100\\s*\\)\\s*\\+\\s*1','Le niveau suit la règle des 100 XP.'),check('return\\s*\\{(?=[^}]*xp\\s*:\\s*total)(?=[^}]*niveau\\s*(?::\\s*niveau)?)[^}]*\\}','Le résultat regroupe les XP et le niveau dans un objet.')]);

  const curriculum = {tracks, missions};
  if (typeof module !== 'undefined' && module.exports) module.exports = curriculum;
  else root.QuestCurriculum = curriculum;
})(typeof globalThis !== 'undefined' ? globalThis : this);
