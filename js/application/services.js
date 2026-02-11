import { Repository } from "../persistence/repository.js";

export const Services = {

  login(usuario, senha) {
    const users = Repository.getUsers();
    return users.find(u => u.usuario === usuario && u.senha === senha);
  },

  getAllUsers() {
    return Repository.getUsers();
  },

  cadastrarUsuario(novo) {
    const users = Repository.getUsers();
    if (users.find(u => u.usuario === novo.usuario)) return false;
    users.push(novo);
    Repository.saveUsers(users);
    return true;
  },

  salvarPaciente(paciente) {
    const pacientes = Repository.getPacientes();
    pacientes.push({ id: Date.now(), ...paciente });
    Repository.savePacientes(pacientes);
  },

  listarPacientes() {
    return Repository.getPacientes();
  },

  agendarConsulta(consulta) {
    const consultas = Repository.getConsultas();
    consultas.push({ id: Date.now(), ...consulta });
    Repository.saveConsultas(consultas);
  },

  listarConsultas() {
    return Repository.getConsultas();
  },

  adicionarEvolucao(pid, texto, autor) {
    const evo = Repository.getEvolucoes();
    evo[pid] = evo[pid] || [];
    evo[pid].push({
      id: Date.now(),
      texto,
      autor,
      data: new Date().toISOString()
    });
    Repository.saveEvolucoes(evo);
  }
};
