import { useEffect, useState } from "react";
import "./Ticket.css";

function Ticket(props) {

	const [ticketNumbersFinal,setTicketNumbersFinal] = useState([])

	const check = () => {
		for(let i = 0 ; i < 1000 ; ++i){
			randomNumberGenerator();
		}
	}
	const getRandom = (low, high, exceptions) => {
		// gives result in [low , high)
		let value = -1;
		while (value == -1) {
			const cur = Math.floor(Math.random() * (high - low) + low);
			let fine = true;
			exceptions.forEach((element) => {
				if (cur === element) {
					fine = false;
				}
			});

			if (fine) {
				value = cur;
				break;
			}
		}
		return value;
	};

	const randomNumberGenerator = () => {
		const total = [0, 0, 0, 0, 0, 0, 0, 0, 0];
		const pos = [];

		for (let i = 0; i < 3; ++i) {
			let pickedColumns = [];
			pos[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0];

			for (let k = 0; k < 5; ++k) {
				const pickedColumn = getRandom(0, 9, pickedColumns);
				pos[i][pickedColumn] = 1;
				pickedColumns.push(pickedColumn);
			}
			pickedColumns.forEach((column) => {
				total[column]++;
			});
		}

		const ticketNumbers = [];

		for (let i = 0; i < 9; ++i) {
			let low = 10 * i;
			let high = 10 * i + 9;
			if (i === 0) {
				low++;
			}
			if (i === 8) {
				high++;
			}
			let times = total[i];
			let pickedNumbers = [];
			for (let k = 0; k < times; ++k) {
				pickedNumbers.push(getRandom(low, high + 1, pickedNumbers));
			}
			pickedNumbers.sort();
			ticketNumbers.push(pickedNumbers);
		}

		// console.log(ticketNumbers)
		// console.log(pos)

		for (let j = 0; j < 9; ++j) {
			let elements = ticketNumbers[j];
			let curPos = 0;
			for (let row = 0; row < 3; ++row) {
				if (pos[row][j] === 1) {
					pos[row][j] = elements[curPos];
					curPos += 1;
				}
			}
		}

		console.log(pos);
		const newPos = []
		let currentPos = 0;
		for(let i = 0 ; i < 3 ; ++i){
			for(let j = 0 ; j < 9 ; ++j){
				newPos[currentPos] = pos[i][j]
				currentPos++;
			}
		}

		setTicketNumbersFinal(newPos);
	};

	useEffect(() => {
		randomNumberGenerator();
		// check();
	}, []);

	return (
		<div className="ticketContainer">
			<div className="headingContainer">
				<h3 className="ticketHeading">Tambola Family</h3>
				<h3 className="ticketCode">#{props.ticketCode ? props.ticketCode : 101}</h3>
			</div>
			<hr className="line" />
			<div className="table">

				{ticketNumbersFinal.map((ele) => {
						return <div className="cell">{ele === 0 ? "" : ele}</div>
				})}
				
			</div>
		</div>
	);
}

export default Ticket;
