// Seleciona o formulário de contato pelo id
const formulario = document.getElementById("form-contato");
const aviso = document.getElementById("aviso");

// Evento para o envio do formulário
formulario.addEventListener("submit", function(evento) {
    evento.preventDefault(); // Impedir redirecionamento automático de página

    // Captura e limpeza dos dados digitados no formulário
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    // Verificação se os campos estão vazios
    if (nome === "" ) {
        aviso.textContent = "Digite seu nome!";
        //alert("Digite seu nome!");
        return;
    }

    if (email === "") {
        aviso.textContent = "Digite seu e-mail!";
        //alert("Digite seu e-mail!");
        return;
    }

    // Validação do campo de e-mail
    const emailValido = email.includes("@") && email.includes(".");
    if (!emailValido) {
        //alert("Digite um e-mail válido!");
        aviso.textContent = "Digite um e-mail válido!";
        return;
    }

    // Alerta caso o campo de mensagem esteja vazio
    if (mensagem === "") { 
        //alert("Digite sua mensagem!");
        aviso.textContent = "Digite sua mensagem!";
        return;
    }

    // Criação de objetos com os dados do formulário
    const dados = new FormData(formulario);

    // Envio dos dados para o Formspree.
    fetch(formulario.action, {
        method: "POST",
        body: dados,
        headers: {
            "Accept": "application/json"
        }
    })

    // Verifica resposta do Formspree
    .then(function(resposta) {
        if (resposta.ok) {
            aviso.textContent = "Mensagem enviada com sucesso!";
            formulario.reset();
        } else {
            aviso.textContent = "Falha no envio. Tente novamente!";
        }
    })

    // Mensagem caso hja erro de conexão
    . catch(function() {
        aviso.textContent = "Falha no envio. Verifique a conexão e tente novamente.";
    });
    
});
