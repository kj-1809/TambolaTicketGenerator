import "./Page.css";
import Ticket from "./Ticket";
import { useState, useEffect } from "react";

function Page(props) {
	const [flatListOfNumbers, setFlatListOfNumbers] = useState([]);

	const getRandom = (low, high, exceptions = []) => {
		// gives result in [low , high)
		let value = -1;
		while (value == -1) {
			const cur = Math.floor(Math.random() * (high - low) + low);
			let fine = true;
			if (exceptions) {
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
		const columns = [3, 4, 4, 4, 4, 4, 4, 4, 4];
		const sets = [];
		const pos = [];
		const total = [9, 10, 10, 10, 10, 10, 10, 10, 11];

		const numberOfElements = (curSet) => {
			let count = 0;
			for (let i = 0; i < 9; ++i) {
				count += sets[curSet][i];
			}
			return count;
		};

		const getRowCount = (curRow) => {
			let count = 0;
			for (let j = 0; j < 9; ++j) {
				count += pos[curRow][j];
			}
			return count;
		};

		// initialize sets
		for (let i = 0; i < 6; ++i) {
			sets[i] = [];
			// for every set
			for (let j = 0; j < 9; ++j) {
				sets[i][j] = 1;
			}
		}

		// matrix intialization
		for (let i = 0; i < 18; ++i) {
			pos[i] = [];
			for (let j = 0; j < 9; ++j) {
				pos[i][j] = 0;
			}
		}

		// random set initialization
		let randomSet = getRandom(0, 6);
		sets[randomSet][8]++;

		// 3 passes for adding elements in columns
		for (let times = 0; times < 4; ++times) {
			let factor = 2;
			if (times === 3) {
				factor = 3;
			}
			for (let j = 0; j < 9; ++j) {
				if (columns[j] == 0) {
					continue;
				}

				let vacantSeatFound = false;

				while (!vacantSeatFound) {
					let randSet = getRandom(0, 6);
					if (numberOfElements(randSet) === 15 || sets[randSet][j] === factor) {
						continue;
					}
					vacantSeatFound = true;
					sets[randSet][j]++;
					columns[j]--;
				}
			}
		}

		for (let setIndex = 0; setIndex < 6; ++setIndex) {
			//first row

			let curRow = setIndex * 3;
			for (let size = 3; size > 0; --size) {
				if (getRowCount(curRow) === 5) {
					break;
				}
				const cols = [0, 1, 2, 3, 4, 5, 6, 7, 8];
				for (let j = 0; j < 9; ++j) {
					let randomIndex = getRandom(0, cols.length);
					let randomCol = cols[randomIndex];
					cols.splice(randomIndex, 1);

					if (getRowCount(curRow) === 5) {
						break;
					}
					if (pos[curRow][randomCol] != 0) {
						continue;
					}
					if (size != sets[setIndex][randomCol]) {
						continue;
					}
					pos[curRow][randomCol] = 1;
					sets[setIndex][randomCol]--;
					columns[randomCol]--;
				}
			}

			// second row
			curRow++;
			for (let size = 2; size > 0; --size) {
				if (getRowCount(curRow) === 5) {
					break;
				}
				const cols = [0, 1, 2, 3, 4, 5, 6, 7, 8];
				for (let j = 0; j < 9; ++j) {
					let randomIndex = getRandom(0, cols.length);
					let randomCol = cols[randomIndex];
					cols.splice(randomIndex, 1);
					if (getRowCount(curRow) === 5) {
						break;
					}
					if (pos[curRow][randomCol] != 0) {
						continue;
					}
					if (size != sets[setIndex][randomCol]) {
						continue;
					}
					pos[curRow][randomCol] = 1;
					sets[setIndex][randomCol]--;
					columns[randomCol]--;
				}
			}

			// third row
			curRow++;
			for (let size = 3; size > 0; --size) {
				if (getRowCount(curRow) === 5) {
					break;
				}
				const cols = [0, 1, 2, 3, 4, 5, 6, 7, 8];
				for (let j = 0; j < 9; ++j) {
					let randomIndex = getRandom(0, cols.length);
					let randomCol = cols[randomIndex];
					cols.splice(randomIndex, 1);
					if (getRowCount(curRow) === 5) {
						break;
					}
					if (pos[curRow][randomCol] != 0) {
						continue;
					}
					if (size != sets[setIndex][randomCol]) {
						continue;
					}
					pos[curRow][randomCol] = 1;
					sets[setIndex][randomCol]--;
					columns[randomCol]--;
				}
			}
		}

		const rowSum = [];
		for (let x = 0; x < 18; ++x) {
			let cnt = 0;
			for (let y = 0; y < 9; ++y) {
				if (pos[x][y] === 1) {
					cnt++;
				}
			}
			rowSum[x] = cnt;
		}
		const columnSum = [];

		for (let x = 0; x < 9; ++x) {
			let cnt = 0;
			for (let y = 0; y < 18; ++y) {
				if (pos[y][x] === 1) {
					cnt++;
				}
			}
			columnSum[x] = cnt;
		}

		console.log(rowSum);
		console.log(columnSum);

		const ticketNumbers = [];

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

		// // place numbers at the respective positions
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
