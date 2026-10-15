# Prática 02 - Observabilidade (Sentry) e ChatOps (GitHub + Discord)

Disciplina: PWEB-II | Professor: Wesnei de Paiva Batista | Aluno: Ailton

## Resumo

Nesta atividade integrei o Sentry (monitoramento de erros) e um webhook do GitHub para o Discord (notificações automáticas) no projeto A.D.S-Clinica-Docker, uma aplicação web em HTML, CSS e JavaScript puro servida por Nginx no Docker.

- **Sentry:** o SDK é carregado pelo Loader Script e inicializado com `Sentry.init` no arquivo `js/sentry.js`. Um botão na tela inicial (`Gerar erro de teste (Sentry)`) dispara um erro de propósito, e o Sentry captura esse erro com o stack trace.
- **ChatOps:** o webhook do repositório envia os eventos de Push e Pull Request para um canal do Discord, usando a URL do webhook com `/github` no final.

## Como testar

```bash
docker compose up --build
```

Abrir `http://localhost:8080` e clicar no botão cinza "Gerar erro de teste (Sentry)". O erro aparece na aba Issues do Sentry.

> Observação: bloqueadores de anúncios podem impedir o envio do erro ao Sentry. Testar em aba anônima ou com o bloqueador desativado.

## Print 1 - Código-fonte (Sentry.init e gatilho do erro)

Arquivo `js/sentry.js` com o `Sentry.init` e o código que lança o erro, junto com o botão no `index.html`.

<img width="560" height="372" alt="f9ce0557-ddd5-4fb3-a0a2-023be6868cf5" src="https://github.com/user-attachments/assets/adc665a3-3e82-4adc-8f06-d08f4c8ba0bc" />
<img width="804" height="505" alt="0c5e7acc-0cc3-4d56-94d4-366a18e1549f" src="https://github.com/user-attachments/assets/57bc9bbd-a93c-4c35-a376-75877a006e32" />



## Print 2 - Painel do Sentry (aba Issues)

Erro capturado em tempo real, com o stack trace.

<img width="1600" height="114" alt="14f8dbd1-f929-4fbf-96ef-1aefc450335a" src="https://github.com/user-attachments/assets/36a3b52b-17a5-44a9-b4af-e2c1556c3d8b" />


## Print 3 - Configuração do Webhook no GitHub

Settings > Webhooks, com a URL do Discord terminando em `/github` (token da URL ocultado por segurança).

<img width="1565" height="361" alt="19705c6c-b1d4-4c3e-a4e5-bdba44f6ede2" src="https://github.com/user-attachments/assets/8a983db8-3e5f-4ff8-96b3-3e11d50825e0" />


## Print 4 - Mensagem no canal do Discord

Mensagem automática postada pelo GitHub no canal após o `git push`.

<img width="1285" height="315" alt="5668978d-a8c0-43ef-bd9b-9adf08a73fa5" src="https://github.com/user-attachments/assets/0c4c2e0f-36ab-4548-86c5-bf40a5af90c6" />


## Extra - Botão de erro na interface

Botão usado para gerar o erro de teste.

<img width="1130" height="308" alt="130f5d36-6cc1-4fe5-a678-9c282e735be9" src="https://github.com/user-attachments/assets/8e87b311-3794-4cbf-809b-c2950ad88ab7" />


---
