import { useEffect, useState } from "react";
import api from "../services/axiosInstance";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Call your dashboard API endpoint
        const res = await api.get("/dashboard/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch stats", err);
        // Fallback to default values if API fails
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-center p-5">Loading...</div>;
  }

  return (
    <>
      <h3 className="mb-4">Overview</h3>

      <div className="row g-4">
        <div className="col-md-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h6>Total Products</h6>
              <h3>{stats.totalProducts}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h6>Total Orders</h6>
              <h3>{stats.totalOrders}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h6>Users</h6>
              <h3>{stats.totalUsers}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h6>Revenue</h6>
              <h3>₹{stats.revenue}</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}