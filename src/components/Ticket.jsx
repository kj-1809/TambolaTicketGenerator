import "./Ticket.css";

function Ticket(props) {

	return (
		<div className="ticketContainer">
			<div className="headingContainer">
				<h3 className="ticketHeading">Tambola Family</h3>
				<h3 className="ticketCode">#{props.ticketCode ? props.ticketCode : 101}</h3>
			</div>
			<hr className="line" />
			<div className="table">

				{props.ticketNumbers.map((ele , pos) => {
						return <div className="cell" key = {pos}>{ele === 0 ? "" : ele}</div>
				})}
				
			</div>
		</div>
	);
}

export default Ticket;
