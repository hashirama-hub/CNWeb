import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const API = process.env.REACT_APP_API;

export const EmployeeList = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  let [employees, setEmployees] = useState([]);

  const getEmployees = async () => {
    const res = await fetch(`${API}/employee`);
    const data = await res.json();
    setEmployees(data);
  };

  const getEmployee = async (id) => {
    const res = await fetch(`${API}/employee/${id}`);
    const data = await res.json();

    setName(data.name);
    setDescription(data.description);
  };

  const editEmployee = async (id) => {
    await fetch(`${API}/employee/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        description: description,
      }),
    });
    await getEmployees();
  };

  const deleteEmployee = async (id) => {
    const userResponse = window.confirm("Do you want to delete this employee?");
    if (userResponse) {
      await fetch(`${API}/employee/${id}`, {
        method: "DELETE",
      });
      await getEmployees();
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div className="m-5">
      <div className="text-center mt-5">
        <Link to="/create_employee">
          <button className="btn btn-success btn-lg btn-block">Create Employee</button>
        </Link>
      </div>
      <form className="mb-5">
        <div className="form-group mb-3">
          <label htmlFor="name">
            <h4>Name</h4>
          </label>
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="form-control form-control-lg"
            placeholder="Enter employee name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">
            <h4>Description</h4>
          </label>
          <textarea
            id="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="form-control form-control-lg"
            placeholder="Enter the description"
          />
        </div>
      </form>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {employees.map((employee) => (
          <div className="col" key={employee.id}>
            <div className="card" style={{ width: "20rem", height: "20rem" }} >
              <div className="card-body">
                <h5 className="card-title">{employee.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{employee.age}</h6>
                <h6 className="card-subtitle mb-2">{employee.department}</h6>
                <p className="card-text">{employee.description}</p>

                <div className="button mt-5">
                  <button className="btn btn-warning mx-2" onClick={(e) => getEmployee(employee.id)}>
                    Get
                  </button>
                  <button className="btn btn-primary mx-2" onClick={(e) => editEmployee(employee.id)}>
                    Update
                  </button>

                  <button className="btn btn-danger mx-2" onClick={(e) => deleteEmployee(employee.id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
