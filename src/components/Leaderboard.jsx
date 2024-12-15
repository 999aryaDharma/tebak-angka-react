import React from "react";
import { Trophy, Star, Gamepad2, Rocket } from "lucide-react";

const Leaderboard = ({ leaderboard }) => {
	return (
		<div className="w-full md:w-full p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg mb-6 md:mb-0">
			<div className="flex items-center justify-center mb-4">
				<Trophy className="text-yellow-500 mr-2" size={32} />
				<h2 className="text-2xl font-bold text-blue-700">Papan Skor</h2>
			</div>
			{leaderboard.length > 0 ? (
				<ul className="space-y-2">
					{leaderboard.map((entry, index) => (
						<li key={index} className="bg-white p-3 rounded-lg shadow-md transform transition-all hover:scale-105">
							<div className="flex justify-between items-center">
								<span className="font-bold text-blue-600">#{index + 1}</span>
								<div className="text-right">
									<p className="text-sm font-semibold text-gray-700">
										<Star className="inline mr-1 text-yellow-400" size={16} />
										Skor: {entry.score}
									</p>
									<p className="text-xs text-gray-500">
										<Gamepad2 className="inline mr-1 text-blue-400" size={12} />
										{entry.time} | {entry.attempts} percobaan
									</p>
								</div>
							</div>
						</li>
					))}
				</ul>
			) : (
				<div className="text-center text-gray-500 p-4 bg-white rounded-lg">
					<Rocket className="mx-auto mb-2 text-blue-400" size={32} />
					<p>Belum ada skor</p>
				</div>
			)}
		</div>
	);
};

export default Leaderboard;
