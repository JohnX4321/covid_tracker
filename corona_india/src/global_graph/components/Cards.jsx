import React from 'react';
import {Card,CardContent,Typography,Grid} from '@material-ui/core'
import CountUp from "react-countup";
import cx from 'classnames';

import styles from './Cards.css';
import ClipLoader from "react-spinners/ClipLoader";

const Info=({data:{confirmed,recovered,deaths,lastUpdate}})=>{

//<ClipLoader size={150} color={"#000000"}
//                     loading={!confirmed} />
    if (!confirmed) {
        return <ClipLoader size={150} color={"#000000"} loading={true} />;
    }

return (
    <div className={styles.container}>

        <Grid container spacing={3} justify="center">
            <Grid item xs={12} md={3} component={Card} style={{borderBottomColor: "#000000"}} className={cx(styles.card, styles.infected)}>
                <CardContent style={{borderBottomColor: 'blue', borderBottomWidth: 10}}>
                    <Typography color="textSecondary" gutterBottom>
                        Infected
                    </Typography>
                    <Typography variant="h5" component="h2">
                        <CountUp start={0} end={confirmed.value} duration={2.75} separator="," />
                    </Typography>
                    <Typography color="textSecondary">
                        {new Date(lastUpdate).toDateString()}
                    </Typography>
                    <Typography variant="body2" component="p">
                        Number of active cases of COVID-19.
                    </Typography>
                    <hr style={{background: 'blue',height: 10,marginBottom: 0,marginTop: 50}} />
                </CardContent>
            </Grid>
            <Grid item xs={12} md={3} component={Card} className={cx(styles.card, styles.recovered)}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                        Recovered
                    </Typography>
                    <Typography variant="h5" component="h2">
                        <CountUp start={0} end={recovered.value} duration={2.75} separator="," />
                    </Typography>
                    <Typography color="textSecondary">
                        {new Date(lastUpdate).toDateString()}
                    </Typography>
                    <Typography variant="body2" component="p">
                        Number of recoveries from COVID-19.
                    </Typography>
                    <hr style={{background: 'green',height: 10,marginBottom: 0,marginTop: 50}} />
                </CardContent>
            </Grid>
            <Grid item xs={12} md={3} component={Card} className={cx(styles.card, styles.deaths)}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                        Deaths
                    </Typography>
                    <Typography variant="h5" component="h2">
                        <CountUp start={0} end={deaths.value} duration={2.75} separator="," />
                    </Typography>
                    <Typography color="textSecondary">
                        {new Date(lastUpdate).toDateString()}
                    </Typography>
                    <Typography variant="body2" component="p">
                        Number of deaths caused by COVID-19.
                    </Typography>
                    <hr style={{background: 'red',height: 10,marginBottom: 0,marginTop: 50}} />
                </CardContent>
            </Grid>
        </Grid>
    </div>
)

};

export default Info;
