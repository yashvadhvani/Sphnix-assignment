import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container, CssBaseline } from "@mui/material";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* Add more routes as needed */}
        </Routes>
      </Container>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
