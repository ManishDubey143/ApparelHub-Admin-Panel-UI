import { useEffect, useState } from "react";
import axios from "../services/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function Banners() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    redirect_url: "",
    position: "HOME",
    status: true
  });

  const [image, setImage] = useState(null);
  const [banners, setBanners] = useState([]);

  /* ================= FETCH BANNERS ================= */
  const fetchBanners = async () => {
    const res = await axios.get("/banners");
    setBanners(res.data);
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  /* ================= ADD BANNER ================= */
  const submit = async () => {
    if (!image) {
      alert("Please select an image");
      return;
    }

    const fd = new FormData();
    Object.keys(form).forEach(k => fd.append(k, form[k]));
    fd.append("image", image);

    await axios.post("/banners", fd);

    alert("Banner added");
    setForm({
      title: "",
      subtitle: "",
      redirect_url: "",
      position: "HOME",
      status: true
    });
    setImage(null);
    fetchBanners(); // refresh list
  };

  /* ================= TOGGLE STATUS ================= */
  const toggleStatus = async (id, status) => {
    await axios.patch(`/banners/${id}/status`, {
      status: !status
    });
    fetchBanners();
  };

  /* ================= UI ================= */
  return (
    <div className="container">
      {/* ADD BANNER */}
      <div className="card p-4 mb-4">
        <h4>Add Banner</h4>

        <input className="form-control mb-2" placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />

        <input className="form-control mb-2" placeholder="Subtitle"
          value={form.subtitle}
          onChange={e => setForm({ ...form, subtitle: e.target.value })}
        />

        <input className="form-control mb-2" placeholder="Redirect URL"
          value={form.redirect_url}
          onChange={e => setForm({ ...form, redirect_url: e.target.value })}
        />

        <select className="form-control mb-2"
          value={form.position}
          onChange={e => setForm({ ...form, position: e.target.value })}
        >
          <option value="HOME">HOME</option>
          <option value="OFFER">OFFER</option>
        </select>

        <select className="form-control mb-3"
          value={form.status}
          onChange={e => setForm({ ...form, status: e.target.value === "true" })}
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>

        <input type="file" className="form-control mb-3"
          onChange={e => setImage(e.target.files[0])}
        />

        <button className="btn btn-dark" onClick={submit}>
          Save Banner
        </button>
      </div>

      {/* BANNER LIST */}
      <h4>Banner List</h4>

      <div id="homeBanner" className="carousel slide">
        <div className="carousel-inner">
          {banners
            .filter(b => b.status === true)
            .map((b, i) => (
              <div
                className={`carousel-item ${i === 0 ? "active" : ""}`}
                key={b.id}
              >
                <img src={b.image_url} className="d-block w-100" />

                <div className="carousel-caption">
                  <h3>{b.title}</h3>
                  <p>{b.subtitle}</p>

                  <button
                    className="btn btn-warning me-2"
                    onClick={() => navigate(b.redirect_url)}
                  >
                    Shop Now
                  </button>

                  <button
                    className={`btn ${b.status ? "btn-danger" : "btn-success"}`}
                    onClick={() => toggleStatus(b.id, b.status)}
                  >
                    {b.status ? "Deactivate" : "Activate"}
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
