import React from 'react';
import $ from 'jquery';
import {createStore} from 'redux';

var tempState = {
    isLoaded : false,
    data : [
                {
                    "id": -1,
                    "title":"sample",
                    "note":"This is sample initial hardcoded note",
                        
                },
            ],
}

export function addNote(title, note){
    return{
        type : 'ADD_NOTE',
        note : note,
        title : title,
        
    }
}

export function getData(){
    return{
        type : 'GET_DATA',
        data : tempState.data,
    }
}


export function togLo(){
    console.log('I was executed')
    return {
        type : 'TG_LOADED',
        isLoaded : tempState.isLoaded
    }
}

export function isLoaded(){
    return { type : 'IS_LOADED',
            isLoaded : tempState.isLoaded
        }
}

export function updateList(data){
    //console.log(data)
    return{
        type : 'UPDATE_LIST',
        data : data,
    }
}


function tempApp(tempState, action){
    console.log(action.type)
    switch(action.type){
        case 'IS_LOADED':
            return tempState.isLoaded;

        case 'TG_LOADED':
            return tempState.isLoaded;

        case 'GET_DATA':
            
            return tempState.data;

        case 'ADD_NOTE':
            tempState.data.push({
                note : action.note,
                title : action.title,

            });
            return tempState;

        

        case 'UPDATE_LIST':
            var newState = Object.assign({},tempState);
            newState.data = action.data;
            newState.isLoaded = true;
            console.log(newState.isLoaded)
            //tempState.isLoaded = true;
            //console.log (tempState);
            return newState.data;

        default :
            return tempState;
    }
}

var store = createStore(tempApp, tempState);

export default store;