import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductList from './ProductList'
import ProductDetail from './ProductDetail';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/:id" element={<ProductDetail />} />
        {/* <Route path="/product/edit/:id" element={<ProductEdit />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
