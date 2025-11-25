import CategoryMenu from './categories/page'
import ProductMenu from './products/page'
import { useState, useEffect } from 'react'
import { ApiFetch } from './Infra/api.jsx'

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ApiFetch("products");
        setProducts(data);
      } catch (err) {
        console.log(err.message);
      }
    };

    const fetchCategories = async () => {
      try {
  
        const data = await ApiFetch("category");
        setCategories(data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  return (
    <div className='flex flex-col gap-4 p-4 bg-gray-100'>
      <div className='text-3xl font-bold text-center mb-4 text-indigo-700'>Otic Products</div> 
      <div className='flex flex-row gap-4 h-screen'>
        <CategoryMenu 
          categories={categories}
          setCategories={setCategories}  
        />
        <ProductMenu 
          products={products}
          setProducts={setProducts}  
          categories={categories}
        />
      </div>
    </div>
  ) 
}

export default App
