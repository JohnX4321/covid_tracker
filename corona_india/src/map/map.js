import React from 'react';

import Globe from 'globe.gl';
import { CountUp } from 'countup.js';
import { request } from './utils';
import {
    GLOBE_IMAGE_URL,
    BACKGROUND_IMAGE_URL,
    GEOJSON_URL,
    CASES_API
} from './constant';
import * as d3 from 'd3';

// Globe container
const globeContainer = document.getElementById('globeViz');

const colorScale = d3.scaleSequentialPow(d3.interpolateOrRd).exponent(1/4);
const getVal = feat => feat.covid.cases;

let world;

async function getCases () {
    const countries = await request(GEOJSON_URL);
    const data = await request(CASES_API);

    const countriesWithCovid = [];

    data.forEach(item => {
        const countryIdxByISO = countries.features.findIndex(
            i => i.properties.ISO_A2 === item.countryInfo.iso2 && i.properties.ISO_A3 === item.countryInfo.iso3
        );

        if (countryIdxByISO !== -1) {
            countriesWithCovid.push({
                ...countries.features[countryIdxByISO],
                covid: item
            });
        } else {

            // If no country was found using their ISO, try with name
            const countryIdxByName = countries.features.findIndex(
                i => i.properties.ADMIN.toLowerCase() === item.country.toLowerCase()
            );

            if (countryIdxByName !== -1) {
                countriesWithCovid.push({
                    ...countries.features[countryIdxByName],
                    covid: item
                });
            }
        }

        const maxVal = Math.max(...countriesWithCovid.map(getVal));
        colorScale.domain([0, maxVal]);
    });

    world.polygonsData(countriesWithCovid);
    //document.querySelector('.title-desc').innerHTML = 'Hover on a country or territory to see cases, deaths, and recoveries.'

    // Show total counts
    showTotalCounts(data);

    // Get IP Address
    const { latitude, longitude } = await request('https://geolocation-db.com/json/');

    world.pointOfView({
        lat: latitude,
        lng: longitude
    }, 1000);
}


function initMaps() {



    world=Globe()(globeContainer)
        .globeImageUrl(GLOBE_IMAGE_URL).backgroundImageUrl(BACKGROUND_IMAGE_URL)
        .showGraticules(false).polygonAltitude(0.06)
        .polygonCapColor(feat=>colorScale(getVal(feat)))
        .polygonSideColor(()=>'rgba(0,100,0,0.05)')
        .polygonStrokeColor(()=>'#111')
        .polygonLabel(({properties: d,covid: c})=>`
                <div class="card">
              <img class="card-img" src="${c.countryInfo.flag}" alt="flag" />
              <div class="container">
                 <span class="card-title" style="color: black"><b>${d.ADMIN}</b></span> <br />
                 <span class="card-total-cases" style="color: black">${c.cases} total cases</span>
                 <div class="card-spacer"></div>
                 <hr />
                 <div class="card-spacer"></div>
                 <span style="color: black">${c.active} active</span> <br />
                 <span style="color: black">${c.deaths} dead</span> <br />
                 <span style="color: black">${c.recovered} recovered</span>
                 <div class="card-spacer"></div>
                 <hr />
                 <div class="card-spacer"></div>
                 <div class="bottom-info">
                  <span style="color: black">Today</span>
                  <span style="color: black">${c.todayCases} cases</span>
                  <span style="color: black">${c.todayDeaths} deaths</span>
                 </div>
              </div>
            </div>
            `)
        .onPathHover(hoverD=>world.polygonAltitude(d=>d===hoverD?0.12:0.06)
            .polygonCapColor(d=>d===hoverD?'steelblue':colorScale(getVal(d))))
        .polygonsTransitionDuration(300);


    getCases().then(()=>console.debug('retrieved'));

}




function showTotalCounts(data){
    const totalInfected=data.reduce((a,b)=>a+b.cases,0);
    const infected=new CountUp('infected',totalInfected);
    infected.start();

    const totalDeaths = data.reduce((a, b) => a + b.deaths, 0);
    const deaths = new CountUp('deaths', totalDeaths);
    deaths.start();

    const totalRecovered = data.reduce((a, b) => a + b.recovered, 0);
    const recovered = new CountUp('recovered', totalRecovered);
   recovered.start();
}





export default class Maps extends React.Component{


    constructor() {
        super();



            initMaps();

    }


    componentWillUnmount() {
        //world=null;
    }


    render() {
        window.addEventListener('resize',(event)=>{
            world.width([event.target.innerWidth])
            world.height([event.target.innerHeight])
        });





        return(

        <div>

            <div className = "top-info-container" >
            <div
        className = "title" style={{justifyContent: 'center', alignItems: 'center'}}> COVID - 19 Spread</div>
        </div>

        <div className="bottom-info-container">
            <div style={{fontSize: 14, color: 'blue'}}>Total Counts</div>
            <div style={{color: 'blue', padding: '0 5'}}>
                INFECTED: <span id="infected">0</span> • DEATHS:
                <span id="deaths">0</span> • RECOVERED: <span id="recovered">0</span>
            </div>
            <div style={{marginTop: 5}}>
                Open Source Design.
            </div>
        </div>
            </div>




        )



    }

}
