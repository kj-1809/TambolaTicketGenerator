import "./Page.css";
import Ticket from "./Ticket";
import { useState, useEffect } from "react";

function Page(props) {
	const [flatListOfNumbers, setFlatListOfNumbers] = useState([]);

	const getRandom = (low, high, exceptions) => {
		// gives result in [low , high)
		let value = -1;
		while (value === -1) {
			const cur = Math.floor(Math.random() * (high - low) + low);
			let fine = true;
			if(exceptions.length !== 0){
				exceptions.forEach((element) => {
					if (cur === element) {
						fine = false;
					}
				});
			}
			if (fine) {
				value = cur;
				break;
			}
		}
		return value;
	};

	const randomNumberGenerator = () => {
		const total = [9, 10, 10, 10, 10, 10, 10, 10, 11];
		const ticketNumbers = [];
		const pos = JSON.parse(JSON.stringify(props.structure));

		// pick the numbers
		for (let j = 0; j < 9; ++j) {
			let low = 10 * j;
			let high = 10 * j + 9;
			if (j === 0) {
				low++;
			}
			if (j === 8) {
				high++;
			}
			let times = total[j];
			let pickedNumbers = [];
			for (let k = 0; k < times; ++k) {
				const pickedNumber = getRandom(low, high + 1, pickedNumbers)
				pickedNumbers.push(pickedNumber);
			}
			ticketNumbers.push(pickedNumbers);
		}
		console.log(ticketNumbers)

		// place numbers at the respective positions
		for (let j = 0; j < 9; ++j) {
			let elements = ticketNumbers[j];
			let curPos = 0;
			for (let row = 0; row < 18; ++row) {
				if (pos[row][j] === 1) {
					pos[row][j] = elements[curPos];
					++curPos;
				}
			}
		}
		console.log(pos)

		// make the list flat
		const flatPos = [];
		let curPos = 0;
		for (let i = 0; i < 18; ++i) {
			for (let j = 0; j < 9; ++j) {
				flatPos[curPos] = pos[i][j];
				curPos++;
			}
		}

		setFlatListOfNumbers(flatPos);
	};

	useEffect(() => {
		randomNumberGenerator();
	}, [props.structure]);

	return (
		<div className="pageStyle">
			<Ticket
				ticketCode={props.pageNumber * 6 - 5}
				ticketNumbers={flatListOfNumbers.slice(0, 27)}
			/>
			<Ticket
				ticketCode={props.pageNumber * 6 - 4}
				ticketNumbers={flatListOfNumbers.slice(27, 54)}
			/>
			<Ticket
				ticketCode={props.pageNumber * 6 - 3}
				ticketNumbers={flatListOfNumbers.slice(54, 81)}
			/>
			<Ticket
				ticketCode={props.pageNumber * 6 - 2}
				ticketNumbers={flatListOfNumbers.slice(81, 108)}
			/>
			<Ticket
				ticketCode={props.pageNumber * 6 - 1}
				ticketNumbers={flatListOfNumbers.slice(108, 135)}
			/>
			<Ticket
				ticketCode={props.pageNumber * 6 - 0}
				ticketNumbers={flatListOfNumbers.slice(135, 162)}
			/>
			<h3 className="pageNumber">
				Sheet #{props.pageNumber ? props.pageNumber : 1}
			</h3>
		</div>
	);
}

export default Page;
