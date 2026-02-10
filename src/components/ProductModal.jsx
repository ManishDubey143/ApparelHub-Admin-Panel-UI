import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export default function ProductModal({ show, onClose, onSuccess, editData }) {
  const isEdit = Boolean(editData);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    category_id: ""
  }); 
  const [categories, setCategories] = useState([]);

  const [image, setImage] = useState(null);

   useEffect(() => {
    if (show) {
      fetchCategories();
    }
  }, [show]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/categories`);
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to load categories", err);
    }
  };

  // Prefill when editing
  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name || "",
        price: editData.price ?? "",
        stock: editData.stock ?? "",
        description: editData.description || "",
        categoryid: editData.category_id ?? ""
      });
    }
  }, [editData]);


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]:
        ["price", "stock", "categoryid"].includes(name)
          ? value === "" ? "" : Number(value)
          : value
    });
  };

  const handleSubmit = async (e) => {
    debugger
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Login required");
      return;
    }
    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("price", formData.price);
    payload.append("stock", formData.stock);
    payload.append("description", formData.description);
    payload.append("category_id", formData.category_id);
    if (image) payload.append("image", image);

    try {
      if (isEdit) {
        await axios.put(
          `${API_BASE_URL}/api/products/${editData.id}`,
          payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      }
        );
      } else {
        await axios.post(
          `${API_BASE_URL}/api/products`,
          payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      }
        );
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  if (!show) return null;

  return (
    <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,.5)" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="modal-header">
              <h5 className="modal-title">
                {isEdit ? "Edit Product" : "Add Product"}
              </h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body">
              <div className="row g-3">

                <div className="col-md-6">
                  <label className="form-label">Product Name</label>
                  <input
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label">Stock</label>
                  <input
                    type="number"
                    className="form-control"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                  />
                </div>

               <div className="col-md-6">
                  <label className="form-label">Product Image</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
                
                {/* <div className="col-md-6">
                  <label className="form-label">Product Category</label>
                  <input
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />                
              
                </div> */}
                 <div className="col-md-6">
                    <label className="form-label">Category</label>
                    <select
                      className="form-select"
                      name="category_id"
                      value={formData.category_id}
                      onChange={handleChange}
                      required
                    >
                      <option value="">-- Select Category --</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                </div>

                <div className="col-md-12">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>
               

                {isEdit && editData.image_url && (
                  <div className="col-md-12">
                    <label className="form-label">Current Image</label><br />
                    <img
                      src={`${API_BASE_URL}${editData.image_url}`}
                      alt="preview"
                      width="120"
                      className="rounded border"
                    />
                  </div>
                )}

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
