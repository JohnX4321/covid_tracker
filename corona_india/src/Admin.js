import React from "react";

import axios from 'axios';

let url='/districts';
let timeline_url='/timeline';

export default class Admin extends React.Component{


    constructor(props) {
        super(props);
        this.state={
            data: [],
            mod_dist: '',
            mod_id: '',
            mod_death: '',
            districtName: '',
            district_count: '',
            today_index: 0,
            today_cases: 0,
            today_data: [],
            district_death: 0,
            today_recovered: '',
        }
    }

    componentWillMount() {
        this.display();
        this.getGraphData();
    }


    getGraphData=()=>{
        axios.get(timeline_url+'/all')
            .then((res)=>{
                console.log(res.data);
                this.setState({today_data: res.data});
            })

    };


    handleSubmit=async(e)=>{
        e.preventDefault();

        axios.post(url+'/create',{
            name: this.state.districtName,
            infected: this.state.district_count,
            death: this.state.district_death
        }).then((res)=>{console.log(res);

        }).catch(error => console.log(error));

        this.display();





    }

    display=()=>{
        axios.get(url+'/all')
            .then((res)=>{

                this.setState({data: res.data})
            }).then(res=>{});
    }

    handleClick=()=>{
        axios.put(url+'/'+this.state.mod_id+'/update',{
            infected: this.state.mod_dist,
            death: this.state.mod_death
        }).then(res=>{})


    }

    delete=(del_id)=>{
        axios.delete(url+'/'+del_id+'/delete')
            .then(res=>{})


    }

    today_add=()=>{
        axios.post(timeline_url+'/create',{
            index: this.state.today_index,
            cases: this.state.today_cases,
            recovered: this.state.today_recovered
        }).then(res=>console.log('Added successfully'));
    }

    render() {
        return(

            <div style={{marginTop: 20, justifyContent: 'center', alignContent: 'center',alignItems: 'center'}}>

            <form onSubmit={this.handleSubmit} style={{justifyContent: 'center', marginLeft: 150}}>


                <input type="text" value={this.state.districtName}
                       onChange={e=>this.setState({districtName: e.target.value})}
                       placeholder="District name" required/>
                <input type="text" value={this.state.district_count}
                       onChange={e=>this.setState({district_count: e.target.value})}
                       placeholder="District Count" required/>

                <input type="text" value={this.state.district_death}
                       onChange={e=>this.setState({district_death: e.target.value})}
                       placeholder="District Death" required/>


                <button type="submit">Add</button>

            </form>


                <div className="container" style={{marginTop: 40}}>


                    <table className="table col-sm-12 " >
                        <thead>
                        <tr>
                            <th align="center" scope="col" rowSpan="1" >District</th>
                            <th align="center" scope="col" rowSpan="2">Infected</th>
                            <th align="center" scope="col" rowSpan="2">Deaths</th>
                            <th scope="col" align="center" rowSpan="2">Ops</th>
                        </tr>
                        </thead>
                        <tbody className="tbody">


                {this.state.data.map(dist=>{
                    return(

                            <tr  className="row col-sm-12" key={dist._id}>

                                <td className="col-sm-3">
                                    {dist.name}
                                </td>
                                <td className="col-sm-3">
                                    <input type="text" placeholder={dist.infected} value={this.state.mod_id===dist._id?this.state.mod_dist:dist.infected}
                                    onChange={event => this.setState({mod_id: dist._id, mod_dist: event.target.value})}/>
                                </td>

                                <td className="col-sm-3">
                                    <input type="text" placeholder={dist.death} value={this.state.mod_id===dist._id?this.state.mod_death:dist.death}
                                           onChange={event => this.setState({mod_id: dist._id, mod_death: event.target.value})}/>
                                </td>


                                <td className="col-sm-3">

                                <button className="bg-primary" onClick={this.handleClick}>
                                    Update
                                </button>

                                <button className="bg-dangee" onClick={()=>this.delete(dist._id)}>
                                    Delete
                                </button>
                                </td>

                            </tr>


                    )
                })}
                        </tbody>
                    </table>

                </div>

                <div className="row" style={{marginLeft: 40}}>

                    <label> Index</label>

                    <input type="text" value={this.state.today_index}
                           onChange={e=>this.setState({today_index: e.target.value})}
                           placeholder="Today Index" required/>
                           <label>Today Cases</label>

                    <input type="text" value={this.state.today_cases}
                           onChange={e=>this.setState({today_cases: e.target.value})}
                           placeholder="Today Cases" required/>

                    <input type="text" value={this.state.today_recovered}
                           onChange={e=>this.setState({today_recovered: e.target.value})}
                           placeholder="Today Cases" required/>

                           <button type="submit" onClick={this.today_add}>Add</button>
                </div>


                <div className="container" style={{marginTop: 40,justifyContent: 'center'}}>


                    <table className="table col-sm-12 " >
                        <thead>
                        <tr>
                            <th align="center" scope="col" rowSpan="1" >Index</th>
                            <th align="center" scope="col" rowSpan="2">Cases</th>
                        </tr>
                        </thead>
                        <tbody className="tbody">

                {
                    this.state.today_data.map(tday=>{
                        return(

                            <tr  className="row col-sm-12" key={tday._id}>

                                <td className="col-sm-3">
                                    {tday.index}
                                </td>
                                <td className="col-sm-3">
                                    {tday.cases}
                                                        </td>
                            </tr>

                        );
                    })
                }

                        </tbody>
                    </table>
                </div>




            </div>








        )
    }

}
