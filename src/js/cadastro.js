import {
    Api
} from "./api.js";
class Cadastrar {
    static novoUsuario() {
        let nomeX = document.getElementById('nome')
        let emailX = document.getElementById('email')
        let numeroX = document.getElementById('numero')
        let cpfX = document.getElementById('cpf')
        let sexoX = document.getElementById('sexo')
        let cepX = document.getElementById('cep')
        let ruaX = document.getElementById('rua')
        let numeroEndX= document.getElementById('numeroEndereco')
        let bairroX = document.getElementById('bairro')
        let cidadeX = document.getElementById('cidade')
        let estadoX = document.getElementById('estado')
        let buttonSearch = document.querySelector(".cadastro")
        buttonSearch.addEventListener('click', async (event) => {
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
                    "cep": cepX.value
                }
            }
            await Api.cadastrarCliente(data).then(res => {
                if (res.error) {
                    bntCadastrar.parentElement.lastElementChild.innerText = "Todos os campos são de preenchimento obrigatório"
                }
            })

        })
    }
}

Cadastrar.novoUsuario()