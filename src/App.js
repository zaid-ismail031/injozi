import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import Modal from './Components/Modal';

function App() {

  // http://ergast.com/api/f1/driverStandings/1.json?limit=30&offset=55
  const [winners, setWinners] = useState([])
  const [openModal, setOpenModal] = useState(false);
  const [year, setYear] = useState([]);
  const [modalWinners, setModalWinners] = useState([])
  
  useEffect(()=> {
    axios
      .get('http://ergast.com/api/f1/driverStandings/1.json?limit=30&offset=55')
      .then(res => {
        console.log(res.data.MRData.StandingsTable.StandingsLists);
        setWinners(res.data.MRData.StandingsTable.StandingsLists);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  const setHidden = () => {
    console.log(document.body.style.overflow);
    if (document.body.style.overflow !== "hidden") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  };


  return (
    <div className="App">
    {openModal && <Modal closeModal={setOpenModal} api_year={year} currentWinner={modalWinners} />} 
     <h4>F1 World Championship Winners (2005-Present)</h4>
     <table className="listOfWinners">
     <tbody>
     <tr>
      <th>Year</th>
      <th>Winner</th>
     </tr>
     
       {
         winners.map(
          winner => (
          <tr onClick={()=> {setOpenModal(true); setYear(winner.season); setModalWinners(winner.DriverStandings[0].Driver.givenName.concat(" ").concat(winner.DriverStandings[0].Driver.familyName)); setHidden();}}>
          <td>{winner.season}</td>
          <td>{winner.DriverStandings[0].Driver.givenName.concat(" ").concat(winner.DriverStandings[0].Driver.familyName)}</td>
          </tr>
          )
          )
       }

       </tbody>
       </table>

    </div>
  );
}

export default App;
