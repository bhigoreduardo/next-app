import axios from "axios";
import { useEffect, useState } from "react";

import Spinner from "@/components/Spinner";

export default function Orders() {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    setLoading(true);
    const { data } = await axios.get("/api/orders");
    setOrders(data);
    setLoading(false);
  };
  useEffect(() => {
    getOrders();
  }, []);

  return (
    <main>
      <h1>Orders</h1>

      {loading ? (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <Spinner />
          <span>Loading...</span>
        </div>
      ) : orders?.length > 0 ? (
        <table className="basic mt-2">
          <thead>
            <tr>
              <td>Date</td>
              <td>Recipient</td>
              <td>Products</td>
            </tr>
          </thead>

          <tbody>
            {orders.map((item) => (
              <tr key={item._id}>
                <td>{new Date(item.createdAt).toLocaleString()}</td>
                <td>
                  <b>Name:</b> {item.name} <br />
                  <b>Email:</b> {item.email} <br />
                  <b>City:</b> {item.city} <br />
                  <b>ZIP Code:</b> {item.postalCode} <br />
                  <b>Country:</b> {item.country} <br />
                  <b>Address:</b> {item.streetAddress}
                </td>
                <td className="flex flex-col gap-2">
                  {item.line_items.map((value, key) => (
                    <div key={key} className="bg-zinc-200 p-2">
                      <b>Title:</b> {value.title} <br />
                      <b>Quantity:</b> {value.quantity} units <br />
                      <b>Properties:</b> <br />
                      {value?.properties?.map((v, k) => (
                        <li key={k}>
                          {v.name} = {v.values.join("|")}
                          <br />
                        </li>
                      ))}
                      <b>Category Properties:</b> <br />
                      {value.categoryProperties &&
                        Object.keys(value.categoryProperties).map((v, k) => (
                          <li key={k}>
                            {v} = {value.categoryProperties[v]}
                          </li>
                        ))}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No Orders founded</p>
      )}
    </main>
  );
}
