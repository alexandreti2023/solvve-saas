import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NewCalculation from "./pages/NewCalculation";
import Clients from "./pages/Clients";
import Processes from "./pages/Processes";
import ClientDetails from "./pages/ClientDetails";
import ProcessDetails from "./pages/ProcessDetails";
import Layout from "./components/Layout";

export default function App() {

  return (

    <Routes>

  <Route
    path="/"
    element={<Login />}
  />

  <Route element={<Layout />}>

    <Route
      path="/dashboard"
      element={<Dashboard />}
    />

    <Route
      path="/novo-calculo"
      element={<NewCalculation />}
    />

    <Route
      path="/clientes"
      element={<Clients />}
    />

    <Route
      path="/processos"
      element={<Processes />}
    />

  </Route>
    <Route
    path="/clients/:id"
    element={<ClientDetails />}
  />

  <Route
  path="/processes/:id"
  element={<ProcessDetails />}
/>

</Routes>

  );

} 