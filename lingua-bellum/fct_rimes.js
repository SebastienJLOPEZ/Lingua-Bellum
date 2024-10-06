"use strict"

const rimes = function(phr){ //phrase écrite par le joueur

var baseRime = [{"o":"o"}, {"a":"a"}, {"e":"e"}]
var rimeFin = [{"u":"u"}, {"i":["i", "y"]}, {"é":"é"}, {"è":["è", "ê", "ë"]} ];
var rimeComplexe = [{"on":["on", "om"]}, {"en":["en", "em", "an", "am"]}, {"in":["un", "in", "im", "yn"]}, {"ien": "ien"},
                    {"ai":["ai", "ei"]}, {"et":["et", "er"]}, {"au":["au", "eau"]}, {"ou":"ou"}, {"oi":"oi"}, {"aille":"ill"}, {"ain":["ain", "ein"]}, {"il":"il"}]
var mot;
var voyelles = ["a", "e", "i", "o", "y", "u"];
var rimePhrase;
var verifComplexe = false; //pour s'assurer que la rime complexe est la bonne (ne pas avoir "on" alors que le mot finit par "oi")
var i; //pour avoir le dernier "|" présent dans la phrase
var j; //pour permettre de mettre la dernière syllabe à part
var g; //pour avoir le premier caractère de la dernière syllabe
var h; //pour les bases de la majorité de rimes
var r; //pour voir la dernières voyelles
var f; // pour rimes finales
var c; //pour rimes complexes
var resultat = 0;

if (phr[0]==="1" && phr[1]===" "){
  phr=String("|"+phr)
}

i = phr.length-1;
while(phr[i]!=="|"){
  i--;
  g=i+1;
}

for (j=g;j<phr.length;j++){
  if (mot===undefined) {
    mot=String(phr[j]);
  } else if (j!==g){
    mot=String(mot+phr[j]);
}
}
r=mot.length-1

for (var i=0; i<voyelles.length;i++){
  if (phr.indexOf(voyelles[i])===-1){
    resultat = resultat + 1;
  }
if (resultat===6){
  mot=String(mot + " ");
}
}

while (mot[r]!=="a" && mot[r]!=="e" && mot[r]!=="o" && mot[r]!=="u" && mot[r]!=="i" && mot[r]!=="y" && mot[r]!==" " && r>=0){
  r--
}

if (mot.indexOf(" ")!==-1){
  rimePhrase = " "
}

for (h=0; h<baseRime[1].a.length; h++) {
  if (mot.indexOf(baseRime[1].a[h])!==-1){
    rimePhrase = "a"
  }
}

for (h=0; h<baseRime[0].o.length; h++) {
  if (mot.indexOf(baseRime[0].o[h])!==-1){
    rimePhrase = "o"
  }
}

for (h=0; h<baseRime[2].e.length; h++) {
  if (mot.indexOf(baseRime[2].e[h])!==-1){
    rimePhrase = "e"
  }
}

for (f=0; f<rimeFin[0].u.length; f++) {
  if (mot.indexOf(rimeFin[0].u[f])!==-1 && mot[r]==="u" && rimePhrase===undefined){
    rimePhrase = "u"
  }
}

for (f=0; f<rimeFin[1].i.length; f++) {
  if (mot.indexOf(rimeFin[1].i[f])!==-1 && mot[r]==="i"||mot.indexOf(rimeFin[1].i[f])!==-1 && mot[r]==="y"){
    rimePhrase = "i"
  }
}


for (f=0; f<rimeFin[2].é.length; f++) {
  if (mot.indexOf(rimeFin[2].é[f])!==-1){
    rimePhrase = "é"
  }
}

for (f=0; f<rimeFin[3].è.length; f++) {
  if (mot.indexOf(rimeFin[3].è[f])!==-1){
    rimePhrase = "è"
  }
}

if (rimePhrase === "a" && verifComplexe === false){
  for (c=0; c<rimeComplexe[1].en.length; c++) {
    if (mot.indexOf(rimeComplexe[1].en[c])!==-1){
      rimePhrase = "en"
      verifComplexe=true;
    }
  }
  for (c=0; c<rimeComplexe[6].au.length; c++) {
    if (mot.indexOf(rimeComplexe[6].au[c])!==-1 && rimePhrase==="a"){
      rimePhrase = "o"
      verifComplexe=true;
    }
  }
  for (c=0; c<rimeComplexe[10].ain.length; c++) {
    if (mot.indexOf(rimeComplexe[10].ain[c])!==-1 && rimePhrase==="a"){
      rimePhrase = "in"
      verifComplexe=true;
    }
  }
  for (c=0; c<rimeComplexe[4].ai.length; c++) {
    if (mot.indexOf(rimeComplexe[4].ai[c])!==-1 && rimePhrase==="a"){
      rimePhrase = "è"
      verifComplexe=true;
    }
  }
  if (rimePhrase==="è"){
    for (c=0; c<rimeComplexe[9].aill.length; c++) {
      if (mot.indexOf(rimeComplexe[9].aill[c])!==-1){
        rimePhrase = "aill"
        verifComplexe=true;
      }
    }
  }
}

if (rimePhrase === "o" && verifComplexe === false){
  for (c=0; c<rimeComplexe[0].on.length; c++) {
    if (mot.indexOf(rimeComplexe[0].on[c])!==-1 && mot[mot.length-1]!=="'"){
      rimePhrase = "on"
      verifComplexe=true;
    }
  }
  for (c=0; c<rimeComplexe[7].ou.length; c++) {
    if (mot.indexOf(rimeComplexe[7].ou[c])!==-1 && rimePhrase==="o" && mot[r]==="u"){
      rimePhrase = "ou"
      verifComplexe=true;
    }
  }
  for (c=0; c<rimeComplexe[8].oi.length; c++) {
    if (mot.indexOf(rimeComplexe[8].oi[c])!==-1 && rimePhrase==="o" && mot[r]==="i"){
      rimePhrase = "a"
      verifComplexe=true;
    }
  }
}

if (rimePhrase === "i" && verifComplexe === false){
  for (c=0; c<rimeComplexe[2].in.length; c++) {
    if (mot.indexOf(rimeComplexe[2].in[c])!==-1  && mot[mot.length-1]!=="'"){
      rimePhrase = "in"
      verifComplexe=true;
    }
  }
}

if (rimePhrase === "e" && verifComplexe === false){
  for (c=0; c<rimeComplexe[3].ien.length; c++) {
    if (mot.indexOf(rimeComplexe[3].ien[c])!==-1 && mot[r]==="e"  && mot[mot.length-1]!=="'" && mot[r-1]==="i"){
      rimePhrase = "in"
      verifComplexe=true;
    }
  }
  for (c=0; c<rimeComplexe[6].au.length; c++) {
    if (mot.indexOf(rimeComplexe[6].au[c])!==-1 && rimePhrase=="e"){
      rimePhrase = "o"
      verifComplexe=true;
    }
  }
  for (c=0; c<rimeComplexe[5].et.length; c++) {
    if (mot.indexOf(rimeComplexe[5].et[c])!==-1 && rimePhrase==="e"){
      rimePhrase = "é"
      verifComplexe=true;
    }
  }
  for (c=0; c<rimeComplexe[1].en.length; c++) {
    if (mot.indexOf(rimeComplexe[1].en[c])!==-1 && rimePhrase==="e"  && mot[mot.length-1]!=="'"){
      rimePhrase = "en"
      verifComplexe=true;
    }
  }
  for (c=0; c<rimeComplexe[10].ain.length; c++) {
    if (mot.indexOf(rimeComplexe[10].ain[c])!==-1 && rimePhrase==="e" && mot[r]==="i"  && mot[mot.length-1]!=="'"){
      rimePhrase = "in"
      verifComplexe=true;
    }
  }
  for (c=0; c<rimeComplexe[4].ai.length; c++) {
    if (mot.indexOf(rimeComplexe[4].ai[c])!==-1 && rimePhrase==="e" && mot[r]==="i"){
      rimePhrase = "è"
      verifComplexe=true;
    }
  }
  for (c=0;c<rimeComplexe[11].il.length;c++){
    if (mot.indexOf(rimeComplexe[11].il[c])!==-1 && rimePhrase==="e" && mot[r]==="i" && rimePhrase!=="è"){
      rimePhrase = "eil"
      verifComplexe = true;
    }
  }
}

if (rimePhrase==="u" && verifComplexe===false){
  for (c=0;c<rimeComplexe[2].in.length;c++){
    if (mot.indexOf(rimeComplexe[2].un[c])!==-1 && mot[mot.length-1]!=="'"){
      rimePhrase="in"
      verifComplexe=true;
    }
  }
}

return rimePhrase;
}

module.exports = rimes;
