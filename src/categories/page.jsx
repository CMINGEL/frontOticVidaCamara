import { Button, CircularProgress, TextField } from '@mui/material';
import React from 'react';
import { ApiFetch } from '../Infra/api';

const CategoryMenu = ({ categories, setCategories, loading, setLoading }) => {
    const [category, setCategory] = React.useState('');
    

    const handlechange = (event) => {
        setCategory(event.target.value);
    }   

    const handleAddCategory = async () => {
        setLoading(true)
        try {
            const data = await ApiFetch("category", {
                method: "POST",
                body: {"name" : category }
            });
        
            if (data) {
                setCategories((prevCategories) => [...prevCategories, data]);
            }
            setCategory('')
            setLoading(false)
        } catch (error) {
            console.error("Error saving category:", error);
        }
    };

     
return (
    <div className="border p-4 w-full h-fit rounded-md bg-white shadow-sm">
        
        <h1 className="text-3xl font-bold mb-4 text-blue-900"> Category Menu </h1>

        <div className='w-full h-24 flex justify-between items-center mb-4 px-2 gap-4'>
            <TextField 
                placeholder="New category"
                className="p-2 mb-4 w-full rounded-md"
                onChange={handlechange}
                value={category}
                variant="outlined"
            />
        </div>

        <div className="overflow-y-scroll border border-gray-300 rounded-md p-3 h-[340px] space-y-2">

            {categories && categories.map((cat) => (
                <div 
                    key={cat.id} 
                    className="bg-white h-16 border border-gray-200 shadow-sm rounded-md px-3 py-2 hover:shadow-md transition flex items-center justify-between"
                >
                    <span className="text-lg font-semibold text-gray-800">
                        {cat.name}
                    </span>
                </div>
            ))}

        </div>

        <div className="pt-5 w-full flex justify-center items-center">
            { loading ? <CircularProgress color="primary" />
            :
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddCategory}
                fullWidth
                disabled={category.length < 3}
                sx={{ 
                        height: '100%',
                        bgcolor: '#3b82f6',
                        '&:hover': {
                            bgcolor: '#2563eb',
                        },
                    }}
            >
                Add Category
            </Button>}
        </div>
    </div>
);

}

export default CategoryMenu;
