const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true}
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    cleanUp(){
        for(const key in this.body) {
            if(typeof this.body[key] !== 'string'){
                this.body[key] = '';
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }

    valida(){
        this.cleanUp();

        // Validações

        // O e-mail precisa ser válido
        if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
        // A senha precisa ter entre 6 e 50 caracteres
        if(this.body.password.length < 3 || this.body.password.length > 50) 
            this.errors.push('A senha precisa ter entre 3 a 50 caracteres');
    }

    async register(){
        this.valida();
        if(this.errors.length > 0) return;

        try{
            const salt = bcryptjs.genSaltSync();
            this.body.password = bcryptjs.hashSync(this.body.password, salt);
            this.user = await LoginModel.create(this.body);
        } catch(e){
            console.log(e);
        }
    }
}

module.exports = Login;