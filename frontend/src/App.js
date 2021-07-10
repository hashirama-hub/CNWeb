import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { DepartmentList } from "./components/DepartmentList";
import { CreateEmployee } from "./components/CreateEmployee";
import { Navbar } from "./components/Navbar";
import { EmployeeList } from "./components/EmployeeList";
import { AddDepartment } from "./components/AddDepartment";
// import { Users } from "./c omponents/Users";


function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/create_employee" component={CreateEmployee} />
          <Route path="/add_department" component={AddDepartment} />
          <Route path="/department_list" component={DepartmentList} />
          <Route path="/" component={EmployeeList} />
         
        </Switch>
      </div>
    </Router>
  );
}

export default App;
