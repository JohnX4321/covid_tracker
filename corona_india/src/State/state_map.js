import React,{useState,useCallback} from "react";
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

import {MAP_META} from "./constants";
import MapExplorer from "./mapexplorer";
import axios from 'axios';
let getStates;

let data;

let stateDistrictWiseResponse ;
let isFetched=false;

export default class MapExplore extends React.Component{



    constructor() {
        super();
        this.state={
            data:[],
            stateDistrictWiseResponse: [],
            isFetched: false,
            testData: []
        }



    }



    async componentDidMount() :void {




            let data=await axios.get('.json');               //         .then((data)=>this.setState({data: data,isFetched: true}));
            let st=await axios.get('.json');      //.then((datas)=>this.setState({stateDistrictWiseResponse: datas}));
            let testData=await axios.get('.json');
            console.log(data.data);
            this.setState({data: data.data,isFetched:true,stateDistrictWiseResponse: st.data,testData: testData.data.states_tested_data});

    }



        render()
        {

            const [anchor, setAnchor] = useState(null);
            const [mapOption, setMapOption] = useState('confirmed');
            const [isIntersecting, setIsIntersecting] = useState(false);
            const [stateDistrictWiseData, setStateDistrictWiseData] = useState(null);
            //const [districtZones, setDistrictZones] = useState(null);

            const [regionHighlighted, setRegionHighlighted] = useState(undefined);

            const onHighlightDistrict = useCallback((district, state) => {
                if (!state && !district) return setRegionHighlighted(null);
                setRegionHighlighted({district, state});
            }, []);

            if (this.state.isFetched) {


                return (

                    <div>




                        <MapExplorer
                            mapMeta={MAP_META.Karnataka}
                            states={this.state.data.statewise}
                            districts={this.state.stateDistrictWiseResponse}
                            regionHighlighted={setRegionHighlighted}
                            stateTestData={this.state.testData}
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



}

