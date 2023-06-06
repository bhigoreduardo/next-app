import { useState } from "react";

import { orders } from "@/utils/data";

export default function Orders() {
  const [loading, setLoading] = useState(false);

  return (
    <main>
      <h1>Orders</h1>

      {loading ? (
        <p>Loading...</p>
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
                  {item.name} {item.email} <br />
                  {item.city} {item.postalCode} {item.country} <br />
                  {item.streetAddress}
                </td>
                <td>
                  {item.line_items.map((value, key) => (
                    <div key={key}>
                      {value.title} x {value.quantity} units <br />
                      {JSON.stringify(value.properties, null, 4)} <br />
                      {JSON.stringify(value.categoryProperties, null, 4)}
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
