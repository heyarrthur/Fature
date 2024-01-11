document.addEventListener('DOMContentLoaded', () => {
    // Recuperar dados do localStorage ao carregar a página
    const extratoContainer = document.getElementById('extratoContainer');
    extratoContainer.innerHTML = getLocalStorageData();

    // Calcular e exibir o saldo
    calcularSaldo();
});

function adicionarExtrato() {
    // Obter dados do formulário
    const tipo = document.getElementById('tipo').value;
    const motivo = document.getElementById('motivo').value;
    const valor = parseFloat(document.getElementById('valor').value);

    // Validar se motivo e valor foram preenchidos
    if (!motivo || isNaN(valor)) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    // Criar entrada no extrato
    const extratoContainer = document.getElementById('extratoContainer');
    const novaEntrada = document.createElement('div');
    const dataAtual = new Date().toLocaleDateString();

    if (tipo === 'entrada') {
        novaEntrada.innerHTML = `<span class="entrada">${motivo} + R$ ${valor.toFixed(2)} (${dataAtual})</span>`;
    } else if (tipo === 'saida') {
        novaEntrada.innerHTML = `<span class="saida">${motivo} - R$ ${valor.toFixed(2)} (${dataAtual})</span>`;
    }
    extratoContainer.appendChild(novaEntrada);

    // Atualizar o saldo
    atualizarSaldo(tipo, valor);

    // Limpar campos do formulário
    document.getElementById('tipo').value = 'entrada';
    document.getElementById('motivo').value = '';
    document.getElementById('valor').value = '';

    // Armazenar dados no localStorage
    saveToLocalStorage(extratoContainer.innerHTML);
}

function calcularSaldo() {
    const entradas = document.querySelectorAll('.entrada');
    const saidas = document.querySelectorAll('.saida');

    let totalEntradas = 0;
    let totalSaidas = 0;

    entradas.forEach((entrada) => {
        totalEntradas += extrairValor(entrada.innerHTML);
    });

    saidas.forEach((saida) => {
        totalSaidas += extrairValor(saida.innerHTML);
    });

    const saldo = totalEntradas - totalSaidas;
    document.getElementById('saldo').innerText = saldo.toFixed(2);
}

function atualizarSaldo(tipo, valor) {
    const saldoAtual = parseFloat(document.getElementById('saldo').innerText);

    if (tipo === 'entrada') {
        // Aumentar o saldo
        document.getElementById('saldo').innerText = (saldoAtual + valor).toFixed(2);
    } else if (tipo === 'saida') {
        // Diminuir o saldo
        document.getElementById('saldo').innerText = (saldoAtual - valor).toFixed(2);
    }
}

function extrairValor(texto) {
    // Extrair o valor numérico do texto (considerando o formato R$ X.XX)
    const regex = /\d+\.\d{2}/;
    const match = texto.match(regex);

    return match ? parseFloat(match[0]) : 0;

    // Armazenar dados no localStorage
    saveToLocalStorage(extratoContainer.innerHTML);
}

function saveToLocalStorage(data) {
    localStorage.setItem('extratoData', data);
}

function getLocalStorageData() {
    return localStorage.getItem('extratoData') || '';
}

function limparLocalStorage() {
    // Limpar dados no localStorage
    localStorage.removeItem('extratoData');

    // Limpar o extrato na página
    document.getElementById('extratoContainer').innerHTML = '';

    // Atualizar o saldo
    calcularSaldo();
}

function toggleNavbar() {
    const navbarMenu = document.getElementById('navbarMenu');
    navbarMenu.style.display = (navbarMenu.style.display === 'none' || navbarMenu.style.display === '') ? 'block' : 'none';
}

// CAPTCHA

function confirmarLimpeza() {
    // Pergunta se tem certeza
    const confirmacao = confirm("Tem certeza de que deseja limpar o LocalStorage? Será necessário resolver um captcha para confirmar.");

    // Se o usuário confirmar, exibir o captcha
    if (confirmacao) {
        exibirCaptcha();
    }
}

function exibirCaptcha() {
    // Gerar um captcha simples (letras e números aleatórios)
    const captcha = gerarCaptcha();
    
    // Perguntar ao usuário e verificar a resposta
    const respostaUsuario = prompt(`Digite o seguinte captcha para confirmar a limpeza: ${captcha}`);

    // Verificar a resposta do usuário
    if (respostaUsuario === captcha) {
        // Limpar o localStorage se o captcha estiver correto
        limparLocalStorage();
    } else {
        alert("Captcha incorreto. A limpeza do LocalStorage foi cancelada.");
    }
}

function gerarCaptcha() {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    
    for (let i = 0; i < 5; i++) {
        captcha += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }

    return captcha;
}