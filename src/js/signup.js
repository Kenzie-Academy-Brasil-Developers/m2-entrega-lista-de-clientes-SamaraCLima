import {
    Api
} from "./api.js";
class Cadastrar {
    static novoUsuario() {
        let signUpName = document.getElementById('nome')
        let signUpEmail = document.getElementById('email')
        let signUpnum = document.getElementById('numero')
        let signUpCpf = document.getElementById('cpf')
        let signUpSex = document.getElementById('sexo')
        let signUpCep = document.getElementById('cep')
        let signUpStreet = document.getElementById('rua')
        let signUpNumAdress = document.getElementById('numeroEndereco')
        let signUpDistrict = document.getElementById('bairro')
        let signUpCity = document.getElementById('cidade')
        let signUpState = document.getElementById('estado')
        let buttonSignUp = document.querySelector(".cadastro")
        buttonSignUp.addEventListener('click', async (event) => {
            event.preventDefault()
            const data = {
                "nome": signUpName.value,
                "email": signUpEmail.value,
                "sexo": signUpSex.value,
                "idade": parseInt(signUpnum.value),
                "cpf": signUpCpf.value,
                "endereco": {
                    "estado": signUpState.value,
                    "cidade": signUpCity.value,
                    "bairro": signUpDistrict.value,
                    "numero": signUpNumAdress.value,
                    "rua": signUpStreet.value,
                    "cep": signUpCep.value
                }}
            await Api.cadastrarCliente(data).then(res => {
                if (res.error) {
                    buttonSignUp.parentElement.lastElementChild.innerText = "Todos os campos são de preenchimento obrigatório"}
            })
        })
    }}
Cadastrar.novoUsuario()