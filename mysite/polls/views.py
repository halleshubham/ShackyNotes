from django.http import HttpResponse, JsonResponse
from .models import Question, Notes
from django.template import loader
#from django.core import serializers
import json
from rest_framework.renderers import JSONRenderer
from polls.serializers import NotesSerializer
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET', 'POST', 'DELETE'])
def actNote(request, note_id):
    """
    Retrieve, update or delete a snippet instance.
    """
    try:
        no = Notes.objects.get(id=note_id)
    except Notes.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = NotesSerializer(no)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = NotesSerializer(no, data=JSONParser().parse(request))
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        no.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def notes_list(request):
    if request.method == 'GET':
        notes = Notes.objects.all()
        serializer = NotesSerializer(notes, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    elif request.method == 'POST':
        try:

            serializer = NotesSerializer(data = request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
        except Exception as e:
            
            return HttpResponse(json.dumps({'code': 500, 'message': str(e)}))




def index(request):
    recList = Question.objects.order_by('-pub_date')[:5]
    output = ', '.join([q.question_text for q in recList])
    return HttpResponse(output)
    #return HttpResponse("Hello, world. You're at the polls index.")
    
def detail(request, question_id):
    return HttpResponse("You're looking at question %s." % question_id)

def results(request, question_id):
    response = "You're looking at the results of question %s."
    return HttpResponse(response % question_id)

def vote(request, question_id):
    return HttpResponse("You're voting on question %s." % question_id)

def readNote(request, note_id):
    #serNoteList = serializers.serialize('json',[ Notes.objects.all(),])
    note = Notes.objects.all()
    #data = serializers.serialize('json',[note, ])

    #output = ', '.join([n.title for n in note])
    ser = NotesSerializer(note, many=True)
    return HttpResponse(json.dumps(ser.data))
    #return JsonResponse(ser.data)

#Not working, not used..
def updateNote(request, note_id, new_title, new_note):
    n = Notes.objects.filter(id = note_id)
    sern = NotesSerializer(n,many = True)
    sern.title = new_title
    sern.note = new_note
    sern.save()

    ne = Notes.objects.filter(id = note_id)
    ser = NotesSerializer(ne, many=True)
    output = "Updated Data is : " + json.dumps(ser.data)
    return HttpResponse(output)
