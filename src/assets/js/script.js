function getChartTypes() {
    const uppercase = document.querySelector('#include_uppercase').checked;
    const lowercase = document.querySelector('#include_lowercase').checked;
    const number = document.querySelector('#include_number').checked;
    const specialCharacter = document.querySelector('#include_special_character').checked;
   
    const charTypes = [];

    if (uppercase) {
        charTypes.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
    }
    if (lowercase) {
        charTypes.push('abcdefghijklmnopqrstuvwxyz')
    }
    if (number) {
        charTypes.push('0123456789')
    }
    if (specialCharacter) {
        charTypes.push('!@#$%^&*()_-+={}[]|\\/?><:;"\'.,~`')
    }

    return charTypes;
}

function getPasswordSize() {
    const slider = document.querySelector('#slider');
    let size = slider.value;
    document.querySelector('#valor').textContent = size;
    return size;
    //puxa o valor escolhido no slider e atualiza o valor que vai pro span onde o usuário de fato vê o número    
}

function randomCharType(charTypes) {
    const randomIndex = Math.floor(Math.random() * charTypes.length);
    return charTypes[randomIndex][Math.floor(Math.random() * charTypes[randomIndex].length)];
}


document.querySelector('#button').addEventListener('click', function () {
    const size = getPasswordSize();
    const charTypes = getChartTypes();
    const passwordDisplay = document.querySelector('.tooltip');

    if (charTypes.length === 0) {
        showPopup("Selecione pelo menos um tipo de caractere.");
        return; 
    }

    generatePassword(size, charTypes);

    passwordDisplay.scrollIntoView ({
        block: 'center'
    })
})


let sliderElement = document.querySelector("#slider")

let sizePassword = document.querySelector("#valor")
let password = document.querySelector("#password")

let containterPassword = document.querySelector("#container-password")
let novaSenha = "";

sizePassword.innerHTML=sliderElement.value;

sliderElement.oninput = function(){
    sizePassword.innerHTML = this.value;
}

function generatePassword(size, charTypes) {
    let pass = "";

    for (let i = 0; i < size; i++) {
        pass += randomCharType(charTypes);
    }

    if (pass) {
        containterPassword.classList.remove("hide");
        password.innerHTML = pass;
        novaSenha = pass;
    }

    return pass;
}

function showPopup(message, type = 'default') {
    const popup = document.querySelector('#custom-popup');
    const popupMessage = document.querySelector('#popup-message');
    popupMessage.textContent = message;

    // Adiciona uma classe para diferenciar o tipo de pop-up
    if (type === 'passwordCopied') {
        popup.classList.add('password-copied-popup');
    } else {
        popup.classList.remove('password-copied-popup');
    }

    popup.classList.remove('hide');
    popup.focus();  // Garante que o pop-up receba o foco quando exibido
}

function hidePopup() {
    const popup = document.querySelector('#custom-popup');
    popup.classList.add('hide');
}

document.querySelector('#popup-close').addEventListener('click', hidePopup);

document.addEventListener('keydown', function (event) {
    const popup = document.querySelector('#custom-popup');
    
    if (popup.classList.contains('hide')) {
        return;
    }
    

    if (event.key === 'Enter') {
        hidePopup();
    }
});

function copyPassword() {
    showPopup("Senha copiada com sucesso", 'passwordCopied');
    navigator.clipboard.writeText(novaSenha);
}