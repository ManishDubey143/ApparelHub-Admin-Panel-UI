import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/register",
        form
      );

      alert("User created successfully");
      console.log(res.data);

    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <h4 className="text-center mb-3">Create Account</h4>

              <form onSubmit={submit}>
                <input
                  className="form-control mb-3"
                  placeholder="Name"
                  name="name"
                  onChange={handleChange}
                />

                <input
                  className="form-control mb-3"
                  placeholder="Email"
                  name="email"
                  type="email"
                  onChange={handleChange}
                />

                <input
                  className="form-control mb-3"
                  placeholder="Password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                />

                <button className="btn btn-dark w-100">
                  Register
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}