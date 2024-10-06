// Traitement de "req_identifier"

"use strict";

const fs = require("fs");
const nunjucks = require("nunjucks");;
const listeD = require("./fct_listeDeroulante.js");

const trait = function (req, res, query) {

	let marqueurs;
	let page;
	let contenu_fichier;
	let listeMembres;

	// ON LIT LES COMPTES EXISTANTS

	contenu_fichier = fs.readFileSync("membres.json", 'utf-8');
	listeMembres = JSON.parse(contenu_fichier);

	marqueurs = {};
	marqueurs.joueur=listeD(listeMembres);
	page = fs.readFileSync('modele_accueil.html', 'utf-8');
	page = nunjucks.renderString(page, marqueurs);

	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write(page);
	res.end();
};

module.exports = trait;
