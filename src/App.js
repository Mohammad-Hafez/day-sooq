
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PrimeReactProvider} from 'primereact/api';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import AllCategories from './Components/AllCategories/AllCategories';
import Authorization from './Components/Authorization/Authorization';
function App() {
  return (
    <PrimeReactProvider>
      <Router>
        <Routes>
          <Route path="" element={<Layout />} >
            <Route index element={<Home />} />
            <Route path="AllCategories" element={<AllCategories />} />
            <Route path="Authorization" element={<Authorization />} />
          </Route>
        </Routes>
      </Router>
    </PrimeReactProvider>
  );
}

export default App;
