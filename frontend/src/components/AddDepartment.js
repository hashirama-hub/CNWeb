import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const API = process.env.REACT_APP_API;

export const AddDepartment = () => {
  let history = useHistory();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${API}/department/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        location: location
      }),
    });

    history.push("/department_list");
  };

  return (
    <div className="mt-5">
      <h1 className="text-center">Add department</h1>

      <form onSubmit={handleSubmit} className="card card-body p-4">
        <div className="form-group mb-3">
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="form-control"
            placeholder="Name"
            required
          />
        </div>

        <div className="form-group mb-3">
          <input
            type="text"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            className="form-control"
            placeholder="Location"
            required
          />
        </div>

        <button type="submit" className="btn btn-success">
          Add
        </button>
      </form>
    </div>
  );
};
