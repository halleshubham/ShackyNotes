import React from 'react';
import $ from 'jquery';
import { HashRouter, Switch, Link, Route } from 'react-router-dom'
import NoteList from './App.jsx';
import store from './App.jsx';

export class myRoute extends React.Component{

    render(){
            
        return(
            <div>
                <Header />
                <div className="container theme-showcase">
                    <div className = "jumbotron">
                    {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
    

}




export class Header extends React.Component{
    render(){
        return(
            <nav className = "navbar navbar-inverse navbar-fixed-top">
                <div className = "container ">
                    <div className ="navbar-header">
                        <div className = "col-md-3">
                        
                        </div>
                        <div className = "navbar-brand">
                            <Link to = "/">BlaH</Link>
                        </div>
                    </div>
                
                    
                        <div itemID = "navbar" className="navbar-collapse collapse">
                            <ul className = "nav navbar-nav">
                                <li><Link to = "/home">Home</Link></li>
                                <li><Link to = "/about">About</Link></li>
                                <li><Link to = "/contact">Contact</Link></li>
                                <li><Link to = "/shacky">ShackyNotes</Link></li>
                            </ul>
                            
                        </div>
                    
                </div>
            </nav>
        )
    }
}


export class ShackyNote extends React.Component {
    render(){
        return(
        <div>
        <div className = "col-md-1"></div>
            <div className = "col-md-10">
                <NoteList />
            </div>
        </div>
        )
    }
}


export class Home extends React.Component {
   render() {
      return(
         <div>
            
            <div className="col-md-3"></div>
            <h1>Home...</h1>
            
         </div>
      )
   }
}


export class About extends React.Component {
   render() {
      return (
         <div>
            
            <div className="col-md-3"></div>
            <h1>About...</h1>
            
         </div>
      )
   }
}


export class Contact extends React.Component {
   render() {
       
      return (
         <div>
            
            <div className="col-md-3"></div>
            <h1>Contact...</h1>
            
         </div>
      )
   }
}
