import { useState } from 'react'
import logo from './logo.svg'
import './App.css'


import { scaleLinear, scaleBand, extent, line, csv, interpolateGreys } from "d3";
import { scaleOrdinal, scaleThreshold, scaleQuantile } from '@visx/scale';

import {
  Legend,
  LegendLinear,
} from '@visx/legend';

import data from './data';


function App() {

  const margin = 50;
  const size = 700;


  function findmax(column) {
    let max = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i][column] > max) {
        max = data[i][column];
      }
    }
    return max;
  }


  function findmin(column) {
    let min = data[0][column];
    for (let i = 0; i < data.length; i++) {
      if (data[i][column] < min) {
        min = data[i][column];
      }
    }
    return min;
  }


  function getScaleX(col) {

    return scaleLinear().domain([findmin(col), findmax(col)]).range([0 + margin, size - margin]);
  }

  function getScaleY(col) {

    return scaleLinear().domain([findmin(col), findmax(col)]).range([size - margin, 0 + margin]);
  }

  // Positional Scales
  const rankScaleX = getScaleX('Rk');
  const rankScaleY = getScaleY('Rk');

  const ageScaleX = getScaleX('Age');
  const ageScaleY = getScaleY('Age');

  const ptsScaleY = getScaleY('PTS');

  const ftpctScaleY = getScaleY('FT%');

  const threepctScaleY = getScaleY('3P%');

  const gstartedScaleY = getScaleY('GS');

  const astScaleX = getScaleX('AST');



  // Color Scales
  const greyScaleFT = scaleLinear().domain([findmin('FT'), findmax('FT')]).range([0.1, 1]);





  console.log(interpolateGreys(.3));

  return (
    <div className="App">

        <h1> Data Exploration </h1>

        <h4>Initial questions about NBA player stats:</h4>
        <h5>How does age relate to performance?</h5>
        <h5>Do specific positions perform better?</h5>
        <h5>Is there a relationship between assists and scores? (Do the high scorers avoid assists)</h5>


        <h2> Ranking by Age </h2>
        <svg width={size} height={size} style={{ border: "2px solid black" }}>

        {
          data.map((point, i) => {
            return(
              <circle cx={ageScaleX(point['Age'])} cy={rankScaleY(point['Rk'])} r={3} />
            );
          })
        }

        // x axis
        <text x="340" y="690" style={{ fontSize: 12, fontFamily: "Georgia" }}>
          Age
        </text>

        <text x="45" y="680" style={{ fontSize: 12, fontFamily: "Georgia" }}>
          {findmin('Age')}
        </text>

        <text x="645" y="680" style={{ fontSize: 12, fontFamily: "Georgia" }}>
          {findmax('Age')}
        </text>

        // y axis
        <text x="10" y="350" transform='rotate(90,10,350)' style={{ fontSize: 12, fontFamily: "Georgia" }}>
          Rank
        </text>

        <text x="20" y="650" transform='rotate(90,20,650)' style={{ fontSize: 12, fontFamily: "Georgia" }}>
          {findmin('Rk')}
        </text>

        <text x="20" y="45" transform='rotate(90,20,45)' style={{ fontSize: 12, fontFamily: "Georgia" }}>
          {findmax('Rk')}
        </text>


        // caption
        <text x="325" y="25" style={{ fontSize: 12, fontFamily: "Georgia" }}>
          There is no obvious relationship between age and NBA ranking.
        </text>


        </svg>


        <h2> Free Throw Percentage by Age </h2>
        <svg width={size} height={size} style={{ border: "2px solid black" }}>

        {
          data.map((point, i) => {
            return(
              <circle cx={ageScaleX(point['Age'])} cy={ftpctScaleY(point['FT%'])} r={3} style={{fill: interpolateGreys(greyScaleFT(point['FT']))}} />
            );
          })
        }


        // scuffed legend
        <text x="600" y="500" style={{ fontSize: 12, fontFamily: "Georgia" }}>
          {findmax('FT%') * 100 + '%'}
        </text>

        <text x="600" y="525" style={{ fontSize: 12, fontFamily: "Georgia" }}>
          {findmin('FT%') * 100 + '%'}
        </text>

        <rect x="595" y="485" width="50" height="50" fill='none' stroke='black'>
        </rect>

        <rect x="630" y="491" width="10" height="10" fill='black'>
        </rect>

        <rect x="630" y="516" width="10" height="10" fill={interpolateGreys(0.1)}>
        </rect>

        // x axis
        <text x="340" y="690" style={{ fontSize: 12, fontFamily: "Georgia" }}>
          Age
        </text>

        <text x="45" y="680" style={{ fontSize: 12, fontFamily: "Georgia" }}>
          {findmin('Age')}
        </text>

        <text x="645" y="680" style={{ fontSize: 12, fontFamily: "Georgia" }}>
          {findmax('Age')}
        </text>

        // y axis
        <text x="10" y="350" transform='rotate(90,10,350)' style={{ fontSize: 12, fontFamily: "Georgia" }}>
          Free Throw Percentage
        </text>

        <text x="20" y="650" transform='rotate(90,20,650)' style={{ fontSize: 12, fontFamily: "Georgia" }}>
          {findmin('FT%')}
        </text>

        <text x="20" y="45" transform='rotate(90,20,45)' style={{ fontSize: 12, fontFamily: "Georgia" }}>
          {findmax('FT%')}
        </text>

        <text x="325" y="25" style={{ fontSize: 12, fontFamily: "Georgia" }}>
          There may be a small positive relationship between age and FT%.
        </text>

        <text x="50" y="625" style={{ fontSize: 12, fontFamily: "Georgia" }}>
          A significant amount of players with few FTs. Highlighted in red.
        </text>

        </svg>


        <h2> Games Started by Age </h2>
        <svg width={size} height={size} style={{ border: "2px solid black" }}>

        {
          data.map((point, i) => {
            return(
              <circle cx={ageScaleX(point['Age'])} cy={gstartedScaleY(point['GS'])} r={3} />
            );
          })
        }

        // x axis
        <text x="340" y="690" style={{ fontSize: 12, fontFamily: "Georgia" }}>
          Age
        </text>

        <text x="45" y="680" style={{ fontSize: 12, fontFamily: "Georgia" }}>
          {findmin('Age')}
        </text>

        <text x="645" y="680" style={{ fontSize: 12, fontFamily: "Georgia" }}>
          {findmax('Age')}
        </text>

        // y axis
        <text x="10" y="350" transform='rotate(90,10,350)' style={{ fontSize: 12, fontFamily: "Georgia" }}>
          Games Started
        </text>

        <text x="20" y="650" transform='rotate(90,20,650)' style={{ fontSize: 12, fontFamily: "Georgia" }}>
          {findmin('GS')}
        </text>

        <text x="20" y="45" transform='rotate(90,20,45)' style={{ fontSize: 12, fontFamily: "Georgia" }}>
          {findmax('GS')}
        </text>

        <text x="325" y="25" style={{ fontSize: 12, fontFamily: "Georgia" }}>
          There is no obvious relationship between age and games started.
        </text>

        <text x="420" y="400" style={{ fontSize: 12, fontFamily: "Georgia" }}>
          Players tend to start or sit out consistently as a role.
        </text>

        </svg>


        <h2> Scores by Assists </h2>
        <svg width={size} height={size} style={{ border: "2px solid black" }}>

        {
          data.map((point, i) => {
            return(
              <circle cx={astScaleX(point['AST'])} cy={ptsScaleY(point['PTS'])} r={3} />
            );
          })
        }

        // x axis
        <text x="300" y="690" style={{ fontSize: 12, fontFamily: "Georgia" }}>
          Assists per Game
        </text>

        <text x="45" y="680" style={{ fontSize: 12, fontFamily: "Georgia" }}>
          {findmin('AST')}
        </text>

        <text x="645" y="680" style={{ fontSize: 12, fontFamily: "Georgia" }}>
          {findmax('AST')}
        </text>

        // y axis
        <text x="10" y="350" transform='rotate(90,10,350)' style={{ fontSize: 12, fontFamily: "Georgia" }}>
          Points per Game
        </text>

        <text x="20" y="650" transform='rotate(90,20,650)' style={{ fontSize: 12, fontFamily: "Georgia" }}>
          {findmin('PTS')}
        </text>

        <text x="20" y="45" transform='rotate(90,20,45)' style={{ fontSize: 12, fontFamily: "Georgia" }}>
          {findmax('PTS')}
        </text>


        </svg>


        <h2> Plot 5 </h2>
        <svg width={size} height={size} style={{ border: "2px solid black" }}>
        </svg>

        <h2> Plot 6 </h2>
        <svg width={size} height={size} style={{ border: "2px solid black" }}>
        </svg>

        <h2> Plot 7 </h2>
        <svg width={size} height={size} style={{ border: "2px solid black" }}>
        </svg>

        <h2> Plot 8 </h2>
        <svg width={size} height={size} style={{ border: "2px solid black" }}>
        </svg>
    </div>
  )
}

export default App
