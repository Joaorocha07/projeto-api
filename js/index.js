const divBoxParte1 = document.querySelector("#box1") 
const divBoxParte2 = document.querySelector("#box2")  

/*
 * Função para remover a class esconder que esta no css
*/
function aparecerParte1() {
    
    divBoxParte2.classList.remove("esconder");

    window.scroll({
        top: divBoxParte2.offsetTop,
        behavior: 'smooth'

    });

}

/*
 * Função para remover a class esconder que esta no css -> chamando dentro da outra função
*/
function aparecerParte2() {

    aparecerParte1()

    window.scroll({
        top: divBoxParte1.offsetTop,
        behavior: 'smooth'
        
    });

}