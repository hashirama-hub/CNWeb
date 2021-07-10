import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const API = process.env.REACT_APP_API;

export const DepartmentList = () => {

  let [departments, setDepartments] = useState([]);

  const getDepartments = async () => {
    const res = await fetch(`${API}/department`);
    const data = await res.json();
    setDepartments(data);
  };

  useEffect(() => {
    getDepartments();
  }, []);

  return (
    <div className="mt-5">
      <h1 className="text-center">Department list</h1>

      <Link to="/add_department">
        <button className="btn btn-success mb-5">Add department</button>
      </Link>



      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.id}>
              <td>{department.name}</td>
              <td>{department.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
