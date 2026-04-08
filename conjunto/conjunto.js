function conjunto(){
    const letras = new Set();
    letras.add("a");
    letras.add("b");
    letras.add("c");
    
    console.log(letras.has("g"));

    //delete() é um método para remover um elemento do conjunto
    letras.delete("c");
    console.log(letras);
     
    for (const x of letras.values()){
        console.log(x);
    }

     for (const x of letras.keys()){
        console.log(x);
    }

}
conjunto();