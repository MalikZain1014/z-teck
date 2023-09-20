import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/BarContent/Navbar";
import Category from "./Components/MainContent/Home/Category";
import AFooter from "./Components/Footer/AFooter";
import Signin from "./Components/BarContent/Singin";
import FiltProduct from "./Components/MainContent/Product/FiltProduct";
import ProductList from "./Components/MainContent/Product/ProductList";
import Home from "./Components/MainContent/Home/Home";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/filtproduct" element={<FiltProduct />} />
          <Route path="/productlist" element={<ProductList />} />
          {/* <Route path="/*" element={<Error />} /> */}
        </Routes>
        <AFooter />
        <Footer />
      </Router>
    </>
  );
}

export default App;
