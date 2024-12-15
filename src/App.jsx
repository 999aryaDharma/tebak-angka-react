import React, { useState, useEffect } from "react";
import GuessForm from "./components/GuessForm";
import Leaderboard from "./components/Leaderboard";
import Message from "./components/Message";
import { Rocket, Star, Trophy, Gamepad2, RefreshCw, Target } from "lucide-react";

const App = () => {
  const [targetNumber, setTargetNumber] = useState(generateRandomNumber());
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState("Mari kita mulai permainan!");
  const [range, setRange] = useState({ min: 1, max: 100 });
  const [score, setScore] = useState(1000);
  const [gameTime, setGameTime] = useState("0:00");
  const [startTime, setStartTime] = useState(null);
  const [timer, setTimer] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  const startGameTimer = () => {
    if (!startTime) {
      const currentTime = Date.now();
      setStartTime(currentTime);

      if (timer) {
        clearInterval(timer);
      }

      const newTimer = setInterval(() => {
        const elapsedTime = (Date.now() - currentTime) / 1000;
        setGameTime(formatTime(elapsedTime));
      }, 1000);

      setTimer(newTimer);
    }
  };

  const handleGuess = (guess) => {
    // Validate guess is within current range
    if (guess < range.min || guess > range.max) {
      setMessage(`Tolong masukkan angka antara ${range.min} dan ${range.max}.`);
      return;
    }

    // Start the timer on the first guess
    if (attempts === 0) {
      startGameTimer();
    }

    setAttempts(attempts + 1);

    if (guess === targetNumber) {
      const timeTaken = (Date.now() - startTime) / 1000;
      setGameTime(formatTime(timeTaken));

      let finalScore = Math.max(0, 1000 - (attempts - 1) * 100);
      setScore(finalScore);

      saveScore(finalScore);

      setMessage(`Selamat! Anda menebak dengan benar dalam ${attempts} percobaan.`);
      clearInterval(timer);
    } else {
      let newRange;
      if (guess < targetNumber) {
        newRange = { ...range, min: Math.min(range.max, Math.max(range.min, guess + 1)) };
      } else {
        newRange = { ...range, max: Math.max(range.min, Math.min(range.max, guess - 1)) };
      }

      // Ensure range is valid
      if (newRange.min > newRange.max) {
        setMessage("Tidak ada angka yang tersisa di range. Coba Main Lagi.");
        return;
      }

      setRange(newRange);
      setMessage(`Salah. Range sekarang: ${newRange.min} - ${newRange.max}.`);
    }
  };

  const resetGame = () => {
    if (timer) {
      clearInterval(timer);
    }

    setTargetNumber(generateRandomNumber());
    setAttempts(0);
    setMessage("Mari kita mulai permainan!");
    setRange({ min: 1, max: 100 });
    setScore(1000);
    setGameTime("0:00");
    setStartTime(null);
  };

  useEffect(() => {
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [timer]);

  const saveScore = (newScore) => {
    const newEntry = {
      score: newScore,
      attempts,
      time: gameTime,
      date: new Date().toLocaleString(),
    };

    const savedLeaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    savedLeaderboard.push(newEntry);

    savedLeaderboard.sort((a, b) => b.score - a.score);

    localStorage.setItem("leaderboard", JSON.stringify(savedLeaderboard));

    setLeaderboard(savedLeaderboard.slice(0, 5));
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = (timeInSeconds % 60).toFixed(2);
    return `${minutes}:${seconds.padStart(5, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col md:flex-row">
      {/* Komponen Leaderboard */}
      <div className="md:w-1/4 w-full p-4 bg-white border-b md:border-b-0 md:border-r">
        <Leaderboard leaderboard={leaderboard} />
      </div>

      {/* Main Game Area */}
      <div className="flex-1 flex flex-col justify-center items-center p-8">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all hover:scale-105">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-blue-600 mb-2 flex items-center justify-center">
              <Gamepad2 className="mr-2 text-blue-400" size={36} />
              Tebak Angka
            </h1>
            <p className="text-gray-500">
              Tebak angka antara {range.min} dan {range.max}
            </p>
          </div>

          <GuessForm onGuess={handleGuess} range={range} />
          <Message message={message} />

          <div className="flex justify-center mt-6">
            <button
              onClick={resetGame}
              className="bg-blue-500 text-white px-6 py-3 rounded-full flex items-center space-x-2 hover:bg-blue-600 transition-all transform hover:scale-110"
            >
              <RefreshCw size={20} />
              <span>Main Lagi</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
