var url = 'http://localhost:3000/animes/';

var animes = [];

const postForm = document.querySelector("#novo-anime-form")
const editForm = document.querySelector("#editar-anime-form");

var myModal = new bootstrap.Modal(document.getElementById('editModal'), {
    keyboard: false
})


postForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const data = new FormData(e.target);
    var object = {};

    data.forEach((value, key) => object[key] = value);
    
    var objectParse = {
        ...object,
        episodios: parseInt(object.episodios, 10)
    }

    console.log(objectParse);
    postAnime(objectParse)
})

editForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const data = new FormData(e.target);
    const idAnime = e.target.getAttribute("data-anime-id")

    var object = {};

    data.forEach((value, key) => object[key] = value);
    
    var objectParse = {
        ...object,
        episodios: parseInt(object.episodios, 10)
    }

    console.log(objectParse);
    
    putAnime(idAnime, objectParse)
})


function getAnimes(url) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var result = JSON.parse(this.responseText);
                animes = result.animes;
                popularTemplate(animes)
                console.log(animes);
            }
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
}

function postAnime(anime) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                postForm.reset();
                getAnimes(url);
            }
        }
    };
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(anime));
}

function putAnime(id, anime) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                myModal.hide();
                getAnimes(url);
            }
        }
    };
    xhr.open('PUT', url + id, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(anime));
}

function deleteAnime(id) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                getAnimes(url)
            }
        }
    };
    xhr.open('DELETE', url + id, true);
    xhr.send();
}

getAnimes(url);


function popularTemplate(arr) {
    const lista = document.querySelector("#lista")
    lista.innerHTML = '';

    arr.forEach(anime => {
        lista.insertAdjacentHTML("beforeend", template(anime))
    });
}


const template = (anime) => {

    const {idanime, nome, episodios, estudio, genero, lancamento} = anime;

    const lancamentoParse = lancamento
                        .match(/(\d{4})?-(\d{2})?-(\d{2})/)[0]
                        .replace(/(\d{4})?-(\d{2})?-(\d{2})/, '$3/$2/$1');
    
    return `
        <div class="col-xm-2 col-md-3 my-2" id="anime-${idanime}">
            <div class="card">
                <div class="card-header">${nome}</div>
                <div class="card-body">
                    <p class="card-text"><b>Estúdio:</b> ${estudio}</p>
                    <p class="card-text"><b>Episódios:</b> ${episodios}</p>
                    <p class="card-text"><b>Gêneros:</b> ${genero}</p>
                    <p class="card-text"><b>Data de Lançamento:</b> ${lancamentoParse}</p>
                    <a href="#" class="btn btn-primary" onclick="openModalEdit(${idanime})">Editar</a>
                    <a href="#" class="btn btn-danger" onclick="deleteAnime(${idanime})">Remover</a>
                </div>
            </div>
        </div>
    `
}

function openModalEdit(idAnime) {
    const anime = animes.find(anime => {return anime.idanime == idAnime});
    myModal.show()
    preencheCampos(anime)
}

function preencheCampos(anime) {

    const {idanime, nome, episodios, estudio, genero, lancamento} = anime;

    const lancamentoParse = lancamento
                        .match(/(\d{4})?-(\d{2})?-(\d{2})/)[0]

    editForm.setAttribute('data-anime-id', idanime)
    
    const inputNome = document.querySelector("#edit-anime-titulo").value = nome;
    const inputEpisodios = document.querySelector("#edit-anime-episodios").value = episodios;
    const inputEstudio = document.querySelector("#edit-anime-estudio").value = estudio;
    const inputGenero = document.querySelector("#edit-anime-genero").value = genero;
    const inputLancamento = document.querySelector("#edit-anime-data").value = lancamentoParse;    
}