import { useEffect, useState } from "react";
import "./Ticket.css";

function Ticket(props) {
	const [sortedTicketNumbers, setSortedTicketNumbers] = useState([]);

	useEffect(() => {
		let numbers = [];
		let inter = [];
		let final = [];
		let count = 0;

		// unflatten the list
		for (let i = 0; i < 3; ++i) {
			inter[i] = [];
			for (let j = 0; j < 9; ++j) {
				inter[i][j] = props.ticketNumbers[count++];
			}
		}
		//sort
		for (let j = 0; j < 9; ++j) {
			numbers[j] = [];
			for (let i = 0; i < 3; ++i) {
				if (inter[i][j] !== 0) {
					numbers[j].push(inter[i][j]);
				}
			}
			numbers[j].sort();
		}


		//putback sorted in inter
		for(let j = 0 ; j < 9 ; ++j){
			let cur = 0;
			for(let i = 0 ; i < 3 ; ++i){
				if(inter[i][j] !== 0){
					inter[i][j] = numbers[j][cur++]
				}
			}
		}

		//flatten
		count = 0;
		for (let i = 0; i < 3; ++i) {
			for (let j = 0; j < 9; ++j) {
				final[count++] = inter[i][j];
			}
		}

		setSortedTicketNumbers(final);
	}, [props.ticketNumbers]);


	return (
		<div className="ticketContainer">
			<div className="headingContainer">
				<h3 className="ticketHeading">Tambola Family</h3>
				<h3 className="ticketCode">
					#{props.ticketCode ? props.ticketCode : 101}
				</h3>
			</div>
			<hr className="line" />
			<div className="table">
				{sortedTicketNumbers.map((ele, pos) => {
					return (
						<div className="cell" key={pos}>
							{ele === 0 ? "" : ele}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Ticket;
