import {Tabs,Tab,Panel,useTabState,usePanelState} from '@bumaga/tabs';
import React from "react";
import Main from "./Main";
import Maps from "./map/map";
import WorldGraph from './global_graph/WorldGraph';

import './map/tabs.css'

/*const MainTab=()=>(

);

export default MainTab;*/

export default class MainTab extends React.Component{

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (

            <Tabs>
                <div className="tabs">
                    <div className="tab-list">
                        <Tab><button className='tab' style={{text: 'black'}}>Karnataka</button></Tab>
                        <Tab><button className='tab'>Graph</button></Tab>
                        <Tab><button className='tab'>WorldView</button></Tab>
                    </div>

                    <div className='tab-progress' />

                    <Panel><Main /></Panel>
                    <Panel><WorldGraph /></Panel>
                    <Panel><Maps /></Panel>

                </div>

            </Tabs>

        )
    }

}
