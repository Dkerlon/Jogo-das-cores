const btn_novo_jogo = document.querySelector('#btn_novo_jogo')
const btn_carregar_jogo = document.querySelector('#btn_carregar_jogo')
const btn_como_jogar = document.querySelector('#btn_como_jogar')
const h1 = document.querySelector('#h1')
const game_board = document.querySelector('.game_board')
const btn_voltar = document.querySelector('#btn_voltar')
const btn_enviar = document.querySelector('.btn_enviar')
const estado = document.querySelector('#estado')
const Domscore = document.querySelector('#score')
const campo = [...document.querySelectorAll('.campo')]
const sessao_novo_jogador = document.querySelector('.sessao_novo_jogador')
const sessao_carregar_jogador = document.querySelector('.sessao_carregar_jogador')
const btn_iniciar = document.querySelector('#btn_iniciar')
const nome = document.querySelector('#nome')

let jogadores = []

let score = 0
let coresJogadas = []
let estado_jogo = false

btn_como_jogar.addEventListener('click', () => {

    const como_jogar = window.open('','','height=700,width=700')
    como_jogar.document.write (`
    <html lang="pt-BR">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jogo das Cores</title>
    </head>
    <body>
    <h1>Como se joga?</h1>
    <ol>
    <li>Você deve digitar um valor RGB (de 0/255) em um campo</li>
    <li>E tentar acerta qual das 6 cores é a que você escreveu</li>
    </ol>
    </body>
    </html>
    `
    )
})

btn_novo_jogo.addEventListener('click', () => {
    //zerar score
    h1.style.marginTop = '10%'
    btn_novo_jogo.parentNode.classList.add('hidden')
    sessao_novo_jogador.classList.add('mostrar')
})

btn_iniciar.addEventListener('click', () => {
    const nomes = document.querySelector('#nome_input')

    if(nomes.value == ''){
        alert('Você não pode inserir um nome vazio')
    }else if(jogadores.length  >= 3){
        alert('Número de jogadores máximo antigido.')
    }else{
        h1.style.marginTop = '1%'
        sessao_novo_jogador.classList.add('hidden')
        sessao_novo_jogador.classList.remove('mostrar')
        game_board.classList.add('mostrar')

        jogadores.push({
            jogador:nomes.value,
            score_jogador:0
        })
    }
})

btn_carregar_jogo.addEventListener('click', () => {
    //Não zera o score
    h1.style.marginTop = '1%'
    sessao_carregar_jogador.classList.add('mostrar')
    btn_novo_jogo.parentNode.classList.add('hidden')
    carregarJogadores()
})

btn_voltar.addEventListener('click', () => {

    h1.style.marginTop = '10%'
    btn_novo_jogo.parentNode.classList.remove('hidden')
    game_board.classList.remove('mostrar')
})

btn_enviar.addEventListener('click', (evt) => {
    const inputsRGB = [...document.querySelectorAll('.rgb')]
    let i1 = Number(inputsRGB[0].value)
    let i2 = Number(inputsRGB[1].value)
    let i3 = Number(inputsRGB[2].value)
    let corAtual = `${i1}-${i2}-${i3}`

    if(i1 > 255 || i1 <0 || i2 > 255 || i2 < 0 || i3 > 255 || i3 < 0){
        alert('Você não pode inserir um número inferior a 0 ou superior a 255')
        inputsRGB.map(el => {
            el.value = ''
        })
        return;
    }else if (coresJogadas.includes(corAtual)) {
        alert('Você não pode inserir uma cor que já foi inserida anteriormente.')
        inputsRGB.map(el => {
            el.value = ''
        })
        return;
   }

   criarCores(i1,i2,i3)
   setTimeout(() => {
    inputsRGB.map(el => {
        el.value = ''
    })
    },2000);
})

function criarCores(i1,i2,i3){
    coresJogadas.push(i1+'-'+i2+'-'+i3)
    estado_jogo = true

    for(let i = 0; i <= 5; i++){
        new coresNovas(i)
    }
    let numeroSorteado =Math.floor(Math.random()*6)
    corCorreta(i1,i2,i3,numeroSorteado)
}

class coresNovas{

    constructor(v){
        this.red = Math.random()*255 
        this.green = Math.random()*255 
        this.blue = Math.random()*255
        this.vez = v
        this.desenharDiv()
    }
    desenharDiv = () => {
        
        campo[this.vez].style.backgroundColor = `rgb(${this.red},${this.green},${this.blue})`
    }
}

function corCorreta (r,g,b,numeroSorteado){

    let me = numeroSorteado
    campo[me].value = 'correto'
    campo[me].style.backgroundColor = `rgb(${r},${g},${b})`;
}

campo.map((el) => {

    el.addEventListener('click', (evt)=> {
        if(estado_jogo){
            estado_jogo = false
            if(evt.target.value != 'correto'){
                campo.map((errado) => {
                    coresJogadas = []
                    errado.classList.add('errou')
                    estado.innerHTML = 'errou'
                    estado.style.color = 'red'
                    Domscore.innerHTML = 0
                })
            }else{
                estado.style.color = 'green'
                estado.innerHTML = 'acertou'
                score++
                Domscore.innerHTML = score
                campo.map((correto) => {
                    correto.classList.add('acertou')
                })
            }
            setTimeout(() => {
                campo.map(el => {
                    estado.style.color = 'black'
                    estado.innerHTML = 'esperando...'
                    el.style.backgroundColor = '#ccc'
                    el.classList.remove('errou')
                    el.classList.remove('acertou')
                })
            }, 2000);
        }
    })
})

function carregarJogadores(){
    jogadores.map((el) => {
        const div = document.createElement('button')
        div.setAttribute('class','jogador')
        div.innerHTML = el.jogador
        sessao_carregar_jogador.appendChild(div)
    })
}
