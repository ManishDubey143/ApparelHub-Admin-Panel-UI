export default function Users() {
  return (
    <>
      <h3 className="mb-3">Users</h3>

      <table className="table table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Manish Dubey</td>
            <td>manish@gmail.com</td>
            <td>Admin</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
