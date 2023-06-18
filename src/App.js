import { Box } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";


function App() {
  return (
    <Box bg={'brand_background.light'} minH={'100vh'}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
