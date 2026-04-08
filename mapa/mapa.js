function mapa(){
    const frutas = new Map();

    frutas.set("Maçã", 5);
    frutas.set("Banana", 12);
    frutas.set("Laranja", 10);
    //frutas.set("pera", 4)
    frutas.set("pera", 8)

    let preco = frutas.get("Banana");


    //size é uma propriedade que armazena o tamanho do mapa
    console.log(frutas.size);

    //O método has() retorna verdadeiro ou falso para uma determinada chave
    console.log(frutas.has('banana'));
    frutas.forEach((valor, chave) => console.log (`${chave} = R$${valor},00`));

    //O método keys() retorna uma coleção com as chaves do mapa
    //A estrutura de repetição for of itera sobre os valores de uma coleção
    for (const x of frutas.keys()){
        console.log(x);
    }

    //values() é um método que retorna uma coleção contendo todos valores de um mapa
     for (const x of frutas.values()){
        console.log(x);
    }
}
mapa();