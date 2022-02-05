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
import posdata from './posdata'


function App() {

  const margin = 50;
  const size = 700;


  function findmax(column, data) {
    let max = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i][column] > max) {
        max = data[i][column];
      }
    }
    return max;
  }


  function findmin(column, data) {
    let min = data[0][column];
    for (let i = 0; i < data.length; i++) {
      if (data[i][column] < min) {
        min = data[i][column];
      }
    }
    return min;
  }


  function getScaleX(col, data) {

    return scaleLinear().domain([findmin(col, data), findmax(col, data)]).range([0 + margin, size - margin]);
  }

  function getScaleY(col, data) {

    return scaleLinear().domain([findmin(col, data), findmax(col, data)]).range([size - margin, 0 + margin]);
  }

  // Positional Scales data.js
  const rankScaleX = getScaleX('Rk', data);
  const rankScaleY = getScaleY('Rk', data);

  const ageScaleX = getScaleX('Age', data);
  const ageScaleY = getScaleY('Age', data);

  const ptsScaleY = getScaleY('PTS', data);

  const ftpctScaleY = getScaleY('FT%', data);

  const threepctScaleY = getScaleY('3P%', data);

  const gstartedScaleY = getScaleY('GS', data);

  const astScaleX = getScaleX('AST', data);

  // Positional Scales datapos.js

  const posptsScaleY = getScaleY('PTS', posdata);


  // Color Scales
  const greyScaleFT = scaleLinear().domain([findmin('FT', data), findmax('FT', data)]).range([0.1, 1]);



  return (
    <div className="App" style={{textAlign: "left", paddingLeft:"50px"}}>

        <h1> Data Exploration - Ilya Dreizin </h1>

        <h4>Initial questions about NBA player stats:</h4>
        <h5 style={{paddingLeft: "50px"}}>How does age relate to performance?</h5>
        <h5 style={{paddingLeft: "50px"}}>Do specific positions perform better?</h5>
        <h5 style={{paddingLeft: "50px"}}>Is there a relationship between assists and scores? (Do the high scorers avoid assists)</h5>

        <a href="https://www.kaggle.com/vivovinco/nba-player-stats">Data</a>
        <br></br>
        <a href="https://github.com/ilyadrei-1834737/assignment2">Github</a>

        <div style={{ width: "700px" }}>
          <h2> Ranking by Age </h2>
          <p>After first finding this dataset, the thing I most obviously interested in was the relationsip between age and various performance factors in the NBA. The first plot chosen was a simple age vs rank. This somewhat surprisingly didn't show any correlation in either direction. It's possible that experience and young hungry talent balance themselves.</p>
        </div>
        <svg width={size} height={size} style={{ border: "0px solid black" }}>

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
          {findmin('Age', data)}
        </text>

        <text x="645" y="680" style={{ fontSize: 12, fontFamily: "Georgia" }}>
          {findmax('Age', data)}
        </text>

        // y axis
        <text x="10" y="350" transform='rotate(90,10,350)' style={{ fontSize: 12, fontFamily: "Georgia" }}>
          Rank
        </text>

        <text x="20" y="650" transform='rotate(90,20,650)' style={{ fontSize: 12, fontFamily: "Georgia" }}>
          {findmin('Rk', data)}
        </text>

        <text x="20" y="45" transform='rotate(90,20,45)' style={{ fontSize: 12, fontFamily: "Georgia" }}>
          {findmax('Rk', data)}
        </text>

        </svg>

        <div style={{ width: "700px" }}>
          <h2> Free Throw Percentage by Age </h2>
          <p> Next I wanted to explore another statistic and its correlation to age. I chose free throw percentage because it is classic and easily understandable. The first thing that stood out to me were the horizontally placed dots on 0, 0.5 and 1. This tells me tthat there are a collection of players with only a couple free throws or none at all. To highlight the difference I've made low FT players gray and often FT players black. It does appear there may be a light positive relationship between age and FT% </p>
        </div>
        <svg width={size} height={size} style={{ border: "0px solid black" }}>

        {
          data.map((point, i) => {
            return(
              <circle cx={ageScaleX(point['Age'])} cy={ftpctScaleY(point['FT%'])} r={3} style={{fill: interpolateGreys(greyScaleFT(point['FT']))}} />
            );
          })
        }


        // scuffed legend
        <text x="600" y="500" style={{ fontSize: 12, fontFamily: "Georgia" }}>
          {findmax('FT', data)}
        </text>

        <text x="600" y="525" style={{ fontSize: 12, fontFamily: "Georgia" }}>
          {findmin('FT', data)}
        </text>

        <text x="595" y="480" style={{ fontSize: 12, fontFamily: "Georgia" }}>
          FT / game
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
          {findmin('Age', data)}
        </text>

        <text x="645" y="680" style={{ fontSize: 12, fontFamily: "Georgia" }}>
          {findmax('Age', data)}
        </text>

        // y axis
        <text x="10" y="350" transform='rotate(90,10,350)' style={{ fontSize: 12, fontFamily: "Georgia" }}>
          Free Throw Percentage
        </text>

        <text x="20" y="650" transform='rotate(90,20,650)' style={{ fontSize: 12, fontFamily: "Georgia" }}>
          {findmin('FT%', data)}
        </text>

        <text x="20" y="45" transform='rotate(90,20,45)' style={{ fontSize: 12, fontFamily: "Georgia" }}>
          {findmax('FT%', data)}
        </text>
        </svg>

        <div style={{ width: "700px" }}>
          <h2> Games Started by Age </h2>
          <p>For a final look at age, I was interested in less of a performance metric. I chose games started to see if older players are starters more than younger players. Although there doesn't seem to be a relationship there, the graph does show few players in the 'middle' of the distriubtion. This suggests that players are generally consistent starters or benchwarmers.</p>
        </div>
        <svg width={size} height={size} style={{ border: "0px solid black" }}>

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
          {findmin('Age', data)}
        </text>

        <text x="645" y="680" style={{ fontSize: 12, fontFamily: "Georgia" }}>
          {findmax('Age', data)}
        </text>

        // y axis
        <text x="10" y="350" transform='rotate(90,10,350)' style={{ fontSize: 12, fontFamily: "Georgia" }}>
          Games Started
        </text>

        <text x="20" y="650" transform='rotate(90,20,650)' style={{ fontSize: 12, fontFamily: "Georgia" }}>
          {findmin('GS', data)}
        </text>

        <text x="20" y="45" transform='rotate(90,20,45)' style={{ fontSize: 12, fontFamily: "Georgia" }}>
          {findmax('GS', data)}
        </text>
        </svg>

        <div style={{ width: "700px" }}>
          <h2> Scores by Assists </h2>
          <p> Another topic I was interested in initially is if I could identify ball hoggers. I figured assists against points makes sense for this, and it also servers as a good dummy plot since players should fall on a generally normal distribution. We can see a couple candidates for ball hoggers at the top of the graph. There are also a couple players with many more assists than points.</p>
        </div>
        <svg width={size} height={size} style={{ border: "0px solid black" }}>

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
          {findmin('AST', data)}
        </text>

        <text x="645" y="680" style={{ fontSize: 12, fontFamily: "Georgia" }}>
          {findmax('AST', data)}
        </text>

        // y axis
        <text x="10" y="350" transform='rotate(90,10,350)' style={{ fontSize: 12, fontFamily: "Georgia" }}>
          Points per Game
        </text>

        <text x="20" y="650" transform='rotate(90,20,650)' style={{ fontSize: 12, fontFamily: "Georgia" }}>
          {findmin('PTS', data)}
        </text>

        <text x="20" y="45" transform='rotate(90,20,45)' style={{ fontSize: 12, fontFamily: "Georgia" }}>
          {findmax('PTS', data)}
        </text>


        </svg>

        <div style={{ width: "700px" }}>
          <h2> Average Points by Position </h2>
          <p> Finally I wanted to take a look at performance based on position. The most obvious plot is to see average points based on position. To do this I had to refactor the data using pandas so it is based on position rather than player. We can see that point guards score significantly more than the other positions in the NBA.</p>
        </div>
        <svg width={size} height={size} style={{ border: "0px solid black" }}>
          {
            posdata.map((point, i) => {
              let y = 50 + (posptsScaleY(point['PTS']) * 0.8);

              return(
                <rect x={50 + (i * 125)} y={y} width="75" height={650-y} fill='gray'></rect>
              );
            })
          }

          {
            posdata.map((point, i) => {


              return(
                <text x={77 + (i * 125)} y="675" style={{ fontSize: 12, fontFamily: "Georgia" }}>
                  {point['Pos']}
                </text>
              );
            })
          }

          {
            posdata.map((point, i) => {
              let y = 50 + (posptsScaleY(point['PTS']) * 0.8);
              return(
                <text x={77 + (i * 125)} y={y - 20} style={{ fontSize: 12, fontFamily: "Georgia" }}>
                  {Math.round(point['PTS'] * 100) / 100}
                </text>
              );
            })
          }

        </svg>
    </div>
  )
}

export default App
