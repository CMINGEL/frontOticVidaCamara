import { Button, CircularProgress, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import NewProduct from './modalNewProduct';
import { ApiFetch } from '../Infra/api';
import { FaRegEye, FaRegTrashAlt } from 'react-icons/fa';
import ModalSeeProduct from './modalView';

const initialFilters = {
    category:0,
    title:""
}

const ProductMenu = ({products, categories, setProducts, loading, setLoading}) => {
    const [open, setOpen] = React.useState(false);
    const [openSeeProduct, setOpenSeeProduct] = React.useState(false);
    const [productToSee, setProductToSee] = React.useState(null);
    const [filters, setFilters] = React.useState(initialFilters);
    const [filteredProducts, setFilteredProducts] = React.useState([]);   

    const handleDelete = async (id) => {
        try {
            setLoading(true)
            const data = await ApiFetch(`products/${id}`, {
            method: "DELETE",
            });
            if (data) {
                setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
            }
            setLoading(false)
        } catch (error) {
            console.error("Error saving product:", error);
        };
    }   

    const handleSeeProduct = (product) => {
        setProductToSee(product);
        setOpenSeeProduct(true);
    }   

    const handleFilter = (event) => {
        setFilters({
            ...filters,
            [event.target.name]: event.target.value
        });

    }

const handleApplyFilters = () => {
    let newProducts = [...products];
    const titleSearch = filters.title !== "" ? filters.title.toLowerCase().trim() : "";
    const categorySearch = filters.category !== "" ? filters.category : "";

    if (titleSearch !== "") {
        newProducts = newProducts.filter(product =>
            product.title.toLowerCase().includes(titleSearch)
        );
    }

    if (categorySearch !== "") {
        newProducts = newProducts.filter(product =>
            product.category === categorySearch
        );
    }
    setFilteredProducts(newProducts);
};

    return (
        <div className='border p-4 w-full h-fit border-rounded-md flex flex-col justify-between rounded-md bg-white'>
            <h1 className='text-3xl font-bold mb-4 text-blue-900'>Product Menu</h1>
            <div className='w-full h-24 flex justify-between items-center mb-4 px-2 gap-4'>
                <div className='w-[33%]'>
                    <Select
                        id="category-select"
                        name="category"
                        label="Category"
                        value={filters.category}
                        onChange={handleFilter}
                        variant="outlined"
                        fullWidth
                    >
                        <MenuItem value={0}><em>Select Filter by category</em></MenuItem>
                        {categories && categories.map((category) => (
                            <MenuItem key={category.id} value={category.name}>{category.name}</MenuItem>
                        ))}
                    </Select>
                </div>


                <div className='w-[33%]'>
                    <TextField  
                        variant="outlined" 
                        value={filters.title} 
                        name='title' 
                        onChange={handleFilter} 
                        fullWidth 
                        placeholder='filter by title'
                        />
                </div>

                <div className='w-[33%] h-14'>
                    <Button 
                        variant="contained" 
                        fullWidth onClick={
                            filteredProducts.length > 0  ? () => setFilteredProducts([]) : handleApplyFilters}
                        sx={{ 
                            height: '100%',
                            bgcolor: '#3b82f6',
                            '&:hover': {
                                bgcolor: '#2563eb',
                            },
                        }}
                    > 
                            { filteredProducts.length>0 ? "Clear Filter": "Filter"}
                    </Button>
                </div>

            </div>

            <div className="overflow-y-scroll border border-gray-300 rounded-md p-3 h-[340px] space-y-2">

                {(filteredProducts.length > 0 ? filteredProducts : products).map(product => (
                    
                    <div key={product.id} className="h-16 flex items-center justify-between bg-white shadow-sm border border-gray-200 rounded-md px-3 py-2 hover:shadow-md transition">

                        <div className="flex flex-col">
                            <span className="text-lg font-semibold text-gray-800">
                            {product.title}
                            </span>
                            <span className="text-sm text-gray-500">${product.price}</span>
                        </div>

                        <div className="flex items-center gap-4">

                            <button
                                onClick={() => handleSeeProduct(product)}
                                className="text-blue-600 hover:text-blue-800"
                            >
                                <FaRegEye size={20} />
                            </button>

                            <button
                                onClick={() => handleDelete(product.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <FaRegTrashAlt size={20} />
                            </button>

                        </div>

                    </div>
                ))}
            </div>


            <div className="pt-5 w-full flex justify-center items-center">
                { loading? 
                    <CircularProgress color="primary" />
                    :
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={() => setOpen(true)} fullWidth
                        sx={{ 
                                bgcolor: '#3b82f6',
                                '&:hover': {
                                    bgcolor: '#2563eb',
                                },
                            }}
                        >
                        Add Product
                    </Button>
                }
            </div>
            <NewProduct
                open={open} 
                setOpen={setOpen} 
                categories={categories}
                setProducts={setProducts}
                loading={loading}
                setLoading={setLoading} 

            />

            <ModalSeeProduct
                open={openSeeProduct}
                setOpen={setOpenSeeProduct}
                product={productToSee}
                categories={categories}
            />
        </div>
    );
}

export default ProductMenu;