import * as React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeSeriesScale,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeSeriesScale
);
// data_map = {"date1":value, "date2":value2, "date3":value3, ...}
//sort time axis
// let timeserie = [
//   new Date("2023-07-28T18:43:26.826Z"),
//   new Date(2023, 5, 1),
//   new Date(2020, 6, 10),
// ];
// timeserie.sort((a, b) => a.getTime() - b.getTime());
// console.log(timeserie);

// const product = 'Product1';
// const xlabels = ['January', 'February', 'March', 'April', 'May', 'June'];
// const price = [12, 19, 3, 5, 2, 3];

// export const data_mock = {
//   labels: xlabels,
//   datasets: [
//     {
//       label: product,
//       data: price,
//       borderColor: 'rgb(255, 99, 132)',
//       backgroundColor: 'rgba(255, 99, 132, 0.2)',
//       tension: 0.15,
//     },
//   ],
// };

// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       display: false
//     },
//     title: {
//       display: true,
//       text: `${product} Graph Price`,
//     },
//   },
// };
export const DisplayChart = ({ value }) => {
  const product = value[0].name;
  const times = value.map((data, idx) => {
    return new Date(data.date).toLocaleDateString();
  });
  const prices = value.map((data, idx) => {
    return data.price;
  });
  const data = {
    labels: times,
    datasets: [
      {
        label: product,
        data: prices,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `${product} Graph Price`,
      },
    },
  };

  return <Line options={options} data={data} />;
};
