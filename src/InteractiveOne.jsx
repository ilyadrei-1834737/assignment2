import { useState } from 'react'
import logo from './logo.svg'
import './App.css'

import data from './data';

import { scaleLinear, scaleBand, extent, line, csv, interpolateGreys } from "d3";
import { scaleOrdinal, scaleThreshold, scaleQuantile } from '@visx/scale';


function InteractiveOne() {

  const margin = 50;
  const size = 700;
  const [playerName, setPlayerName] = useState('PLACEHOLDERNAME');
  const [pg, setPG] = useState(true);
  const [sg, setSG] = useState(true);
  const [sf, setSF] = useState(true);
  const [c, setC] = useState(true);
  const [pf, setPF] = useState(true);

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

  function handleChange(event) {
    console.log(event.target.value);

    if (event.target.value == '') {
      setPlayerName('PLACEHOLDERNAME');
    } else {
      setPlayerName(event.target.value);
    }
  }

  function handlePG(event) {
    setPG(!pg);
  }

  function handleSG(event) {
    setSG(!sg);
  }

  function handleSF(event) {
    setSF(!sf);
  }

  function handleC(event) {
    setC(!c);
  }

  function handlePF(event) {
    setPF(!pf);
  }


  // Positional Scales
  const ageScaleX = getScaleX('Age', data);

  const ptsScaleY = getScaleY('PTS', data);

  const astScaleX = getScaleX('AST', data);

  let decodePos = {};
  decodePos['PG'] = pg;
  decodePos['SG'] = sg;
  decodePos['SF'] = sf;
  decodePos['C'] = c;
  decodePos['PF'] = pf;

  return(
    <div className="App" style={{textAlign: "left", paddingLeft:"50px"}}>
      <h1> Ball Hog Searcher </h1>



      <div className="Inputs">
        <h4> Player Lookup </h4>
        <input type="text" onChange={handleChange} />
        <br></br>

        <h4> Position Filter </h4>
        <input type="checkbox" id="PG" checked={pg} onChange={handlePG} />
        <label htmlFor="PG">Point Guard</label>
        <br></br>

        <input type="checkbox" id="SG" checked={sg} onChange={handleSG} />
        <label htmlFor="SG">Shooting Guard</label>
        <br></br>

        <input type="checkbox" id="SF" checked={sf} onChange={handleSF} />
        <label htmlFor="SF">Small Forward</label>
        <br></br>

        <input type="checkbox" id="C" checked={c} onChange={handleC} />
        <label htmlFor="C">Center</label>
        <br></br>

        <input type="checkbox" id="PF" checked={pf} onChange={handlePF} />
        <label htmlFor="PF">Power Forward</label>
        <br></br>
      </div>

      <svg width={size} height={size} style={{ border: "0px solid black" }}>
        {
          data.map((point, i) => {
            let position = point['Pos'];

            if (decodePos[position] == true) {
              if (point['Player'].toLowerCase().includes(playerName.toLowerCase())) {
                return(
                  <circle cx={astScaleX(point['AST'])} cy={ptsScaleY(point['PTS'])} fill="red" r={8} />
                );
              } else {
                return(
                  <circle cx={astScaleX(point['AST'])} cy={ptsScaleY(point['PTS'])} r={3} />
                );
              }
            }
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

      <p style={{width: "700px"}}>
        For my first interactive assignment I initially wanted to create drop down menus and allow the user to change the data displayed on the Y axis. I couldn't really wrap my head around referencing functions as variables so I decided to simplify a bit (I think I could do it now though).
        I instead opted for a dynamic search approach, allowing the user to search for their favorite players on my ball hog graph dynamically.
        The input is checked on every change so you can search for all players with the first name 'Stephen' for example. This gives users the ability to see where their player stands
        in terms of their points to assists ratio. I decided to give the selected players a larger circle and red color, drawing the eye using both size and color. 
        The idea is if a player falls high in the points distribution but low in the assists distribution, maybe they can be considered a ball hog.
        I also added a position filter to allow users to look at the differences between positions. This gives interesting insights, as we can
        see that point guards lean towards assists while the other positions lean more towards points.
        This took about 10 hours to develop, with the hardest part being creating the initial interactivity using states (player lookup).
        After that it was pretty easy to implement the filter with what I had learned. Here is a list of players that may be interesting to look at:
      </p>

      <ul>
        <li>Stephen Curry</li>
        <li>James Harden</li>
        <li>Luka Doncic</li>
        <li>Trae Young</li>
        <li>Giannis Antetokounmpo</li>
        <li>Frank Jackson</li>
        <li>Cam Reddish</li>
        <li>Jalen Suggs</li>
      </ul>


      <br></br>
      <a href="https://www.kaggle.com/vivovinco/nba-player-stats">Data</a>
      <br></br>
      <a href="https://github.com/ilyadrei-1834737/assignment2">Github</a>
      <br></br>

    </div>


  )
}


export default InteractiveOne
