import React, { useState, useEffect } from "react";
import { Rocket, Star, Trophy, Gamepad2, RefreshCw, Target } from "lucide-react";

// GuessForm Component (Assuming you want a playful input)
const GuessForm = ({ onGuess, range }) => {
	const [guess, setGuess] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		const numberGuess = parseInt(guess);
		if (!isNaN(numberGuess)) {
			onGuess(numberGuess);
			setGuess("");
		}
	};

	return (
		<form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg transform transition-all hover:scale-105 hover:shadow-xl">
			<div className="flex items-center space-x-4">
				<input
					type="number"
					value={guess}
					onChange={(e) => setGuess(e.target.value)}
					min={range.min}
					max={range.max}
					placeholder="Tebak angka!"
					className="w-full p-3 border-2 border-blue-300 rounded-lg text-center text-2xl 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 
                     placeholder-blue-300 text-blue-700"
				/>
				<button
					type="submit"
					className="bg-green-500 text-white p-3 rounded-full 
                     hover:bg-green-600 transition-all transform hover:scale-110"
				>
					<Target size={24} />
				</button>
			</div>
		</form>
	);
};

export default GuessForm;
