import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React from 'react';
import { Button, Input, InputLabel, MenuItem, Select } from '@mui/material';
import { ApiFetch } from '../Infra/api';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
};
const initialProduct=    {
    "id": 0,
    "title": "",
    "price": "",
    "description": "",
    "category_id": 0,
    "image": "",
    "rating_rate": "",
    "rating_count": 0,
    "category": ""
  }

export default function NewProduct({ setOpen, open, categories, setProducts }) {
  const [product, setProduct] = React.useState(initialProduct);

  const handleClose = () => setOpen(false);
  const handleChange = (event) => {
    setProduct({
      ...product,
      [event.target.name]: event.target.value
    });
  }

const handleSave = async () => {
  try {
    const data = await ApiFetch("products", {
      method: "POST",
      body: product 
    });

    if (data) {
      setProducts((prevProducts) => [...prevProducts, data]);
    }
    setOpen(false);
    setProduct(initialProduct);
  } catch (error) {
    console.error("Error saving product:", error);
  }
};

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add a New Product
          </Typography>
          <Box id="modal-modal-description" sx={{ mt: 2 }} className="flex flex-col gap-4">

            <InputLabel htmlFor="title-input">Title</InputLabel>
            <Input
              id="title-input"
              name="title"
              value={product.title}  
              onChange={handleChange}
            />

            <InputLabel htmlFor="price-input">Price</InputLabel>
            <Input
              id="price-input"
              name="price"
              value={product.price}  
              type='number'
              onChange={handleChange}
            />

            <InputLabel htmlFor="description-input">Description</InputLabel>
            <Input
              id="description-input"
              name="description"
              value={product.description}  
              onChange={handleChange}
            />

            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              name="category_id"
              value={product.category_id}
              label="Category"
              onChange={handleChange}
            >
              <MenuItem value={10}><em>Select</em></MenuItem>
              {categories && categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
              ))}
            </Select>
            <div className='pt-4 w-full'>
              <Button variant="contained" color="primary" onClick={handleSave} fullWidth>
                Save Product
              </Button>
            </div>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
