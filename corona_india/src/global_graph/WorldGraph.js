import React from 'react';
import { Cards, CountryPicker, Chart } from './components';
import { fetchData } from './api/';
import styles from './WorldGraph.css';

export default class WorldGraph extends React.Component{


    state={
        data:{},
        country: '',
    }
    async componentDidMount ():void {
        const data = await fetchData();
        this.setState({data});
        console.log(data);
    }

    handleCountryChange=async(country)=>{
        const data=await fetchData(country);
        this.setState({data,country: country});
    }

    render() {
        const { data, country } = this.state;
        console.log(this.state.data);
        return (
            <div className={styles.container}>
                <Cards data={data} />
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Chart data={data} country={country} />
            </div>
        );
    }

}
