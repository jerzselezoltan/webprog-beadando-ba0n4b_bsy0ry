import { useState, useRef } from 'react';

function App1() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null); 

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="station-card rock">
      <h3>🎸 Rock FM - Élő</h3>
      <p>Most szól: Klasszikus Rock Mix</p>
      
      
      <audio 
        ref={audioRef} 
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
        loop
      />

      <button onClick={togglePlay}>
        {isPlaying ? "⏸ Megállítás" : "▶ Lejátszás"}
      </button>
      
      <p style={{fontSize: '12px', marginTop: '10px'}}>
        Állapot: {isPlaying ? "Műsoron" : "Szünet"}
      </p>
    </div>
  );
}

export default App1;