/**
 * PROJETO: GERADOR DE FICHAS DE ANIMAIS DE ESTIMAÇÃO
 * JavaScript Polido e Corrigido para Execução Estrita
 */

// 1. SELEÇÃO DE ELEMENTOS DO DOM
const numeroTexto = document.querySelector('.parametro-senha__texto');
const campoResultado = document.querySelector('#campo-senha');
const botoesControle = document.querySelectorAll('.parametro-senha__botao');
const checkboxes = document.querySelectorAll('.checkbox');
const barraIndicadora = document.querySelector('.forca');
const btnGerar = document.querySelector('#btn-gerar');

// 2. CONFIGURAÇÕES E ESTADO INICIAL
let tamanhoNomeAlvo = 6;
if (numeroTexto) numeroTexto.textContent = tamanhoNomeAlvo;

// 3. BANCO DE DADOS DE NOMES E SÍLABAS
const nomesMachos = ["Bob", "Max", "Thor", "Luke", "Chico", "Fred", "Pudim", "Amendoim", "Biscoito", "Zeus", "Odin", "Hulk", "Simba", "Apolo"];
const nomesFemeas = ["Luna", "Mel", "Nina", "Mia", "Pipoca", "Cacau", "Paçoca", "Nutella", "Athena", "Preta", "Amora", "Frida"];
const silabasProcedurais = ["ba", "be", "bi", "bo", "bu", "pa", "pe", "pi", "po", "pu", "ma", "me", "mi", "mo", "mu", "la", "le", "li", "lo", "lu"];

// 4. ATRIBUIÇÃO DOS EVENTOS DE CLIQUE DOS BOTÕES DE TAMANHO
if (botoesControle.length >= 2) {
    botoesControle[0].onclick = diminuirTamanho;
    botoesControle[1].onclick = aumentarTamanho;
}

if (btnGerar) {
    btnGerar.onclick = gerarFichaPet;
}

function diminuirTamanho() {
    if (tamanhoNomeAlvo > 3) {
        tamanhoNomeAlvo--;
    }
    if (numeroTexto) numeroTexto.textContent = tamanhoNomeAlvo;
    gerarFichaPet();
}

function aumentarTamanho() {
    if (tamanhoNomeAlvo < 12) {
        tamanhoNomeAlvo++;
    }
    if (numeroTexto) numeroTexto.textContent = tamanhoNomeAlvo;
    gerarFichaPet();
}

// 5. MAPEAMENTO DINÂMICO DOS CHECKBOXES (Sua estrutura original em loop 'for')
for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].onclick = gerarFichaPet;
}

// Helper para ler qual caixinha está marcada dentro de cada grupo
function obterOpcaoSelecionada(indices, padrao) {
    for (let i = 0; i < indices.length; i++) {
        let idx = indices[i];
        if (checkboxes[idx] && checkboxes[idx].checked) {
            return checkboxes[idx].nextElementSibling.textContent;
        }
    }
    return padrao;
}

// 6. FUNÇÃO PRINCIPAL: GERADOR DE FICHAS COMPLETO
function gerarFichaPet() {
    if (!campoResultado || checkboxes.length === 0) return;

    // Mapeamento correto dos índices conforme o HTML:
    // Índices [0, 1]     -> Tipo (Cachorro, Gato)
    // Índices [2, 3, 4]  -> Porte (P, M, G)
    // Índices [5, 6, 7]  -> Cor (Preto, Branco, Caramelo)
    // Índices [8, 9]     -> Gênero (Macho, Fêmea)
    
    const tipoAnimal = obterOpcaoSelecionada([0, 1], "Cachorro");
    const porteAnimal = obterOpcaoSelecionada([2, 3, 4], "Pequeno (P)");
    const corPelagem = obterOpcaoSelecionada([5, 6, 7], "Caramelo");
    const generoAnimal = obterOpcaoSelecionada([8, 9], "Macho");

    // Extrai apenas a letra do porte: "Pequeno (P)" -> "P"
    let letraPorte = "P";
    if (porteAnimal.includes('(')) {
        letraPorte = porteAnimal.split('(')[1].replace(')', '');
    }

    // Seleção do nome baseado no gênero escolhido
    let listaNomesParaSortear = generoAnimal === "Macho" ? nomesMachos : nomesFemeas;
    let nomeSorteado = listaNomesParaSortear[Math.floor(Math.random() * listaNomesParaSortear.length)];

    // Ajuste estrito do tamanho do nome baseado no contador (+/-)
    let nomeFinal = nomeSorteado;
    if (nomeFinal.length > tamanhoNomeAlvo) {
        nomeFinal = nomeFinal.substring(0, tamanhoNomeAlvo);
    } else {
        while (nomeFinal.length < tamanhoNomeAlvo) {
            const silabaExtra = silabasProcedurais[Math.floor(Math.random() * silabasProcedurais.length)];
            nomeFinal += silabaExtra;
        }
        nomeFinal = nomeFinal.substring(0, tamanhoNomeAlvo);
    }

    // Capitalização correta da primeira letra maiúscula
    nomeFinal = nomeFinal.charAt(0).toUpperCase() + nomeFinal.slice(1).toLowerCase();

    // Montagem final da ficha
    const fichaCompleta = `${nomeFinal} (${tipoAnimal}, ${letraPorte}, ${corPelagem}, ${generoAnimal})`;

    // Exibe no visor principal do site
    campoResultado.value = fichaCompleta;

    // Atualiza a barra de força/complexidade
    classificarFicha();
}

// 7. CLASSIFICADOR DE COMPLEXIDADE DA BARRA VISUAL
function classificarFicha() {
    if (!barraIndicadora) return;
    
    let totalMarcados = 0;
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) totalMarcados++;
    }

    barraIndicadora.className = "forca"; // Reseta classes

    if (totalMarcados <= 2) {
        barraIndicadora.classList.add('fraca');
    } else if (totalMarcados <= 4) {
        barraIndicadora.classList.add('media');
    } else {
        barraIndicadora.classList.add('forte');
    }
}

// Inicializa o gerador assim que a página carregar
window.onload = gerarFichaPet;
