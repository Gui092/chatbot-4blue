from django.contrib import admin
from django.urls import path
from .views import ListaMensagensCriadas, MensagensPorUsuarioView


urlpatterns = [
    path('mensagem/', ListaMensagensCriadas.as_view(), name='criar-mensagem'),
    path('mensagens/<str:usuario>/',
         MensagensPorUsuarioView.as_view(), name='listar-mensagens'),
]
