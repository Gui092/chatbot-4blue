from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import Mensagem
from .serializers import MensagemSerializer

# Create your views here.
RESPOSTAS_MOLDADAS = {
    'A': "Obrigado por seu contato, Usuário A. Em breve responderemos.",
    'B': "Recebemos sua mensagem, Usuário B. Obrigado — responderemos logo."
}


class ListaMensagensCriadas(generics.ListCreateAPIView):
    queryset = Mensagem.objects.all().order_by('criado')
    serializer_class = MensagemSerializer

    def get_queryset(self):
        usuario = self.request.query_params.get('usuario')
        if usuario in ['A', 'B']:
            return Mensagem.objects.filter(enviado=usuario).order_by('criado')
        return Mensagem.objects.all().order_by('criado')

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        mensagem = serializer.save()
        enviado = mensagem.enviado
        texto_resposta = RESPOSTAS_MOLDADAS.get(
            enviado, "Obrigado, entraremos em contato em breve.")
        mensagem.texto_resposta = texto_resposta
        mensagem.save()
        return Response(self.get_serializer(mensagem).data, status=status.HTTP_201_CREATED)


class MensagensPorUsuarioView(generics.ListAPIView):
    serializer_class = MensagemSerializer

    def get_queryset(self):
        usuario = self.kwargs.get('usuario')
        return Mensagem.objects.filter(enviado=usuario).order_by('criado')
