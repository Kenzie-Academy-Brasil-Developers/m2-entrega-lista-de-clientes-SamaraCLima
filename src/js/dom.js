import request from "./api.js"
class Render {
    static renderClients(arr){
        const ul = document.getElementById("container")
        arr.forEach(element => {
            const li     = document.createElement("li")
            const h2     = document.createElement("h2")
            const div    = document.createElement("div")
            const h3     = document.createElement("h3")
            const emailX = document.createElement("p")
            const idadeX = document.createElement("p")
            const cpfX   = document.createElement("p")
            const sexoX  = document.createElement("p")
            const div2       = document.createElement("div")
            const endereçoX = document.createElement("h3")
            const cepX       = document.createElement("p")
            const estadoX    = document.createElement("p")
            const cidadeX    = document.createElement("p")
            const bairroX    = document.createElement("p")
            const ruaX       = document.createElement("p")
            const numX    = document.createElement("p")
            li.classList.add("card")
            h2.innerText        = element.nome
            h3.innerText        = "Dados Pessoais"
            emailX.innerText    = `E-mail: ${element.email}`
            idadeX.innerText    = `Idade: ${element.idade}`
            cpfX.innerText      = `CPF: ${element.cpf}`
            sexoX.innerText     = `Sexo: ${element.sexo}`
            div.append(h3, emailX, idadeX, cpfX, sexoX)
            endereçoX.innerText = "Endereço"
            cepX.innerText       = `Cep: ${element.endereco.cep}`
            estadoX.innerText    = `Estado: ${element.endereco.estado}` 
            cidadeX.innerText    = `Cidade: ${element.endereco.cidade}`        
            bairroX.innerText    = `Bairro: ${element.endereco.bairro}`
            ruaX.innerText       = `Rua: ${element.endereco.rua}`
            numX.innerText    = `Numero: ${element.endereco.numero}`
            div2.append(endereçoX, cepX, estadoX, cidadeX, bairroX, ruaX, numX)
            li.append(h2, div, div2)
            console.log(li)
            ul.appendChild(li)});
    }
    static criandoConta(){
        let form = document.getElementById("formulario")
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const inputs = [...event.target]
            const obj={
                nome: `${inputs[0].value}`,
                email: inputs[1].value,
                sexo: `${inputs[4].value}`,
                idade: `${inputs[2].value}`,
                cpf: `${inputs[3].value}`,
                endereco: {
                    estado: `${inputs[10].value}`,
                    cidade: `${inputs[9].value}`,
                    bairro: `${inputs[8].value}`,
                    numero: inputs[7].value,
                    rua: `${inputs[6].value}`,
                    cep: `${inputs[5].value}`,
                }}
            request.cadastrarCliente(obj)})
    }
    static criandoOption(arr){
        const select = document.querySelector("select")
        const btnSelect = document.getElementById("btnSelect")
        arr.forEach((element) => {
            const option     = document.createElement("option")
            option.innerText = element.nome
            option.id        = element.id
            select.append(option)})
        btnSelect.addEventListener("click", (event) =>{
                event.preventDefault()
                let index               = select.selectedIndex
                let optionSelecionado   = select.children[index]
                Render.dadosClient(optionSelecionado.id)})
    }
    static async dadosClient(id){
        await fetch(`https://atividade-api-clientes.herokuapp.com/clientes/${id}`,{
            method: "GET",
            headers: {"Content-Type" : "application/json"}})
            .then((res) => res.json())
            .then((res) => {
                this.mostrarDadosClient(res)})
    }
    static async mostrarDadosClient(obj){
        const dadosDoClient = document.getElementById("dadosDoClient")
        const input = dadosDoClient.children
        console.log(input)
        input[2].value = obj.nome
        input[3].value = obj.email
        input[4].value = obj.idade
        input[5].value = obj.cpf
        input[6].value = obj.sexo
        input[8].value  = obj.endereco.cep
        input[9].value  = obj.endereco.rua
        input[10].value = obj.endereco.numero
        input[11].value = obj.endereco.bairro
        input[12].value = obj.endereco.cidade
        input[13].value = obj.endereco.estado
        const btnAtl = document.getElementById("btnAtlDados")
        btnAtl.addEventListener("click", (event) =>{
            event.preventDefault()
            const usuarioAtualizado ={
                nome: `${input[2].value}`,
                email: input[3].value,
                sexo: `${input[6].value}`,
                idade: `${input[4].value}`,
                cpf: `${input[5].value}`,
                endereco: {
                    estado: `${input[13].value}`,
                    cidade: `${input[12].value}`,
                    bairro: `${input[11].value}`,
                    numero: input[10].value,
                    rua: `${input[9].value}`,
                    cep: `${input[8].value}`,
                }}
            Render.editClient(usuarioAtualizado, obj.id)})
    }
    static async editClient(obj, id){
        await fetch(`https://atividade-api-clientes.herokuapp.com/clientes/${id}`,{
            method: "PATCH",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(obj)})
        .then((res) => res.json())
        .then((res) =>{
            if(res){
                alert("Cliente atualizado com sucesso!!")}})
        .catch((err) => {
            console.log(err)})
    }
    static async deletarClient(arr){
        const select = document.querySelector("select")
        const btnDel = document.getElementById("btnDeletar")
        arr.forEach((element) => {
            const option     = document.createElement("option")
            option.innerText = element.nome
            option.id        = element.id
            select.append(option)})
        btnDel.addEventListener("click", (event)=>{
            event.preventDefault()
            let index               = select.selectedIndex
            let optionSelecionado   = select.children[index]
            Render.deletar(optionSelecionado.id)})
    }
    static async deletar(id){
        await fetch(`https://atividade-api-clientes.herokuapp.com/clientes/${id}`,{
            method: "DELETE",
            headers:{"Content-Type" : "application/json"}})
        .then(alert("Cliente deletado!"))
    }}
export default Render