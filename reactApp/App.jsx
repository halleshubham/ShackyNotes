import React from 'react';
import $ from 'jquery';
import NoteRow from './NoteRow.jsx';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'
import store from './myStore';
import {addNote, getData, isLoaded, updateList, toggleLoaded, toggleIsTrans} from './myStore';


class App extends React.Component {
   render() {
      return (
         <div>
            Hello World!!!
         </div>
      );
   }
}

class NoteList extends React.Component{

    constructor(props){
        super(props)

        this.state ={
            data : [
                {
                    "id": -1,
                    "title":"sample",
                    "note":"This is sample hardcoded note",
                        
                }],
            isLoaded : false,
            newTitle:"",
            newNote:"",
            
        }

   this.setNext = this.setNext.bind(this);
   this.iter = this.iter.bind(this);
   this.addNewTitle = this.addNewTitle.bind(this);
   this.addNewNote = this.addNewNote.bind(this);
   this.insertNew = this.insertNew.bind(this);
   

   
};

iter(){
    var i = 0;
    for(i = 0; i<this.state.data.length ; i++)
    {
       render (<NoteRow key = {this.state.data[i].id} data = {this.state.data} />);
    }
};






//==============------------------------------------------------------------------------
setNext(){
    let l = store.dispatch(isLoaded())
    console.log(l)
    if(!l.isLoaded){
        console.log("AJAX is being called !!")
       $.ajax({
           url : "http://127.0.0.1:8000/polls/note/",
           type : "GET",
           // dataType: 'jsonp',
           success : function (response){
               //console.log(response);
               this.setState({data : response, isLoaded : true});
               var a = store.dispatch(updateList(response));
               console.log(a)
           }.bind(this),
           error: function (textStatus, errorThrown) {
              console.log(textStatus, errorThrown);
           }
       });
    }
    else{
        
        let k = store.dispatch(getData())
        console.log(k)
        this.setState({ data : k.data })
    }   
    
};

//==============------------------------------------------------------------------------
addNewTitle(event){
    this.setState({
        newTitle : event.target.value,

    });
    //console.log(this.state.newTitle);
}
addNewNote(event){
    this.setState({
        newNote : event.target.value,

    });
    //console.log(this.state.newNote);
    
}

//==============------------------------------------------------------------------------
insertNew(){
    //var jsonD = "{ \"title\" : '"+ this.state.newTitle+"', \"note\" : '"+this.state.newNote+"', }"
    $.ajax(
        {
            url:"http://127.0.0.1:8000/polls/note/",
            type:"POST",
            headers :
        {
            'Content-Type' : 'application/json'
        },

        data : JSON.stringify({ title : this.state.newTitle, note : this.state.newNote, }),
        error : function(textStatus, errorThrown){
            //console.log(this.state.data.id)
            console.log(textStatus, errorThrown);
        }.bind(this),
        success : function (response){
               //console.log(response);
               let arr = this.state.data;
               arr.push(response)
               this.setState({data : arr});
               
        }.bind(this),
    }
    
    );

    
    /*this.setNext();
    this.render();
    console.log(this.state.data);*/
}

componentWillMount(){
    this.setNext();
}
//==============------------------------------------------------------------------------
render(){
    
    return ( 
        <div className = "col col-md-10">
            <div className = "col-sm-12">
                <div className = "row over">
                {
                    //this.iter ?? <-- why using this isn't working ?
                    
                    this.state.data.map(function(note, i){
                        return (
                            <NoteRow key ={i} data = {note} id = {note.id} />
                        );
                    })
                }
                </div>
            <div className = "col-sm-3 clearfix">
            <div className = "panel panel-default">
                <div className = "panel-heading">
                    Insert new Note here ! <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                </div>
                <div className = "panel-body">
                    <div className="form-group row">
                        <label htmlFor="smFormGroupInput" className="col-sm-2 col-form-label col-form-label-sm">Title: </label><input className="form-control form-control-sm input-sm" type = "text" onChange = {this.addNewTitle} name = 'title' id = 'title'/><br/>
                    </div>
                    <div className="form-group row">
                     <label htmlFor="smFormGroupInput" className="col-sm-2 col-form-label col-form-label-sm">Note: </label><textarea className="form-control form-control-sm input-sm" id="smFormGroupInput" onChange = {this.addNewNote} name = 'note' id = 'note'/>
                    </div>
                    <div className="col-md-8">
                    <button className = "btn btn-xs btn-primary" onClick = {this.insertNew}>
                        <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                        Add new</button>
                    </div>
                </div>
            </div>
            </div>
            </div>
         </div>
         

        );
    }
}




//==============------------------------------------------------------------------------
/*<table content = 'center' frameBorder = '1' >
                    <tbody>
                <tr rowSpan = '3'>
                Hello SHa1ACK !<br/> We have stored your notes here !
                </tr>
                <tr>
                    <th> ID </th>
                    <th> Title</th>
                    <th> Note</th>
                </tr>
                {
                    //this.iter ?? <-- why using this isn't working ?
                    this.state.data.map(function(note, i){
                        return (
                            <NoteRow key ={i} data = {note} id = {note.id} />
                        );
                    })
                }
                <tr><td></td>
                    <td><input onChange = {this.addNewTitle} name = 'title' id = 'title'/></td>
                    <td><input onChange = {this.addNewNote} name = 'note' id = 'note'/></td>
                    <td><button className = "btn btn-primary" onClick = {this.insertNew}>Add new</button></td>
                </tr>
                
               </tbody>
                </table>*/


export default NoteList;