//Proyecto calculadora Next_U Jonathan Romero
var calculadora = {
  pnValor1: 0,
  pnValor2: 0,
  pnResult: 0,
  pcOperac: "",
  plPunto: false,
  //funciones
  suma: function(){return this.pnValor1 + this.pnValor2},
  rest: function(){return this.pnValor1 - this.pnValor2},
  mult: function(){return this.pnValor1 * this.pnValor2},
  divi: function(){return this.pnValor1 / this.pnValor2},
  asig: function (p_nValor){
    if (this.pnValor1 === 0) {
      this.pnValor1 = parseFloat(p_nValor);
     } else {
      this.pnValor2 = parseFloat(p_nValor);
    }
  },
    //Operacion
  calc : function() {
    if (this.pcOperac == "mas") {
      this.pnResult = this.suma();
    }else if (this.pcOperac == "menos") {
      this.pnResult = this.rest();
    }else if (this.pcOperac == "por") {
      this.pnResult = this.mult();
    }else if (this.pcOperac == "dividido") {
      this.pnResult = this.divi();
    }
    this.pnValor1 = 0;
    this.pnValor2 = 0;
  }
};

var paTeclas = document.getElementsByClassName('tecla');

for (var i = 0; i < paTeclas.length; i+=1) {
  paTeclas[i].onmousedown = presionaBoton;
  paTeclas[i].onclick = presionaClick;
  paTeclas[i].onmouseup = sueltaBoton;
}


function presionaBoton(e){
  e.target.style.opacity = 0.5;
}

function sueltaBoton(e){
  e.target.style.opacity = 1.0;
}


function presionaClick(e){
  var pantalla = document.getElementById('display').innerHTML;
  if (pantalla == "0" && e.target.id != "punto" && e.target.id != "sign"){
    pantalla = "";
  }

  if (e.target.id != "raiz"){

    if (e.target.id == "on"){
      pantalla = "0";
      calculadora.plPunto = false;

    } else if (e.target.id == "mas" || e.target.id == "menos" || e.target.id == "por" || e.target.id == "dividido"){
        //asigna valor
        calculadora.asig(pantalla);

        if (calculadora.pnValor2 != 0){
          calculadora.calc();
          calculadora.pnValor1 = calculadora.pnResult;
          calculadora.pnValor2 = 0;
        }
        calculadora.pcOperac = e.target.id;
        calculadora.plPunto = false;
        pantalla = "";

    } else if (e.target.id == "igual"){
        if (pantalla == ""){
          pantalla = "0";
        }
        calculadora.asig(pantalla);
        calculadora.calc();
        pantalla = calculadora.pnResult.toString().substr(0, 8);

    } else if (pantalla.length < 8){

      switch (e.target.id) {
        case "punto":
          if (!calculadora.plPunto){
            pantalla = pantalla + ".";
            calculadora.plPunto = true;
          }
          break;
        case "sign":
          if (pantalla != "0"){
            if (pantalla.substr(0,1) == "-"){
              pantalla = pantalla.substr(1);
            }else{
              pantalla = "-" + pantalla;
            }
          }
          break;
        default:
          pantalla = pantalla + e.target.id;
      }
    }
  }
  //Resultado Final
  document.getElementById('display').innerHTML = pantalla;
}

