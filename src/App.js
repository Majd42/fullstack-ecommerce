import { Container } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home.js'
import Store from './pages/Store.js'
import About from './pages/About'
import Navbar from "./components/Navbar.js";
import { ShoppingCartProvider } from "./contexts/ShoppingCartContext.js";


function App() {



  return (
    <>
      <ShoppingCartProvider>
        <Navbar />
          <Container>
          
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Container>  
      </ShoppingCartProvider>
    </>
  );
}

export default App;
