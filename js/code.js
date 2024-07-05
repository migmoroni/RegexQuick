document.addEventListener('DOMContentLoaded', () => {
    const regexInput = document.getElementById('regexInput');
    const textInput = document.getElementById('textInput');
    const resultLabel = document.getElementById('resultLabel');
    const downloadButton = document.getElementById('downloadButton');
    const docsButton = document.getElementById('docsButton');
    const sidebar = document.querySelector('.sidebar');

    // Parâmetros para o texto e a regex de exemplo
    const exampleRegex = /\b\w{4}\b/g;
    const exampleText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

    // Define os valores iniciais dos inputs
    regexInput.value = exampleRegex;
    textInput.value = exampleText;

    function updateResult() {
        const regexPattern = regexInput.value;
        const textToAnalyze = textInput.value;
        let result = '';

        try {
            // Adiciona verificação se o regexPattern começa e termina com '/'
            const regexMatch = regexPattern.match(/^\/(.*)\/([a-z]*)$/);
            if (regexMatch) {
                const pattern = regexMatch[1];
                const flags = regexMatch[2];
                const regex = new RegExp(pattern, flags);
                const matches = textToAnalyze.match(regex);
                result = matches ? matches.join(', ') : 'No matches found';
            } else {
                result = 'Invalid regex format. Use /pattern/flags';
            }
        } catch (e) {
            result = 'Invalid regex';
        }

        resultLabel.textContent = result;
    }

    regexInput.addEventListener('input', updateResult);
    textInput.addEventListener('input', updateResult);

    // Atualize o resultado ao carregar a página pela primeira vez
    updateResult();

    downloadButton.addEventListener('click', () => {
        const filename = prompt("Enter file name:", "regex-template.json");
        if (filename) {
            const data = {
                text: textInput.value,
                regex: regexInput.value,
                result: resultLabel.textContent
            };
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(url);
        }
    });

    // Toggle sidebar
docsButton.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Handle regex command clicks
const regexCommands = document.querySelectorAll('.regexCommand');
regexCommands.forEach(command => {
    command.addEventListener('click', (event) => {
        event.preventDefault();
        const commandText = command.textContent.trim();
        const cursorPos = regexInput.selectionStart;
        const regexValue = regexInput.value;
        const newValue = regexValue.substring(0, cursorPos) + commandText + regexValue.substring(cursorPos);
        regexInput.value = newValue;
        regexInput.focus(); // Reposiciona o cursor no campo de texto
    });
});
});