const form = document.querySelector("form");
const resultDiv = document.querySelector(".result");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    getWordInfo(form.elements[0].value);
});

const getWordInfo = async (word) => {
    try {
        resultDiv.innerHTML = `<p style="font-weight: bold;">Fetching data...</p>`;
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await res.json();
        console.log(data);
        let definitions = data[0].meanings[0].definitions[0];
        resultDiv.innerHTML = `
        <h2><strong>Word:</strong> ${data[0].word}</h2>
        <p class="partOfSpeech">${data[0].meanings[0].partOfSpeech}</p>
        <p><strong>Meaning: </strong>${definitions.definition === undefined ? "Not found" : definitions.definition}</p>
        <p><strong>Example: </strong>${definitions.example === undefined ? "Not found" : definitions.example}</p>
        <p><strong>Antonyms: </strong></p>
        `;

        if (definitions.antonyms.length === 0) {
            resultDiv.innerHTML += `<span>Not Found</span>`;
        } else {
            for (let i=0; i<definitions.antonyms.length; i++) {
                resultDiv.innerHTML += `<li>${definitions.antonyms[i]}</li>`;
            }
        }

        resultDiv.innerHTML += `<div><button><a href="${data[0].sourceUrls}" target="_blank">Read More</a></button></div>`;
    } catch (error) {
        resultDiv.innerHTML += `<p>Sorry, the word could not be found.</p>`;
    }
}