// Traitement de "req_jeu"

"use strict";

const fs = require("fs");
const nunjucks = require("nunjucks");
const rimes = require("./fct_rimes.js");
const syllabe = require("./fct_syllabes.js");
const effetDifficulte = function (phr1, phr2, rm1, rm2, dif){
	let score;
	score = 0;
	if (dif[0].rimeFF !=="true" && dif[1].rimeFA!=="true"){ /*rimeFF est pour la rime obligatoire durant la partie ; rimeFA est pour les rimes aléatoires à chaque action de joueur*/
		if (rm1 === rm2 && rm1!==" " && rm2!==" "){
      		score = score + 1;
		}
	} else if (dif[0].rimeFF === "true"){
		if (rm1 === rm2 && rm1!==" " && rm2!==" "){
            score = score + 1;
		}
	} else if (dif[1].rimeFA === "true"){
		if (rm1 === rm2 && rm1!==" " && rm2!==" "){
            score = score + 1;
        }
	} /*Le terme alex est pour alexandrin*/
	if (dif[2].alex === "true"){
		if (phr1.indexOf("12") !==-1 && phr2.indexOf("12")!==-1){
            score = score + 1;
        }
	}
	if (dif[3].quatr === "true") {
		if (phr1.indexOf("4") !==-1 && phr2.indexOf("4")!==-1){
			score = score + 1;
		}
	}
	return score;
}
const sansVoyelle = function (phr){
	var voyelles = ["a", "e", "i", "o", "y", "u"]
	var resultat = 0
	for (var i=0; i<voyelles.length;i++){
		if (phr.indexOf(voyelles[i])===-1){
			resultat = resultat + 1;
		}
	}
	if (resultat ===6){
		return -1;
	} else {
		return 0;
	}
	//permet de vérifier s'il y des voyelles ou non dans un mot
}

const trait = function (req, res, query) {

	let marqueurs;
	let page;
	let contenu_fichier;
  let contenu;
	let valeur;
	let listeMembres;
  let phraseJoueur
  let choix;
  let rimesA1;
  let rimesA2;
  let rimesB1;
  let rimesB2;
  let action;
  let tour, tourMax;
  let i;
  let j;
  let radical;
  let phraseSyllabéA1, phraseSyllabéA2, phraseSyllabéB1, phraseSyllabéB2;
  let contenu2, contenu3, difficulte, contenu5, contenu4;
  let rimePossible = ["a", "i", "e", "o", "u", "in", "ou", "on", "en", "é", "è", "aill", "eil"];
	let pasVoyelleA1, pasVoyelleA2, pasVoyelleB1, pasVoyelleB2;



  contenu_fichier = fs.readFileSync("phraseJoueur.json", 'utf-8');
	phraseJoueur = JSON.parse(contenu_fichier);
  contenu = fs.readFileSync("tour.json", 'utf-8');
	action = JSON.parse(contenu);
  contenu2 = fs.readFileSync("membres.json", 'utf-8');
  listeMembres = JSON.parse(contenu2);
	contenu3 = fs.readFileSync("radical.json", 'utf-8');
  radical = JSON.parse(contenu3);
  contenu4 = fs.readFileSync("difficulte.json", 'utf-8');
  difficulte = JSON.parse(contenu4);
	contenu5 = fs.readFileSync("rimesForce.json", 'utf-8');
  rimeForce = JSON.parse(contenu5);

 	if (query.typeRimes === "1"){
  		difficulte[0].rimeFF="true";
	}
	if (query.typeRimes === "2"){
  		difficulte[1].rimeFA="true";
	}
	if (query.bonus === "0"){
 		difficulte[2].alex="true";
	}
	if (query.bonus === "1"){
 		difficulte[3].quatr="true";
	}

  if (action[0]!==undefined){
    tour = Math.floor(action[action.length-1]/2);
  }

	tourMax = false;
	if (tour>=2){
		tourMax = true
	}

  choix=query.choix

  for (var h=1; h<listeMembres.length;h++){
    if (listeMembres[h].ordre === "premier"){
      var x = h;
    } else if (listeMembres[h].ordre === "deuxième"){
      var y = h;
    }
  }

	var rimeForce
  if (rimeForce[0] === undefined && difficulte[0].rimeFF === "true"){
  var v = Math.floor(Math.random()*rimePossible.length-1);
  rimeForce[0] = rimePossible[v];
  }

  if (difficulte[1].rimeFA === "true"){
  var a= Math.floor(Math.random()*rimePossible.length-1);
  var rimeAleatoire = rimePossible[a];
  }

if (choix==="0" && tourMax === false){
  marqueurs={};
	marqueurs.tour = tour;
  marqueurs.joueurA = listeMembres[x].pseudo;
  if (difficulte[0].rimeFF==="true"){
  	marqueurs.rimeObligatoire = rimeForce[0];
  } else if (difficulte[0].rimeFA === "true"){
	marqueurs.rimeObligatoire === rimeAleatoire;
  }
	marqueurs.erreur="";
	page = fs.readFileSync('modele_jeu1.html', 'utf-8');
	page = nunjucks.renderString(page, marqueurs);

  if (action[0]!==undefined){
		pasVoyelleB1=sansVoyelle(query.phraseB1);
		pasVoyelleB2=sansVoyelle(query.phraseB2);
		if (query.phraseB1!=="" && pasVoyelleB1!==-1) {
			phraseJoueur[1].b.push(query.phraseB1)
		} else {
			phraseJoueur[1].b.push("")
		}

		if (query.phraseB2!=="" && pasVoyelleB2!==-1) {
			phraseJoueur[1].b.push(query.phraseB2)
		} else {
			phraseJoueur[1].b.push("")
		}

    i=phraseJoueur[1].b.length-2

		if (phraseJoueur[1].b[i]!=="") {
			phraseSyllabéB1 = syllabe(phraseJoueur[1].b[i], radical)
		} else {
			phraseSyllabéB1 = "0 | "
		}

		if (phraseJoueur[1].b[i+1]!=="") {
			phraseSyllabéB2 = syllabe(phraseJoueur[1].b[i+1], radical)
		} else {
			phraseSyllabéB2 = "0 | "
		}

    rimesB1 = rimes(String(phraseSyllabéB1));
    rimesB2 = rimes(String(phraseSyllabéB2));

    listeMembres[y].score = effetDifficulte(phraseSyllabéB1, phraseSyllabéB2, rimesB1, rimesB2, difficulte) + listeMembres[y].score;

    contenu2 = JSON.stringify(listeMembres);
    fs.writeFileSync("membres.json", contenu2, 'utf-8');
    contenu_fichier = JSON.stringify(phraseJoueur);
    fs.writeFileSync("phraseJoueur.json", contenu_fichier, 'utf-8');
  }

  action[action.length] = action.length+1;
  contenu = JSON.stringify(action);
  fs.writeFileSync("tour.json", contenu, 'utf-8');

} else if (choix==="1" && tourMax===false){
  marqueurs={};
	marqueurs.tour = tourMax;
  marqueurs.joueurB = listeMembres[y].pseudo;
  if (difficulte[0].rimeFF==="true"){
    marqueurs.rimeObligatoire = rimeForce;
  } else if (difficulte[0].rimeFA === "true"){
    marqueurs.rimeObligatoire === rimeAleatoire;
  }
	marqueurs.erreur="";
	page = fs.readFileSync('modele_jeu2.html', 'utf-8');
	page = nunjucks.renderString(page, marqueurs);

  if (action[0]!==undefined){
		pasVoyelleA1=sansVoyelle(query.phraseA1);
		pasVoyelleA2=sansVoyelle(query.phraseA2);
		(pasVoyelleA1, pasVoyelleA2)
		if (query.phraseA1!=="" && pasVoyelleA1!==-1) {
			phraseJoueur[0].a.push(query.phraseA1)
		} else {
			phraseJoueur[0].a.push("")
		}

		if (query.phraseA2!=="" && pasVoyelleA2!==-1) {
			phraseJoueur[0].a.push(query.phraseA2)
		} else {
			phraseJoueur[0].a.push("")
		}

    i=phraseJoueur[0].a.length-2

		if (phraseJoueur[0].a[i]!=="") {
			phraseSyllabéA1 = syllabe(phraseJoueur[0].a[i], radical)
		} else {
			phraseSyllabéA1 = "0 | "
		}

		if (phraseJoueur[0].a[i+1]!=="") {
			phraseSyllabéA2 = syllabe(phraseJoueur[0].a[i+1], radical)
		} else {
			phraseSyllabéA2 = "0 | "
		}

    rimesA1 = rimes(String(phraseSyllabéA1));
    rimesA2 = rimes(String(phraseSyllabéA2));

    listeMembres[x].score = effetDifficulte(phraseSyllabéA1, phraseSyllabéA2, rimesA1, rimesA2, difficulte) + listeMembres[x].score;

    contenu2 = JSON.stringify(listeMembres);
    fs.writeFileSync("membres.json", contenu2, 'utf-8');
    contenu_fichier = JSON.stringify(phraseJoueur);
    fs.writeFileSync("phraseJoueur.json", contenu_fichier, 'utf-8');
  }

  action[action.length] = action.length+1;
  contenu = JSON.stringify(action);
  fs.writeFileSync("tour.json", contenu, 'utf-8');

}

if (tourMax===true){
  if (choix===1){
		pasVoyelleA1=sansVoyelle(query.phraseA1);
		pasVoyelleA2=sansVoyelle(query.phraseA2);
		if (query.phraseA1!=="" && pasVoyelleA1!==-1) {
			phraseJoueur[0].a.push(query.phraseA1)
		} else {
			phraseJoueur[0].a.push("")
		}

		if (query.phraseA2!=="" && pasVoyelleA2!==-1) {
			phraseJoueur[0].a.push(query.phraseA2)
		} else {
			phraseJoueur[0].a.push("")
		}

    i=phraseJoueur[0].b.length-2

		if (phraseJoueur[0].a[i]!=="") {
			phraseSyllabéA1 = syllabe(phraseJoueur[1].a[i], radical)
		} else {
			phraseSyllabéA1 = "0 | "
		}

		if (phraseJoueur[0].a[i+1]!=="") {
			phraseSyllabéA2 = syllabe(phraseJoueur[1].a[i+1], radical)
		} else {
			phraseSyllabéA2 = "0 | "
		}

    rimesA1 = rimes(String(phraseSyllabéA1));
    rimesA2 = rimes(String(phraseSyllabéA2));

    listeMembres[x].score = effetDifficulte(phraseSyllabéA1, phraseSyllabéA2, rimesA1, rimesA2, difficulte) + listeMembres[x].score;


    contenu2 = JSON.stringify(listeMembres);
    fs.writeFileSync("membres.json", contenu2, 'utf-8');
    contenu_fichier = JSON.stringify(phraseJoueur);
    fs.writeFileSync("phraseJoueur.json", contenu_fichier, 'utf-8');
  } else if (choix===0){
		pasVoyelleB1=sansVoyelle(query.phraseB1);
		pasVoyelleB2=sansVoyelle(query.phraseB2);
		if (query.phraseB1!=="" && pasVoyelleB1!==-1) {
			phraseJoueur[1].b.push(query.phraseB1)
		} else {
			phraseJoueur[1].b.push("")
		}

		if (query.phraseB2!=="" && pasVoyelleB2!==-1) {
			phraseJoueur[1].b.push(query.phraseB2)
		} else {
			phraseJoueur[1].b.push("")
		}

		i=phraseJoueur[1].b.length-2

		if (phraseJoueur[1].b[i]!=="") {
			phraseSyllabéB1 = syllabe(phraseJoueur[1].b[i], radical)
		} else {
			phraseSyllabéB1 = "0 | "
		}

		if (phraseJoueur[1].b[i+1]!=="") {
			phraseSyllabéB2 = syllabe(phraseJoueur[1].b[i+1], radical)
		} else {
			phraseSyllabéB2 = "0 | "
		}

    rimesB1 = rimes(String(phraseSyllabéB1));
    rimesB2 = rimes(String(phraseSyllabéB2));




    listeMembres[y].score = effetDifficulte(phraseSyllabéB1, phraseSyllabéB2, rimesB1, rimesB2, difficulte) + listeMembres[y].score;


    contenu2 = JSON.stringify(listeMembres);
    fs.writeFileSync("membres.json", contenu2, 'utf-8');
    contenu_fichier = JSON.stringify(phraseJoueur);
    fs.writeFileSync("phraseJoueur.json", contenu_fichier, 'utf-8');
  }
	action.splice(0)

  marqueurs={};
  marqueurs.erreur="";
	contenu = JSON.stringify(action);
	fs.writeFileSync("tour.json", contenu,'utf-8');
	page = fs.readFileSync('modele_fin_jeu.html', 'utf-8');
	page = nunjucks.renderString(page, marqueurs);
}

contenu5 = JSON.stringify(rimeForce);
fs.writeFileSync("rimesForce.json", contenu5, 'utf-8')
contenu4 = JSON.stringify(difficulte);
fs.writeFileSync("difficulte.json", contenu4, 'utf-8')
res.writeHead(200, { 'Content-Type': 'text/html' });
res.write(page);
res.end();
};

module.exports = trait;
