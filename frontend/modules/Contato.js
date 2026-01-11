import validator from 'validator';

export default class Contato {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    events() {
        if (!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        });
    }

    validate(e) {
        const el = e.target;
        const nameInput = el.querySelector('input[name="name"]');
        const emailInput = el.querySelector('input[name="email"]');
        const telInput = el.querySelector('input[name="tel"]');
        let error = false;

        this.clearErrors();

        if (emailInput.value && !validator.isEmail(emailInput.value)) {
            this.createError(emailInput, 'Por favor, insira um e-mail válido.');
            error = true;
        }

        if (!nameInput.value) {
            this.createError(nameInput, 'Nome é um campo obrigatório.');
            error = true;
        }

        if (!emailInput.value && !telInput.value) {
            this.createError(emailInput, 'Pelo menos um contato precisa ser enviado: e-mail ou telefone.');
            this.createError(telInput, 'Pelo menos um contato precisa ser enviado: e-mail ou telefone.');
            error = true;
        }

        if (!error) el.submit();
    }

    createError(formField, msg) {
        const div = document.createElement('div');
        div.style.color = 'red';
        div.classList.add('div-error');
        div.innerHTML = msg;
        formField.insertAdjacentElement('afterend', div);
    }

    clearErrors() {
        const errorDivs = this.form.querySelectorAll('.div-error');
        errorDivs.forEach(div => div.remove());
    }
}