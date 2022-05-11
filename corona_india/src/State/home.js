
import MapExplorer from './mapexplorer';
import Minigraph from './minigraph';

import Table from './table';
import TimeSeriesExplorer from './timeseriesexplorer';


import {STATE_CODES_REVERSE, MAP_META} from './constants';
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

import Observer from '@researchgate/react-intersection-observer';
import axios from 'axios';
import React, {useState, useCallback, useMemo} from 'react';

import {useEffectOnce, useLocalStorage} from 'react-use';

function Home() {
    const [states, setStates] = useState(null);
    const [stateDistrictWiseData, setStateDistrictWiseData] = useState(null);
    const [districtZones, setDistrictZones] = useState(null);
    const [stateTestData, setStateTestData] = useState(null);
    const [lastUpdated, setLastUpdated] = useState('');
    const [timeseries, setTimeseries] = useState(null);
    const [fetched, setFetched] = useState(false);
    const [regionHighlighted, setRegionHighlighted] = useState(undefined);
    const [showUpdates, setShowUpdates] = useState(false);
    const [anchor, setAnchor] = useState(null);
    const [mapOption, setMapOption] = useState('confirmed');
    const [isIntersecting, setIsIntersecting] = useState(false);

    const [lastViewedLog, setLastViewedLog] = useLocalStorage(
        'lastViewedLog',
        null
    );
    const [newUpdate, setNewUpdate] = useLocalStorage('newUpdate', false);



    useEffectOnce(() => {
        getStates();
    });

    useEffectOnce(() => {
        axios
            .get('.json')
            .then((response) => {
                const lastTimestamp = response.data
                    .slice()
                    .reverse()[0]
                    .timestamp.toString();
                if (lastTimestamp !== lastViewedLog) {
                    setNewUpdate(true);
                    setLastViewedLog(lastTimestamp);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    });

    const getStates = async () => {
        try {
            const [
                {data: statesDailyResponse},
                {data: zonesResponse},
            ] = await Promise.all([
                axios.get('.json'),
                axios.get('.json'),
            ]);

            const [
                {data},
                {data: stateDistrictWiseResponse},
            ] = await Promise.all([
                axios.get('.json'),
                axios.get('.json'),
            ]).then(()=>console.log('Data Fetched'));

            setStates(data.statewise);
            setDistrictZones(parseDistrictZones(zonesResponse.zones));

            const ts = parseStateTimeseries(statesDailyResponse);
            ts['TT'] = preprocessTimeseries(data.cases_time_series);
            // Testing data timeseries
            const testTs = parseStateTestTimeseries(stateTestData.states_tested_data);
            testTs['TT'] = parseTotalTestTimeseries(data.tested);
            // Merge
            const tsMerged = mergeTimeseries(ts, testTs);
            setTimeseries(tsMerged);

            setLastUpdated(data.statewise[0].lastupdatedtime);

            const testData = [...stateTestData.states_tested_data].reverse();
            const totalTest = data.tested[data.tested.length - 1];
            testData.push({
                updatedon: totalTest.updatetimestamp.split(' ')[0],
                totaltested: totalTest.totalsamplestested,
                source: totalTest.source,
                state: 'Total',
            });
            setStateTestData(testData);

            setStateDistrictWiseData(stateDistrictWiseResponse);
            setFetched(true);
        } catch (err) {
            console.log(err);
        }
    };

    const onHighlightState = useCallback((state) => {
        if (!state) return setRegionHighlighted(null);
        state.code = STATE_CODES_REVERSE[state.state];
        setRegionHighlighted({state});
    }, []);

    const onHighlightDistrict = useCallback((district, state) => {
        if (!state && !district) return setRegionHighlighted(null);
        setRegionHighlighted({district, state});
    }, []);

    const handleIntersection = ({isIntersecting}) => {
        setIsIntersecting(isIntersecting);
    };

    const options = {
        rootMargin: '0px 0px 0px 0px',
    };

    return (

            <div className="Home">


                            { fetched&&isIntersecting&&(
                                <MapExplorer
                                    mapMeta={MAP_META.Karnataka}
                                    states={states}
                                    districts={stateDistrictWiseData}
                                    stateTestData={stateTestData}
                                    regionHighlighted={regionHighlighted}
                                    isCountryLoaded={true}
                                    anchor={anchor}
                                    setAnchor={setAnchor}
                                    mapOption={mapOption}
                                    setMapOption={setMapOption}
                                />
                            )}


            </div>

    );
}

export default Home;
