import { useState } from 'react';
import './App.css';

function App() {
  const [stations, setStations] = useState([
    { frek: "87,6", telj: "7,6", nev: "Neo FM", hely: "Győr" },
    { frek: "87,6", telj: "0,5", nev: "Gong Rádió", hely: "Csongrád" },
    { frek: "87,6", telj: "-", nev: "Kontakt Rádió", hely: "Budapest" },
    { frek: "87,8", telj: "0,001", nev: "ZsebRádió", hely: "Halásztelek" },
    { frek: "87,8", telj: "0,0006", nev: "Remete Rádió", hely: "Pécs" },
    { frek: "87,9", telj: "0,2", nev: "Dió Rádió", hely: "Hatvan" },
    { frek: "88,1", telj: "1", nev: "Rise FM", hely: "Budapest" },
    { frek: "88,4", telj: "0,1", nev: "Sirály Rádió", hely: "Balatonfüred" },
    { frek: "89,5", telj: "68", nev: "Music FM", hely: "Budapest" },
    { frek: "94,8", telj: "78", nev: "Petőfi Rádió", hely: "Budapest" }
  ]);

  const [formData, setFormData] = useState({ frek: '', telj: '', nev: '', hely: '' });
  const [editIndex, setEditIndex] = useState(-1);

  const handleSave = () => {
    if (!formData.frek || !formData.nev || !formData.hely) {
      alert("Kérjük, a frekvenciát, csatornát és adóhelyet töltsd ki!");
      return;
    }

    const stationData = { 
      frek: formData.frek, 
      telj: formData.telj || "-", 
      nev: formData.nev, 
      hely: formData.hely 
    };

    if (editIndex === -1) {
      setStations([...stations, stationData]);
    } else {
      const updatedStations = [...stations];
      updatedStations[editIndex] = stationData;
      setStations(updatedStations);
      setEditIndex(-1);
    }
    setFormData({ frek: '', telj: '', nev: '', hely: '' });
  };

  const prepareUpdate = (index) => {
    setFormData(stations[index]);
    setEditIndex(index);
  };

  const deleteStation = (index) => {
    if (window.confirm("Biztosan törölni szeretnéd ezt a bejegyzést?")) {
      setStations(stations.filter((_, i) => i !== index));
    }
  };

  return (
    <>
      <header>
        <h1>React CRUD Modul</h1>
      </header>

<nav className="navbar navbar-expand-lg mt-2">
  <div className="container d-flex justify-content-center">
    <a className="nav-custom-btn" href="index.html">
      Vissza a főoldalra
    </a>
  </div>
</nav>

      <main>
        <div id="app-container" className="card border-0 shadow-sm">
          <h2 className="mb-4">
            {editIndex === -1 ? "Új Rádióadó Felvétele" : "Adó Szerkesztése"}
          </h2>
          
          <div className="row g-2 mb-4 align-items-end">
            <div className="col-md-2">
              <label className="small fw-bold mb-1">Frekvencia (MHz) </label>
              <input type="text" className="form-control" placeholder="87,6"
                value={formData.frek} onChange={e => setFormData({...formData, frek: e.target.value})} />
            </div>
            <div className="col-md-2">
              <label className="small fw-bold mb-1">Teljesítmény (kW) </label>
              <input type="text" className="form-control" placeholder="7,6"
                value={formData.telj} onChange={e => setFormData({...formData, telj: e.target.value})} />
            </div>
            <div className="col-md-3">
              <label className="small fw-bold mb-1">Csatorna neve </label>
              <input type="text" className="form-control" placeholder="Neo FM"
                value={formData.nev} onChange={e => setFormData({...formData, nev: e.target.value})} />
            </div>
            <div className="col-md-3">
              <label className="small fw-bold mb-1">Adóhely </label>
              <input type="text" className="form-control" placeholder="Győr"
                value={formData.hely} onChange={e => setFormData({...formData, hely: e.target.value})} />
            </div>
            <div className="col-md-2">
              <button 
                className={`btn w-100 fw-bold text-white ${editIndex === -1 ? 'btn-warning' : 'btn-success'}`}
  
                onClick={handleSave}
              >
                {editIndex === -1 ? "Hozzáadás" : "Mentés"}
              </button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Frekvencia</th>
                  <th>Teljesítmény</th>
                  <th>Csatorna</th>
                  <th>Adóhely</th>
                  <th>Műveletek</th>
                </tr>
              </thead>
              <tbody>
                {stations.map((s, index) => (
                  <tr key={index}>
                    <td><b>{s.frek} MHz</b></td>
                    <td>{s.telj} kW</td>
                    <td>{s.nev}</td>
                    <td>{s.hely}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary" onClick={() => prepareUpdate(index)}>Szerkeszt</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => deleteStation(index)}>Törlés</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <footer>
       <p>Készítők: Horváth Olivér (BSY0RY), Jerzsele Zoltán (BA0N4B)</p>
      </footer>
    </>
  );
}

export default App;