import ReactTable from "react-table-v6";
import React,{useState} from "react";
import * as styles from './main.css';
import {Bar, Line} from "react-chartjs-2";
import {Modal,Button,FormText} from 'react-bootstrap';
import {TextField} from "@material-ui/core";
import ReactLoading from 'react-loading';
import Home from "./State/home";

import MapExplorer from "./State/state_map";
import ModMap from "./State/modmap";

var axios=require('axios');



let url='/districts';
let time_url='/timeline';
var sum_in,sum_death;
//let chart_data2=[3,8,12,18,26,34,43,50,59,69,75];
var chartsets;
var chart_data=[];
var label_data=[];
var handleClose,handleShow;


export default class Main extends React.Component{


    constructor(props) {
        super(props);

        this.state={
            data: [],
            graph:[],
            recovered: '',
            ready: false,
            loading: true,
            show: true,
            copied: false
        };

        document.getElementById('globeViz').innerHTML="";

        sum_in=0;
        sum_death=0;

        Array.prototype.insert = function ( index, item ) {
            this.splice( index, 0, item );
        };

        this.mapRef=React.createRef();





    }

    handleClose=()=>{
        this.setState({show: false});
    }






    componentWillMount() {
        this.getGraphData();


        chartsets={
            labels: label_data,
            datasets:[{
                fill: false,
                lineTension: 0.5,
                borderWidth: 1,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                data: chart_data
            }]
        }
        //console.log(chart_data);

        //setTimeout(this.setState({ready : true}), 1000);
    }


    componentDidMount() {


        //this.scrape();
        this.display();
        sum_in=0;
        sum_death=0;








    }

    getGraphData=()=>{
        axios.get(time_url+'/all')
            .then((res)=>{
               // console.log(res.data);
                this.setState({graph: res.data,});
                var temp_inc=0;
                for(let i=0;i<this.state.graph.length;i++) {
                    chart_data[i]=parseInt(this.state.graph[i].cases)-temp_inc;
                    label_data[i]=parseInt(this.state.graph[i].cases);
                    temp_inc=label_data[i];
                    if (i===this.state.graph.length-1)
                        this.setState({recovered: this.state.graph[i].recovered});

                }

                this.setState({loading: false});


            });



    };


    display=()=>{
        axios.get(url+'/all')
            .then((res)=>{
               // console.log(res.data)
                this.setState({data: res.data,loading: false})

            });

    }



    render() {



        const columns=[
            {
                Header: 'District',
                accessor: 'name'
            },
            {
                Header: 'Cases',
                accessor: 'infected'
            },
            {
                Header: 'Deaths',
                accessor: 'death'
            }];

        sum_in=0;
        sum_death=0;

        this.state.data.map((dist)=>{
            sum_death+=parseInt(dist.death);
            sum_in+=parseInt(dist.infected);
        });


        if (this.state.loading)
        {
            return (<ReactLoading type={"bars"} color={"black"} />);
        }


        return (
            <div className="App">








                <h1>CORONA TRACKER FOR KARNATAKA</h1>



                <a href="https://www.covid19india.org/" className="text-warning bg-light">Click to view All India Statistics at Covid19India.org</a>



                <hr />


                <text id="mapLink" className="text-info" onClick={()=>window.scrollTo(0,this.mapRef.offsetTop)}><u>New feature: Karnataka Map added at bottom</u></text>

                <hr />




                <span className="formtext">{this.state.error}</span>


                <div className="container center" style={{alignItems: 'center',justifyContent: 'center',width: '100%'}}>
                    <div className="row" >
                        <div className="card" >
                            <h5 className="card-title text-danger">Total Cases</h5>
                            <hr />
                            <p className="card-text text-danger">{sum_in}</p>
                        </div>

                        <div className="card" >
                            <h5 className="card-title text-info">Total Deaths</h5>
                            <hr />
                            <p className="card-text text-info">{sum_death}</p>
                        </div>

                        <div className="card" >
                            <h5 className="card-title text-success">Total Recovered</h5>
                            <hr />
                            <p className="card-text text-success">{this.state.recovered}</p>
                        </div>

                        {
                            this.state.loading?<div />: <div className="card" >
                                <Line data={chartsets}
                                      options={{
                                          title: {
                                              display: true,
                                              text: 'Rate of rise in Cases',
                                              fontSize: 12
                                          },
                                          legend:{
                                              display: false
                                          }
                                      }} />
                            </div>
                        }


                    </div>
                </div>





                <div>



                    <ReactTable
                        data={this.state.data}
                        columns={columns}
                        sortable={false}
                        defaultPageSize={30}
                        showPageSizeOptions={false}
                        showPagination={true}
                        sorted={[{
                            id: 'infected',
                            desc: true
                        }]}
                    />


                </div>
            <div id="svg_map" ref={(ref)=>this.mapRef=ref}>
                <ModMap/>
            </div>







            </div>
        );
    }

}
