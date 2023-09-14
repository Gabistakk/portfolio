function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function playSound() {
    var audio = new Audio('./keyboard.mp3')
    audio.play()
}

async function showStacksEnter() {
    let element = document.getElementById('linguagens')
    element.scrollIntoView({ behavior: "smooth", block: "start" })
    window.removeEventListener('keypress', thisEvent)

}

async function showStacks(elementId, textToDisplay) {
    document.getElementById('stacksDiv').classList.remove('hidden')
    document.getElementById('digite').textContent = 'Digite novamente para mais informações!'

    let counter = 0
    window.removeEventListener('keypress', thisEvent)

    window.addEventListener('keypress', thisEvent = (event) => {
        if (event.keyCode == 32 && event.target == document.body) {
            event.preventDefault();
        }
        document.getElementById(elementId).textContent += textToDisplay.charAt(counter)
        counter++
        if (counter == textToDisplay.length) {
            var element = document.getElementById('digite')
            element.textContent = 'Pressione Enter para executar o comando.'
            element.classList.add('animate-bounce')
        }
        if (counter >= textToDisplay.length && event.key == 'Enter') {
            element = document.getElementById('digite')
            element.classList.remove('animate-bounce')
            element.style.display = 'none';
            showStacksEnter();
            document.removeEventListener('keypress', thisEvent)
        }
    }, false);

}



async function showIntro() {

    const element = document.getElementById('intro')
    async function slowtype(string, element){
        async function highlight(toReplace, element){
            element.innerHTML = element.innerHTML.replace(toReplace, '<div class="text-primary inline justify-center items">' + toReplace + '</div>')
        }
        async function wrapWithDiv(toWrap, element){
            element.innerHTML = element.innerHTML.replace(toWrap, '<div class="animate-blink-very-fast inline">' + toWrap + '</div>')
        }
        for (let i = 0; i < string.length; i++) {
            element.textContent += string.charAt(i)
            await sleep(10)
        }
        wrapWithDiv('Portfólio', element)
        wrapWithDiv('projetos', element)
        wrapWithDiv('passe', element)
        wrapWithDiv('clique', element)
        wrapWithDiv('gabriel@emerenciano.dev', element)
        wrapWithDiv('whatsapp', element)
        await sleep(1500)
        for(let i = 0; i < 6; i++){
            element.innerHTML = element.innerHTML.replace('animate-blink-very-fast', 'text-primary justify-center items-center')
        }
    }
    
    slowtype('Olá, eu sou o Gabriel Emerenciano e seja bem vindo ao meu Portfólio, aqui você irá me conhecer melhor, conhecer meus projetos e também verá minhas habilidades, passe o mouse nas imagens, clique em tecnologias que não conheça e entre em contato comigo caso goste! gabriel@emerenciano.dev (ou whatsapp na parte de contato).', element)

    document.getElementById('first-cursor').style.display = 'none'

    showStacks('typing-stacks', 'sudo whoami')
}

async function typingIntro(elementId, textToDisplay) {
    let counter = 0
    window.addEventListener('keypress', thisEvent = (event) => {
        if (event.keyCode == 32 && event.target == document.body) {
            event.preventDefault();
        }

        document.getElementById(elementId).textContent += textToDisplay.charAt(counter)
        counter++
        if (counter == textToDisplay.length) {
            var element = document.getElementById('digite')
            element.textContent = 'Pressione Enter para executar o comando.'
            element.classList.add('animate-bounce')
        }
        if (counter >= textToDisplay.length && event.key == 'Enter') {
            document.getElementById('digite').classList.remove('animate-bounce')
            showIntro()
        }
    }, false);
}









function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomLetter() {
    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    return alphabet[rand(0, alphabet.length - 1)]
}
function getRandomWord(word) {
    var text = word.innerHTML

    var finalWord = ''
    for (var i = 0; i < text.length; i++) {
        finalWord += text[i] == ' ' ? ' ' : getRandomLetter()
    }

    return finalWord
}

var isReady = false
function init(element) {
    let interv = 'undefined'
    let canChange = false
    let globalCount = 0
    let count = 0

    var word = element

    var INITIAL_WORD = word.innerHTML;

    var randomWord = getRandomWord(word)
    word.innerHTML = randomWord

    interv = setInterval(function () {
        var finalWord = ''
        for (var x = 0; x < INITIAL_WORD.length; x++) {
            if (x <= count && canChange) {
                finalWord += INITIAL_WORD[x]
            } else {
                finalWord += getRandomLetter()
            }
        }
        word.innerHTML = finalWord
        if (canChange) {
            count++
        }
        if (globalCount >= 20) {
            canChange = true
        }
        if (count >= INITIAL_WORD.length) {
            clearInterval(interv)
            count = 0
            canChange = false
            globalCount = 0
            isReady = true
            if (element == document.getElementById('typing-intro')) {
                typingIntro('typing-intro', 'cat > welcome.txt')
            }
        }
        globalCount++
    }, 15)

}




if(window.innerWidth > 767){
    init(document.getElementById('digite'))
    init(document.getElementById('typing-intro'))
}


const header = document.getElementById('header')

if (window.scrollY <= 1000 && window.innerWidth > 767) {
    header.classList.add("-translate-y-20")
}


let lastScroll = 0
window.addEventListener('scroll', () => {
    let currentScroll = window.scrollY
    if (currentScroll <= 1000 && window.innerWidth > 767) {
        header.classList.add("-translate-y-20")
    }
    else {
        header.classList.remove("-translate-y-20")

    }

    lastScroll = currentScroll
})




let timer = 0
let intersectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('animate')) {
                setTimeout(function () { entry.target.classList.add('up'); }, timer);
                timer += 50
                setTimeout(function () { timer = 0 }, 1000)
            }
            if (entry.target.classList.contains('activateBar')) {
                entry.target.classList.add('skill-per')
                entry.target.classList.add('activateAnimation')
            }
            intersectionObserver.unobserve(entry.target)
        }
    })
})

window.addEventListener('load', (event) => {
    document.querySelectorAll('.animate').forEach(obj => {
        intersectionObserver.observe(obj)
    })
    document.querySelectorAll('.activateBar').forEach(obj => {
        intersectionObserver.observe(obj)
    })
    
})

const backgroundDiv = document.getElementById('backgroundDiv')
function scrollSobre(mobile = false) {
    if(mobile){
        backgroundDiv.classList.add('invisible')
        backgroundDiv.classList.replace('scale-100', 'scale-0')
    }
    document.getElementById('sobre-mim').scrollIntoView({ behavior: "smooth", block: "start" })
}

function scrollProjetos(mobile = false) {
    if(mobile){
        backgroundDiv.classList.add('invisible')
        backgroundDiv.classList.replace('scale-100', 'scale-0')
    }
    document.getElementById('projetos').scrollIntoView({ behavior: "smooth", block: "start" })
    
}

function scrollContato(mobile = false) {
 
    if(mobile){
        backgroundDiv.classList.add('invisible')
        backgroundDiv.classList.replace('scale-100', 'scale-0')
    }
    document.getElementById('contato').scrollIntoView({ behavior: "smooth", block: 'start' })

}



const mobileHeaderDiv = document.getElementById('mobileHeaderDiv')

const mobileHeader = document.getElementById('mobileHeader')

mobileHeaderDiv.addEventListener('click', (e) => {
    e.preventDefault()
    mobileHeader.classList.remove('mobileHeader-animation')
    void mobileHeader.offsetWidth
    mobileHeader.classList.add('mobileHeader-animation')

    if(!backgroundDiv.classList.contains('invisible')){
        backgroundDiv.classList.add('invisible')
        backgroundDiv.classList.replace('scale-100', 'scale-0')
        return
    }
    backgroundDiv.classList.remove('invisible')
    backgroundDiv.classList.replace('scale-0', 'scale-100')
    backgroundDiv.classList.add('backdrop-blur-sm')

})