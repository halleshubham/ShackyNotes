
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,HashRouter, Match, Switch, Route } from 'react-router-dom';
import { myRoute, Home, About, Contact, ShackyNote } from './myRoute.jsx';
import {Provider} from 'react-redux';
import store from './myStore';

//ReactDOM.render(<NoteList />, document.getElementById('app'));


ReactDOM.render((
    <Provider store = {store}>
     <HashRouter>
        <div>
            
                <Route exactly path = "/" component={myRoute}/>
                    <Route exactly path = "/home" component={Home}/>
                    <Route exactly path = "/about" component={About}/>
                    <Route exactly path = "/contact" component={Contact}/>
                    <Route path = "/shacky" component = {ShackyNote}/>
                    <Route path = "/*" component={myRoute}/>
            
        </div>
     </HashRouter>
     </Provider>
     ),
     document.getElementById('root')
);