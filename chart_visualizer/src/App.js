import React, { useState } from "react";
import { Chart } from "react-google-charts";
import "./App.css"; // Import the CSS file

const App = () => {
  const [chartData, setChartData] = useState([]);
  const [chartType, setChartType] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const jsonData = JSON.parse(e.target.result);

      const headers = Object.keys(jsonData[0]);
      const formattedData = [headers];

      jsonData.forEach((item) => {
        const row = headers.map((header) => item[header]);
        formattedData.push(row);
      });

      setChartData(formattedData);
    };
    reader.readAsText(file);
  };

  const renderChart = () => {
    if (!chartData || !chartType) {
      return <p>Please select a file and a chart type.</p>;
    }

    let options = { title: "Chart" };
    if (chartType === "PieChart") {
      options.is3D = true;
    }

    return (
      <Chart
        chartType={chartType}
        data={chartData}
        options={options}
        width="100%"
        height="400px"
      />
    );
  };

  return (
    <div className="container">
      <h1>Chart Visualizer</h1>
      <div className="file-input">
        <input type="file" accept=".json" onChange={handleFileUpload} />
      </div>
      <div className="button-group">
        <button onClick={() => setChartType("PieChart")}>Pie Chart</button>
        <button onClick={() => setChartType("BarChart")}>Bar Chart</button>
        <button onClick={() => setChartType("ColumnChart")}>
          Column Chart
        </button>
      </div>
      <div className="chart-container">{renderChart()}</div>
    </div>
  );
};

export default App;
