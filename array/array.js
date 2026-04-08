function arranjo(){
    let turma = ["alessadra", "Alexandre", "Allan", "Ana"];
    console.log(turma)
    console.log(turma[0]);
    console.log(turma[1]);
    console.log(turma[2]);
    console.log(turma[3]);
    
    const frutas = [];
    
    frutas[0] = "Banana";
    frutas[1] = "Lanranja";
    frutas[2] = "Melancia";

    console.log(frutas);

    for( i = 0; i < frutas.length; i++){
        console.log(i + " " + frutas[i]);
    }

     for( i = 0; i < turma.length; i++){
        console.log(i + " " + turma[i]);
    }

}
arranjo();