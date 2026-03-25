function ternario(){
    let dia;
    let data = new Date().getDay();

    dia = data == 0? "Domingo":
          data == 1? "Segunda-feira":
          data == 2? "Terça-feira":
          data == 3? "Quarta-feira":
          data == 4? "Quinta-feira":
          data == 5? "Sexta-feira":
          "Sábado";

    document.getElementById("demo").innerHTML = "Hoje é " + dia;
}