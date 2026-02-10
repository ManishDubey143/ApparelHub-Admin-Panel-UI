import { useEffect, useState } from "react";
import axios from "axios";
import CategoryModal from "../components/CategoryModal";

const API_BASE_URL = "http://localhost:3000";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  const fetchCategories = async () => {
    const res = await axios.get(`${API_BASE_URL}/api/categories`);
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Login required");
      return;
    }
    await axios.patch(`${API_BASE_URL}/api/categories/${id}/status`, {
      is_active: !currentStatus
    },
        {
            headers: {
            Authorization: `Bearer ${token}`
            }
        });
    fetchCategories();
  };

  const deleteCategory = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Login required");
      return;
    }
    if (!window.confirm("Delete this category?")) return;
    await axios.delete(`${API_BASE_URL}/api/categories/${id}`,
        {
            headers: {
            Authorization: `Bearer ${token}`
            }
        });
    fetchCategories();
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <h3>Categories</h3>
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditCategory(null);
            setShowModal(true);
          }}
        >
          Add Category
        </button>
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Category Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((cat, i) => (
            <tr key={cat.id}>
              <td>{i + 1}</td>
              <td>{cat.name}</td>
              <td>
                <span
                  className={`badge ${
                    cat.is_active ? "bg-success" : "bg-secondary"
                  }`}
                >
                  {cat.is_active ? "Active" : "Inactive"}
                </span>
              </td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => {
                    setEditCategory(cat);
                    setShowModal(true);
                  }}
                >
                  Edit
                </button>

                <button
                  className={`btn btn-sm me-2 ${
                    cat.is_active ? "btn-secondary" : "btn-success"
                  }`}
                  onClick={() => toggleStatus(cat.id, cat.is_active)}
                >
                  {cat.is_active ? "Deactivate" : "Activate"}
                </button>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteCategory(cat.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <CategoryModal
        show={showModal}
        editData={editCategory}
        onClose={() => setShowModal(false)}
        onSuccess={fetchCategories}
      />
    </>
  );
}
