export type Review = {
  name: string;
  rating: number;
  date: string;
  text: string;
  verified: boolean;
};

export const REVIEWS: Record<string, Review[]> = {

  "dbz-goku-xl": [
    { name: "Mathieu R.", rating: 5, date: "12 avr. 2025", text: "Qualité impressionnante, les couleurs sont exactement comme sur les photos. Le tapis ne glisse absolument pas et la surface est parfaite pour la souris. Fan de DBZ depuis l'enfance, je suis ravi.", verified: true },
    { name: "Karim B.", rating: 5, date: "3 avr. 2025", text: "Reçu en 7 jours, emballage soigné. L'impression est nette, le noir est vraiment noir. Les bords cousus tiennent bien. Je recommande sans hésiter.", verified: true },
    { name: "Lucas T.", rating: 5, date: "28 mars 2025", text: "Parfait pour mon setup gaming. Goku UI c'est juste le meilleur visuel possible. La taille XL couvre bien clavier + souris.", verified: true },
    { name: "Inès M.", rating: 4, date: "19 mars 2025", text: "Très beau tapis, livraison rapide. Je retire une étoile car l'odeur au déballage est un peu forte, elle part après quelques heures.", verified: true },
    { name: "Alexis D.", rating: 5, date: "8 mars 2025", text: "Mon 3ème achat ici. Toujours la même qualité top. Le DBZ Goku reste mon préféré visuellement.", verified: true },
  ],

  "dbz-vegeta-xxl": [
    { name: "Jordan L.", rating: 5, date: "18 avr. 2025", text: "Format XXL parfait pour mon bureau. L'impression Vegeta SSJ est magnifique, les détails sont nets. Très satisfait.", verified: true },
    { name: "Tom V.", rating: 4, date: "5 avr. 2025", text: "Beau tapis, surface agréable. Les bords surpiqués sont bien finis. J'aurais aimé une couleur légèrement plus vive mais c'est un détail.", verified: true },
    { name: "Nassim K.", rating: 5, date: "22 mars 2025", text: "Vegeta c'est mon perso préféré, et ce tapis rend vraiment hommage. Qualité au rendez-vous, rien à redire.", verified: true },
    { name: "Chloé P.", rating: 4, date: "11 mars 2025", text: "Cadeau pour mon frère, il a adoré. Livraison un peu longue (9 jours) mais le résultat est là.", verified: false },
    { name: "Yann S.", rating: 5, date: "1 mars 2025", text: "Excellent rapport qualité/prix. La base antidérapante est vraiment efficace, ça ne bouge pas d'un millimètre.", verified: true },
  ],

  "naruto-sage-xl": [
    { name: "Sofiane A.", rating: 5, date: "20 avr. 2025", text: "Les couleurs orange et or sont sublimes. La surface speed est vraiment top pour jouer. Fan de Naruto depuis toujours, ce tapis vaut chaque euro.", verified: true },
    { name: "Emma F.", rating: 5, date: "9 avr. 2025", text: "Reçu super rapidement. L'image est nette et les couleurs fidèles. Bords cousus proprement. Très bonne qualité.", verified: true },
    { name: "Romain G.", rating: 4, date: "30 mars 2025", text: "Bon tapis dans l'ensemble. Je le trouve légèrement plus petit que ce que j'imaginais mais les dimensions sont bien indiquées, c'est moi qui m'étais mal rendu compte.", verified: true },
    { name: "Amira H.", rating: 5, date: "15 mars 2025", text: "Parfait ! Le mode sage des six voies en impression HD c'est magnifique. Mon setup est maintenant au niveau.", verified: true },
    { name: "Baptiste C.", rating: 5, date: "4 mars 2025", text: "3ème commande sur PadZone. La qualité est constante et c'est ce qui fait que je reviens. Livraison toujours dans les délais.", verified: true },
    { name: "Océane D.", rating: 4, date: "21 fév. 2025", text: "Très beau produit. Je retire une étoile car l'emballage était un peu froissé à la réception mais le tapis lui-même est parfait.", verified: true },
  ],

  "naruto-akatsuki-xxl": [
    { name: "Mehdi Z.", rating: 5, date: "16 avr. 2025", text: "Les nuages rouges sur fond noir, c'est juste iconic. La qualité est au rendez-vous et le format XXL est imposant sur mon bureau.", verified: true },
    { name: "Théo R.", rating: 4, date: "2 avr. 2025", text: "Beau tapis Akatsuki. Livraison en 8 jours. La surface est douce et le tapis ne glisse pas. Plutôt satisfait.", verified: true },
    { name: "Sonia B.", rating: 5, date: "24 mars 2025", text: "Cadeau pour mon copain fan de Naruto. Il a été choqué par la qualité de l'impression. Les bords or sont un vrai plus.", verified: false },
    { name: "Florian M.", rating: 4, date: "10 mars 2025", text: "Produit conforme à la description. Bon anti-dérapant, impression nette. Livraison dans les délais.", verified: true },
  ],

  "op-gear5-xl": [
    { name: "Kevin L.", rating: 5, date: "23 avr. 2025", text: "Le Gear 5 de Luffy en impression photorealistic c'est une tuerie. Les couleurs sont exactement celles de l'anime. Qualité premium, je suis fan.", verified: true },
    { name: "Sarah M.", rating: 5, date: "14 avr. 2025", text: "Reçu hier, je suis bluffée. L'impression est d'une netteté incroyable. One Piece saison finale oblige, c'est le bon moment pour ce tapis !", verified: true },
    { name: "Nabil T.", rating: 5, date: "5 avr. 2025", text: "Parfait. Surface speed-control top, les couleurs tiennent bien même après 2 semaines d'utilisation intensive. Je recommande.", verified: true },
    { name: "Clara V.", rating: 4, date: "28 mars 2025", text: "Très beau tapis. L'impression est fidèle. Je lui mets 4 étoiles car j'aurais aimé un format XXL aussi disponible.", verified: true },
  ],

  "demonslayer-tanjiro-l": [
    { name: "Hugo P.", rating: 5, date: "19 avr. 2025", text: "Les flammes bleues du souffle de l'eau sont magnifiquement rendues. Qualité d'impression excellente, les couleurs sont vives et précises.", verified: true },
    { name: "Lydia K.", rating: 4, date: "7 avr. 2025", text: "Très joli tapis Demon Slayer. Le format L est idéal pour souris seule. Les bords renforcés donnent un aspect premium.", verified: true },
    { name: "Pierre A.", rating: 5, date: "26 mars 2025", text: "Fan de Demon Slayer, ce tapis est parfait. L'impression résiste bien à l'utilisation quotidienne. Base antidérapante efficace.", verified: true },
    { name: "Yasmine O.", rating: 4, date: "14 mars 2025", text: "Beau produit, livraison soignée. Un peu plus petit que je ne l'imaginais mais le format L est bien indiqué.", verified: true },
    { name: "Corentin B.", rating: 5, date: "3 mars 2025", text: "Superbe rendu des couleurs. Mon setup Demon Slayer est enfin complet. Je reviendrai pour d'autres achats.", verified: true },
  ],

  "aot-survey-xxl": [
    { name: "Antoine L.", rating: 5, date: "21 avr. 2025", text: "Impressionnant. Le format XXL couvre tout mon bureau et l'impression panoramique de l'Armée de Reconnaissance est juste épique.", verified: true },
    { name: "Marine S.", rating: 5, date: "9 avr. 2025", text: "Qualité top, impression nette, base 5mm très confortable. L'attaque des titans méritait ce traitement de faveur.", verified: true },
    { name: "Raphaël D.", rating: 4, date: "27 mars 2025", text: "Très bon tapis. Les couleurs sont fidèles à l'anime, ambiance sombre comme il faut. Bords cousus proprement.", verified: true },
  ],

  "jjk-gojo-xxl": [
    { name: "Alexandre N.", rating: 5, date: "24 avr. 2025", text: "Gojo les yeux ouverts en grand format, c'est simplement magnifique. La qualité de l'édition premium se ressent vraiment.", verified: true },
    { name: "Pauline R.", rating: 5, date: "13 avr. 2025", text: "Reçu en 6 jours ! Emballage parfait. Les couleurs bleu/blanc sont sublimes. La base velours est très agréable. Un must-have JJK.", verified: true },
    { name: "Samir F.", rating: 5, date: "3 avr. 2025", text: "Le tapis le plus beau que j'ai jamais commandé. L'impression est d'une netteté professionnelle. Je l'offrirai à tous les fans de JJK.", verified: true },
    { name: "Jade M.", rating: 4, date: "22 mars 2025", text: "Magnifique produit. Livraison rapide. Je retire une étoile car le prix est un peu élevé mais la qualité justifie.", verified: true },
    { name: "Dorian C.", rating: 5, date: "10 mars 2025", text: "Mon 2ème achat. Le JJK Gojo surpasse mon précédent tapis. Les bords brodés sont un détail qui fait la différence.", verified: true },
  ],

  "lol-jinx-xl": [
    { name: "Théodore V.", rating: 5, date: "17 avr. 2025", text: "La version Arcane de Jinx est rendue à merveille. Surface speed top pour les games ranked. Mon DPI bas est enfin confortable.", verified: true },
    { name: "Camille B.", rating: 5, date: "6 avr. 2025", text: "Cadeau parfait pour une fan d'Arcane. Les couleurs cyan/rose sont fidèles. Livraison rapide et emballage soigné.", verified: false },
    { name: "Nicolas P.", rating: 4, date: "25 mars 2025", text: "Bon tapis gaming. Base anti-glisse efficace, surface correcte. L'impression est belle. Satisfait de mon achat.", verified: true },
    { name: "Laura G.", rating: 5, date: "14 mars 2025", text: "Exactement ce que je cherchais pour compléter mon setup LoL. La qualité est au niveau. Je recommande.", verified: true },
    { name: "Maxime F.", rating: 4, date: "2 mars 2025", text: "Très joli produit. L'image est nette et les couleurs vives. Un peu d'odeur au déballage mais rien de grave.", verified: true },
  ],

  "valorant-agents-xxl": [
    { name: "Dylan R.", rating: 5, date: "25 avr. 2025", text: "Le tapis parfait pour un main Radiant. Tous les agents en XXL, c'est exactement ce qu'il faut pour avoir la motivation. Surface control au top.", verified: true },
    { name: "Justine K.", rating: 5, date: "15 avr. 2025", text: "Reçu en 5 jours, nickel. Les 22 agents sont parfaitement imprimés. Le rouge des bords cousus est identique au rouge Valorant.", verified: true },
    { name: "Rémi L.", rating: 5, date: "5 avr. 2025", text: "Je joue sur ce tapis depuis 3 semaines, aucune dégradation de la surface ou des couleurs. Base 4mm, très confortable.", verified: true },
    { name: "Anaïs V.", rating: 4, date: "24 mars 2025", text: "Très beau produit. Un peu plus épais que prévu (ce qui est en fait une bonne surprise). Je recommande.", verified: true },
    { name: "Julien M.", rating: 5, date: "13 mars 2025", text: "Mon meilleur achat gaming de l'année. La qualité d'impression dépasse mes attentes. Livraison dans les délais.", verified: true },
    { name: "Stéphanie O.", rating: 5, date: "1 mars 2025", text: "Acheté pour mon fils gamer, il est aux anges. Cadeau réussi, qualité premium, je recommande PadZone.", verified: false },
  ],

  "cs2-dust2-xl": [
    { name: "Tom B.", rating: 5, date: "14 avr. 2025", text: "La map Dust 2 en tapis c'était une évidence. Rendu HD impeccable, on reconnaît chaque zone. Anti-dérapant efficace.", verified: true },
    { name: "Quentin A.", rating: 4, date: "2 avr. 2025", text: "Bon tapis CS. Les tons beige/marron de la map sont bien retranscrits. Livraison correcte. Je recommande.", verified: true },
    { name: "Estelle N.", rating: 5, date: "21 mars 2025", text: "Acheté pour mon frère. Très belle qualité, il est ravi. Les bords cousus tiennent bien. Expédition rapide.", verified: false },
    { name: "Adrien L.", rating: 4, date: "9 mars 2025", text: "Produit conforme à la description. Qualité satisfaisante. Livraison un peu longue mais dans les délais annoncés.", verified: true },
  ],

  "fortnite-victory-xl": [
    { name: "Noé R.", rating: 5, date: "20 avr. 2025", text: "Les couleurs Fortnite sont parfaites. La surface anti-friction est vraiment différente des tapis classiques. Mon setup est top.", verified: true },
    { name: "Lucie D.", rating: 4, date: "8 avr. 2025", text: "Beau tapis Victory Royale. La base rubber est solide. Impression Ultra HD fidèle. Livraison en 8 jours.", verified: true },
    { name: "Matteo F.", rating: 5, date: "28 mars 2025", text: "Mon fils voulait un tapis Fortnite, il est aux anges. Qualité bien supérieure à ce qu'on trouve en grande surface.", verified: false },
    { name: "Chloé S.", rating: 4, date: "16 mars 2025", text: "Bien mais pas exceptionnel. La surface est de qualité et les couleurs sont vives. Rapport Q/P correct.", verified: true },
  ],

  "apex-legends-xxl": [
    { name: "Enzo V.", rating: 5, date: "22 avr. 2025", text: "Format XXL parfait pour clavier + souris. Les legends sont bien rendus, les couleurs orange sont intenses. Très satisfait.", verified: true },
    { name: "Inès B.", rating: 4, date: "10 avr. 2025", text: "Beau tapis Apex. Texture grip efficace. Livraison dans les délais. Je recommande.", verified: true },
    { name: "Robin C.", rating: 5, date: "29 mars 2025", text: "Excellent produit. L'impression est nette et les couleurs restent vives après plusieurs semaines. Champion vibes 100%.", verified: true },
  ],

  "rgb-geo-elite-xl": [
    { name: "Kylian M.", rating: 5, date: "26 avr. 2025", text: "Le RGB est vraiment beau, la bordure LED cyan s'intègre parfaitement avec mon setup. Les 7 modes sont tous utilisables. Plug & play nickel.", verified: true },
    { name: "Anaëlle P.", rating: 5, date: "16 avr. 2025", text: "J'avais peur de la qualité pour du RGB à ce prix mais c'est vraiment solide. La surface cristal géométrique est magnifique et la LED tient bien.", verified: true },
    { name: "Tristan L.", rating: 5, date: "6 avr. 2025", text: "Mon setup a changé de niveau avec ce tapis. La LED ne scintille pas, c'est homogène tout le tour. Base antidérapante parfaite.", verified: true },
    { name: "Zoé R.", rating: 4, date: "25 mars 2025", text: "Très beau produit. Je retire une étoile car le câble USB est un peu court pour mon setup mais sinon c'est parfait.", verified: true },
    { name: "Arthur D.", rating: 5, date: "14 mars 2025", text: "Reçu en 7 jours. La qualité justifie largement le prix. La luminosité des LED est réglable, c'est un vrai plus.", verified: true },
  ],

  "rgb-dbz-xl": [
    { name: "Raphaël B.", rating: 5, date: "23 avr. 2025", text: "DBZ + RGB = le combo parfait. La bordure LED illumine tout mon bureau et l'impression Dragon Ball est d'une qualité excellente.", verified: true },
    { name: "Morgane T.", rating: 5, date: "12 avr. 2025", text: "Impressionnant. Les 16.8M couleurs c'est pas du bluff. Le contrôleur inclus est simple d'utilisation. Je recommande vivement.", verified: true },
    { name: "Vincent A.", rating: 4, date: "1 avr. 2025", text: "Très beau tapis RGB. L'effet lumineux est top. Je retire une étoile car l'odeur du caoutchouc au déballage prend du temps à partir.", verified: true },
    { name: "Lola S.", rating: 5, date: "20 mars 2025", text: "Cadeau pour mon frère, il est fou de joie. La qualité est vraiment premium pour le prix demandé. Emballage parfait.", verified: false },
    { name: "Nicolas V.", rating: 5, date: "8 mars 2025", text: "Mon 4ème achat sur PadZone. Toujours cette constance dans la qualité. Le RGB DBZ est le plus impressionnant de ma collection.", verified: true },
  ],

  "rgb-valorant-xxl": [
    { name: "Axel G.", rating: 5, date: "19 avr. 2025", text: "14 zones LED indépendantes c'est bluffant. La synchronisation avec Synapse fonctionne parfaitement. Setup Pro obtenu.", verified: true },
    { name: "Priya M.", rating: 5, date: "8 avr. 2025", text: "Le plus beau tapis de mon setup. Le format XXL est parfait. Les couleurs Valorant + RGB c'est une combinaison parfaite.", verified: true },
    { name: "Clément F.", rating: 4, date: "27 mars 2025", text: "Excellente qualité. Le USB-C est un bon choix. Un peu d'installation pour la synchro Synapse mais le résultat en vaut la peine.", verified: true },
    { name: "Camille R.", rating: 5, date: "15 mars 2025", text: "Reçu en 6 jours, nickel. Les effets lumineux sont vraiment beaux. Base solide qui ne glisse pas du tout.", verified: true },
  ],

  "rgb-fulldesk-xxxl": [
    { name: "Guillaume S.", rating: 5, date: "17 avr. 2025", text: "Le XXXL couvre mon bureau de 120cm parfaitement. Les 4 côtés RGB donnent un effet incroyable. Le câble USB-C tressé est solide.", verified: true },
    { name: "Elisa N.", rating: 5, date: "6 avr. 2025", text: "Setup ultime atteint. Le RGB 360° est juste fantastique. Waterproof vérifié après avoir renversé un verre. Produit premium.", verified: true },
    { name: "Nathan L.", rating: 4, date: "24 mars 2025", text: "Magnifique tapis full desk. Je retire une étoile car la livraison a pris 10 jours. Mais le produit lui-même est irréprochable.", verified: true },
    { name: "Estelle D.", rating: 5, date: "12 mars 2025", text: "Le meilleur investissement gaming de l'année. Couvre tout, RGB partout, solide et beau. Je recommande à 100%.", verified: true },
  ],

  "bureau-minimaliste-xl": [
    { name: "Sophie L.", rating: 5, date: "18 avr. 2025", text: "Enfin un tapis de bureau sobre et de qualité. Le noir mat premium est exactement ce que je cherchais. Surface douce, pas de glisse.", verified: true },
    { name: "Éric M.", rating: 4, date: "7 avr. 2025", text: "Très bon tapis pour usage professionnel. Discret, efficace, facile à entretenir. Livraison soignée.", verified: true },
    { name: "Marion V.", rating: 5, date: "26 mars 2025", text: "Parfait pour mon télétravail. Le lavis en machine le remet comme neuf. Les bords cousus tiennent très bien.", verified: true },
    { name: "Benoît A.", rating: 4, date: "14 mars 2025", text: "Bon produit, rapport Q/P correct. Le noir est vraiment profond et la surface est agréable au toucher.", verified: true },
    { name: "Julie R.", rating: 5, date: "3 mars 2025", text: "Acheté pour mon bureau à domicile. Discret, élégant, confortable. Je recommande pour toute personne qui veut du minimalisme.", verified: true },
  ],

  "bureau-cuir-l": [
    { name: "Thomas D.", rating: 5, date: "15 avr. 2025", text: "L'effet cuir est vraiment convaincant. Très doux au toucher. Mon bureau a pris un aspect premium. Je recommande.", verified: true },
    { name: "Isabelle P.", rating: 5, date: "4 avr. 2025", text: "Parfait pour mon bureau professionnel. L'aspect cuir marron est élégant et de qualité. Livraison rapide.", verified: true },
    { name: "Laurent B.", rating: 4, date: "23 mars 2025", text: "Beau produit effet cuir. Très doux. Base antidérapante efficace. Je l'utilise quotidiennement depuis 3 semaines, aucune usure visible.", verified: true },
    { name: "Nathalie G.", rating: 5, date: "11 mars 2025", text: "Cadeau pour mon mari. Il est ravi. L'aspect cuir est bluffant pour ce prix. Très bonne qualité.", verified: false },
  ],

  "bureau-nature-xxl": [
    { name: "Charlotte R.", rating: 5, date: "21 avr. 2025", text: "Les motifs nature sont apaisants et la qualité est au rendez-vous. Surface veloutée très agréable pour de longues sessions.", verified: true },
    { name: "François M.", rating: 4, date: "9 avr. 2025", text: "Joli tapis nature. Les tons verts sont fidèles. Les bords surpiqués sont bien finis. Satisfait de l'achat.", verified: true },
    { name: "Valérie T.", rating: 5, date: "28 mars 2025", text: "Exactement ce que je voulais pour mon espace zen. Le format XXL est parfait. Livraison dans les délais.", verified: true },
  ],

  "bureau-marbre-xl": [
    { name: "Aurélie S.", rating: 5, date: "22 avr. 2025", text: "Le marbre blanc est rendu à la perfection. Sobre, luxueux, élégant. Ma collègue en a commandé un après avoir vu le mien.", verified: true },
    { name: "David L.", rating: 5, date: "11 avr. 2025", text: "Superbe tapis marbre. La surface lisse est parfaite pour la souris. Facile à nettoyer, impeccable.", verified: true },
    { name: "Emilie N.", rating: 5, date: "31 mars 2025", text: "Parfait pour mon setup épuré. Le blanc du marbre est lumineux et les veines sont bien rendues. Je recommande.", verified: true },
    { name: "Samuel B.", rating: 4, date: "19 mars 2025", text: "Très bon produit. Le marbre est beau et la surface est agréable. Livraison un peu lente mais dans les délais.", verified: true },
    { name: "Céline V.", rating: 5, date: "7 mars 2025", text: "Acheté pour offrir. La personne est ravie. Emballage soigné, qualité premium. PadZone sait faire.", verified: false },
  ],

  "bureau-gradient-m": [
    { name: "Léa D.", rating: 5, date: "20 avr. 2025", text: "Les couleurs pastel sont exactement comme sur les photos. Parfait pour mon laptop. Livraison rapide.", verified: true },
    { name: "Martin G.", rating: 4, date: "8 avr. 2025", text: "Joli tapis pastel. Le format M est idéal pour bureau d'appoint. Les couleurs sont douces et agréables.", verified: true },
    { name: "Julie A.", rating: 5, date: "27 mars 2025", text: "Adorable ! Les tons rose/violet/bleu sont parfaits. La surface est douce. Je l'utilise pour mon setup créatif.", verified: true },
    { name: "Antoine R.", rating: 4, date: "15 mars 2025", text: "Bon petit tapis pour le prix. Les couleurs pastel sont belles. Anti-dérapant efficace. Satisfait.", verified: true },
    { name: "Camille M.", rating: 4, date: "3 mars 2025", text: "Produit conforme à la description. Bon rapport Q/P pour ce format. Je recommande.", verified: true },
  ],

  "std-s": [
    { name: "Ange L.", rating: 4, date: "12 avr. 2025", text: "Compact et pratique pour mon setup minimaliste. La surface speed est bonne. Idéal pour les petits espaces.", verified: true },
    { name: "Hugo T.", rating: 4, date: "30 mars 2025", text: "Bon petit tapis à prix accessible. Rien d'extraordinaire mais fait le job. Livraison dans les délais.", verified: true },
    { name: "Emma P.", rating: 5, date: "17 mars 2025", text: "Parfait pour les déplacements. Léger, compact, efficace. Anti-dérapant bien présent.", verified: true },
  ],

  "std-m": [
    { name: "Bastien R.", rating: 5, date: "16 avr. 2025", text: "Format idéal pour un setup classique. Surface precision excellente. Bon rapport qualité/prix.", verified: true },
    { name: "Laure G.", rating: 4, date: "4 avr. 2025", text: "Bon tapis standard. Livraison rapide. Base 3mm confortable. Je recommande pour débuter.", verified: true },
    { name: "Maxime B.", rating: 4, date: "23 mars 2025", text: "Correct pour le prix. Surface de bonne qualité. Bords cousus bien finis.", verified: true },
  ],

  "std-l": [
    { name: "Paul S.", rating: 5, date: "18 avr. 2025", text: "Le L est le format parfait pour clavier + souris. Surface precision top, confort longue durée confirmé.", verified: true },
    { name: "Sandra M.", rating: 4, date: "6 avr. 2025", text: "Bon grand tapis. La base 4mm est très confortable. Anti-fatigue bien présent. Satisfait.", verified: true },
    { name: "Kevin D.", rating: 5, date: "25 mars 2025", text: "Format parfait, qualité au rendez-vous. Je l'utilise 8h par jour sans aucun souci. Recommandé.", verified: true },
    { name: "Elodie P.", rating: 4, date: "13 mars 2025", text: "Bon produit. Livraison soignée. La surface est de qualité et le tapis ne glisse pas.", verified: true },
  ],

  "std-xl": [
    { name: "Sébastien R.", rating: 5, date: "23 avr. 2025", text: "Mon premier tapis XL, je regrette de ne pas y être venu plus tôt. Low sens friendly comme indiqué, c'est un vrai plus.", verified: true },
    { name: "Claire N.", rating: 5, date: "12 avr. 2025", text: "Format XL idéal. Surface speed parfaite. Les bords renforcés donnent confiance dans la durabilité.", verified: true },
    { name: "Arthur L.", rating: 4, date: "1 avr. 2025", text: "Très bon tapis XL. Base 4mm très confortable. Livraison dans les délais. Je recommande.", verified: true },
    { name: "Manon V.", rating: 5, date: "20 mars 2025", text: "Rapport qualité/prix excellent. Le XL me permet enfin de jouer à faible sensibilité confortablement.", verified: true },
    { name: "Romain B.", rating: 4, date: "8 mars 2025", text: "Produit de qualité. Rien à redire sur la surface et la base. Livraison un peu lente mais correcte.", verified: true },
  ],

  "std-xxxl": [
    { name: "Olivier G.", rating: 5, date: "20 avr. 2025", text: "Le FULL DESK c'est une révélation. Plus de tapis qui glisse, plus de bureau visible. Tout est couvert, l'imperméabilité est un vrai plus.", verified: true },
    { name: "Alice M.", rating: 5, date: "9 avr. 2025", text: "Investissement qui en vaut la peine. La qualité ultra stable et les 5mm d'épaisseur font la différence. Je recommande.", verified: true },
    { name: "Damien R.", rating: 4, date: "28 mars 2025", text: "Très grand tapis, bien emballé pour la livraison. La qualité est là. Je retire une étoile car le déballage est un peu laborieux.", verified: true },
    { name: "Hélène S.", rating: 5, date: "16 mars 2025", text: "Le saint graal du setup gaming. Mon bureau n'a jamais aussi bien ressemblé à un vrai setup pro. Imperméable, ultra stable, parfait.", verified: true },
  ],
};
