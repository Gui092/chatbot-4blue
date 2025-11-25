Criando a pasta raiz do projeto
Criando uma pasta com o nome: chatbot-4blue e subpastas: backend e frontend

Configurando o projeto (backend)
Criando e ativando um ambiente virtual venv com o comando:
No terminal:

python -m venv venv
venv\Scripts\activate

Instalando o Django no ambiente virtual com os comandos:
pip install django → necessário para criar aplicações web
pip install djangorestframework → necessário para construir APIs e auxiliar a comunicação do beckend e o frontend
pip install django-cors-headers → gerencia os cabeçalhos HTTP permitindo requisições de diferentes lugares

Iniciando o projeto Django
Iniciar no terminal, dentro de backend/, use o comando:

django-admin startproject backend_chat .
→ Este comando cria a estrutura básica do projeto em Django

Criando o app do projeto, dentro de backend/, use o comando:
python manage.py startapp chat
→ Este comando cria a aplicação (app) dentro do projeto

Configurando o arquivo settings.py:
Em INSTALLED_APPS adicionar:
'rest_framework'
'corsheaders'
'chat'

Em MIDDLEWARE adicionar:
'corsheaders.middleware.CorsMiddleware'

Em settings.py, logo abaixo de MIDDLEWARE, adicionar:
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
]

Em settings.py, ao final do arquivo, adicionar:
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
}

CSRF_TRUSTED_ORIGINS = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
]

Fase de criação do model - Mensagem
No app chat, em models.py, foi criado a classe Mensagem que representa:
Usuário A ou B
Texto enviado
Texto da resposta moldado
Data de criação

No app chat, em serializers.py, foi criado a classe MensagemSerializer que:
Transforma o Model em JSON para API.

No app chat, em views.py, foi criado a classe ListaMensagensCriadas para:
Criar rotas:
Listar mensagens
Criar mensagem
Filtrar por usuário

No app chat, em urls.py:
Conecta as views do app.

No backend_chat, em urls.py:
Conecta todas as rotas ao caminho /api/

Fazendo o teste com migração
Rodar migrações no terminal, usar os comandos:

python manage.py makemigrations
python manage.py migrate

Rodar servidor no terminal, com o comando:

python manage.py runserver 8000

Acessar:
http://127.0.0.1:8000/api/mensagem/

Fazendo o teste com a extensão do VS Code Thunder Client
Depois de instalada a extensão Thunder Client, clicar no ícone localizado na aba a esquerda do VS Code

Teste com requisição POST:
Colocar a URL:
http://127.0.0.1:8000/api/mensagem/

Em Headers, acrescentar: 
Header: Content-Type e o Value: application/json

Em Body, escrever o código:
{
  "enviado": "A",
  "texto": "Olá"
}

Enviar com o botão Send.
Se tudo estiver ok, uma mensagem com o código 200 irá aparecer para você no console a direita

Teste com requisição GET:
Colocar a URL:
http://127.0.0.1:8000/api/mensagem/?usuario=A

Enviar com Send

Se tudo estiver ok, uma mensagem com o código 200 irá aparecer para você no console a direita

Configurando o projeto (frontend)
No terminal, dentro da pasta frontend/, crie uma aplicação React com o comando:

npx create-react-app frontend
→ Cria a estrutura do projeto em React

Instalar o React-router-dom, no terminal:

npm install react-router-dom
→ Gerencia a navegação entre diferentes rotas de uma aplicação React

Dentro da pasta src, criar subpasta services e dentro dela o arquivo api.js, que lida com:

enviarMensagem() → POST
fetchMensagemParaUsuario() → GET

Dentro da pasta src, criar subpasta components, e dentro dela o arquivo userselector.js:

Seleciona Usuário A ou B

Dentro de components, criar arquivo chat.js:

Exibe mensagens
Envia texto
Recebe resposta do backend

Dentro de components, criar arquivo historico.js:

Lista todas mensagens do usuário ativo

Dentro da pasta src, no arquivo já existente App.js, configurar rotas e gerenciar:

Chat
Histórico
Usuário ativo

Fazendo o teste para rodar localmente

Manter o terminal do backend/ ativo com:

python manage.py runserver 8000
→ Para mostrar o histórico e criar novas mensagens

Em um novo terminal, dentro da pasta frontend/, rodar:

npm install
npm start

Acessar:
http://localhost:3000