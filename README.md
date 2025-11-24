Criando a pasta raiz do projeto
    1 - Criando uma pasta com o nome: chatbot-4blue e subpastas: backend e frontend

Configurando o projeto (backend)
    1 - Criando e ativando um ambiente virtual venv com o comando,
        no terminal: - python -m venv venv
                     - venv\Scripts\activate

    2 - Instalando o Django no ambiente virtual com os comandos:
        - pip install django -> necessário para criar aplicações web
        - pip install djangorestframework -> necessário para construir APIs e auxiliar 
        a comunicação do beckend e o frontend
        - pip install django-cors-headers -> gerencia os cabeçalhos HTTP permitindo 
        requisições de diferentes lugares

Iniciando o projeto Django
    1 - Iniciar no terminal, dentro de backend/, use o comando: 
        - django-admin startproject backend_chat .
            -> Este comando cria a estrutura básica do projeto em Django

    2 - Criando o app do projeto, dentro de backend/, use o comando: 
        - python manage.py startapp chat
            -> Este comando cria a aplicação (app) dentro do projeto

    3 - Configurando o arquivo settings.py:
        - Em INSTALLED_APPS adicionar:
            - 'rest_framework',
            - 'corsheaders',
            - 'chat', 
        - Em MIDDLEWARE adicionar:
            - 'corsheaders.middleware.CorsMiddleware',
        - Em settings.py criar logo abaixo de MIDDLEWARE:
            - CORS_ALLOWED_ORIGINS = [
                'http://localhost:3000',
                'http://127.0.0.1:3000',
                ]
        - Em settings.py, ao final do arquivo, adicionar:
            - REST_FRAMEWORK = {
                'DEFAULT_AUTHENTICATION_CLASSES': [],
                'DEFAULT_PERMISSION_CLASSES': [
                    'rest_framework.permissions.AllowAny',
                ],
                }
            - CSRF_TRUSTED_ORIGINS = [
                'http://localhost:3000',
                'http://127.0.0.1:3000',
                ]

Fase de criação do model - Mensagem
    1 - No app chat, em models.py foi criado a classe Mensagem que representa:
            - Usuário A ou B
            - Texto enviado
            - Texto da resposta moldado
            - Data de criação

    2 - No app chat, em serializers.py foi criado a classe MensagemSerializer que:
            - Transforma o Model em JSON para API.

    3 - No app chat, em views.py foi criado a classe ListaMensagensCriadas para:
            - Cria as rotas:
                - Listar mensagens
                - Criar mensagem
                - Filtrar por usuário

    4 - No app chat, em urls.py:
            -Conecta as views do app.

    5 - No backend_chat, em urls.py:
            - Conecta todas as rotas ao caminho /api/

Fazendo o teste com migração
    1 - Rodar migrações no terminal, usar os comandos: 
        - python manage.py makemigrations
        - python manage.py migrate

    2 - Rodar servidor no terminal, com o comando: 
        - python manage.py runserver 8000

    3 - Acessar: http://127.0.0.1:8000/api/mensagem/

Fazendo o teste com a extensão do VS Code Thunder Client
    1 - Depois de instalada a extensão Thunder Client, clicar no ícone localizado
        na aba a esquerda do VS Code
    2 - Teste com requisição: POST:
        - Colocar a Url: http://127.0.0.1:8000/api/mensagem/
        - Em Headers, acrescentar a Headers: Content-Type e o Value: application/json
        - Em Body, escrever o código: 
            {
            "enviado": "A",
            "texto": "Olá"
            }
    3 - Enviar com o botão "Send". Se tudo estiver ok, uma mensagem com o código 200
        irá aparecer para você no console a direita

    4 - Teste com requisição: GET:
        - Colocar a Url: http://127.0.0.1:8000/api/mensagem/?usuario=A
    5 - Enviar com o botão "Send". Se tudo estiver ok, uma mensagem com o código 200
        irá aparecer para você no console a direita


Configurando o projeto (frontend)
    1 - No terminal, dentro da pasta frontend/, crie uma aplicação React, use o 
        comando: 
        - npx create-react-app frontend
            -> Cria a estrutura do projeto em React

    2 - Instalar o React-router-dom, no terminal, use o comando: 
        - npm install react-router-dom
            -> Gerencia a navegação entre diferentes rotas de uma aplicação React

    3 - Dentro da pasta src criar uma subpasta "services" e dentro de services
        um arquivo api.js, que lida com:
            - enviarMensagem() → POST
            - fetchMensagemParaUsuario() → GET

    4 - Dentro da pasta src criar uma subpasta "components" e dentro da pasta 
        components um arquivo userselector.js:
            - Seleciona Usuário A ou B

    5 - Dentro da pasta components criar um arquivo chat.js:
            - Exibe mensagens
            - Envia texto
            - Recebe resposta do backend

    6 - Dentro da pasta components criar um arquivo historico.js:
        - Lista todas mensagens do usuário ativo

    7 - Dentro da pasta src, no arquivo já existente App.js, configurar rotas e
        gerenciar:
            - Chat
            - Histórico
            - Usuário ativo

Fazendo o teste para rodar localmente
    1 - Manter o terminar do backend/ ativo com o comando:
        - python manage.py runserver 8000
            -> Para mostrar o histórico e conseguir criar novas mensagens

    1 - Em um novo terminal, dentro da pasta frontend/, rodar o comando: 
        - npm install
        - npm start

    2 - Acesse: http://localhost:3000