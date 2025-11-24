from django.db import models

# Create your models here.


class Mensagem(models.Model):
    ESCOLHA_USUARIO = [
        ('A', 'Usuário A'),
        ('B', 'Usuário B'),
    ]

    texto = models.TextField()
    enviado = models.CharField(max_length=1, choices=ESCOLHA_USUARIO)
    texto_resposta = models.TextField(blank=True, null=True)
    criado = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.enviado} - {self.texto[:30]}'
