// ===================== CONFIGURAÇÃO DO JOGO =====================
const palavras = {
    personagens: ["luke", "vader", "chewbacca", "palpatine", "yoda", "leia", "anakin", "obiwan", "rey"],
    planetas: ["tatooine", "naboo", "endor", "hoth", "coruscant"],
    naves: ["falcon", "deathstar", "tie", "xwing", "starcruiser"]
};

// Escolher categoria aleatória
const categorias = Object.keys(palavras);
const categoriaEscolhida = categorias[Math.floor(Math.random() * categorias.length)];
const listaPalavras = palavras[categoriaEscolhida];

// Selecionar palavra aleatória
const palavra = listaPalavras[Math.floor(Math.random() * listaPalavras.length)];

let resposta = Array(palavra.length).fill("_");
let tentativas = 12;
let usadas = [];

const palavraEl = document.getElementById("palavra");
const tentativasEl = document.getElementById("tentativas");
const mensagemEl = document.getElementById("mensagem");
const letrasEl = document.getElementById("letras");

// Inicializar elementos
palavraEl.textContent = resposta.join(" ");
tentativasEl.textContent = tentativas;
mensagemEl.textContent = `Categoria: ${categoriaEscolhida.toUpperCase()}`;

// ===================== CRIAR TECLADO =====================

const alfabeto = "abcdefghijklmnopqrstuvwxyz".split("");

alfabeto.forEach(letra => {
    const btn = document.createElement("button");
    btn.textContent = letra;
    btn.dataset.letra = letra;
    letrasEl.appendChild(btn);
});

// Delegação de evento para teclas
letrasEl.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON" && !e.target.disabled) {
        verificarLetra(e.target.dataset.letra, e.target);
    }
});

// ===================== FUNÇÕES DE UI =====================
function atualizarPalavra() {
    palavraEl.textContent = resposta.join(" ");
}

function atualizarTentativas() {
    tentativasEl.textContent = tentativas;
}

function mostrarMensagem(texto) {
    mensagemEl.textContent = texto;
}

// ===================== LÓGICA DO JOGO =====================
function verificarLetra(letra, btn) {
    if (usadas.includes(letra)) return; // evita duplicados
    usadas.push(letra);
    btn.disabled = true;

    if (palavra.includes(letra)) {
        btn.style.backgroundColor = "#00ffcc"; // verde holográfico
        btn.style.color = "#ff3300";
        for (let i = 0; i < palavra.length; i++) {
            if (palavra[i] === letra) resposta[i] = letra;
        }
        atualizarPalavra();
        tocarSom("acerto");
    } else {
        btn.style.backgroundColor = "#ff3300"; // vermelho holográfico
        tentativas--;
        atualizarTentativas();
        tocarSom("erro");
    }

    verificarFim();
}

function verificarFim() {
    if (!resposta.includes("_")) {
        mostrarMensagem("👾 VOCÊ DERROTOU O IMPÉRIO! 👾");
        desativarBotoes();
        tocarSom("vitoria");
    } else if (tentativas === 0) {
        mostrarMensagem(`🌌 LADO SOMBRIO VENCEU! Palavra: "${palavra.toUpperCase()}"`);
        desativarBotoes();
        tocarSom("derrota");
    }
}

function desativarBotoes() {
    const botoes = document.querySelectorAll("#letras button");
    botoes.forEach(btn => btn.disabled = true);
}

// ===================== SONS DO JOGO =====================
function tocarSom(tipo) {
    let audio;
    switch (tipo) {
        case "acerto":
            audio = new Audio("sons/acerto.mp3");
            break;
        case "erro":
            audio = new Audio("sons/erro.mp3");
            break;
        case "vitoria":
            audio = new Audio("sons/vitoria.mp3");
            break;
        case "derrota":
            audio = new Audio("sons/derrota.mp3");
            break;
    }
    if (audio) audio.play();
}

function atualizarPagina() {
    location.reload();
}
