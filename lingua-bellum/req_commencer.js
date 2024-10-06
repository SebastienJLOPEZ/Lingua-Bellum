// Traitement de "req_commencer"

"use strict";

const fs = require("fs");
const nunjucks = require("nunjucks");

const trait = function (req, res, query) {

	let marqueurs;
	let page;
	let contenu_fichier;
	let valeur;
	let listeMembres;
	let choixA;
	let choixB;
	let contenu
	let action

	// AFFICHAGE DE LA PAGE D'ACCUEIL
	contenu_fichier = fs.readFileSync("membres.json", 'utf-8');
	listeMembres = JSON.parse(contenu_fichier);

	contenu = fs.readFileSync("tour.json", 'utf-8');
	action = JSON.parse(contenu);
	action = [];
	contenu = JSON.stringify(action);
  fs.writeFileSync("tour.json", contenu, 'utf-8');



	choixA = query.joueur1;
	choixB = query.joueur2;

	choixA = Number(choixA);
	choixB = Number(choixB);

	if (choixA === 0 || choixB === 0){

		marqueurs = {}
		page = fs.readFileSync('modele_erreur_choix.html', 'utf-8');
		page = nunjucks.renderString(page, marqueurs);
	} else {

				marqueurs = {};
				marqueurs.joueurA = listeMembres[choixA].pseudo
				marqueurs.joueurB = listeMembres[choixB].pseudo
				listeMembres[choixA].ordre = "premier"; //Précise qui s'est connecté en premier
				listeMembres[choixB].ordre = "deuxième"; //Précise qui s'est connecté en deuxième
				page = fs.readFileSync('modele_choix_ordre_joueur.html', 'utf-8');
				page = nunjucks.renderString(page, marqueurs);
				contenu_fichier = JSON.stringify(listeMembres);
		    fs.writeFileSync("membres.json", contenu_fichier, 'utf-8');
	}



	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write(page);
	res.end();
};

module.exports = trait;
