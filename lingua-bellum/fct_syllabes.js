"use strict"

const rS=require("readline-sync");
var voyelle = "aàâeëéèêiïouùy";
var consonne = "bcçdfghjklmnpqrstvwxyz";
var ponctuation = ",;:!?.";
var texte;
var tailleInitiale=0;
var nouveautexte;

const syllabe = function(phr, radical){

texte = phr

  //exception  ch, ph, gn et th sont inséparables et  bl, cl, fl, gl, pl, br, cr, dr, fr, gr, pr, tr, vr
var reg=new RegExp("([cpg]h|[bcfgp]l|[bcdfgptv]r)","gi");
texte = texte.replace(reg,"X");
//le tiret sépare 2 mots
reg=new RegExp("-","gi");
texte = texte.replace(reg,"|");
//la ponctuation est remplacer par des espaces
reg=new RegExp("["+ponctuation+"]","gi");
texte = texte.replace(reg," ");

//on enlève les espaces en fin de ligne
reg=new RegExp("([ ]+\n)|([ ]+$)","gi");
texte = texte.replace(reg,"");

//le e est muet en fin de vers cas ambigu ent non traité
reg=new RegExp("(e|es)\n|e$|es$","gi");
texte = texte.replace(reg,"'");

for (var i=0; i<radical.length;i++) {
  tailleInitiale  = texte.length;
  reg=new RegExp("("+radical[i]+")+(ent$)");
  texte = texte.replace(reg, "$1'")
}

reg=new RegExp("(ai|ur)+(ent$)");
texte = texte.replace(reg, "$1'")

var j = 0

for (var j=0;j<radical.length;j++){
  tailleInitiale  = texte.length;
  reg=new RegExp("("+radical[j]+")+(ent)[ ]+(["+voyelle+"h])");
  texte = texte.replace(reg, "$1' $3")
}

//Toute syllabe terminée par un E muet s’élide devant un mot commençant par une voyelle ou un H muet. ( je considère tout les H muet...)
reg=new RegExp("(e|es)[ ]+(["+voyelle+"h])","gi");
texte = texte.replace(reg,"' $2");

reg=new RegExp("(ai|ur)+(ent)[ ]+(["+voyelle+"h])");
texte = texte.replace(reg, "$1'")

//Une consonne placée entre deux voyelles introduit une nouvelle syllabe
reg=new RegExp("(["+voyelle+"])(["+consonne+"X])(["+voyelle+"])", "gi");

do{
    tailleInitiale  = texte.length;
    texte = texte.replace(reg,"$1|$2$3");
}while(tailleInitiale <  texte.length);

//De deux consonnes placées entre deux voyelles, la première appartient à la syllabe précédente, la seconde, à la syllabe suivante
reg=new RegExp("(["+voyelle+"])(["+consonne+"X])(["+consonne+"X])(["+voyelle+"])", "gi");

do{
    tailleInitiale  = texte.length;
    texte = texte.replace(reg,"$1$2|$3$4");
}while(tailleInitiale <  texte.length);

//Quand il y a trois consonnes consécutives à l’intérieur d’un mot, ordinairement les deux premières terminent une syllabe, l’autre commence une nouvelle syllabe :
reg=new RegExp("(["+voyelle+"])(["+consonne+"X])(["+consonne+"X])(["+consonne+"X])(["+voyelle+"])", "gi");

do{
    tailleInitiale  = texte.length;
    texte = texte.replace(reg,"$1$2$3|$4$5");
}while(tailleInitiale <  texte.length);

//les espace sont remplacé par |
reg=new RegExp("[ ]+","g");
texte = texte.replace(reg,"|");

var res = texte.split("\n");
var res2;
var resultatSomme="";
var i=0;
for(i=0;i < res.length; i++)
{
    res2 = res[i].split("|");

    if(res2.length > 0)
        resultatSomme += res2.length + " " + res[i];
    else
        resultatSomme += "";
}

nouveautexte = resultatSomme;
return nouveautexte;
}

module.exports = syllabe;
