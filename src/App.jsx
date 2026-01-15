import WebGLBackground from "./components/WebGLBackground";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateGroup from "./pages/CreateGroup";
import GroupDashboard from "./pages/GroupDashboard";
import AddExpense from "./pages/AddExpense";

function App() {
  return (
    <>
      <WebGLBackground />

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/group/create" element={<CreateGroup />} />
          <Route path="/group/:id" element={<GroupDashboard />} />
          <Route path="/group/:id/add-expense" element={<AddExpense />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;    // <<--- THIS LINE IS REQUIRED
