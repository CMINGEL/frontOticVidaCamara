import CategoryMenu from './categories/page'
import ProductMenu from './products/page'
import { useState, useEffect } from 'react'
import { ApiFetch } from './Infra/api.jsx'

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

 useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const productsPromise = ApiFetch("products");
      const categoriesPromise = ApiFetch("category");
      try {
        const [productsData, categoriesData] = await Promise.all([ productsPromise, categoriesPromise ]);
        setProducts(productsData);
        setCategories(categoriesData);
        setLoading(false)
          
      } catch (err) {
        setLoading(false)
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
}, []);

  return (
    <div className='flex flex-col gap-4 p-4 bg-gray-100'>
      <div className='text-3xl font-bold text-center mb-4 text-blue-900'>Otic Products</div> 
      <div className='flex flex-row gap-4 h-screen'>
        <CategoryMenu 
          categories={categories}
          setCategories={setCategories} 
          loading={loading}
          setLoading={setLoading} 
        />
        <ProductMenu 
          products={products}
          setProducts={setProducts}  
          categories={categories}
          loading={loading}
          setLoading={setLoading} 
        />
      </div>
    </div>
  ) 
}

export default App
