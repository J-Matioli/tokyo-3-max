var url = 'http://localhost:3000/filmes/';

var filmes = [];

const postForm = document.querySelector("#novo-filme-form")
const editForm = document.querySelector("#editar-filme-form");

var myModal = new bootstrap.Modal(document.getElementById('editModal'), {
    keyboard: false
})


postForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const data = new FormData(e.target);
    var object = {};

    data.forEach((value, key) => object[key] = value);
    
    postFilme(object)
})

editForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const data = new FormData(e.target);
    const idAnime = e.target.getAttribute("data-filme-id")

    var object = {};

    data.forEach((value, key) => object[key] = value);
        
    putFilme(idAnime, object)
})


function getFilmes(url) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var result = JSON.parse(this.responseText);
                filmes = result.filmes;
                popularTemplate(filmes)
            }
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
}

function postFilme(filme) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                postForm.reset();
                getFilmes(url);
            }
        }
    };
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(filme));
}

function putFilme(id, filme) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                myModal.hide();
                getFilmes(url);
            }
        }
    };
    xhr.open('PUT', url + id, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(filme));
}

function deleteFilme(id) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                getFilmes(url)
            }
        }
    };
    xhr.open('DELETE', url + id, true);
    xhr.send();
}

getFilmes(url);

function popularTemplate(arr) {
    const lista = document.querySelector("#lista")
    lista.innerHTML = '';

    arr.forEach(filme => {
        lista.insertAdjacentHTML("beforeend", template(filme))
    });
}


const template = (filme) => {

    const {idfilme, nome, duracao, diretor, genero, lancamento} = filme;

    const lancamentoParse = lancamento
                        .match(/(\d{4})?-(\d{2})?-(\d{2})/)[0]
                        .replace(/(\d{4})?-(\d{2})?-(\d{2})/, '$3/$2/$1');
    
    return `
        <div class="col-xm-2 col-md-3 my-2" id="anime-${idfilme}">
            <div class="card">
                <div class="card-header">${nome}</div>
                <div class="card-body">
                    <p class="card-text"><b>Diretor:</b> ${diretor}</p>
                    <p class="card-text"><b>Duração:</b> ${duracao}</p>
                    <p class="card-text"><b>Gêneros:</b> ${genero}</p>
                    <p class="card-text"><b>Data de Lançamento:</b> ${lancamentoParse}</p>
                    <a href="#" class="btn btn-primary" onclick="openModalEdit(${idfilme})">Editar</a>
                    <a href="#" class="btn btn-danger" onclick="deleteFilme(${idfilme})">Remover</a>
                </div>
            </div>
        </div>
    `
}

function openModalEdit(idFilme) {
    const filme = filmes.find(filme => {return filme.idfilme == idFilme});
    myModal.show()
    preencheCampos(filme)
}

function preencheCampos(filme) {

    const {idfilme, nome, duracao, diretor, genero, lancamento} = filme;

    const lancamentoParse = lancamento
                        .match(/(\d{4})?-(\d{2})?-(\d{2})/)[0]

    editForm.setAttribute('data-filme-id', idfilme)
    
    const inputNome = document.querySelector("#edit-filme-titulo").value = nome;
    const inputDuracao = document.querySelector("#edit-filme-duracao").value = duracao;
    const inputDiretor = document.querySelector("#edit-filme-diretor").value = diretor;
    const inputGenero = document.querySelector("#edit-filme-genero").value = genero;
    const inputLancamento = document.querySelector("#edit-filme-data").value = lancamentoParse;    
}