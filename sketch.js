//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 22;
let raio = diametro / 2;

//vecidade da bolinha
let veloXBolinha = 8;
let veloYBolinha = 8;
let raqueteComprimento = 8;
let raqueteAltura = 80;

//Variaveis da raquete
let xRaquete = 15;
let yRaquete = 150;


//variaveis raquete oponente
let xRaqueteOponente = 580;
let yRaqueteOponente = 150;
let movimentoYRaquete2;

let colidiu = false;

//placar do jogo
let pontosUsuario = 0;
let pontosMaquina = 0;

//Sons do jogo 
let raquetada;
let ponto;
let trilha;

function preload() {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3")
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentoRaquete1();
  colisaoraquete2d(xRaquete, yRaquete);
  colisaoraquete2d(xRaqueteOponente, yRaqueteOponente);
  movimentoRaquete2();
  incluiPlacar();
  marcaponto();
  bolinhaNaoFicaPresa()


  function mostraBolinha() {
    circle(xBolinha, yBolinha, diametro);
  }

  function movimentaBolinha() {
    xBolinha += veloXBolinha;
    yBolinha += veloYBolinha;
  }

  function verificaColisaoBorda() {
    if (xBolinha + raio > width || xBolinha - raio < 0) {
      veloXBolinha *= -1;
    }

    if (yBolinha + raio > height || yBolinha - raio < 0) {
      veloYBolinha *= -1;
    }
  }
}

function mostraRaquete(x, y) {
  rect(x, y, raqueteComprimento, raqueteAltura);
}



function movimentoRaquete1() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 9;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 9;
  }
}

function colisaoraquete2d() {
  if (xBolinha - raio < xraquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete) {
    veloXBolinha *= -1;
    raquetada.play();
  }
}


function bolinhaNaoFicaPresa() {
  if (xBolinha - raio < 0) {
    xBolinha = 23
  }
}


function colisaoraquete2d(x, y) {
  colidiu =
    collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu) {
    veloXBolinha *= -1;
    raquetada.play();

  }
}

function movimentoRaquete2() {
  movimentoYRaquete2 = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 76;
  yRaqueteOponente += movimentoYRaquete2
}

function incluiPlacar() {
  stroke(225);
  textAlign(CENTER);
  textSize(16);
  fill(color(225, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(pontosUsuario, 170, 26);
  fill(color(225, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosMaquina, 470, 26);
}

function marcaponto() {
  if (xBolinha > 590) {
    pontosUsuario += 1;
    ponto.play();
  }

  if (xBolinha < 10) {
    pontosMaquina += 1;
    ponto.play();
  }
}