"use strict"

const listeD = function (membre){
  var i;
  var html;

  html = "";

  for(i=0;i<membre.length;i++){
    html += `<option value="${i}">${membre[i].pseudo}</option>`;
  }
  console.log(html);
  return html;
}

module.exports = listeD;
