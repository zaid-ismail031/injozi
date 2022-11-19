import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Modal.css'


function Modal ({closeModal, api_year, currentWinner}) {

    const [raceWinners, setRaceWinners] = useState([]);

    console.log(api_year)
    console.log(currentWinner)

    // get data from api
    useEffect(()=> {
        axios
          .get(`http://ergast.com/api/f1/${api_year}/results/1.json`)
          .then(res => {
            setRaceWinners(res.data.MRData.RaceTable.Races);
          })
          .catch(err => {
            console.log(err);
          })
      }, [])
    
    // enable/disable scrolling of background whenever modal is closed
    const setHidden = () => {
      console.log(document.body.style.overflow);
      if (document.body.style.overflow !== "hidden") {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "scroll";
      }
    };


    return (<div className="modalBackground">
        <div className="modalContainer">
            <div title="titleCloseBtn">
                <button onClick={() => {closeModal(false); setHidden();}}> X </button>
            </div>
            <div className="title"><h4>{api_year} Season</h4></div>
            <div className="body">

                <table>
                    <tbody>
                        <tr>
                            <th>Round</th>
                            <th>Winner</th>
                        </tr>
                        {
                        raceWinners.map(
                            raceWinner => (
                                <tr style={{backgroundColor: raceWinner.Results[0].Driver.givenName.concat(" ").concat(raceWinner.Results[0].Driver.familyName) === currentWinner ? "yellow": "white"}}>
                                    <td>{raceWinner.round}</td>
                                    <td>{raceWinner.Results[0].Driver.givenName.concat(" ").concat(raceWinner.Results[0].Driver.familyName)}</td>
                                </tr>                                
                            )
                        )
                        }

                    </tbody>

                </table>

            </div>
        </div>
    </div>
    );
}


export default Modal;