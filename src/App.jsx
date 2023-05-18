import Ticket from "./components/Ticket";
import "./App.css";
import Page from "./components/Page";
import structures from "./structures";
import { useState , useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";

const App = () => {
	const [arr, setArr] = useState([]);
	const [pages, setPages] = useState(1);
	const [startFrom, setStartFrom] = useState(1);

	const [showTickets, setShowTickets] = useState(false);

	useEffect(() => {
		let temp = [];
		for (let i = 1; i <= pages; ++i) {
			temp.push(i + startFrom - 1);
		}
		setArr(temp);
	}, [pages, startFrom]);

	console.log(pages);
	console.log(startFrom);

	return (
		<div className="container">
			<Toaster position="bottom-center" />
			{!showTickets && (
				<div className="inputContainer">
					<div className="singleInputContainer">
						<h4>Number of sheets : </h4>
						<input
							className="sheetInput"
							type="number"
							value={pages}
							onChange={(e) => setPages(parseInt(e.target.value))}
						/>
					</div>
					<div className="singleInputContainer">
						<h4>Start page from : </h4>
						<input
							className="pageInput"
							type="number"
							value={startFrom}
							onChange={(e) => setStartFrom(parseInt(e.target.value))}
						/>
					</div>
					<button
						onClick={() => {
							if (pages && startFrom) {
								setShowTickets(true);
								toast.success("Generating Tickets....");
							} else {
								toast.error("Please enter a valid value !");
							}
						}}
					>
						Generate
					</button>
				</div>
			)}

			{showTickets &&
				arr.map((pgNumber) => {
					return (
						<Page
							pageNumber={pgNumber}
							key={pgNumber}
							structure={structures[pgNumber % 5]}
						/>
					);
				})}
		</div>
	);
};
//heyy
export default App;
