var bandeirasRestantes = document.querySelector(".quantidade-de-bandeira");
var grade = document.querySelector(".grade");
var resultado = document.querySelector(".resultado");
var largura = 10;
var quantidadeDeBombas = 20;
var quantidadeDeBandeiras = 20;
var quadrados = [];
var quadradosComBandeiras = [];
var acabouOJogo = false;
var acertosDeBombas = 0;

function criarQuadrados() {
    bandeirasRestantes.innerHTML = quantidadeDeBandeiras;

    //Misturar ordem de bombas e vazios dos quadrados
    const arrayBomba = Array(quantidadeDeBombas).fill("bomba")
    const arrayVazio = Array(largura * largura - quantidadeDeBombas).fill("vazio");
    let juntarArrays = arrayVazio.concat(arrayBomba);
    const misturarArrays = juntarArrays.sort(() => Math.random() - 0.5);

    for (let i = 0; i < largura * largura; i++) {
        const quadrado = document.createElement("div");
        quadrado.id = i;
        quadrado.classList.add(misturarArrays[i]);
        grade.appendChild(quadrado);
        quadrados.push(quadrado);

        quadrado.addEventListener("click", function () {
            click(quadrado)
        });
        quadrado.addEventListener("contextmenu", function () {
            event.preventDefault(); // cancelar aparecimento de aba
            contextMenu(quadrado);
        })
    }

    for (let i = 0; i < quadrados.length; i++) {
        let total = 0;
        const eaBordaEsquerda = (i % largura === 0);
        const eaBordaDireita = (i % largura === largura - 1);
        if (quadrados[i].classList.contains("vazio")) {
            if (i > 0 && !eaBordaEsquerda && quadrados[i - 1].classList.contains("bomba")) total++
            if (i > 9 && !eaBordaDireita && quadrados[i + 1 - largura].classList.contains("bomba")) total++;
            if (i > 10 && quadrados[i - largura].classList.contains("bomba")) total++;
            if (i > 11 && !eaBordaEsquerda && quadrados[i - largura - 1].classList.contains("bomba")) total++;
            if (i < 99 && !eaBordaDireita && quadrados[i + 1].classList.contains("bomba")) total++;
            if (i < 81 && !eaBordaEsquerda && quadrados[i - 1 + largura].classList.contains("bomba")) total++;
            if (i < 88 && !eaBordaDireita && quadrados[i + 1 + largura].classList.contains("bomba")) total++;
            if (i < 89 && quadrados[i + largura].classList.contains("bomba")) total++;
            quadrados[i].setAttribute("data", total);
        }
    }

}


criarQuadrados();

function click(quadrado) {
    if (acabouOJogo || quadrado.classList.contains("checado") || quadrado.classList.contains("bandeira")) return;

    if (quadrado.classList.contains("bomba")) {
        gameOver(quadrado)
    } else {
        let total = quadrado.getAttribute("data");
        if (total != 0) {
            quadrado.classList.add("checado");
            if (total == 1) quadrado.classList.add("one");
            if (total == 2) quadrado.classList.add("two");
            if (total == 3) quadrado.classList.add("three");
            if (total == 4) quadrado.classList.add("four");
            quadrado.innerHTML = total;
        } else checarQuadrado(quadrado);
        quadrado.classList.add("checado");
    }
}

function contextMenu(quadrado) {
    if (quadrado.classList.contains("bandeira")) {
        quantidadeDeBandeiras++;
        bandeirasRestantes.innerHTML = quantidadeDeBandeiras;
        quadrado.innerHTML = "";
        quadrado.classList.remove("bandeira")
        quadradosComBandeiras.filter(function(quadradoPosicao) {
            if (quadradoPosicao === quadrado) {
                const index = quadradosComBandeiras.indexOf(quadradoPosicao);
                quadradosComBandeiras.splice(index, 1)
            } else return;
        })
    } else {
        if (quantidadeDeBandeiras != 0 && !quadrado.classList.contains("checado")) {
            quantidadeDeBandeiras--;
            bandeirasRestantes.innerHTML = quantidadeDeBandeiras;
            quadrado.innerHTML = "🚩";
            quadrado.classList.add("bandeira");
            quadradosComBandeiras.push(quadrado);
        } else return;
    }

    if (quantidadeDeBandeiras === 0) {
        quadradosComBandeiras.forEach(function (quadrado, indice) {
            if (quadrado.classList.contains("bomba")) {
                acertosDeBombas++;
            } else return;
        });
        if (acertosDeBombas === 20) {
            resultado.innerHTML = "Parabéns, Você ganhou!"
            acabouOJogo = true;
        }
    }
};
    
function checarQuadrado(quadrado) {
    const idAtual = quadrado.id;
    const eaBordaEsquerda = (idAtual % largura === 0);
    const eaBordaDireita = (idAtual % largura === largura - 1);
    setTimeout(() => {
        if (idAtual > 0 && !eaBordaEsquerda) {
            const novoId = parseInt(idAtual) - 1;
            const novoQuadrado = document.getElementById(novoId);
            click(novoQuadrado);
        }
        if (idAtual >= 0 && !eaBordaDireita) {
            const novoId = parseInt(idAtual) + 1;
            const novoQuadrado = document.getElementById(novoId);
            click(novoQuadrado);
        }
        if (idAtual > 10) {
            const novoId = parseInt(idAtual) - largura;
            const novoQuadrado = document.getElementById(novoId);
            click(novoQuadrado);
        }
        if (idAtual > 11 && !eaBordaEsquerda) {
            const novoId = parseInt(idAtual) - 1 - largura;
            const novoQuadrado = document.getElementById(novoId);
            click(novoQuadrado);
        }
        if (idAtual > 81 /*98*/ && !eaBordaDireita) {
            const novoId = parseInt(idAtual) + 1;
            const novoQuadrado = document.getElementById(novoId);
            click(novoQuadrado);
        }
        if (idAtual > 90 && !eaBordaEsquerda) {
            const novoId = parseInt(idAtual) - 1 + largura;
            const novoQuadrado = document.getElementById(novoId);
            click(novoQuadrado);
        }
        if (idAtual > 88 && !eaBordaDireita) {
            const novoId = parseInt(idAtual) + 1 + largura;
            const novoQuadrado = document.getElementById(novoId);
            click(novoQuadrado);
        }
        if (idAtual >= 0 && idAtual < 89) {
            const novoId = parseInt(idAtual) + largura;
            const novoQuadrado = document.getElementById(novoId);
            click(novoQuadrado);
        }
    }, 10);
}
    

function gameOver(quadrado) {
    resultado.innerHTML = "Fim de Jogo!";
    acabouOJogo = true;

    quadrados.forEach(function (quadrado) {
        if (quadrado.classList.contains("bomba")) {
            quadrado.innerHTML = "💣";
            quadrado.classList.remove("bomba");
            quadrado.classList.add("checado");
        }
    })
}