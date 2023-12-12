const apiKey = "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";
async function sendMessage() {
    const userMessage = document.querySelector("#recebe").value;
    document.querySelector("#recebe").value = '';
    document.querySelector(".RespostaIA").innerHTML += `<div class="user" style="margin-top: 30px;">Usuário: ${userMessage}</div>`;
    const Mensagem = `Resolva essa derivada: ${userMessage}`;
    const submitButton = document.getElementById("submitButton");
    submitButton.innerHTML = "Carregando..."
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages:[
                {
                  role: "system",
                  content: "Você é um assistante virtual que resolve funções derivadas. Resolve a seguinte função, dita pelo usuário:"
                },
                {
                  role: "user",
                  content: Mensagem
                }
               
            ],
            max_tokens: 150
        })
    });

    const data = await response.json();
    submitButton.innerHTML = "Buscar"
    const chatGPTResponse = data.choices[0].message.content
    document.querySelector(".RespostaIA").innerHTML += `<div style="margin-top: 50px; text-align: justfy; font-size: 20px;"> Resultado: ${chatGPTResponse}</div>`;
}