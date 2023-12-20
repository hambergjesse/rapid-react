import { useState, useEffect } from "preact/hooks";
import "./app.css";

export const App = () => {
  const [dots, setDots] = useState([]);
  const [difficulty, setDifficulty] = useState("medium");
  const [totalDotsClicked, setTotalDotsClicked] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);

  useEffect(() => {
    let timeout;

    if (gameRunning) {
      timeout = setTimeout(() => {
        createDot();
      }, getDifficultyTimeout());
    }

    return () => clearTimeout(timeout);
  }, [dots, difficulty, gameRunning]);

  const createDot = () => {
    const containerSize = 200;
    const dotSize = Math.floor(Math.random() * 30) + 10; // Random size between 10 and 40
    const spawnAreaOffsetX = (containerSize - dotSize) / 2;
    const spawnAreaOffsetY = (containerSize - dotSize) / 2;

    const newDot = {
      id: Date.now(),
      size: dotSize,
      top: Math.random() * spawnAreaOffsetY * 2 + spawnAreaOffsetY,
      left: Math.random() * spawnAreaOffsetX * 2 + spawnAreaOffsetX,
      startTime: new Date(),
    };

    setDots((prevDots) => [...prevDots, newDot]);
  };

  const handleDotClick = (dotId) => {
    setTotalDotsClicked((prevTotal) => prevTotal + 1);
    setDots((prevDots) => prevDots.filter((dot) => dot.id !== dotId));
  };

  const handleDifficultyChange = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    setDots([]); // Clear existing dots
  };

  const handleStartGame = () => {
    setGameRunning(true);
    setTotalDotsClicked(0);
    setDots([]);
  };

  const handleStopGame = () => {
    setGameRunning(false);
    setDots([]);
  };

  const getDifficultyTimeout = () => {
    switch (difficulty) {
      case "easy":
        return 1250;
      case "medium":
        return 750;
      case "hard":
        return 350;
      default:
        return 750; // Default to medium difficulty
    }
  };

  return (
    <div className="App">
      <h1>Rapid React</h1>
      <div className="game-controls">
        <button onClick={handleStartGame} disabled={gameRunning}>
          Start
        </button>
        <button onClick={handleStopGame} disabled={!gameRunning}>
          Stop
        </button>
      </div>
      <div className="difficulty-buttons">
        <button
          onClick={() => handleDifficultyChange("easy")}
          className={difficulty === "easy" ? "selected" : ""}
        >
          Easy
        </button>
        <button
          onClick={() => handleDifficultyChange("medium")}
          className={difficulty === "medium" ? "selected" : ""}
        >
          Medium
        </button>
        <button
          onClick={() => handleDifficultyChange("hard")}
          className={difficulty === "hard" ? "selected" : ""}
        >
          Hard
        </button>
      </div>
      <div className="dots-container">
        {dots.map((dot) => (
          <div
            key={dot.id}
            className="dot"
            style={{
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              top: `${dot.top}px`,
              left: `${dot.left}px`,
              transition: `top ${getDifficultyTimeout()}ms linear, left ${getDifficultyTimeout()}ms linear`,
            }}
            onClick={() => handleDotClick(dot.id)}
          />
        ))}
      </div>
      <div className="info">
        <p>Total Dots Clicked: {totalDotsClicked}</p>
        <p>Difficulty: {difficulty}</p>
      </div>
    </div>
  );
};

export default App;
