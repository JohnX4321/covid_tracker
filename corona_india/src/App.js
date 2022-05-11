import React from 'react';
import logo from './logo.svg';
import './App.css';
import ReactTable from 'react-table-v6';



import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import Main from "./Main";
import Admin from "./Admin";
import MainTab from "./MainTab";
import Home from './State/home'
//import MapExplore from "./State/state_map";
import ModMap from "./State/modmap";


const axios=require('axios');

const mongoose=require('mongoose');


const DistrictSchema=require('./districtSchema');

mongoose.Promise=global.Promise;
let db;

export default class App extends React.Component{


    render() {

        return(

            <Router>

                <div>

                    <Switch>
                        <Route exact path="/" component={MainTab} />

                        <Route path="/admin" component={Admin} />




                    </Switch>

                </div>

            </Router>

        )

    }

}


