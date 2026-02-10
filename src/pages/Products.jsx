import { useEffect, useState } from "react";
import axios from "axios";
import "../assets/Products.css";
import ProductModal from "../components/ProductModal";

const API_BASE_URL = "http://localhost:3000";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const fetchProducts = async () => {
    const res = await axios.get(`${API_BASE_URL}/api/products`);
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Login required");
      return;
    }
    if (!window.confirm("Delete this product?")) return;
    await axios.delete(`${API_BASE_URL}/api/products/${id}`,
        {
            headers: {
            Authorization: `Bearer ${token}`
            }
        });
    fetchProducts();
  };
  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <h3>Products</h3>
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditProduct(null);
            setShowModal(true);
          }}
        >
          Add Product
        </button>
      </div>

      {/* PRODUCT TABLE */}
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p, i) => (
            <tr key={p.id}>
              <td>{i + 1}</td>

              <td>
                <div className="img-hover-wrapper">
                  <img
                    src={`${API_BASE_URL}${p.image_url}`}
                    alt={p.name}
                    className="img-small"
                  />
                  <div className="img-preview">
                    <img
                      src={`${API_BASE_URL}${p.image_url}`}
                      alt={p.name}
                    />
                  </div>
                </div>
              </td>

              <td>{p.name}</td>
              <td>₹{p.price}</td>
              <td>{p.stock}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => {
                    setEditProduct(p);
                    setShowModal(true);
                  }}
                >
                  Edit
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => deleteProduct(p.id)} >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ REUSABLE MODAL */}
      <ProductModal
        show={showModal}
        editData={editProduct}
        onClose={() => setShowModal(false)}
        onSuccess={fetchProducts}
      />
    </>
  );
}
