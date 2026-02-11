
const K_USERS='s_users',K_PAC='s_pac',K_CONS='s_cons',K_EVO='s_evo',K_PAG='s_pag';

export const Repository = {

  getUsers() {
    return JSON.parse(localStorage.getItem(K_USERS)) || [
      {usuario:'admin',senha:'123',tipo:'admin'},
      {usuario:'dr1',senha:'123',tipo:'doutor'},
      {usuario:'dr2',senha:'123',tipo:'doutor'},
      {usuario:'dr3',senha:'123',tipo:'doutor'},
      {usuario:'sec',senha:'123',tipo:'secretaria'}
    ];
  },

  saveUsers(users) {
    localStorage.setItem(K_USERS, JSON.stringify(users));
  },

  getPacientes() {
    return JSON.parse(localStorage.getItem(K_PAC)) || [];
  },

  savePacientes(pacientes) {
    localStorage.setItem(K_PAC, JSON.stringify(pacientes));
  },

  getConsultas() {
    return JSON.parse(localStorage.getItem(K_CONS)) || [];
  },

  saveConsultas(consultas) {
    localStorage.setItem(K_CONS, JSON.stringify(consultas));
  },

  getEvolucoes() {
    return JSON.parse(localStorage.getItem(K_EVO)) || {};
  },

  saveEvolucoes(evo) {
    localStorage.setItem(K_EVO, JSON.stringify(evo));
  },

  getPagamentos() {
    return JSON.parse(localStorage.getItem(K_PAG)) || [];
  },

  savePagamentos(pag) {
    localStorage.setItem(K_PAG, JSON.stringify(pag));
  }
};
