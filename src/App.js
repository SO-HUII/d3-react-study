import "./App.css";
import DonutChart from "./DonutChart";
import LinePlot from "./LinePlot";
import LinePlot2 from "./LinePlot2";

function App() {
  const data = [4, 8, 12, 23, 26, 45];

  return (
    <div className="App">
      <LinePlot data={data} />
      <hr />
      <LinePlot2 />
      <hr />
      <DonutChart />
    </div>
  );
}

export default App;
