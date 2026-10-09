Sistema de Clínica Médica
1. Visão Geral do Projeto

Este projeto consiste em um sistema web para gerenciamento de clínica médica, desenvolvido na disciplina de Arquitetura de Sistemas.

A aplicação foi estruturada seguindo o modelo em camadas (Presentation, Application e Persistence), organizando as responsabilidades do sistema de forma modular.

Embora o sistema possua separação lógica em camadas, sua execução ocorre inteiramente no lado do cliente (client-side), utilizando armazenamento local para persistência dos dados.

Tecnologias Utilizadas

HTML5

CSS3

JavaScript

Docker

Nginx

2. Estrutura do Projeto

A estrutura do projeto está organizada da seguinte forma:

A.D.S-Clinica/
│
├── Dockerfile
├── docker-compose.yml
├── README.md
├── index.html
│
├── Css/
│   └── style.css
│
└── JS/
    ├── application/
    │   └── services.js
    ├── persistence/
    │   └── repository.js
    └── presentation/
        └── ui.js

Organização em Camada

Presentation: Responsável pela interface com o usuário.

Application: Contém as regras de negócio do sistema.

Persistence: Gerencia o armazenamento dos dados.

Essa separação melhora a organização e facilita manutenção e evolução futura.

3. Containerização com Docker

A aplicação foi containerizada utilizando Docker, permitindo sua execução padronizada em qualquer ambiente.

3.1 Imagem Base

Foi utilizada a imagem:

nginx:alpine


Justificativa:

Imagem leve

Ideal para servir aplicações web estáticas

Amplamente utilizada em produção

4. Explicação do Dockerfile
FROM

Define a imagem base utilizada para criar o container.

FROM nginx:alpine

WORKDIR

Define o diretório de trabalho dentro do container.

WORKDIR /usr/share/nginx/html

RUN

Remove os arquivos padrão do Nginx antes de copiar a aplicação.

RUN rm -rf ./*

COPY

Copia todos os arquivos da aplicação para o diretório do servidor web dentro do container.

COPY . .

EXPOSE

Expõe a porta 80 do container.

EXPOSE 80

CMD

Define o comando que inicia o servidor Nginx quando o container é executado.

CMD ["nginx", "-g", "daemon off;"]

5. Docker Compose

Foi utilizado Docker Compose para simplificar a execução da aplicação.

Serviço configurado

clinica

Constrói a imagem a partir do Dockerfile

Mapeia a porta 8080 da máquina para a porta 80 do container

Arquivo docker-compose.yml:

version: '3.8'

services:
  clinica:
    build: .
    ports:
      - "8080:80"

6. Execução da Aplicação
Clonar o repositório
git clone <link-do-repositorio>
cd A.D.S-Clinica

Executar com Docker Compose
docker compose up --build


A aplicação ficará disponível em:

http://localhost:8080

7. Execução Local vs Execução Containerizada
Execução Local

A aplicação é aberta diretamente pelo navegador.

Depende do ambiente da máquina do usuário.

Execução com Docker

A aplicação roda dentro de um container isolado.

Ambiente padronizado.

Maior portabilidade.

Pode ser executada em qualquer sistema com Docker instalado.

8. Comandos Docker Utilizados

docker compose up --build
Constrói a imagem e executa o container.

docker build -t nome-imagem .
Constrói a imagem manualmente.

docker run -p 8080:80 nome-imagem
Executa o container manualmente.