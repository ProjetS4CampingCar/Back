Copier coller le fichier .env.example en un fichier .env
Remplacer les valeurs par défault du nouveau .env par les vrai valeurs (à ne pas partager)

Pour lancer l'app executer : 
    $ node --env-file=.env app.js
OU
    $ npx nodemon --env-file=.env app.js
(Cette dernière commande permet de ne pas avoir à relancer le serveur avec la commande node à chaque modification)

Si vous avez une erreur vérifier que tous les packages sont installés :
    $ npm install
