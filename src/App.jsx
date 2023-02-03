import Ticket from "./components/Ticket"
import "./App.css"
const App = () => (
  <div className = "container">
    {
      Array.from({length : 100}).map((ele) => {
        return <Ticket />;
      })
    }
  </div>
);

export default App;
