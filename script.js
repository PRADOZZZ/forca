// Palavras possíveis — o grupo pode alterar!
const palavras = ["luke", "palpatine", "stormtrooper", "ashoka", "rey", "yoda", "obiWan", "leia", "anakin"];
const palavra = palavras[Math.floor(Math.random() * palavras.length)];

let resposta = Array(palavra.length).fill("_");
let tentativas = 12;

const palavraEl = document.getElementById("palavra");
const tentativasEl = document.getElementById("tentativas");
const mensagemEl = document.getElementById("mensagem");
const letrasEl = document.getElementById("letras");

palavraEl.textContent = resposta.join(" ");

// Cria botões das letras
const alfabeto = "abcdefghijklmnopqrstuvwxyz".split("");
alfabeto.forEach(letra => {
  const btn = document.createElement("button");
  btn.textContent = letra;
  btn.onclick = () => verificarLetra(letra, btn);
  letrasEl.appendChild(btn);
});

function verificarLetra(letra, btn) {
  btn.disabled = true;
  if (palavra.includes(letra)) {
    for (let i = 0; i < palavra.length; i++) {
      if (palavra[i] === letra) {
        resposta[i] = letra;
      }
    }
    palavraEl.textContent = resposta.join(" ");
  } else {
    tentativas--;
    tentativasEl.textContent = tentativas;
  }

  verificarFim();
}

function verificarFim() {
  if (!resposta.includes("_")) {
    mensagemEl.textContent = "👾VOCÊ DERROTOU O IMPÉRIO👾";
    desativarBotoes();
  } else if (tentativas === 0) {
    mensagemEl.textContent = '🌌 O LADO SOMBRIO VENCEU! A palavra era "${palavra}"';
    desativarBotoes();
  }
}

function desativarBotoes() {
  const botoes = document.querySelectorAll("#letras button");
  botoes.forEach(btn => btn.disabled = true);
}