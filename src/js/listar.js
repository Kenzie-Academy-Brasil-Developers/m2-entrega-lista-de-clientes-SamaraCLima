import { Api } from "./api.js";
let searchClient = document.getElementById("procurarCliente")
let buttonList = document.getElementById("btnProcurar")
let ul = document.querySelector(".container")
const lista = await Api.listarClientes() 
async function card (lista) {
    lista.forEach(element => {
       criarCard(element)});
}
card(lista)
function criarCard (element) {
    const {nome, idade, cpf, sexo, email, endereco} = element
    let li = document.createElement("li")
    li.classList.add("card")
    let h2 = document.createElement("h2")
    h2.innerText = nome
    let firstDiv = document.createElement("div")
    let personalData = document.createElement("h3")
    personalData.innerText = "Dados Pessoais"
    let emailData = document.createElement("p")
    emailData.innerText = `Email: ${email}` 
    let ageData = document.createElement("p")
    ageData.innerText = `Idade: ${idade}` 
    let cpfData = document.createElement("p")
    cpfData.innerText = `CPF: ${ cpf}`
    let sexData = document.createElement("p")
    sexData.innerText = `Gênero ${sexo}` 
    let secondDiv = document.createElement("div")
    let adressData = document.createElement("h3")
    adressData.innerText = "Endereço"
    let cep = document.createElement("p")
    cep.innerText = `CEP: ${endereco.cep}` 
    let stateData = document.createElement("p")
    stateData.innerText = `Estado: ${endereco.estado}` 
    let cityData = document.createElement("p")
    cityData.innerText = `Cidade: ${endereco.cidade}` 
    let districtData = document.createElement("p")
    districtData.innerText = `Bairro: ${endereco.bairro}` 
    let streetData = document.createElement("p")
    streetData.innerText = `Rua: ${endereco.rua}` 
    let numData = document.createElement("p")
    numData.innerText = `Número: ${endereco.numero}` 
    firstDiv.append(personalData, emailData, ageData, cpfData, sexData)
    secondDiv.append(adressData, cep, stateData, cityData, districtData, streetData, numData)
    li.append(h2, firstDiv, secondDiv)
    ul.appendChild(li)
}
buttonList.addEventListener("click", (evt) => {
    evt.preventDefault()
    ul.innerHTML = ""
    card(lista.filter(element => element.nome.toLowerCase().includes(searchClient.value.toLowerCase())))
})