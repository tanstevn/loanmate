import "./styles/globals.css";
import LoanPage from "./loans/page";
import { Route, Routes } from "react-router-dom";
import LenderPage from "./lenders/page";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoanPage />} />
      <Route path="/form" element={<LoanPage />} />
      <Route path="/lenders" element={<LenderPage />} />
      <Route path="*" element={<LoanPage />} />
    </Routes>
  );
};

export default App;
