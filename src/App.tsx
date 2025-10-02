import { Container, Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <NavBar />
      <Container maxWidth="lg" sx={{ flex: 1, py: 3 }}>
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
}
