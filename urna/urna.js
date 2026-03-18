function urna(){
    let candidato_a = 0;
    let candidato_b = 0;
    let brancos = 0;
    let nulos = 0;
    let total = 0;
    let porcent_cand_a;
    let porcent_cand_b;
    let porcent_brancos;
    let porcent_nulos;
    let voto;

    do{
        voto = prompt("Escolha seu candidato ou tecle zero para encerrar\n" +
            " 1 -> Candidato A\n" + 
            " 2 -> Candidato B\n" +
            " 3 -> Branco\n" +
            "\nQualquer número diferente de 0, 1, 2 e 3 anulará seu voto\n" +
            "Digite seu voto: ");

        if( voto == "0"){
            alert("Votação encerrada");
        } else if ( voto == "1"){
            ++candidato_a;
        } else if( voto == "2"){
            ++candidato_b;
        } else if( voto == "3"){
            ++brancos;
        } else {
            ++nulos;
        }

    }while( voto != "0");

    total = candidato_a + candidato_b + brancos + nulos;

    if ( total > 0 ){
        porcent_cand_a = (candidato_a * 100) / total;
        porcent_cand_b = (candidato_b * 100) / total;
        porcent_brancos = (brancos * 100) / total;
        porcent_nulos = (nulos * 100) / total;

        alert("Total de votos: " + total+ "\n" +
            "Candidato A: " + candidato_a + "votos(s). - " + 
                porcent_cand_a + "% do total.\n" +
            "Candidato B: " + candidato_b + "votos(s). - " + 
                porcent_cand_b + "% do total.\n" +
            "Brancos: " + brancos + "votos(s). - " + 
                porcent_brancos + "% do total.\n" +
            "Nulos: " + nulos + "votos(s). - " + 
                porcent_nulos + "% do total.\n"
        );

    }
}