import { useEffect, useState } from "react";
import "./App.css";
import { genOptions, genRandomColor } from "../libs/utils";

function App() {
  const [targetColor, setTargetColor] = useState(genRandomColor());
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);

  const [selectedOption, setSelectedOption] = useState(null);

  const resetGame = () => {
    setScore(0);
    setTargetColor(genRandomColor());
  };

  const handleOptionClick = (clickedOption) => {
    setSelectedOption(clickedOption);

    // update score
    if (clickedOption === targetColor) {
      setScore((prev) => prev + 1);
      setTimeout(() => {
        setTargetColor(genRandomColor());
      }, 500);
    }
  };

  useEffect(() => {
    setSelectedOption(null);
    setOptions(genOptions(targetColor));
  }, [targetColor]);

  return (
    <>
      <div>
        <h1 data-testid="gameInstructions" className="instruction">
          Guess the correct color!
        </h1>
        <main className="container">
          {/* TARGET COLOR */}
          <div
            data-testid="colorBox"
            style={{
              backgroundColor: targetColor,
            }}
            className="target"
          />
          {/* OPTIONS */}
          <h2>Which of these matches the above color?</h2>
          <div className="options">
            {options &&
              options.map((option) => {
                return (
                  <button
                    onClick={() => handleOptionClick(option)}
                    key={option}
                    data-testid="colorOption"
                    style={{
                      backgroundColor: option,
                    }}
                    className="option"
                  >
                    <span data-testid="gameStatus">
                      {selectedOption === option &&
                        selectedOption === targetColor &&
                        "Correct ✅"}
                      {selectedOption === option &&
                        selectedOption !== targetColor &&
                        "Wrong ❌"}
                    </span>
                  </button>
                );
              })}
          </div>

          <div className="controls">
            <button
              data-testid="newGameButton"
              onClick={resetGame}
              className="reset"
            >
              Reset Game
            </button>
            <div data-testid="score" className="score">
              Score: <span>{score}</span>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
