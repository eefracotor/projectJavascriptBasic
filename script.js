const telaInicio = document.getElementById('inicio');
const telaDeJogo = document.getElementById('juego');
const lista1 = document.getElementById('lista');
const lista2 = document.getElementById('lista2');
const lista3 = document.getElementById('lista3');
const op1 = document.getElementById('op1');
const op2 = document.getElementById('op2');
const op3 = document.getElementById('op3');
const textResultado = document.getElementById('resultado');
const conhecePk = document.getElementById('conhecePk');
var resultadoReal = 0;
telaDeJogo.style.display='none';
conhecePk.style.display='none';
var num1, num2, res1, res2;
var respuesta;
var indiceOpCorrecta;
textResultado.innerHTML = '';
 
function jogar(op) {
    switch (op) {
        case 1:
            telaDeJogo.style.display='flex';
            telaInicio.style.display='none';
            conhecePk.style.display='none';
            Swal.fire({
                title: '<strong>Como jogar??</strong>',
                html: '<p>Certa Resposta!</p>',
                width: 600,
                showConfirmButton: true
            });
            break;
        case 2:
            telaDeJogo.style.display='none';
            telaInicio.style.display='none';
            conhecePk.style.display='flex';
            break;
        default:
            telaDeJogo.style.display='none';
            telaInicio.style.display='flex';
            conhecePk.style.display='none';
            break;
    }
}
telaInicio.innerHTML = `
                        <div class="img-inicio"><img src='./img/pokemon.png'></div>
                        <div class="container-btn">
                            <button class="btn-select" onClick=jogar(2)>Conoce tu Pokemon</button>
                            <button class="btn-select" onClick=jogar(1)>Desafío</button>
                        </div>
                    `;

let id1 = '', id2 ='';

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
  
function ControlaRespuesta(OpcionElegida) {
    textResultado.innerHTML = OpcionElegida.innerHTML;

    if(resultadoReal == OpcionElegida.innerHTML) {
        Swal.fire({
            title: '<strong style="color:#fff">Parabens!!</strong>',
            html: '<p style="color:#fff">Certa Resposta!</p>',
            width: 600,
            showConfirmButton: false,
            imageUrl: 'https://i.pinimg.com/originals/77/0d/41/770d412bf74f350b0d8a402f43be9af1.gif',
            background: '#4b8091',
            imageAlt: 'Custom image',
            backdrop: `
                rgba(0,0,123,0.4)
                url(https://thumbs.gfycat.com/AlarmingSlipperyAstrangiacoral-mobile.mp4)
                left top
                no-repeat
            `,
            timer: 2500
        });
        setTimeout(comenzar,2000);
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Tenta de novo!!',
            showConfirmButton: false,
            timer: 3000

        });
    }
}

function CarregarPokemon(id, list) {
    var url = 'https://pokeapi.co/api/v2/pokemon/'+id+'/';
    
    fetch(url)
    .then((response)=> {
        return response.json();
    })
    .then((data)=> {
        if(list == 1 ) {
            let imgFront = data['sprites']['other']['dream_world']['front_default'];
            id1 = id;
            document.getElementById('nomePk').innerHTML = data['name'];
            document.getElementById('tipoPk').innerHTML = `<p class='element'>${data['types'][0].type['name']}`;
            document.getElementById('imgPk').setAttribute('src', imgFront);
            document.getElementById('imgPk').setAttribute('alt', data['name']);
            document.getElementById("imgPk").classList ='';
            document.getElementById("imgPk").classList.add('img', data['types'][0].type['name']);
            document.getElementById('base').innerHTML = `<div class="header-base"><p>${data['stats'][0].base_stat}</p><img src="./img/power.png" class="fa-circle"></div>`;
            document.getElementById('attack').innerHTML = `<p>Ataque: ${data['stats'][1].base_stat}</p>`;
            res1 = data['stats'][1].base_stat;            
        } else if(list == 2) {
            let imgFront = data['sprites']['other']['dream_world']['front_default'];
            id2 = id;
            document.getElementById('nomePk2').innerHTML = data['name'];
            document.getElementById('tipoPk2').innerHTML = `<p class='element'>${data['types'][0].type['name']}`;
            
            document.getElementById('imgPk2').setAttribute('src', imgFront);
            document.getElementById('imgPk2').setAttribute('alt', data['name']);
            document.getElementById('base2').innerHTML = `<div class="header-base"><p>${data['stats'][0].base_stat}</p><img src="./img/power.png" class="fa-circle"></div>`;
            document.getElementById('attack2').innerHTML = `<p>Ataque: ${data['stats'][1].base_stat}</p>`;
            document.getElementById("imgPk2").classList = '';
            document.getElementById("imgPk2").classList.add('img',data['types'][0].type['name']);
            res2 = data['stats'][1].base_stat;           
        } else {
            let imgFront = data['sprites']['other']['dream_world']['front_default'];
            id3 = id;
            document.getElementById("imgPk3").classList.remove(data['types'][0].type['name']);
            document.getElementById('nomePk3').innerHTML = data['name'];
            document.getElementById('tipoPk3').innerHTML = `<p class='element'>${data['types'][0].type['name']}`;
            document.getElementById('imgPk3').setAttribute('src', imgFront);
            document.getElementById('imgPk3').setAttribute('alt', data['name']);
            document.getElementById("imgPk3").classList = '';
            document.getElementById("imgPk3").classList.add('img',data['types'][0].type['name']);
            document.getElementById('base3').innerHTML = `<div class="header-base"><p>${data['stats'][0].base_stat}</p><img src="./img/power.png" class="fa-circle"></div>`;
            document.getElementById('attack3').innerHTML = `<p>Ataque: ${data['stats'][1].base_stat}</p>`;
            document.getElementById('defense3').innerHTML = `<p>Defensa: ${data['stats'][2].base_stat}</p>`;
            document.getElementById('specialAttack3').innerHTML = `<p>Ateque Especial: ${data['stats'][3].base_stat}</p>`;
            document.getElementById('specialDefense3').innerHTML = `<p>Defensa Especial: ${data['stats'][4].base_stat}</p>`;
            document.getElementById('speed3').innerHTML = `<p>Velocidad: ${data['stats'][5].base_stat}</p>`;
        }
        respuesta = res1 + res2;
        indiceOpCorrecta = Math.round(Math.random()*2);
        if(indiceOpCorrecta == 0){
            op1.innerHTML = `${respuesta}`;
            op2.innerHTML = `${respuesta - 2}`;
            op3.innerHTML = `${respuesta + 1}`;
        }
        if(indiceOpCorrecta == 1){
            op2.innerHTML = `${respuesta}`;
            op1.innerHTML = `${respuesta -9}`;
            op3.innerHTML = `${respuesta + 2}`;
        }
        if(indiceOpCorrecta == 2){
            op3.innerHTML = `${respuesta}`;
            op2.innerHTML = `${respuesta - 3}`;
            op1.innerHTML = `${respuesta + 5}`;
        }

        resultadoReal = respuesta;

        })
        .catch((error)=> {
            console.log(error);
        })

}

function cargarListaPok () {
    let arrayPk= [];
        for(let i=0; i<8; i++){
            arrayPk.push(getRandomIntInclusive(1,150))
        } 
    for(var i=0; i < 150 ; i++){
        var url = 'https://pokeapi.co/api/v2/pokemon/'+i+'/';
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                lista1.innerHTML += `
                    <div class='miniCrad'>
                        <button onclick=CarregarPokemon(${data['id']},1) class='btn'>
                            <div class='imgMini'><img  src=${data['sprites']['other']['dream_world']['front_default']} alt=${data['name']} /></div>
                        </button>
                    </div>
                `;
                lista2.innerHTML += `
                    <div class='miniCrad2'>
                        <button onclick=CarregarPokemon(${data['id']},2) class='btn'>
                        <div class='imgMini'><img  src=${data['sprites']['other']['dream_world']['front_default']} alt=${data['name']} /></div>
                        </button>
                    </div>
                `;
                lista3.innerHTML += `
                    <div class='miniCrad3'>
                        <button onclick=CarregarPokemon(${data['id']},3) class='btn'>
                            <div class='imgMini3'><img  src=${data['sprites']['other']['dream_world']['front_default']} alt=${data['name']} /></div>
                            <p class='name-card'>${data['name']}</p>
                        </button>
                    </div>
                `;
            })
            .catch((error) => {
                console.log(error)
            })

    }

}

cargarListaPok();

function comenzar() {
    num1 = getRandomIntInclusive(1,150);
    num2 = getRandomIntInclusive(1,150);
    CarregarPokemon(num1,1);
    CarregarPokemon(num2,2);
}
comenzar();

