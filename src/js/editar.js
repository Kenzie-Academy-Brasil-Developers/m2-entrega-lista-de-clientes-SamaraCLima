import {
    Api
} from "./api.js";
let select = document.getElementById("selectPesquisar")
let buttonSearch = document.getElementById("btnPesquisar")
let buttonAtt = document.getElementById("atualizar")
let nomeX = document.getElementById('nome')
let emailX = document.getElementById('email')
let numeroX = document.getElementById('numero')
let cpfX = document.getElementById('cpf')
let sexoX = document.getElementById('sexo')
let cepX = document.getElementById('cep')
let ruaX = document.getElementById('rua')
let numeroEndX = document.getElementById('numeroEndereco')
let bairroX = document.getElementById('bairro')
let cidadeX = document.getElementById('cidade')
let estadoX = document.getElementById('estado')
async function buscar() {
    const card = await Api.listarClientes()
    card.forEach(element => {
        pesquisar(element)});
}
buscar()
function pesquisar(element) {
    const {
        id,
        nome,
    } = element
    let option = document.createElement("option")
    option.label = nome
    option.value = id
    select.appendChild(option)
}
buttonSearch.addEventListener('click', async (event) => {
    event.preventDefault()
    if (select.value) {
        select.parentElement.lastElementChild.innerText = ""
        let {
            cpf,
            email,
            nome,
            endereco,
            idade,
            sexo
        } = await Api.buscarCliente(select.value)
        nomeX.value = nome
        emailX.value = email
        numeroX.value = idade
        cpfX.value = cpf
        sexoX.value = sexo
        cepX.value = endereco.cep
        ruaX.value = endereco.rua
        numeroEndX.value = endereco.numero
        bairroX.value = endereco.bairro
        cidadeX.value = endereco.cidade
        estadoX.value = endereco.estado
    } else {
        select.parentElement.lastElementChild.innerText = "Selecione um cliente primeiro"}
})
buttonAtt.addEventListener("click", async (event) => {
    event.preventDefault()
    const data = {
        "nome": nomeX.value,
        "email": emailX.value,
        "sexo": sexoX.value,
        "idade": parseInt(numeroX.value),
        "cpf": cpfX.value,
        "endereco": {
            "estado": estadoX.value,
            "cidade": cidadeX.value,
            "bairro": bairroX.value,
            "numero": numeroEndX.value,
            "rua": ruaX.value,
            "cep": cepX.value}}
    await Api.editarCliente(data, select.value)})