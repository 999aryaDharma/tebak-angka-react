import React from "react";

const Message = ({ message }) => {
	const getMessageStyle = () => {
		if (message.includes("Selamat")) return "bg-green-100 text-green-800 border-green-300";
		if (message.includes("Salah")) return "bg-yellow-100 text-yellow-800 border-yellow-300";
		return "bg-blue-100 text-blue-800 border-blue-300";
	};

	return (
		<div className={`p-4 mt-4 rounded-lg border-2 ${getMessageStyle()} animate-bounce`}>
			<p className="text-center font-semibold">{message}</p>
		</div>
	);
};


export default Message;
