import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Login from './modules/Login';
import Contato from './modules/Contato';

const cadastro = new Login('.form-cadastro');
const login = new Login('.form-login');

const contatoEditar = new Contato('.contato-editar');
const contatoCadastrar = new Contato('.contato-cadastrar')

cadastro.init();
login.init();

contatoEditar.init();
contatoCadastrar.init();
