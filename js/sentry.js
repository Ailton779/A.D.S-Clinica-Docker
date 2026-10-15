window.sentryOnLoad = function () {
  Sentry.init({
    tracesSampleRate: 1.0
  });
};

document.addEventListener("DOMContentLoaded", function () {
  var botao = document.getElementById("btn-erro-sentry");
  console.log("botao encontrado:", botao);
  if (botao) {
    botao.addEventListener("click", function () {
      console.log("clique registrado");
      throw new Error("Erro proposital de teste do Sentry");
    });
  }
});