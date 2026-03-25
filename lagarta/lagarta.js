async function lagarta(){
    let lagarta = "(,)(,)(,)(Õ¬Õ)";
    let lagarta_grande = "( , )( , )( , )(0¬0)";
    let espaco = "   ";

    function sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    for( let i = 0; i < 100; i++){
        console.log(i % 2 == 0? lagarta = espaco + lagarta:
             lagarta_grande = espaco + lagarta_grande);
        await sleep (1000);
        console.clear();
    }     
}