import React, {useCallback, useState,useEffect} from "react";

import {useEffectOnce, useLocalStorage} from 'react-use';

import MapExplorer from "./mapexplorer";
import {MAP_META} from "./constants";

import {
    formatDate,
    formatDateAbsolute,
    mergeTimeseries,
    preprocessTimeseries,
    parseStateTimeseries,
    parseStateTestTimeseries,
    parseTotalTestTimeseries,
    parseDistrictZones,
} from './utils/commonfunctions';


import axios from 'axios';



let datastate,stdat,stateDistrictResp,testD;



function ModMap() {


    const [states, setStates] = useState(null);
    const [stateDistrictWiseData, setStateDistrictWiseData] = useState(null);
    const [stateTestData, setStateTestData] = useState(null);

    const getStates=async ()=>{
        const [
            {data},
            {stateDistrictWiseResponse},
            {testData},
        ] = await Promise.all([
            axios.get('.json'),
            axios.get('.json'),
            axios.get('.json'),
        ]);

        stateDistrictResp=await axios.get('.json');
        testD=await axios.get('.json');
        if (data!=null)
            console.log(data);

        console.log(stateDistrictResp.data['Karnataka']);
        console.log(testD.data);
        stdat=stateDistrictResp.data;

        setStates(data.statewise);
        //setStateDistrictWiseData(stateDistrictResp.data);
        console.log("Hyyyy"+stateDistrictWiseResponse);
        //setStateTestData(testData.data);


    };

    useEffectOnce(()=>{

        getStates().then(console.log("loo"));
    });







    let isFetched=false;


    let data=datastate;              //         .then((data)=>this.setState({data: data,isFetched: true}));
    let st=stdat;     //.then((datas)=>this.setState({stateDistrictWiseResponse: datas}));
    if (states!=null) {
        isFetched = true;
        console.log(stateTestData);
    }

    console.log(stateDistrictResp);


    const [anchor, setAnchor] = useState(null);
    const [mapOption, setMapOption] = useState('confirmed');

    const [regionHighlighted, setRegionHighlighted] = useState(undefined);

    const onHighlightDistrict = useCallback((district, state) => {
        if (!state && !district) return setRegionHighlighted(null);
        setRegionHighlighted({district, state});
    }, []);

    if (isFetched) {



        console.log(testD);

        return (

            <div>




                <MapExplorer
                    mapMeta={MAP_META.Karnataka}
                    states={states}
                    districts={stateDistrictResp.data}
                    regionHighlighted={regionHighlighted}
                    stateTestData={testD.data.states_tested_data}
                    isCountryLoaded={true}
                    anchor={anchor}
                    setAnchor={setAnchor}
                    mapOption={mapOption}
                    setMapOption={setMapOption}/>


            </div>

        )
    }
    else return (<div>Loading...</div>)



}

export default ModMap;
