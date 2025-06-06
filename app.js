import express from 'express';
import conn from './config/db.js';
import cors from 'cors';
import adminRoutes from './routes/adminRoutes.js';
import medicoRoutes from './routes/medicoRoutes.js';
import pacienteRoutes from './routes/pacienteRoutes.js';
import assistenteRoutes from './routes/assistenteRoutes.js';
import horarioRoutes from './routes/horarioRoutes.js';
import consultaRoutes from './routes/consultaRoutes.js';
import slotRoutes from './routes/slotRoutes.js';
import pacienteAuthRoutes from './routes/pacienteAuthRoutes.js';
import medicoAuthRoutes from './routes/medicoAuthRoutes.js';
import assistenteAuthRoutes from './routes/assistenteAuthRoutes.js';
import adminAuthRoutes from './routes/adminAuthRoutes.js';


const app = express();
app.use(cors());
app.use(express.json());

app.use('/admin', adminRoutes);
app.use('/medicos', medicoRoutes);
app.use('/pacientes', pacienteRoutes);
app.use('/assistentes', assistenteRoutes);
app.use('/horarios', horarioRoutes);
app.use('/consultas', consultaRoutes);
app.use('/slots', slotRoutes);
app.use('/auth/paciente', pacienteAuthRoutes);
app.use('/auth/medico', medicoAuthRoutes);
app.use('/auth/assistente', assistenteAuthRoutes);
app.use('/auth/admin', adminAuthRoutes);


app.get('/', (req, res) => {
    res.send('API funcionando!');
});


app.listen(3000, () => {
    console.log('servidor rodando na porta 3000');
})