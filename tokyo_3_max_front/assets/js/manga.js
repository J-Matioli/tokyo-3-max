var url = 'http://localhost:3000/mangas/';

var mangas = [];

const postForm = document.querySelector("#novo-manga-form")
const editForm = document.querySelector("#editar-manga-form");

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
        volumes: parseInt(object.volumes, 10)
    }

    postManga(objectParse)
})

editForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const data = new FormData(e.target);
    const idManga = e.target.getAttribute("data-manga-id")

    var object = {};

    data.forEach((value, key) => object[key] = value);
    
    var objectParse = {
        ...object,
        volumes: parseInt(object.volumes, 10)
    }
    
    putManga(idManga, objectParse)
})


function getMangas(url) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var result = JSON.parse(this.responseText);
                mangas = result.mangas;
                popularTemplate(mangas)
            }
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
}

function postManga(manga) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                postForm.reset();
                getMangas(url);
            }
        }
    };
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(manga));
}

function putManga(id, manga) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                myModal.hide();
                getMangas(url);
            }
        }
    };
    xhr.open('PUT', url + id, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(manga));
}

function deleteManga(id) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                getMangas(url)
            }
        }
    };
    xhr.open('DELETE', url + id, true);
    xhr.send();
}

getMangas(url);


function popularTemplate(arr) {
    const lista = document.querySelector("#lista")
    lista.innerHTML = '';

    arr.forEach(manga => {
        lista.insertAdjacentHTML("beforeend", template(manga))
    });
}


const template = (manga) => {

    const {idmanga, nome, volumes, mangaka, genero, lancamento} = manga;

    const lancamentoParse = lancamento
                        .match(/(\d{4})?-(\d{2})?-(\d{2})/)[0]
                        .replace(/(\d{4})?-(\d{2})?-(\d{2})/, '$3/$2/$1');
    
    return `
        <div class="col-xm-2 col-md-3 my-2" id="manga-${idmanga}">
            <div class="card">
                <div class="card-header">${nome}</div>
                <div class="card-body">
                    <p class="card-text"><b>Mangaká:</b> ${mangaka}</p>
                    <p class="card-text"><b>Volumes:</b> ${volumes}</p>
                    <p class="card-text"><b>Gêneros:</b> ${genero}</p>
                    <p class="card-text"><b>Data de Lançamento:</b> ${lancamentoParse}</p>
                    <a href="#" class="btn btn-primary" onclick="openModalEdit(${idmanga})">Editar</a>
                    <a href="#" class="btn btn-danger" onclick="deleteManga(${idmanga})">Remover</a>
                </div>
            </div>
        </div>
    `
}

function openModalEdit(idManga) {
    const manga = mangas.find(manga => {return manga.idmanga == idManga});
    myModal.show()
    preencheCampos(manga)
}

function preencheCampos(manga) {

    const {idmanga, nome, volumes, mangaka, genero, lancamento} = manga;

    const lancamentoParse = lancamento
                        .match(/(\d{4})?-(\d{2})?-(\d{2})/)[0]

    editForm.setAttribute('data-manga-id', idmanga)
    
    const inputNome = document.querySelector("#edit-manga-titulo").value = nome;
    const inputVolume = document.querySelector("#edit-manga-volumes").value = volumes;
    const inputMangaka = document.querySelector("#edit-manga-mangaka").value = mangaka;
    const inputGenero = document.querySelector("#edit-manga-genero").value = genero;
    const inputLancamento = document.querySelector("#edit-manga-data").value = lancamentoParse;    
}