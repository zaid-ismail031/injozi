import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Modal from './Components/Modal';

function App() {

  // http://ergast.com/api/f1/driverStandings/1.json?limit=30&offset=55
  const [winners, setWinners] = useState([])
  const [openModal, setOpenModal] = useState(false);
  const [year, setYear] = useState([]);
  
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


  return (
    <div className="App">
     <table>
     <tbody>
     <tr>
      <th>Year</th>
      <th>Winner</th>
     </tr>
     
       {
         winners.map(winner => (<tr>
          <td>{winner.season}</td>
          <td><a href="#" onClick={()=> {setOpenModal(true); setYear(winner.season);}}>{winner.DriverStandings[0].Driver.driverId}</a></td>
          </tr>))
       }
       </tbody>
       </table>

       {openModal && <Modal closeModal={setOpenModal} api_year={year} />}
    </div>
  );
}

export default App;
