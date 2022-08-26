import {
    Api
} from "./api.js";
let select = document.getElementById("selectPesquisar")
let searchbtt = document.getElementById("btnPesquisar")
let attbtt = document.getElementById("atualizar")
let editname = document.getElementById('nome')
let editmail = document.getElementById('email')
let editnum = document.getElementById('numero')
let editcpf = document.getElementById('cpf')
let editsex = document.getElementById('sexo')
let editcep = document.getElementById('cep')
let editrua = document.getElementById('rua')
let editnumend = document.getElementById('numeroEndereco')
let editbairro = document.getElementById('bairro')
let editcity = document.getElementById('cidade')
let editstate = document.getElementById('estado')
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
searchbtt.addEventListener('click', async (event) => {
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
        editname.value = nome
        editmail.value = email
        editnum.value = idade
        editcpf.value = cpf
        editsex.value = sexo
        editcep.value = endereco.cep
        editrua.value = endereco.rua
        editnumend.value = endereco.numero
        editbairro.value = endereco.bairro
        editcity.value = endereco.cidade
        editstate.value = endereco.estado
    } else {
        select.parentElement.lastElementChild.innerText = "Selecione um cliente primeiro"}
})
btnAtl.addEventListener("click", async (event) => {
    event.preventDefault()
    const data = {
        "nome": editname.value,
        "email": editmail.value,
        "sexo": editsex.value,
        "idade": parseInt(editnum.value),
        "cpf": editcpf.value,
        "endereco": {
            "estado": editstate.value,
            "cidade": editcity.value,
            "bairro": editbairro.value,
            "numero": editnumend.value,
            "rua": editrua.value,
            "cep": editcep.value
        }
    }
    await Api.editarCliente(data, select.value)
})