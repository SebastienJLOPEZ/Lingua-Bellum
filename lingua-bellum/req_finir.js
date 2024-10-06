"use strict";

const fs = require("fs");
const nunjucks = require("nunjucks");

const trait = function (req, res, query) {

	let marqueurs;
	let page;
	let contenu_fichier;
	let valeur;
	let listeMembres;
	let contenu;
  let scoreA, scoreB;
	let contenu2, phraseJoueur;
	let contenu3, difficulte, affectDiff;
	let contenu4, rimeForce;

	// AFFICHAGE DE LA PAGE DE RESULTAT
	contenu_fichier = fs.readFileSync("membres.json", 'utf-8');
	listeMembres = JSON.parse(contenu_fichier);
	contenu2 = fs.readFileSync("phraseJoueur.json", 'utf-8');
	phraseJoueur = JSON.parse(contenu2);
	contenu3 = fs.readFileSync("difficulte.json", 'utf-8');
  difficulte = JSON.parse(contenu3);
	contenu4 = fs.readFileSync("rimesForce.json", 'utf-8');
  rimeForce = JSON.parse(contenu4);

  for (var h=1; h<listeMembres.length;h++){
    if (listeMembres[h].ordre === "premier"){
      var x = h;
    } else if (listeMembres[h].ordre === "deuxième"){
      var y = h;
    }
  }

	rimeForce = [""];

  scoreA = listeMembres[x].score;
  scoreB = listeMembres[y].score;

	if (difficulte[0].rimeFF==="true"){
		affectDiff = "Les rimes étaient forcées en "
		difficulte[0].rimeFF="false";
	}
	if (difficulte[1].rimeFA="true"){
		affectDiff = "Les rimes étaient forcées aléatoirement à chaque action de joueur."
		difficulte[1].rimeFA="false";
	}
	if (difficulte[2].alex="true"){
		affectDiff = "Les alexandrins donnaient des points bonus"
		 difficulte[2].alex="false";
	}
	if (difficulte[2].quatr="true"){
		affectDiff = "Les quatrains donnaient des points bonus"
		 difficulte[2].quatr="false";
	}

	if (listeMembres[x].score > listeMembres[y].score){
    marqueurs = {};
    marqueurs.joueurG = listeMembres[x].pseudo;
    marqueurs.scoreG = scoreA
    marqueurs.joueurP = listeMembres[y].pseudo;
    marqueurs.scoreP = scoreB
    page = fs.readFileSync('modele_resultat.html', 'utf-8');
    page = nunjucks.renderString(page, marqueurs);
  } else if (listeMembres[y].score > listeMembres[x].score){
    marqueurs = {};
    marqueurs.joueurG = listeMembres[y].pseudo;
    marqueurs.scoreG = scoreB;
    marqueurs.joueurP = listeMembres[x].pseudo;
    marqueurs.scoreP = scoreA;
    page = fs.readFileSync('modele_resultat.html', 'utf-8');
    page = nunjucks.renderString(page, marqueurs);
  } else if (listeMembres[y].score === listeMembres[x].score) {
    marqueurs = {};
    marqueurs.joueurG = listeMembres[y].pseudo;
    marqueurs.scoreG = scoreB;
    marqueurs.joueurP = listeMembres[x].pseudo;
    marqueurs.scoreP = scoreA;
    page = fs.readFileSync('modele_resultat_exaequo.html', 'utf-8');
    page = nunjucks.renderString(page, marqueurs);
  }

  if (listeMembres[x].score > listeMembres[x].maxScore){
    listeMembres[x].maxScore = scoreA;
    contenu_fichier = JSON.stringify(listeMembres);
    fs.writeFileSync("membres.json", contenu_fichier, 'utf-8');
  }

  if (listeMembres[y].score > listeMembres[y].maxScore){
		listeMembres[y].maxScore = scoreB;
		contenu_fichier = JSON.stringify(listeMembres);
    fs.writeFileSync("membres.json", contenu_fichier, 'utf-8');
  }


  listeMembres[x].score = Number(0);
	listeMembres[x].ordre = "non défini";
  listeMembres[y].score = Number(0);
	listeMembres[y].ordre = "non défini";
	phraseJoueur[0].a.splice(0);
	phraseJoueur[1].b.splice(0);
	contenu4 = JSON.stringify(rimeForce);
	fs.writeFileSync("rimesForce.json", contenu4, 'utf-8');
	contenu3 = JSON.stringify(difficulte);
	fs.writeFileSync("difficulte.json", contenu3, 'utf-8');
	contenu2 = JSON.stringify(phraseJoueur);
  fs.writeFileSync("phraseJoueur.json", contenu2, 'utf-8');
  contenu_fichier = JSON.stringify(listeMembres);
  fs.writeFileSync("membres.json", contenu_fichier, 'utf-8');


	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write(page);
	res.end();
};

module.exports = trait;
