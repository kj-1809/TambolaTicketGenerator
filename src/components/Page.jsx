import "./Page.css";
import Ticket from "./Ticket";
import { useState, useEffect } from "react";

function Page(props) {
	const [flatListOfNumbers, setFlatListOfNumbers] = useState([]);

	const getRandom = (low, high, exceptions) => {
		// gives result in [low , high)
		let value = -1;
		while (value == -1) {
			// console.log("while")
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
		const total = [9, 10, 10, 10, 10, 10, 10, 10, 11];
		let pos = [];
		const current = [0, 0, 0, 0, 0, 0, 0, 0, 0]
		const left = [9, 10, 10, 10, 10, 10, 10, 10, 11];


		const tempPos = [
			[0,1,0,1,1,0,1,0,1],
			[1,0,1,0,1,1,0,1,0],
			[1,0,1,0,1,0,1,0,1],
			[1,0,1,0,1,1,0,1,0],
			[0,1,0,1,0,1,1,0,1],
			[0,1,0,1,1,0,1,0,1],
			[0,1,0,1,0,1,1,1,0],
			[1,0,1,0,1,1,0,1,0],
			[1,0,1,0,1,0,1,0,1],
			[1,1,0,1,0,1,0,1,0],
			[0,1,0,1,0,1,0,1,1],
			[1,0,1,0,1,0,1,0,1],
			[0,1,0,1,0,1,0,1,1],
			[1,0,1,1,0,0,1,1,0],
			[0,1,1,0,1,0,1,0,1],
			[0,1,0,1,0,1,0,1,1],
			[0,1,1,1,0,1,0,1,0],
			[1,0,1,0,1,0,1,0,1]
		]



		// generate position where numbers will be placed
		for (let i = 0; i < 18; ++i) {
			const forbiddenColumns = [];
			const mandatoryColumns = [];
			pos[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0];

			for(let j = 0 ; j < 9 ; ++j){
				
				if(j === 0){
					if(left[j] >= Math.ceil((18 - i) * 0.5)){
						mandatoryColumns.push([left[j] , j])
					}	
					if(current[j] >= 9){
						forbiddenColumns.push(j)
					}
				}else if(j === 8){
					if(left[j] >= Math.ceil((18 - i) * 0.5)){
						mandatoryColumns.push([left[j] , j])
					}
					if(current[j] >= 11){
						forbiddenColumns.push(j)
					}
				}else{
					if(left[j] >= Math.ceil((18 - i) * 0.5)){
						mandatoryColumns.push([left[j] , j])
					}
					if(current[j] >= 10){
						forbiddenColumns.push(j)
					}
				}
			}
			
			mandatoryColumns.sort((a,b) => {
				return b[0] - a[0]
			})
			

			let timesRan = 0;

			for(let j = 0 ; j < mandatoryColumns.length && timesRan < 5 ; ++j){
				if(current[mandatoryColumns[j][1]] === total[mandatoryColumns[j][1]]){
					continue;
				}
				++timesRan;
				pos[i][mandatoryColumns[j][1]] = 1;
				current[mandatoryColumns[j][1]]++;
				left[mandatoryColumns[j][1]]--;
			}

			const pickedColumns = [...forbiddenColumns , ...mandatoryColumns]

			for (let k = 0; k < 5 - timesRan ; ++k) {
				const pickedColumn = getRandom(0, 9, pickedColumns);
				pos[i][pickedColumn] = 1;
				current[pickedColumn]++;
				left[pickedColumn]--;
				pickedColumns.push(pickedColumn);
			}
		}

		// console.log(pos)
		// console.log(current)

		//delete (just for testing)
		const rowSum = [];
		for(let x = 0 ; x < 18 ; ++x){
			let cnt= 0;
			for(let y = 0 ; y < 9 ; ++y){
				if(tempPos[x][y] === 1){
					cnt++;
				}
			}
			rowSum[x] = cnt;
		}
		const columnSum = []

		for(let x = 0 ; x < 9 ; ++x){
			let cnt = 0;
			for(let y = 0 ; y < 18 ; ++y){
				if(tempPos[y][x] === 1){
					cnt++;
				}
			}
			columnSum[x] = cnt;
		}


		// console.log(rowSum)
		// console.log(columnSum)

		const ticketNumbers = [];
		pos = tempPos;

		// pick the numbers
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
			ticketNumbers.push(pickedNumbers);
		}

		// console.log("Picked Numbers : ")
		// console.log(ticketNumbers)

		// place numbers at the respective positions
		for (let j = 0; j < 9; ++j) {
			let elements = ticketNumbers[j];
			let curPos = 0;
			for (let row = 0; row < 18; ++row) {
				if (pos[row][j] === 1) {
					pos[row][j] = elements[curPos];
					curPos += 1;
				}
			}
		}

		const newPos = [];
		let currentPos = 0;
		for (let i = 0; i < 18; ++i) {
			for (let j = 0; j < 9; ++j) {
				newPos[currentPos] = pos[i][j];
				currentPos++;
			}
		}
		setFlatListOfNumbers(newPos);
	};

	useEffect(() => {
		randomNumberGenerator();
	}, []);

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
