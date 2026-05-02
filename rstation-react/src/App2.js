import { useState, useRef, useEffect } from 'react';

function App2() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const audioRef = useRef(null);

  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const togglePlay = () => {
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="station-card pop">
      <h3>🪩 Pop Hits - Top 40</h3>
      <audio 
        ref={audioRef} 
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" 
        loop
      />

      <button onClick={togglePlay} style={{marginBottom: '15px'}}>
        {isPlaying ? "⏸ Stop" : "▶ Play"}
      </button>

      <div className="volume-control">
        <label>Hangerő: {volume}%</label>
        <input 
          type="range" 
          min="0" max="100" 
          value={volume} 
          onChange={(e) => setVolume(e.target.value)} 
        />
      </div>
    </div>
  );
}

export default App2;