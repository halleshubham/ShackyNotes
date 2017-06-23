import React from 'react';
import $ from 'jquery';
import store from './myStore';

//==============------------------------------------------------------------------------
class NoteRow extends React.Component{

constructor(props){
    super(props)

    this.state = {
        data : this.props.data,
        datea : this.props.data,
        key : this.props.id,
        isEdit: false,
        newNote : "",
        newTitle : "",
        
    }

this.editNote = this.editNote.bind(this);
this.handleChanga = this.handleChanga.bind(this);
this.handleChange = this.handleChange.bind(this);
this.delNote = this.delNote.bind(this);
}


//==============------------------------------------------------------------------------
   render(){
       if(this.state.data === "a")
       {
           console.log("data deleted, no data to display")
           return null;
       }
       else{     return(
<div className = "over">
    <div className = "col-sm-3 clearfix">
    <div className = "panel panel-primary">
    <div className = "panel-heading">
        <div className = "">{this.state.data.id}    { this.state.isEdit ? <input className="input" defaultValue={this.state.data.title} id = 'title' onChange = {this.handleChange}/>:
                    this.state.data.title }
        </div>
    </div>
    <div className = "panel-body"> {this.state.isEdit ? <input className="input" defaultValue={this.state.data.note} id = 'note' onChange = {this.handleChanga}/>:
                    this.state.data.note }
        <div className = "">
            <button className = "btn btn-xs btn-primary" onClick = {this.editNote.bind(this, this.state.data.id)} >
                <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                Edit </button>
            <button className = "btn btn-xs btn-primary" onClick = {this.delNote.bind(this,this.state.data.id)}>
                <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
                Delete</button>
        </div>
    </div>
    </div>
    </div>
</div>);
       }
}
/*<tr id = {this.state.data.id}>
            <td> {this.state.data.id}</td>
            <td> { this.state.isEdit ? <input defaultValue={this.state.data.title} id = 'title' onChange = {this.handleChange}/>:
                this.state.data.title }</td>
            <td> {this.state.isEdit ? <input defaultValue={this.state.data.note} id = 'note' onChange = {this.handleChanga}/>:
                this.state.data.note }</td>
            <td ><button className = "btn btn-primary" onClick = {this.editNote.bind(this, this.state.data.id)} > Edit </button></td>
            <td ><button className = "btn btn-primary" onClick = {this.delNote.bind(this,this.state.data.id)}>Delete</button></td>
            </tr>*/
//=============--------------
delNote(id){
    $.ajax({
        url : "http://127.0.0.1:8000/polls/act_note/"+id+"/",
        type : "DELETE",
        data : {
            "id": id,
        },
        success : function (response){
               //console.log(response);
               
               //console.log(typeof(this.state.data))
               this.setState({data : "a"});
               
        }.bind(this),
    });
        
    //here to refresh


}




//==============------------------------------------------------------------------------
handleChanga(event){
    this.setState({
        newNote : event.target.value
    })
     console.log("handleChangA - "+ this.state.newTitle);
}

//==============------------------------------------------------------------------------
handleChange(event){
    this.setState({
        newTitle : event.target.value
    })
     console.log("handleChangE - "+ this.state.newNote);
}
//==============------------------------------------------------------------------------
editNote(id){
    this.setState({
        isEdit: !this.state.isEdit
    })

if(this.state.isEdit){
    $.ajax({
        type : "POST",
        url : "http://127.0.0.1:8000/polls/act_note/"+ this.state.data.id +"/",

        headers :
        {
           
            'Content-Type' : 'application/json'
        },

       data : JSON.stringify({ title : this.state.newTitle, note : this.state.newNote, }),

      success : function (response){
        //console.log(response);
        this.setState({ data : response,});
        this.render();
        }.bind(this),

        error : function(textStatus, errorThrown){
            //console.log(this.state.data.id)
            console.log(textStatus, errorThrown);
        }.bind(this)

    });
    //console.log(store.getState());

//here to refresh
/*
$.ajax({
           url : "http://127.0.0.1:8000/polls/act_note/"+id+"/",
           type : "GET",
           // dataType: 'jsonp',
           success : function (response){
               console.log(response);
               this.setState({data : response});
           }.bind(this),
           error: function (textStatus, errorThrown) {
              console.log(textStatus, errorThrown);
           }
       });
    

    }*/

}
}
}

export default NoteRow;