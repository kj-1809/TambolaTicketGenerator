import Ticket from "./components/Ticket";
import "./App.css";
import Page from "./components/Page";
const App = () => {
  const n = 100;
  let arr = []
  
  for(let i = 1 ; i <= n ; ++i){
    arr.push(i)
  }

  return (
    <div className="container">
      {arr.map((pgNumber) => {
        return <Page pageNumber = {pgNumber}/>
      })}
    </div>
  )
}
//heyy
export default App;
