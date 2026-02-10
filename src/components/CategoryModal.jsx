import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export default function CategoryModal({ show, editData, onClose, onSuccess }) {
  const isEdit = Boolean(editData);
debugger
  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (editData) {
      setName(editData.name);
      setIsActive(editData.is_active);
    } else {
      setName("");
      setIsActive(true);
    }
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  const token = localStorage.getItem("token");
    if (!token) {
      alert("Login required");
      return;
    }
    const payload = {
      name, isActive
    };

    if (isEdit) {
      await axios.put(
        `${API_BASE_URL}/api/categories/${editData.id}`,
        payload ,
        {
            headers: {
            Authorization: `Bearer ${token}`
            }
        });
    } 
    else {
      await axios.post(`${API_BASE_URL}/api/categories`, payload ,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
       });
    }

    onSuccess();
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">
                {isEdit ? "Edit Category" : "Add Category"}
              </h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Category Name</label>
                <input
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  id="activeCheck"
                />
                <label className="form-check-label" htmlFor="activeCheck">
                  Active
                </label>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button className="btn btn-primary">
                {isEdit ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
