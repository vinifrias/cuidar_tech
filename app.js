import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { autenticarToken, apenasAdmin } from './middlewares/authMiddleware.js';

import { loginAdmin, obterPerfilAdmin } from './controllers/AdminAuthController.js';
import { loginAssistente, obterPerfilAssistente } from './controllers/AssistenteAuthController.js';
import { loginMedico, obterPerfilMedico } from './controllers/MedicoAuthController.js';
import { cadastrarPaciente, loginPaciente } from './controllers/PacienteAuthController.js';

import * as AdminController from './controllers/AdminController.js';
import * as AssistenteController from './controllers/AssistenteController.js';
import * as MedicoController from './controllers/MedicoController.js';
import * as PacienteController from './controllers/PacienteController.js';
import ConsultaController from './controllers/ConsultaController.js';
import * as HorarioController from './controllers/HorarioController.js';
import * as SlotController from './controllers/SlotController.js';

const app = express();
const PORT = 3001; 

app.use(cors({
  origin: 'http://localhost:3000' 
}));
app.use(bodyParser.json());

app.post('/admin/login', loginAdmin);
app.post('/assistentes/login', loginAssistente);
app.post('/medicos/login', loginMedico);
app.post('/pacientes/cadastrar', cadastrarPaciente);
app.post('/pacientes/login', loginPaciente);

app.get('/admin/me', autenticarToken, apenasAdmin, obterPerfilAdmin);
app.get('/assistentes/me', autenticarToken, obterPerfilAssistente);
app.get('/medicos/me', autenticarToken, obterPerfilMedico);
app.get('/pacientes/me', autenticarToken, PacienteController.obterPerfil); 


app.get('/medicos', autenticarToken, MedicoController.listar); 
app.get('/assistentes', autenticarToken, AssistenteController.listar); 

app.post('/horarios', autenticarToken, HorarioController.criar); 
app.get('/horarios', autenticarToken, HorarioController.listar); 

app.get('/consultas', autenticarToken, ConsultaController.listarConsultas); 
app.post('/consultas', autenticarToken, ConsultaController.criarConsulta); 
app.delete('/consultas/:id', autenticarToken, ConsultaController.deletarConsulta);

app.get('/pacientes', autenticarToken, PacienteController.listar);

app.get('/slots/disponiveis', SlotController.listarDisponiveis); 
app.get('/slots/medico/:medico_id', SlotController.listarSlotsPorMedico); 



app.listen(PORT, () => {
  console.log(`Servidor de back-end rodando na porta ${PORT}`);
});