import "./Page.css"
import Ticket from "./Ticket";

function Page(props){
  return (
    <div className = "pageStyle">
      <Ticket ticketCode = {props.pageNumber*6 - 5}/>
      <Ticket ticketCode = {props.pageNumber*6 - 4}/>
      <Ticket ticketCode = {props.pageNumber*6 - 3}/>
      <Ticket ticketCode = {props.pageNumber*6 - 2}/>
      <Ticket ticketCode = {props.pageNumber*6 - 1}/>
      <Ticket ticketCode = {props.pageNumber*6 - 0}/>
      <h3 className = "pageNumber">Page {props.pageNumber ? props.pageNumber : 1}</h3>
    </div>
  )
}

export default Page;