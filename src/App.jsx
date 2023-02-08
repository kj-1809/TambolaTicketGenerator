import Ticket from "./components/Ticket";
import "./App.css";
import Page from "./components/Page";
import structures from "./structures";

const App = () => {
	const n = 1000;
	const startPage = 1;
	let arr = [];

	for (let i = 1; i <= n; ++i) {
		arr.push(i + startPage - 1);
	}

	return (
		<div className="container">
			{arr.map((pgNumber) => {
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
