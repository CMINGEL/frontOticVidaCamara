import { Button, Input } from '@mui/material';
import React from 'react';
import { ApiFetch } from '../Infra/api';

const CategoryMenu = ({ categories, setCategories }) => {
    const [category, setCategory] = React.useState('');

    const handlechange = (event) => {
        setCategory(event.target.value);
    }   

    const handleAddCategory = async () => {
        try {
            const data = await ApiFetch("category", {
                method: "POST",
                body: {"name" : category }
            });
        
            if (data) {
                setCategories((prevCategories) => [...prevCategories, data]);
            }
            setCategory('');
        } catch (error) {
            console.error("Error saving category:", error);
        }
    };

    
return (
    <div className="border p-4 w-full h-fit rounded-md bg-white shadow-sm">

        <h1 className="text-3xl font-bold mb-4 text-indigo-700"> Category Menu </h1>

        <Input
            placeholder="New category"
            className="p-2 mb-4 w-full rounded-md"
            onChange={handlechange}
            value={category}
        />

            <div className="overflow-y-scroll border border-gray-300 rounded-md p-3 h-[380px] space-y-2 bg-gray-50">

                {categories && categories.map((cat) => (
                    <div
                        key={cat.id}
                        className="bg-white border border-gray-200 shadow-sm rounded-md px-3 py-2 hover:shadow-md transition flex items-center justify-between"
                    >

                        <span className="text-lg font-semibold text-gray-800">
                            {cat.name}
                        </span>

                    </div>
                ))}

            </div>

        <div className="pt-5 w-full">
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddCategory}
                fullWidth
            >
                Add Category
            </Button>
        </div>

    </div>
);

}

export default CategoryMenu;
