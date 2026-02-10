export default function Dashboard() {
  return (
    <>
      <h3 className="mb-4">Overview</h3>

      <div className="row g-4">
        <div className="col-md-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h6>Total Products</h6>
              <h3>120</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h6>Total Orders</h6>
              <h3>320</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h6>Users</h6>
              <h3>85</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h6>Revenue</h6>
              <h3>₹2.4L</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
