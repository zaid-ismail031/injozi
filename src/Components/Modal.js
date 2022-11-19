import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Modal.css'


function Modal ({closeModal, api_year, currentWinner}) {

    // http://ergast.com/api/f1/2008/results/1.json
    const [raceWinners, setRaceWinners] = useState([]);

    console.log(api_year)
    console.log(currentWinner)

    useEffect(()=> {
        axios
          .get(`http://ergast.com/api/f1/${api_year}/results/1.json`)
          .then(res => {
            //console.log(res.data.MRData.StandingsTable.StandingsLists);
            setRaceWinners(res.data.MRData.RaceTable.Races);
          })
          .catch(err => {
            console.log(err);
          })
      }, [])

    return (<div className="modalBackground">
        <div className="modalContainer">
            <div title="titleCloseBtn">
                <button onClick={() => {closeModal(false)}}> X </button>
            </div>
            <div className="title"><h4>{api_year}</h4></div>
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
                                <tr>
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