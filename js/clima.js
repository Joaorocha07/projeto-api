/**
 * Arquivo responsavel em usar a API para a busca de climas
 * @author Joao Victor Rocha <rocha.joao.victor.50@gmail.com>
 */

// Variáveis e seleções de elementos
const apiChave = "c2de443dad54a98d14694071bd85aee6"
const apiPaisURL = "https://countryflagsapi.com/png"

const cidadeInput = document.querySelector("#cidade_input")
const pesquisarBtn = document.querySelector("#pesquisar")

const cidadeElemento = document.querySelector("#cidade")
const tempElemento = document.querySelector("#temperatura span")
const descElemento = document.querySelector("#descricao")
const tempoIconeElemento = document.querySelector("#icone_do_tempo")
const paisElemento = document.querySelector("#pais")
const umidadeElemento = document.querySelector("#umidade span")
const ventoElemento = document.querySelector("#vento span")

const climaContainer = document.querySelector("#dados_clima") 

// Funções
/*
 * Função que acessa os dados da API, e liga ela com o codigo - requisição
 * @param cidade
*/
const obterDadosClimaticos = async(cidade) => {

    const apiClimaURL = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${apiChave}&lang=pt_br`

    const resposta = await fetch(apiClimaURL)
    const dados = await resposta.json()

    // console.log(dados)

    return dados

}

/*
 * Função para mensagem de erro caso não tenha a cidade
 * @param cidade
*/
function mensagemErro() {

    swal(
        "Erro!", 
        "Desculpe, esta cidade ou país não foi encontrado!", 
        "error");

}

/*
 * Função que vai mostrar os dados da api manipulados pelo DOM - HTML
 * @param cidade  
*/
const mostrarDadosClimaticos = async (cidade) => {

    const dados = await obterDadosClimaticos(cidade)

    // Verificando se tem na API
    if (dados.cod === "404") {

        mensagemErro("Desculpe, esta cidade ou país não foi encontrado!")
        climaContainer.classList.add("esconder");
        // climaContainer.classList.toggle("esconder")

    } else {

        climaContainer.classList.remove("esconder")

        tempoIconeElemento.setAttribute("src", `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`)
        paisElemento.setAttribute("src", apiPaisURL + dados.sys.country)
        cidadeElemento.innerHTML        = dados.name
        tempElemento.innerHTML          = parseInt(dados.main.temp)
        descElemento.innerHTML          = dados.weather[0].description
        umidadeElemento.innerText       = `${dados.main.humidity}%`
        ventoElemento.innerHTML         = `${dados.wind.speed}km/h`
    
    }

}


// Eventos
// Vai chamar as funções quando a pessoa clicar no botão de pesquisar
pesquisarBtn.addEventListener("click", (event) => {

    event.preventDefault()

    const cidade = cidadeInput.value

    mostrarDadosClimaticos(cidade)

})
