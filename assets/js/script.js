/Objeto usuario/
class User {
    constructor(name, birthdate, email, cpf, address, phone) {
        this.name = name;
        this.birthdate = birthdate;
        this.email = email;
        this.cpf = cpf;
        this.address = address;
        this.phone = phone;
        this.age = this.getAge();
        this.signo = this.getZodiacSign();
        this.client = this.client();
    }

    //rise up - Andra day escutar depois
    getAge() {
        const today = new Date();
        const birthDate = new Date(this.birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    }

    getZodiacSign() {
        let birthdate = new Date(this.birthdate);
        let day = birthdate.getDate();
        let month = birthdate.getMonth() + 1;
        console.log("Passou pelo getSigno() da class User");
    
        if ((month == 1 && day <= 20) || (month == 12 && day >= 22)) {
            return "Capricórnio ♑";
        } else if ((month == 1 && day >= 21) || (month == 2 && day <= 18)) {
            return "Aquário ♒";
        } else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
            return "Peixes ♓";
        } else if ((month == 3 && day >= 21) || (month == 4 && day <= 20)) {
            return "Áries ♈";
        } else if ((month == 4 && day >= 21) || (month == 5 && day <= 20)) {
            return "Touro ♉";
        } else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
            return "Gêmeos ♊";
        } else if ((month == 6 && day >= 22) || (month == 7 && day <= 22)) {
            return "Câncer ♋";
        } else if ((month == 7 && day >= 23) || (month == 8 && day <= 23)) {
            return "Leão ♌";
        } else if ((month == 8 && day >= 24) || (month == 9 && day <= 23)) {
            return "Virgem ♍";
        } else if ((month == 9 && day >= 24) || (month == 10 && day <= 23)) {
            return "Libra ♎";
        } else if ((month == 10 && day >= 24) || (month == 11 && day <= 22)) {
            return "Escorpião ♏";
        } else if ((month == 11 && day >= 23) || (month == 12 && day <= 21)) {
            return "Sagitário ♐";
        }
    }
    client() {
        if (this.age >= 18 && this.age <= 31) {
            return true
        } else {
            return false
        }
    }
}
/*Lista de usuários */
class ListUser {
    constructor() {
        this.users = [];
    }
    add(user) {
        if (isAnyInputEmpty()) {
            console.log("Entrou em if vazio")
            sendErrorMsg("Preencha todos os campos!!!");
        } else if (!valida_cpf(user.cpf)) {
            sendErrorMsg("Preencha com cpf válido!")
        } else if (isUserAlreadyRegistered()) {
            sendErrorMsg("CPF já cadastrado!")
        } else {
            this.users.push(user);
            cleanFields();
        }
    }
    contador() {
        return this.users.length;

    }
}

//limpar campos
function cleanFields() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("birthdate").value = "";
    document.getElementById("address").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("cpf").value = "";
}

function isAnyInputEmpty() {
    console.log("Entrou em vazio")
    const name = document.getElementById("name").value;
    const birthdate = document.getElementById("birthdate").value;
    const email = document.getElementById("email").value;
    const cpf = document.getElementById("cpf").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;

    console.log(name, birthdate, email, cpf, address, phone)

    if (name == "" || birthdate == "" || email == "" || cpf == "" || address == "" || phone == "") {
        console.log("Entrou entrou no if do vazio do vazio")
        return true;
    } else {
        return false;
    }
}

function showRegister() {
    document.getElementById("sub-div").classList.add("hidden");
    document.getElementById("title-page").classList.remove("hidden");
    document.getElementById("main-div").classList.remove("hidden");
    console.log("Passou pela funcao showRegister()");
}

function formatedCPF(cpf) {
    console.log("Passou pela funcao formatedCPF()");

    let cpfArray = cpf.split("");
    let cpfFormated = cpfArray[0] + cpfArray[1] + cpfArray[2]
        + "." + cpfArray[3] + cpfArray[4] + cpfArray[5] + "."
        + cpfArray[6] + cpfArray[7] + cpfArray[8] + "-" + cpfArray[9] + cpfArray[10];
    return cpfFormated;
}

function formatedCellphone(cellphone) {
    console.log("Passou pela funcao formatedCellphone()");

    let cellphoneArray = cellphone.split("");
    let cellphoneFormated = "(" + cellphoneArray[0] + cellphoneArray[1] + ")"
        + " " + cellphoneArray[2] + cellphoneArray[3] + cellphoneArray[4]
        + cellphoneArray[5] + cellphoneArray[6] + "-"
        + cellphoneArray[7] + cellphoneArray[8]
        + cellphoneArray[9] + cellphoneArray[10];
    return cellphoneFormated;
}

function valida_cpf(cpf) {
    console.log("Passou pela funcao valida_cpf()");

    var numeros, digitos, soma, i, resultado, digitos_iguais;
    digitos_iguais = 1;
    if (cpf.length < 11)
        return false;
    for (i = 0; i < cpf.length - 1; i++)
        if (cpf.charAt(i) != cpf.charAt(i + 1)) {
            digitos_iguais = 0;
            break;
        }
    if (!digitos_iguais) {
        numeros = cpf.substring(0, 9);
        digitos = cpf.substring(9);
        soma = 0;
        for (i = 10; i > 1; i--)
            soma += numeros.charAt(10 - i) * i;
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            return false;
        numeros = cpf.substring(0, 10);
        soma = 0;
        for (i = 11; i > 1; i--)
            soma += numeros.charAt(11 - i) * i;
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
            return false;
        return true;
    }
    else
        return false;
}

function isUserAlreadyRegistered(cpf) {

    listUser.users.forEach(user => {
        if (user.cpf == cpf) {
            return true;
        } else {
            return false;
        }
    })
}

function sendErrorMsg(msg) {
    console.log("Passou pela funcao sendErrorMsg()");

    document.getElementById("error-msg").innerHTML = msg;
    document.getElementById("error-msg").classList.remove("hidden");
    setTimeout(function () {
        document.getElementById("error-msg").classList.add("hidden");
    }, 4000);
}

//criando novo usuário
const listUser = new ListUser();

function createUser() {
    const name = document.getElementById("name").value;
    let birthdate = document.getElementById("birthdate").value;
    const email = document.getElementById("email").value;
    const cpf = document.getElementById("cpf").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;

    const user = new User(name, birthdate, email, cpf, address, phone);

    listUser.add(user);

}

function dateInPTBR(date) {
    const partes = date.split('-');
    const ano = partes[0];
    const mes = partes[1];
    const dia = partes[2]

    const dataPTBR = `${dia}/${mes}/${ano}`;
    return dataPTBR
}

//exibindo usuário
function showUsers() {
    document.getElementById("sub-div").classList.remove("hidden");
    document.getElementById("title-page").classList.add("hidden");
    document.getElementById("main-div").classList.add("hidden")

    let html = "";

    listUser.users.forEach((user) => {
        html += `
        <div class="list-eachUser">
            <p> Nome: ${user.name}</p>
            <p>Data de nascimento: ${dateInPTBR(user.birthdate)}</p>
            <p>Idade: ${user.getAge()}</p>
            <p>Email: ${user.email}</p>
            <p>CPF: ${formatedCPF(user.cpf)}</p>
            <p>Cidade: ${user.address}</p>
            <p>Número de celular: ${formatedCellphone(user.phone)}</p>
            <p>Signo: ${user.signo}</p>
            <p>Possível cliente: ${user.client ? "Sim" : "Não"}</p>
            <p></p>
        </div>
        `
    });
    document.getElementById("user-list").innerHTML = html;
    document.getElementById("contador").innerHTML = `contador: ${listUser.contador()}`;
}

// how many functions are there? 12
// how many classes are there? 2

// Boa sorte!

// user.client ? "Sim" : "Não"

// if (user.client == true) {
//     "Sim"
// } else {
//     "Não"
// }