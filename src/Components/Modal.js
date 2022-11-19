import React, { useEffect, useState } from 'react';
import axios from 'axios';


function Modal ({closeModal, api_year}) {

    // http://ergast.com/api/f1/2008/results/1.json
    const [raceWinners, setRaceWinners] = useState([]);

    console.log(api_year)

    //useEffect(()=> {
    //    axios
    //      .get('http://ergast.com/api/f1/2008/results/1.json')
    //      .then(res => {
    //        //console.log(res.data.MRData.StandingsTable.StandingsLists);
    //        setRaceWinners(res.data.MRData.StandingsTable.StandingsLists);
    //      })
    //      .catch(err => {
    //        console.log(err);
    //      })
    //  }, [])

    return <div className="modalBackground">Modal
        <div className="modalContainer">
            <div title="titleCloseBtn"></div>
            <button onClick={() => {closeModal(false)}}> X </button>
            <div className="title"><h4>{api_year}</h4></div>
            <div className="body">Body</div>
        </div>
    </div>
}

export default Modal;