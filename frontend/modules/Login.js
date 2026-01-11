import validator from 'validator';

// Validação dos formulários de login e cadastro de usuários
export default class Login {
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
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');
        let error = false;

        this.clearErrors();

        if (!validator.isEmail(emailInput.value)) {
            this.createError(emailInput, 'Por favor, insira um e-mail válido.');
            error = true;
        }

        if (passwordInput.value.length < 3 || passwordInput.value.length > 50) {
            this.createError(passwordInput, 'Senha deve conter entre 3 a 50 caracteres');
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