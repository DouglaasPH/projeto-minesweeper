const grade = document.querySelector(".grade");
const bandeirasDisponiveis = document.querySelector(".quantidade-de-bandeira");
const resultado = document.querySelector(".resultado");
const largura = 10;
const bombas = 20;
const vazio = 80;
var quantidadeDeBandeiras = 20;
bandeirasDisponiveis.innerHTML = quantidadeDeBandeiras;
var total = 0;

function criarValidoEBombaParaDivs() {
    const emptyBomba = Array(bombas).fill("bomba");
    const emptyValido = Array(vazio).fill("vazio");
    const embaralhar = emptyValido.concat(emptyBomba);
    var embaralhado = embaralhar.sort(() => Math.random() - 0.5); 
    
    for (let i = 0; i < largura * largura; i++) {
        const quadrado = document.createElement("div");
        quadrado.id = i;
        quadrado.classList.add(embaralhado[i])
        grade.appendChild(quadrado);
    }

    for (let i = 0; i < largura * largura; i++) {
        let quadrado = document.querySelectorAll(".grade > div");
        let acumulador = 0;
        let estaNoSuperior = false;
        let estaNoInferior = false;
        const blocos = { 
            esquerda: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90],
            direita: [9, 19, 29, 39, 49, 59, 69, 79, 89, 99]
        }

        if (i <= 9) estaNoSuperior = true;
        if (i > 89 && i <= 99) estaNoInferior = true;

        if (i !== 99 && !blocos.direita.includes(i)) { 
            if (quadrado[i + 1].classList.contains("bomba")) acumulador++;
        };
        if (i > 0 && !blocos.esquerda.includes(i)) {
            if (quadrado[i - 1].classList.contains("bomba")) acumulador++;
        };
        if (i < 90) {
            if (quadrado[i + 10].classList.contains("bomba")) acumulador++;
        };
        if (i >= 10) {
            if (quadrado[i - 10].classList.contains("bomba")) acumulador++;
        };
        if (i <= 88 && !blocos.esquerda.includes[i] && !blocos.direita.includes[i]) {
            if (quadrado[i + 11].classList.contains("bomba")) acumulador++;
        };
        if (i >= 11 && !blocos.esquerda.includes[i] && !blocos.direita.includes[i]) {
            if (quadrado[i - 11].classList.contains("bomba")) acumulador++;
        };
        if (i <= 90 && !blocos.esquerda.includes[i] && !blocos.direita.includes[i]) {
            if (quadrado[i + 9].classList.contains("bomba")) acumulador++;
        };
        if (i >= 9 && !blocos.esquerda.includes[i] && !blocos.direita.includes[i]) {
            if (quadrado[i - 9].classList.contains("bomba")) acumulador++;
        };

        if (acumulador > 3) {
            quadrado[i].setAttribute("quantidade-de-bombas-ao-redor", 3)
            quadrado[i].setAttribute("visto", false)
        } else {
            quadrado[i].setAttribute("quantidade-de-bombas-ao-redor", acumulador)
            quadrado[i].setAttribute("visto", false)
        }
    }

}

criarValidoEBombaParaDivs();

function divEventos() {
    let quadrado = document.querySelectorAll("div > div")

    for (let i = 0; i < largura * largura; i++) {
        quadrado[i].addEventListener("click", tratamentoParaClickEsquerdo);
        quadrado[i].addEventListener("contextmenu", tratamentoParaClickDireito);
    }
    
    function removerEventoMaisAparecerBombas() {
        for (let i = 0; i < quadrado.length; i++) {
            quadrado[i].removeEventListener("click", tratamentoParaClickEsquerdo)
            quadrado[i].removeEventListener("contextmenu", tratamentoParaClickEsquerdo)
        }

        for (let i = 0; i < quadrado.length; i++) {
            if (quadrado[i].classList.contains("bomba")) {
                quadrado[i].innerHTML = "💣";
            }
        }
    }
    
    function tratamentoParaClickEsquerdo(event) {
        let quadradoAtual = event.target.id;

        //TODO adicionar descobrimento das div's zero

        if (!quadrado[quadradoAtual].classList.contains("bomba") && quadrado[quadradoAtual].getAttribute("quantidade-de-bombas-ao-redor") == 1) {
            quadrado[quadradoAtual].classList.add("um")
            quadrado[quadradoAtual].innerHTML = "1";
            quadrado[quadradoAtual].setAttribute("visto", true)
        } else if (!quadrado[quadradoAtual].classList.contains("bomba") && quadrado[quadradoAtual].getAttribute("quantidade-de-bombas-ao-redor") == 2) {
            quadrado[quadradoAtual].classList.add("dois")
            quadrado[quadradoAtual].innerHTML = "2";
            quadrado[quadradoAtual].setAttribute("visto", true)
        } else if (!quadrado[quadradoAtual].classList.contains("bomba") && quadrado[quadradoAtual].getAttribute("quantidade-de-bombas-ao-redor") == 3) {
            quadrado[quadradoAtual].classList.add("tres")
            quadrado[quadradoAtual].innerHTML = "3";
            quadrado[quadradoAtual].setAttribute("visto", true)
        } else if (quadrado[quadradoAtual].classList.contains("bomba")) {
            removerEventoMaisAparecerBombas();
            
            setTimeout(() => {
                alert("Você perdeu!")
            }, 500);
        }
    }

    function tratamentoParaClickDireito(event) {
        //Cancelar aparecimento de aba | Comportamento padrão de site desativado
        event.preventDefault();
        let quadradoAtual = event.target.id;

        if (!quadrado[quadradoAtual].innerHTML.includes("🚩")) {
            if (quantidadeDeBandeiras > 0) {
                quadrado[quadradoAtual].innerHTML = "🚩";
                quantidadeDeBandeiras = quantidadeDeBandeiras - 1;
                bandeirasDisponiveis.innerHTML = quantidadeDeBandeiras;
            } else return;
        }

        if (quantidadeDeBandeiras === 0) {
            let quantidadeDeVistos = 0;

            for (let i = 0; i < quadrado.length; i++) {
                if (quadrado[i].getAttribute("visto") === "true") {
                    quantidadeDeVistos++;
                }
            }

            //TODO adicionar funcionalidade para se o jogador tiver descoberto as oitenta div's vazias e acertado as vinte div's com bomba

            //TODO adicionar funcionalidade para vitória, caso o jogador acerte todos as bandeiras e, continuidade para caso ele não tenha acertado todas as bandeiras
        }
    }
}

divEventos();