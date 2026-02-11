import { useEffect, useState } from "react";
import api from "../services/axiosInstance";
import "../assets/Products.css";
import ProductModal from "../components/ProductModal";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Products() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      setError("Failed to fetch products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      setError("Failed to delete product");
      console.error(err);
    }
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

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="text-center p-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
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
            {products.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-4">No products found</td>
              </tr>
            ) : (
              products.map((p, i) => (
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
                    <button 
                      className="btn btn-sm btn-danger" 
                      onClick={() => deleteProduct(p.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      <ProductModal
        show={showModal}
        editData={editProduct}
        onClose={() => setShowModal(false)}
        onSuccess={fetchProducts}
      />
    </>
  );
}