function procedimento(){


function inicio(){
    let resultado = calcular();
    mensagem(frase = "O resultado de a² + b² é: " + resultado);
}

function mensagem(frase){
    let linha = "-";
    let i = 0;
    

    do {
        linha = linha + "-"
        i++;
    }while( i < 50 );

    alert( linha + "\n" + frase + "\n" + linha);
}

function calcular (a = 2, b = 2,){
    return a * a + b * b;
}

inicio();

}