import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Dashboard from "./Dashboard";
import Home from "./Home"
import Routines from "./Routines";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { orange, blue } from '@mui/material/colors';
function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: orange[500],
      },
      secondary: {
        main: blue[500],
      },
    },
  });
  
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route element={<Dashboard/>}>
            <Route path="/" element={<Home/>}></Route>      
            <Route path="/routines" element={<Routines/>}></Route>      
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
