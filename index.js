const emailRegExp = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const form = document.querySelector('.form');
const sendButton = document.querySelector('.send-button');
const nameInput = document.querySelector('.name-input')
const emailInput = document.querySelector('.email-input');
const emailWrapper = document.querySelector('.email-wrapper');

form.addEventListener('submit', e => { e.preventDefault() });
sendButton.addEventListener('click', sendButtonHandler);

function sendButtonHandler() {
    if (!checkEmailValidity(emailInput.value)) {
        emailWrapper.classList.add('invalid');
        return
    }
    if (emailWrapper.classList.contains('invalid')) emailWrapper.classList.remove('invalid');
    const password = generatePassword();

    sendEmail(emailInput.value, nameInput.value, password);
}

function generatePassword() {
    const symbolsArr = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
    let password = '';

    for (let i = 0; i < 11; i++) {
        const curSymbolIndex = Math.floor(Math.random() * (symbolsArr.length - 1));
        const curSymbol = symbolsArr[curSymbolIndex];

        password += curSymbol;
    }

    return password
}

function sendEmail(email, name, password) {
    emailjs.send("service_xj3szcn", "template_jseswhb", {
        from_name: 'Donat',
        to_name: name,
        password: password,
        to_email: email
    });
}

function checkEmailValidity(data) {
    return emailRegExp.test(data);
}