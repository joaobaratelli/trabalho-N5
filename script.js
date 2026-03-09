// Função para gerar CPF aleatório válido
function gerarCPF() {
    let cpf = [];
    
    // Gerar 9 dígitos aleatórios
    for (let i = 0; i < 9; i++) {
        cpf.push(Math.floor(Math.random() * 10));
    }
    
    // Calcular primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += cpf[i] * (10 - i);
    }
    let resto = soma % 11;
    let digito1 = resto < 2 ? 0 : 11 - resto;
    cpf.push(digito1);
    
    // Calcular segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += cpf[i] * (11 - i);
    }
    resto = soma % 11;
    let digito2 = resto < 2 ? 0 : 11 - resto;
    cpf.push(digito2);
    
    // Garantir que não tenha todos dígitos iguais (recriar se necessário)
    if (cpf.every(digito => digito === cpf[0])) {
        return gerarCPF();
    }
    
    // Formatar CPF
    const cpfFormatado = formatarCPF(cpf.join(''));
    document.getElementById('cpfGerado').textContent = cpfFormatado;
    
    return cpfFormatado;
}

// Função para formatar CPF
function formatarCPF(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

// Função para limpar CPF (remover formatação)
function limparCPF(cpf) {
    return cpf.replace(/[^\d]/g, '');
}

// Função para validar CPF
function validarCPF(cpf) {
    // Remover formatação
    cpf = limparCPF(cpf);
    
    // Verificar se tem 11 dígitos
    if (cpf.length !== 11) {
        return false;
    }
    
    // Verificar se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cpf)) {
        return false;
    }
    
    // Validar primeiro dígito
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    let digito1 = (resto === 10 || resto === 11) ? 0 : resto;
    if (digito1 !== parseInt(cpf.charAt(9))) {
        return false;
    }
    
    // Validar segundo dígito
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    let digito2 = (resto === 10 || resto === 11) ? 0 : resto;
    if (digito2 !== parseInt(cpf.charAt(10))) {
        return false;
    }
    
    return true;
}

// Função para copiar CPF
function copiarCPF() {
    const cpf = document.getElementById('cpfGerado').textContent;
    if (cpf !== '--.---.---/--') {
        navigator.clipboard.writeText(cpf).then(() => {
            const alert = document.getElementById('alert');
            alert.style.display = 'block';
            setTimeout(() => {
                alert.style.display = 'none';
            }, 2000);
        });
    }
}

// Função para validar CPF do input
function validarCPFInput() {
    const cpf = document.getElementById('cpfInput').value;
    const resultadoDiv = document.getElementById('resultadoValidacao');
    
    if (!cpf) {
        resultadoDiv.style.display = 'none';
        return;
    }
    
    const cpfLimpo = limparCPF(cpf);
    
    if (cpfLimpo.length !== 11) {
        mostrarResultado('❌ CPF inválido! Deve conter 11 dígitos.', 'invalido');
        return;
    }
    
    if (validarCPF(cpf)) {
        mostrarResultado('✅ CPF válido!', 'valido');
    } else {
        mostrarResultado('❌ CPF inválido!', 'invalido');
    }
}

// Função para mostrar resultado da validação
function mostrarResultado(mensagem, tipo) {
    const resultadoDiv = document.getElementById('resultadoValidacao');
    resultadoDiv.textContent = mensagem;
    resultadoDiv.className = tipo;
    resultadoDiv.style.display = 'block';
}

// Permitir formatação automática enquanto digita
document.getElementById('cpfInput').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        e.target.value = value;
    }
});

// Gerar um CPF ao carregar a página
window.onload = function() {
    gerarCPF();
};
