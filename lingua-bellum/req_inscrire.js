// Traitement de "req_inscrire"

"use strict";

const fs = require("fs");
const nunjucks = require("nunjucks");;

const trait = function (req, res, query) {

	let marqueurs;
	let page;
	let nouveauMembre;
	let contenu_fichier;
	let listeMembres;
	let i;
	let trouve;
	let affect;

	// ON LIT LES COMPTES EXISTANTS

	contenu_fichier = fs.readFileSync("membres.json", 'utf-8');
	listeMembres = JSON.parse(contenu_fichier);

	// ON VERIFIE QUE LE COMPTE N'EXISTE PAS DEJA

	marqueurs={};
	marqueurs.erreur="";
	page = fs.readFileSync('modele_inscription.html', 'utf-8');
	page = nunjucks.renderString(page, marqueurs);

	trouve = false;
	affect = false;

	i = 0;
	while (i < listeMembres.length && trouve === false) {
		if (listeMembres[i].pseudo === query.pseudo && query.pseudo !== undefined && query.pseudo !=="") {
			trouve = true;
		}
		i++;
	}

	if (trouve === false && query.pseudo !== undefined){
		nouveauMembre = {};
		nouveauMembre.pseudo = query.pseudo;
		nouveauMembre.score = 0;
		nouveauMembre.maxScore = 0;
		nouveauMembre.ordre = "non définie"
		listeMembres[listeMembres.length] = nouveauMembre;
		affect = true;

		contenu_fichier = JSON.stringify(listeMembres);
		fs.writeFileSync("membres.json", contenu_fichier, 'utf-8');

		if (affect===true){
			page = fs.readFileSync('Prof_modele_confirmation_inscription.html', 'UTF-8');

			marqueurs = {};
			marqueurs.pseudo = query.pseudo;
			page = nunjucks.renderString(page, marqueurs);
		}
	}
	else
	if (trouve === true){
		page = fs.readFileSync('modele_inscription.html', 'utf-8');

		marqueurs = {};
		marqueurs.erreur = "<strong>ERREUR</strong> : ce compte existe déjà";
		page = nunjucks.renderString(page, marqueurs);
	}


	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write(page);
	res.end();
};

module.exports = trait;
