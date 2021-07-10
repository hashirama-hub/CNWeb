import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
const API = process.env.REACT_APP_API;

export const CreateEmployee = () => {
  let history = useHistory();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [department, setDepartment] = useState("");
  const [description, setDescription] = useState("");

  const [department_list, setDepartmentList] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${API}/employee/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        age: age,
        department: department,
        description: description,
      }),
    });

    history.push("/employee_list");
  };

  const getDepartmentList = async () => {
    const res = await fetch(`${API}/department`);
    const data = await res.json();
    setDepartmentList(data);
  };

  useEffect(() => {
    getDepartmentList();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="mx-5 mt-5">
      <h1 className="text-center">Create employee</h1>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input type="text" className="form-control" id="name" onChange={(e) => setName(e.target.value)} value={name} required/>
      </div>

      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input type="number" className="form-control" id="age" onChange={(e) => setAge(e.target.value)} value={age} required/>
      </div>

      <div className="mb-3">
        <label htmlFor="department" className="form-label">
          Department
        </label>
        <select
          className="form-select"
          id="department"
          aria-label="Please select department"
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option selected disabled> Please select department  </option>
          {department_list.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          type="text"
          className="form-control"
          id="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Create
      </button>
    </form>
  );
};
