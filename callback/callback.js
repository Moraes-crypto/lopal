function callback(){
    const minhaFunc = (num1, num2, operacao ) => {
       return operacao(num1, num2);
    }
    //operacao = (a, b) => {a + b}


    console.log(minhaFunc(num1 = 1,
        num2 = 8,
        operacao = (a, b) => {return "Vai corinthians " + a + b}));
}
callback();