import React from "react";
import ReactHighcharts from "react-highcharts/ReactHighstock.src";
import moment from "moment";

const StockChart = (props) => {
  const { metricsData, title } = props;
  const configPrice = {
    yAxis: [
      {
        offset: 20,

        labels: {
          formatter: function () {
            return this.value;
          },
          x: -15,
          style: {
            color: "#000",
            position: "absolute",
          },
          align: "left",
        },
      },
    ],
    tooltip: {
      shared: true,
      formatter: function () {
        return (
          this.y + "</b><br/>" + moment(this.x).format("MMMM Do YYYY, h:mm")
        );
      },
    },
    plotOptions: {
      series: {
        showInNavigator: true,
        gapSize: 6,
      },
    },
    rangeSelector: {
      selected: 1,
    },
    title: {
      text: title,
    },
    chart: {
      height: 600,
      width: 1000,
    },

    credits: {
      enabled: false,
    },

    legend: {
      enabled: true,
    },
    xAxis: {
      type: "date",
    },
    series: [
      {
        name: "Data",
        type: "spline",

        data: metricsData,
        tooltip: {
          valueDecimals: 2,
        },
      },
    ],
  };

  return (
    <div className="stock-chart-container">
      <ReactHighcharts config={configPrice}></ReactHighcharts>
    </div>
  );
};

export default StockChart;
