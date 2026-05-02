import { useState } from 'react';
import App1 from "./App1";
import App2 from "./App2";
import './style.css';

function App() {
  const [menu, setMenu] = useState("rock");

  return (
    <main>
      <header>
        <h1>Web programozás - 1 Előadás Házi feladat</h1>
      </header>

      <div id="app-container">
        <div className="radio-display">
          <h2>📻 Digitális Tuner</h2>
          <p className="status-text">Jelenlegi adó: {menu.toUpperCase()}</p>
        </div>

        <nav className="radio-nav">
          <button 
            className={menu === "rock" ? "active" : ""} 
            onClick={() => setMenu("rock")}
          >
            Rock Rádió
          </button>
          <button 
            className={menu === "pop" ? "active" : ""} 
            onClick={() => setMenu("pop")}
          >
            Pop Rádió
          </button>
        </nav>

        <div className="radio-screen">
          {menu === "rock" && <App1 />}
          {menu === "pop" && <App2 />}
        </div>
      </div>

      <footer>
        <p>Készítők: Horváth Olivér (BSY0RY), Jerzsele Zoltán (BA0N4B)</p>
      </footer>
    </main>
  );
}

export default App;