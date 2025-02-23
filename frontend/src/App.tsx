import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Landingpage from "./pages/Landingpage";
import Sharedcontents from "./pages/Sharedcontents";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Landingpage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/share/:sharelink" element={<Sharedcontents/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
