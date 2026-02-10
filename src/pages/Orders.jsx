export default function Orders() {
  return (
    <>
      <h3 className="mb-3">Orders</h3>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>#ORD123</td>
            <td>Manish</td>
            <td>₹2,499</td>
            <td>
              <span className="badge bg-success">Delivered</span>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
