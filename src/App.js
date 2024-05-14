// import React from 'react';
// import CreatePatient from "./Components/CreatePatient";
// import PatientList from "./Components/PatientList";
// import "./App.css";

// function App() {
//   return (
//     <div className="App">
//       <CreatePatient />
//       <PatientList />
//     </div>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PatientList from "./Components/PatientList";
import CreatePatient from "./Components/CreatePatient";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={PatientList} />
          <Route path="/create" component={CreatePatient} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;


