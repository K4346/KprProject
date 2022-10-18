import {MiniMaple} from "./miniMaple.js";

document.addEventListener('DOMContentLoaded', setup)

function setup() {
    document.getElementById('submitButton').onclick = something;
}

function something() {
    const api = 'https://asli-fun-fact-api.herokuapp.com/'

    const someDummyDiv = document.createElement('div');
    someDummyDiv.classList.add('generated');
    let url = 'https://example.com';

    fetch(api)
        .then(res => res.json())
        .then((out) => {
            console.log('Checkout this JSON! ', out);
        })
        .catch(err => {
            throw err
        });
    const container = document.getElementById('container');
    // while (container.firstChild) {
    //     container.removeChild(container.firstChild);
    // }
    container.appendChild(someDummyDiv);
}
