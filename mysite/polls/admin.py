from django.contrib import admin

# Register your models here.
from .models import Question, Notes


admin.site.register(Question)
admin.site.register(Notes)