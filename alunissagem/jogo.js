//Jogo da Alunissagem
//Autor:Kauã Moraes
//08/04/2026
//Versão 0.1.0

/** @type {HTMLCanvasElement} */

let canvas = document.querySelector("#jogo");
let contexto = canvas.getContext("2d");
let moduloLunar = {
    posicao: {
        x: 700,
        y: 100
    },
    angulo: Math.PI/2,
    largura: 20,
    altura: 20,
    cor: "lightgray",
    velocidade: {
        x: -2,
        y: 0
    },
    motorLigado: false,
    combustivel: 1000,
    rotacaoAntiHorario: false,
    rotacaoHorario: false
}

function mostrarVelocidadeVertical(){
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "left";
    contexto.textBaseline = "middle";
    contexto.fillStyle = "lightgray";
    contexto.fillText(
        `Velocidade Vertical: ${(10 * moduloLunar.velocidade.y ).toFixed(2)}`,
        50,
        40
    );
}

function mostrarVelocidadeHorizontal(){
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "left";
    contexto.textBaseline = "middle";
    contexto.fillStyle = "lightgray";
    contexto.fillText(
        `Velocidade Horizontal: ${(10 * moduloLunar.velocidade.x ).toFixed(2)}`,
        50,
        60
    );
}

function mostrarCombustivel(){
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "left";
    contexto.textBaseline = "middle";
    contexto.fillStyle = "lightgray";
    contexto.fillText(
        `Combustível:  ${(moduloLunar.combustivel / 10).toFixed(0)} %`,
        50,
        80
    );
}

function desenharFundo(){
//desenhar fundo da tela
    contexto.clearRect(0, 0, canvas.width, canvas.height);
    contexto.save();
    contexto.fillStyle = "#000";
    contexto.fillRect(0,0, canvas.width, canvas.height);
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

    if(moduloLunar.motorLigado){
        desenharChama();
        moduloLunar.combustivel--;
        if(moduloLunar.combustivel <= 0){
            moduloLunar.motorLigado = false;
        }
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
    contexto.lineTo(0, moduloLunar.altura * 0.5 + Math.random() * 35);
    contexto.closePath();//desenha automaticamente a linha do vértice à origem
    contexto.fillStyle = "orange";
    contexto.fill();
}

function desenhar(){
    
    atracaoGravitacional();
    desenharFundo();
    desenharModuloLunar();
    mostrarVelocidadeVertical();
    mostrarVelocidadeHorizontal();
    mostrarCombustivel();

    if(moduloLunar.posicao.y > canvas.height - moduloLunar.altura * 0.5){
        if(moduloLunar.velocidade.y <= 0.5 &&
            Math.abs(moduloLunar.velocidade.x) <= 0.5 &&
            Math.abs(moduloLunar.angulo) <= 5){
            mostrarResultado("Você aterrissou com sucesso!", cor = "green");
        }else {
            mostrarResultado("Você explodiu a nave, perdeu", cor = "red");
        }
        return
    }
    requestAnimationFrame(desenhar);
}

function mostrarResultado(mensagem, cor){
    contexto.font = "bold 40px Calibri";
    contexto.textAlign = "center";
    contexto.textBaseline = "middle";
    contexto.fillStyle = cor;
    contexto.fillText(mensagem, canvas.width * 0.5, canvas.height * 0.5)
}

document.addEventListener('keydown', teclaPressionada);

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

const gravidade = 0.01;
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