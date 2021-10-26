let tempo = new Date(0, 0, 0, 0, 0, 0);
let tempoDescanso = new Date(0, 0, 0, 0, 0, 0);
let loop;
let loopDescanso;
let verificador = "loopProdutividadePause";
let telaMenorDescanso = document.getElementById("tempoDescansar");
let telaMenorProdutividade = document.getElementById("tempoProdutividade");
const todosOsBotoes = function () {
    const objeto = {
        "aumenta": validaModificarUm,
        "diminui": validaModificarUm,
        "start": startPause,
        "reset": reset,
        "diminuiDescanso": validaModificarUm,
        "aumentaDescanso": validaModificarUm
    }
    for (const key in objeto) {
        const botao = document.getElementById(key);
        botao.onclick = function () {
            objeto[key](botao, telaMenorDescanso, telaMenorProdutividade);
        }
    }
}
const tempoEmMilisegundos = function (time) {
    return time.getMinutes() * 60000 + time.getSeconds() * 1000;
}
const validaModificarUm = function (botao, telaMenorDescanso, telaMenorProdutividade) {
    if (botao.id === "aumenta") {
        aumentaUm(telaMenorProdutividade, tempo);
    }
    else if (botao.id === "aumentaDescanso") {
        aumentaUm(telaMenorDescanso, tempoDescanso);
    }
    else if (botao.id === "diminui") {
        diminuiUm(telaMenorProdutividade, tempo);
    }
    else {
        diminuiUm(telaMenorDescanso, tempoDescanso);
    }
}
const diminuiUm = function (tela, time) {
    if (time.getMinutes() === 1 || time.getMinutes() === 0) {
        return;
    }
    else {
        time.setMinutes(time.getMinutes() - 1);
        imprimirTempoTelaMenor(time, tela);
        verificaImpressaoTela(tela, time)
    }
}
const verificaImpressaoTela = function (tela, time) {
    if (tela.id === "tempoProdutividade") {
        if (verificador === "loopProdutividadePause" || verificador === "loopProdutividadeTrue") {
            imprimirTempo(time);
        }
        else {
            return;
        }
    }
    else if (tela.id === "tempoDescansar") {
        if (verificador === "loopDescansoPause") {
            imprimirTempo(time);
        }
    }
}
const aumentaUm = function (tela, time) {
    if (time.getMinutes() === 59) {
        return;
    }
    else {
        time.setMinutes(time.getMinutes() + 1);
        imprimirTempoTelaMenor(time, tela);
        verificaImpressaoTela(tela, time);
    }
}
const startCronometro = function (time) {
    time.setSeconds(time.getSeconds() - 1);
    imprimirTempo(time);
}
const trocarCronometro = function () {
    clearInterval(loop);
    if (verificador === "loopProdutividadeTrue") {
        tempo.setMinutes(tempo.getMinutes() + parseInt(telaMenorProdutividade.innerHTML.substring(0, 2)));
    }
    loopDescanso = setInterval(function () { startCronometro(tempoDescanso) }, 1000);
    setTimeout(loopProdutividade, tempoEmMilisegundos(tempoDescanso));
    verificador = "loopDescansoTrue";
}
const startPause = function (botao, telaMenorDescanso, telaMenorProdutividade) {
    if (telaMenorDescanso.innerHTML === "00:00" || telaMenorProdutividade.innerHTML === "00:00") {
        return;
    }
    else if (verificador === "loopDescansoTrue") {
        verificador = "loopDescansoPause";
        clearInterval(loopDescanso);
        botao.value = "▶";
        return;
    }
    else if (verificador === "loopProdutividadeTrue") {
        verificador = "loopProdutividadePause"
        clearInterval(loop);
        botao.value = "▶";
        return;
    } else if (verificador === "loopDescansoPause") {
        botao.value = "| |";
        verificador === "loopDescansoTrue"
        trocarCronometro(telaMenorProdutividade);
    }
    else {
        botao.value = "| |";
        verificador = "loopProdutividadeTrue";
        loopProdutividade();
    }
}
const loopProdutividade = function () {
    clearInterval(loopDescanso);
    if (verificador === "loopDescansoTrue") {
        tempoDescanso.setMinutes(tempoDescanso.getMinutes() + parseInt(telaMenorDescanso.innerHTML.substring(0, 2)));
    }
    loop = setInterval(function () { startCronometro(tempo) }, 1000);
    setTimeout(trocarCronometro, tempoEmMilisegundos(tempo));
}
const imprimirTempo = function (time) {
    const cronometro = document.getElementById("cronometro");
    if (time.getMinutes() < 10 && time.getSeconds() < 10) {
        cronometro.innerHTML = "0" + time.getMinutes() + ":0" + time.getSeconds();
    }
    else if (time.getSeconds() < 10) {
        cronometro.innerHTML = time.getMinutes() + ":0" + time.getSeconds();
    }
    else if (time.getMinutes() < 10) {
        cronometro.innerHTML = "0" + time.getMinutes() + ":" + time.getSeconds();
    }
    else {
        cronometro.innerHTML = time.getMinutes() + ":" + time.getSeconds();
    }
}
const imprimirTempoTelaMenor = function (time, tela) {
    if (time.getSeconds() > 0) {
        tela.innerHTML = formatarTempo(time);
        return;
    }
    tela.innerHTML = formatarTempo(time);
}
const formatarTempo = function (time) {
    let timeMinutes = time.getSeconds() > 0 ? time.getMinutes() + 1 : time.getMinutes();
    if (timeMinutes < 10) {
        timeMinutes = "0" + timeMinutes;
    }
    return timeMinutes + ":00";
}
const reset = function () {
    clearInterval(loopDescanso);
    clearInterval(loop);
    document.getElementById("cronometro").innerHTML = "00:00"
    tempo = new Date (0,0,0,0,0,0);
    tempoDescanso = new Date (0,0,0,0,0,0);
    telaMenorProdutividade.innerHTML = "00:00";
    telaMenorDescanso.innerHTML = "00:00";
    document.getElementById("start").value = "▶";
}
todosOsBotoes();