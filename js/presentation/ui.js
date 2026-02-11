import { Services } from "../application/services.js";

let usuarioLogado = null;

// Inicializar verificação de login ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
  const logado = localStorage.getItem('s_logado');
  if (logado) {
    usuarioLogado = JSON.parse(logado);
    openApp(usuarioLogado);
  }
});

window.handleLogin = function () {
  const u = loginUser.value.trim();
  const p = loginPass.value.trim();

  if (!u || !p) {
    loginMsg.textContent = "Usuário ou senha incorretos";
    return;
  }

  const user = Services.login(u, p);
  if (!user) {
    loginMsg.textContent = "Usuário ou senha incorretos";
    return;
  }

  usuarioLogado = user;
  localStorage.setItem("s_logado", JSON.stringify(user));
  openApp(user);
};

window.openApp = function(user) {
  login.classList.add('hidden');
  app.classList.remove('hidden');
  
  userWelcome.textContent = user.usuario;
  userRole.textContent = user.tipo;
  
  renderFor(user.tipo);
};

window.renderFor = function(tipo) {
  adminArea.classList.toggle('hidden', tipo !== 'admin');
  secretariaArea.classList.toggle('hidden', tipo !== 'secretaria');
  doutorArea.classList.toggle('hidden', tipo !== 'doutor');
  relatoriosArea.classList.remove('hidden');
  refreshAll();
};

window.logout = function() {
  localStorage.removeItem('s_logado');
  usuarioLogado = null;
  location.reload();
};

// ================= USUÁRIOS =================
function saveUsers() {
  const users = Services.getAllUsers();
  localStorage.setItem('s_users', JSON.stringify(users));
}

window.cadastrarUsuario = function() {
  const t = newTipo.value;
  const u = newUser.value.trim();
  const p = newPass.value.trim();
  
  if (!u || !p) {
    msgUser.textContent = "Preencha os campos";
    msgUser.style.color = "red";
    return;
  }
  
  const sucesso = Services.cadastrarUsuario({usuario: u, senha: p, tipo: t});
  if (!sucesso) {
    msgUser.textContent = "Usuário já existe";
    msgUser.style.color = "red";
    return;
  }
  
  msgUser.textContent = "Usuário salvo";
  msgUser.style.color = "green";
  newUser.value = '';
  newPass.value = '';
  renderUsers();
}

function renderUsers() {
  const users = Services.getAllUsers();
  const tb = tUsuarios.querySelector('tbody');
  tb.innerHTML = '';
  users.forEach((u, i) => {
    tb.innerHTML += `<tr><td>${u.usuario}</td><td>${u.tipo}</td><td><button onclick="removerUsuario(${i})">Remover</button></td></tr>`;
  });
}

window.removerUsuario = function(i) {
  if (confirm('Excluir?')) {
    const users = Services.getAllUsers();
    users.splice(i, 1);
    localStorage.setItem('s_users', JSON.stringify(users));
    renderUsers();
  }
}

// ================= PACIENTES =================
function savePac() {
  const pacientes = Services.listarPacientes();
  localStorage.setItem('s_pac', JSON.stringify(pacientes));
}

window.salvarPaciente = function() {
  const nome = pNome.value.trim();
  const cpf = pCPF.value.trim();
  
  if (!nome || !cpf) {
    msgPaciente.textContent = "Nome e CPF são obrigatórios";
    msgPaciente.style.color = "red";
    return;
  }
  
  Services.salvarPaciente({
    nome,
    cpf,
    telefone: pTelefone.value,
    nasc: pNascimento.value,
    endereco: pEndereco.value,
    alergias: pAlergias.value,
    historico: pHistorico.value
  });
  
  msgPaciente.textContent = "Paciente salvo";
  msgPaciente.style.color = "green";
  limparFormPaciente();
  renderPacientes();
  renderSelects();
  renderProntuarioSelect();
  refreshRelatorios();
}

function renderPacientes() {
  const pacientes = Services.listarPacientes();
  const tb = tPacientes.querySelector('tbody');
  tb.innerHTML = '';
  pacientes.forEach(p => {
    tb.innerHTML += `<tr><td>${p.nome}</td><td>${p.cpf}</td><td><button onclick="editarPaciente(${p.id})">Editar</button><button onclick="removerPaciente(${p.id})">Remover</button></td></tr>`;
  });
}

window.editarPaciente = function(id) {
  const pacientes = Services.listarPacientes();
  const p = pacientes.find(x => x.id === id);
  pNome.value = p.nome;
  pCPF.value = p.cpf;
  pTelefone.value = p.telefone;
  pNascimento.value = p.nasc;
  pEndereco.value = p.endereco;
  pAlergias.value = p.alergias;
  pHistorico.value = p.historico;
  const updated = pacientes.filter(x => x.id !== id);
  localStorage.setItem('s_pac', JSON.stringify(updated));
  renderPacientes();
}

window.removerPaciente = function(id) {
  if (confirm('Excluir?')) {
    const pacientes = Services.listarPacientes();
    const updated = pacientes.filter(x => x.id !== id);
    localStorage.setItem('s_pac', JSON.stringify(updated));
    renderPacientes();
    renderSelects();
    renderProntuarioSelect();
  }
}

window.limparFormPaciente = function() {
  pNome.value = '';
  pCPF.value = '';
  pTelefone.value = '';
  pNascimento.value = '';
  pEndereco.value = '';
  pAlergias.value = '';
  pHistorico.value = '';
  msgPaciente.textContent = '';
}

// ================= CONSULTAS =================
function saveCons() {
  const consultas = Services.listarConsultas();
  localStorage.setItem('s_cons', JSON.stringify(consultas));
}

window.salvarConsulta = function() {
  const pid = Number(selPaciente.value);
  const doc = selDoutor.value;
  const data = cData.value;
  const hora = cHora.value;
  const valor = parseFloat(cValor.value || 0);
  
  if (!pid || !doc || !data || !hora) {
    msgConsulta.textContent = "Preencha todos os campos";
    msgConsulta.style.color = "red";
    return;
  }
  
  Services.agendarConsulta({
    pid,
    doutor: doc,
    data,
    hora,
    valor,
    obs: cObs.value,
    status: 'agendada'
  });
  
  msgConsulta.textContent = "Consulta agendada";
  msgConsulta.style.color = "green";
  limparFormConsulta();
  renderConsultas();
  renderConsultasDoutor();
  renderSelects();
  refreshRelatorios();
}

function renderConsultas() {
  const consultas = Services.listarConsultas();
  const pacientes = Services.listarPacientes();
  const tb = tConsultas.querySelector('tbody');
  tb.innerHTML = '';
  consultas.forEach(c => {
    const p = pacientes.find(x => x.id === c.pid);
    tb.innerHTML += `<tr><td>${p ? p.nome : '-'}</td><td>${c.doutor}</td><td>${c.data}</td><td>${c.hora}</td><td>R$ ${c.valor.toFixed(2)}</td><td>${c.status}</td><td><button onclick="marcarRealizada(${c.id})">Realizada</button><button onclick="cancelarConsulta(${c.id})">Cancelar</button></td></tr>`;
  });
}

window.marcarRealizada = function(id) {
  const consultas = Services.listarConsultas();
  const c = consultas.find(x => x.id === id);
  if (c) {
    c.status = 'realizada';
    localStorage.setItem('s_cons', JSON.stringify(consultas));
    renderConsultas();
    renderConsultasDoutor();
    refreshRelatorios();
  }
}

window.cancelarConsulta = function(id) {
  if (confirm('Cancelar?')) {
    const consultas = Services.listarConsultas();
    const updated = consultas.filter(x => x.id !== id);
    localStorage.setItem('s_cons', JSON.stringify(updated));
    renderConsultas();
    renderConsultasDoutor();
    renderSelects();
    refreshRelatorios();
  }
}

window.limparFormConsulta = function() {
  cData.value = '';
  cHora.value = '';
  cValor.value = '';
  cObs.value = '';
  msgConsulta.textContent = '';
}

function renderConsultasDoutor() {
  const consultas = Services.listarConsultas();
  const pacientes = Services.listarPacientes();
  const tb = tConsultasDoutor.querySelector('tbody');
  tb.innerHTML = '';
  const log = usuarioLogado || {};
  consultas.filter(c => c.doutor === log.usuario).forEach(c => {
    const p = pacientes.find(x => x.id === c.pid);
    tb.innerHTML += `<tr><td>${p ? p.nome : '-'}</td><td>${c.data}</td><td>${c.hora}</td><td>${c.status}</td><td><button onclick="marcarRealizada(${c.id})">Realizada</button></td></tr>`;
  });
}

// ================= PRONTUÁRIO =================
function saveEvo() {
  const evolucoes = JSON.parse(localStorage.getItem('s_evo')) || {};
  localStorage.setItem('s_evo', JSON.stringify(evolucoes));
}

window.adicionarEvolucao = function() {
  const pid = Number(selProntPaciente.value);
  const txt = prontEvolucao.value.trim();
  
  if (!pid || !txt) {
    msgEvolucao.textContent = "Selecione paciente e escreva algo";
    msgEvolucao.style.color = "red";
    return;
  }
  
  const autor = (usuarioLogado || {}).usuario;
  Services.adicionarEvolucao(pid, txt, autor);
  
  prontEvolucao.value = '';
  msgEvolucao.textContent = "Evolução salva";
  msgEvolucao.style.color = "green";
  renderHistorico(pid);
}

function renderHistorico(pid) {
  renderPacienteInfo(pid);
  const evo = JSON.parse(localStorage.getItem('s_evo')) || {};
  const area = histArea;
  const list = evo[pid] || [];
  area.innerHTML = list.map(e => `<div style='border-bottom:1px solid #eee;padding:6px'><strong>${e.autor}</strong> <span class='muted'>(${new Date(e.data).toLocaleString()})</span><div>${e.texto}</div></div>`).join('');
}

window.mostrarInfoPaciente = function() {
  const pid = Number(selProntPaciente.value);
  renderPacienteInfo(pid);
}

function renderPacienteInfo(pid) {
  const pacientes = Services.listarPacientes();
  const p = pacientes.find(x => x.id === pid);
  if (!p) {
    infoPaciente.innerHTML = '';
    return;
  }
  infoPaciente.innerHTML = `<div><strong>Nome:</strong> ${p.nome}</div><div><strong>CPF:</strong> ${p.cpf}</div><div><strong>Telefone:</strong> ${p.telefone}</div><div><strong>Endereço:</strong> ${p.endereco}</div><div><strong>Nascimento:</strong> ${p.nasc}</div><div><strong>Alergias:</strong> ${p.alergias}</div><div><strong>Histórico:</strong> ${p.historico}</div>`;
}

window.limparEvolucao = function() {
  prontEvolucao.value = '';
  msgEvolucao.textContent = '';
}

// ================= FINANCEIRO =================
function savePag() {
  const pagamentos = JSON.parse(localStorage.getItem('s_pag')) || [];
  localStorage.setItem('s_pag', JSON.stringify(pagamentos));
}

window.registrarPagamento = function() {
  const id = Number(selConsultaPag.value);
  const valor = parseFloat(pagValor.value);
  
  if (!id || valor <= 0) {
    msgPagamento.textContent = "Selecione consulta e valor válido";
    msgPagamento.style.color = "red";
    return;
  }
  
  const pagamentos = JSON.parse(localStorage.getItem('s_pag')) || [];
  pagamentos.push({
    id: Date.now(),
    consultaId: id,
    valor,
    forma: pagForma.value,
    data: new Date().toISOString()
  });
  localStorage.setItem('s_pag', JSON.stringify(pagamentos));
  
  const consultas = Services.listarConsultas();
  const c = consultas.find(x => x.id === id);
  if (c) {
    c.status = 'paga';
    localStorage.setItem('s_cons', JSON.stringify(consultas));
  }
  
  msgPagamento.textContent = "Pagamento registrado";
  msgPagamento.style.color = "green";
  renderConsultas();
  renderSelects();
  refreshRelatorios();
}

window.limparPagamento = function() {
  pagValor.value = '';
  msgPagamento.textContent = '';
}

// ================= SELECTS / RELATÓRIOS =================
function renderSelects() {
  const pacientes = Services.listarPacientes();
  const users = Services.getAllUsers();
  const consultas = Services.listarConsultas();
  
  selPaciente.innerHTML = '';
  selDoutor.innerHTML = '';
  selConsultaPag.innerHTML = '';
  
  pacientes.forEach(p => selPaciente.innerHTML += `<option value='${p.id}'>${p.nome}</option>`);
  users.filter(u => u.tipo === 'doutor').forEach(d => selDoutor.innerHTML += `<option value='${d.usuario}'>${d.usuario}</option>`);
  consultas.forEach(c => {
    const p = pacientes.find(x => x.id === c.pid);
    selConsultaPag.innerHTML += `<option value='${c.id}'>${p ? p.nome : '-'} - ${c.data}</option>`;
  });
}

function renderProntuarioSelect() {
  const pacientes = Services.listarPacientes();
  selProntPaciente.innerHTML = '';
  pacientes.forEach(p => selProntPaciente.innerHTML += `<option value='${p.id}'>${p.nome}</option>`);
  selProntPaciente.onchange = () => renderHistorico(Number(selProntPaciente.value));
}

function refreshRelatorios() {
  const pacientes = Services.listarPacientes();
  const consultas = Services.listarConsultas();
  const pagamentos = JSON.parse(localStorage.getItem('s_pag')) || [];
  
  rTotalPacientes.textContent = pacientes.length;
  rTotalConsultas.textContent = consultas.length;
  
  const rec = pagamentos.reduce((s, x) => s + x.valor, 0);
  rReceita.textContent = rec.toFixed(2);
  totalReceita.textContent = rec.toFixed(2);
  
  const pend = consultas.filter(c => c.status !== 'paga').reduce((s, c) => s + c.valor, 0);
  totalPendentes.textContent = pend.toFixed(2);
}

function refreshAll() {
  renderUsers();
  renderPacientes();
  renderConsultas();
  renderConsultasDoutor();
  renderSelects();
  renderProntuarioSelect();
  refreshRelatorios();
}
