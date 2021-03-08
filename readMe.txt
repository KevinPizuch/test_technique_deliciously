- Ecrire un petit fichier texte pour expliquer certaines parties de ton
code, des choix, si tu as eu des difficultés sur certains points, et
surtout pour nous transmettre des infos essentiels sur le build de ton
projet.



expliquer certaines parties de ton code:
    Api: je suis partie sur une structure Model-Routes-Controllers-Services afin d'avoir un code bien structuré.
    Client : partie components qui gère l'affichage des données, partie services qui est la gestion des diffentes requêtes vers l'API.
    Gestion SignIn/LogIn : utilisation de JsonWebToken & Sequelize.


choix:
    choix de la base de données : j'ai préférer choisir MySQL car selon moi, il convient parfaitement aux données structuré qui circulent entre le client et l'api.


si tu as eu des difficultés sur certains points:
    Pas de difficultés en particulier.


nous transmettre des infos essentiels sur le build de ton projet:
    J'ai exporté la base de données utilisé pendant ce test techinique ("deliciously.sql"),
    il suffira de l'importer via Navicat ou bien via le terminal => mysql -u username -p database_name < /path/to/file.sql
                                                                    mysql> use db_name;
                                                                    mysql> source backup-file.sql;

Infos bdd mysql :
    localhost
    login : root
    mot de passe : root
    port : 3306

Infos web app:
    Port client : 3000
    Port API : 8080

Lancer la web app :
    cd api/ && npm i
    node server.js

    cd client/ && npm i
    npm start


J'ai vraiment apprécié ce test technique, c'est pourquoi je me suis permis de rajouter une interface de gestion des fiches restaurant avec un aperçu en temps réel des modifications apportées.
Pour accéder à cette interface, il faut se connecter en tant qu'administrateur sur l'application web et cliquer sur Admin Board (en haut à gauche).

logs du site:
    en tant qu'administrateur :
        admin admin
    en tant qu'utilisateur:
        user user
