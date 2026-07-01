import React, { useState, useEffect } from "react";
import axios from "axios";
import { holdings } from "../data/data";
import { VerticalGraph } from "./VerticalGraph";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState(holdings);

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const res = await axios.get("http://localhost:3002/allHoldings");
        setAllHoldings(res.data);
      } catch (err) {
        console.log("API ERROR:", err.message);
      }
    };

    fetchHoldings();
  }, []);

  // SAFE mapping (prevents popup/chart crash)
  const labels = allHoldings?.map((item) => item.name) || [];

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings?.map((stock) => stock.price) || [],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty</th>
              <th>Avg</th>
              <th>Price</th>
              <th>Cur Value</th>
              <th>P&L</th>
              <th>Net</th>
              <th>Day</th>
            </tr>
          </thead>

          <tbody>
            {allHoldings.map((stock) => {
              const curValue = stock.price * stock.qty;
              const pnl = curValue - stock.avg * stock.qty;

              const isProfit = pnl >= 0;

              return (
                <tr key={stock._id}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>
                  <td style={{ color: isProfit ? "green" : "red" }}>
                    {pnl.toFixed(2)}
                  </td>
                  <td>{stock.net}</td>
                  <td>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;