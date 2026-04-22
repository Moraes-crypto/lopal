//Jogo da Alunissagem
//Autor:Kauã Moraes
//08/04/2026
//Versão 0.1.0

/** @type {HTMLCanvasElement} */

//Modelo
let canvas = document.querySelector("#jogo");
let contexto = canvas.getContext("2d");
const gravidade = 0.01;
let lancamento = (Math.round(Math.random()) == 0);//Variável booleana pseudoaleatória
let estrelas = [];
for (let i = 0; i < 500; i++){
    estrelas[i] = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        raio: Math.sqrt(2 * Math.random()),
        brilho: 1.0,
        apagando: true,
        cintilacao: 0.05 * Math.random()
    }
}

let moduloLunar = {
    posicao: {
        x: lancamento ? 100 : 700,
        y: 100
    },
    angulo: lancamento ? -Math.PI/2 : Math.PI/2,
    largura: 20,
    altura: 40,
    cor: "gray",
    velocidade: {
        x: lancamento ? 2 : -2,
        y: 0
    },
    motorLigado: false,
    combustivel: 1000,
    rotacaoAntiHorario: false,
    rotacaoHorario: false
}
//Visualização
function mostrarIndicador(mensagem, x, y){
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "left";
    contexto.textBaseline = "middle";
    contexto.fillStyle = "lightgray";
    contexto.fillText(
        mensagem,
        x,
        y
    );
}

function mostrarAngulo(){
    mostrarIndicador(
        `Ângulo: ${(moduloLunar.angulo * 180 / Math.PI).toFixed(0)}°`,
        400,
        40
    );
}

function mostrarAltitude(){
    mostrarIndicador(
        `Altitude: ${(canvas.height - moduloLunar.posicao.y - 0.5 * moduloLunar.altura).toFixed(0)}`,
        400,
        60
    );
}

function mostrarVelocidadeVertical(){
    mostrarIndicador(
        `Velocidade Vertical: ${(10 * moduloLunar.velocidade.y ).toFixed(2)}`,
        50,
        40
    );
}

function mostrarVelocidadeHorizontal(){
    mostrarIndicador(
        `Velocidade Horizontal: ${(10 * moduloLunar.velocidade.x ).toFixed(2)}`,
        50,
        60
    );
}

function mostrarCombustivel(){
    mostrarIndicador(
        `Combustível:  ${(moduloLunar.combustivel / 10).toFixed(0)} %`,
        50,
        80
    );
}

function mostrarResultado(mensagem, cor){
    contexto.font = "bold 40px Calibri";
    contexto.textAlign = "center";
    contexto.textBaseline = "middle";
    contexto.fillStyle = cor;
    contexto.fillText(mensagem, canvas.width * 0.5, canvas.height * 0.5)
}

function desenharFundo(){
//desenhar fundo da tela
    contexto.clearRect(0, 0, canvas.width, canvas.height);
    contexto.save();
    contexto.fillStyle = "#000";
    contexto.fillRect(0,0, canvas.width, canvas.height);
    contexto.restore();
}

function desenharEstrelas(){
    //estrelas cintilantes
    contexto.clearRect(0, 0, canvas.width, canvas.height);
    contexto.save();
    contexto.fillStyle = "#000";
    contexto.fillRect(0,0, canvas.width, canvas.height);
    for (let i = 0; i < 500; i++){
        let estrela = estrelas[i];
        contexto.beginPath();
        contexto.arc(estrela.x, estrela.y, estrela.raio, 0, 2 * Math.PI);
        contexto.closePath();
        contexto.fillStyle = `rgba(255, 255, 255, ${estrela.brilho})`;
        contexto.fill();
        if(estrela.apagando){
            estrela.brilho -= estrela.cintilacao;
            if(estrela.brilho <= 0.1){
                estrela.apagando = false;
            }
        } else {
            estrela.brilho += estrela.cintilacao;
            if(estrela.brilho > 0.95){
                estrelas.apagando = true;
            }
        }
    } 
    contexto.restore();
}

function desenharModuloLunar(){
//desenhar módulo lunar
    contexto.save();
    contexto.beginPath();
    //move a origem das coordenadas para o centro do módulo lunar
    contexto.translate(moduloLunar.posicao.x, moduloLunar.posicao.y);
    contexto.rotate(moduloLunar.angulo);
    contexto.rect(moduloLunar.largura * -0.5, moduloLunar.altura * -0.5,
        moduloLunar.largura, moduloLunar.altura);
    contexto.fillStyle = moduloLunar.cor;
    contexto.fill();
    contexto.closePath();
    //Triângulo Foguete
    contexto.beginPath();
    contexto.moveTo(moduloLunar.largura * 0.5, moduloLunar.altura * -0.4);
    contexto.lineTo(moduloLunar.largura * -0.5, moduloLunar.altura * -0.4)
        contexto.lineTo(0, moduloLunar.altura *-1);
    contexto.closePath();
    contexto.fillStyle = 'white';
    contexto.fill();
    //janela da nave
    contexto.beginPath();
        contexto.arc(0, moduloLunar.altura * -0.1, moduloLunar.largura *
             0.2, 0, 2 * Math.PI);
        contexto.closePath();
        contexto.fillStyle = 'lightblue';
        contexto.fill();
    //asa direita
    contexto.beginPath();
        contexto.moveTo(moduloLunar.largura * 0.5, moduloLunar.altura * 0.1);
        contexto.lineTo(moduloLunar.largura * 0.8, moduloLunar.altura * 0.3);
        contexto.lineTo(moduloLunar.largura * 0.5, moduloLunar.altura * 0.3);
        contexto.closePath();
        contexto.fillStyle = 'gray';
        contexto.fill();
    //asa esquerda
    contexto.beginPath();
        contexto.moveTo(moduloLunar.largura * -0.5, moduloLunar.altura * 0.1);
        contexto.lineTo(moduloLunar.largura * -0.8, moduloLunar.altura * 0.3);
        contexto.lineTo(moduloLunar.largura * -0.5, moduloLunar.altura * 0.3);
        contexto.closePath();
        contexto.fillStyle = 'gray';
        contexto.fill();
    //Base Foguete
    contexto.beginPath();
        contexto.rect(moduloLunar.largura * -0.5, moduloLunar.altura * 0.38,
            moduloLunar.largura * 1, moduloLunar.altura * 0.1);
        contexto.closePath();
        contexto.fillStyle = 'red'
        contexto.fill();
    
    if(moduloLunar.motorLigado){
        desenharChama();
        consumirCombustivel();
    }
    
    contexto.restore();
}

function desenharChama(){
    //desenhar chama
    contexto.beginPath();
    //define o ponto de origem da chama no canto inferior esquerdo do módulo
    contexto.moveTo(moduloLunar.largura * -0.5, moduloLunar.altura * 0.5);
    //desenha uma linha até o ponto inferior direito do módulo
    contexto.lineTo(moduloLunar.largura * 0.5, moduloLunar.altura * 0.5);
    //determinar o tamanho da chama
    //denha uma linha de posição y aleatória entre a base do módulo 35 pixels 
    contexto.lineTo(0, moduloLunar.altura * 0.5 + Math.random() * 20);
    contexto.closePath();//desenha automaticamente a linha do vértice à origem
    contexto.fillStyle = "orange";
    contexto.fill();
}


function desenhar(){
    
    atracaoGravitacional();
    desenharEstrelas();
    desenharModuloLunar();
    mostrarVelocidadeVertical();
    mostrarVelocidadeHorizontal();
    mostrarCombustivel();
    mostrarAltitude();
    mostrarAngulo();

    if(encerrarjogo()){
        return;
    }
    requestAnimationFrame(desenhar);
}
//Controle
function encerrarjogo(){ //piso da lua
    if(moduloLunar.posicao.y > canvas.height - moduloLunar.altura * 0.5){
        if(moduloLunar.velocidade.y <= 0.5 &&
            Math.abs(moduloLunar.velocidade.x) <= 0.5 &&
            Math.abs(moduloLunar.angulo) <= 5){
            mostrarResultado("Você aterrissou com sucesso!", cor = "green");
        }else {
            mostrarResultado("Você explodiu a nave, perdeu", cor = "red");
        }
        return true;
    }
    return false;
}
document.addEventListener('keydown', teclaPressionada);

//reiniciar o jogo
document.addEventListener('keydown', function(evento){
    if(evento.keyCode == 32){
        location.reload();
    }
});

function teclaPressionada(evento){
    if(evento.keyCode == 87 && moduloLunar.combustivel > 0){
        moduloLunar.motorLigado = true;
    } else if(evento.keyCode == 65){
        moduloLunar.rotacaoHorario = true;
    } else if(evento.keyCode == 68){
        moduloLunar.rotacaoAntiHorario = true;
    }
}

document.addEventListener('keyup', teclaSolta);

function teclaSolta(evento){
    if(evento.keyCode == 87){
        moduloLunar.motorLigado = false;
    } else if(evento.keyCode == 65){
        moduloLunar.rotacaoHorario = false;
    } else if(evento.keyCode == 68){
        moduloLunar.rotacaoAntiHorario = false;
    }
}

function consumirCombustivel(){
    moduloLunar.combustivel--;
        if(moduloLunar.combustivel <= 0){
            moduloLunar.motorLigado = false;
        }
}

function atracaoGravitacional(){
    //Atração gravitacional
    moduloLunar.posicao.x += moduloLunar.velocidade.x;
    moduloLunar.posicao.y += moduloLunar.velocidade.y;
    moduloLunar.velocidade.y += gravidade;

    if(moduloLunar.rotacaoAntiHorario){
        moduloLunar.angulo += Math.PI/180;
    }else if (moduloLunar.rotacaoHorario){
        moduloLunar.angulo -= Math.PI/180;
    }

    if(moduloLunar.motorLigado){
        moduloLunar.velocidade.y -= 0.0115 * Math.cos(moduloLunar.angulo);
        moduloLunar.velocidade.x += 0.0115 * Math.sin(moduloLunar.angulo);
    }
}

desenhar();