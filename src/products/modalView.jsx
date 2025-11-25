import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 3,
  p: 3,
};

export default function ModalSeeProduct({ open, setOpen, product }) {
  const handleClose = () => setOpen(false);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style} className="relative">
        
        <Typography variant="h6" className="text-indigo-600 font-bold mb-2">
          Product Details
        </Typography>

        {product && (
          <div className="flex flex-col gap-4">

            <div className="grid grid-cols-2 gap-3">
              <p className="text-gray-600"> <strong>Title:</strong> {product.title}</p>
              <p className="text-gray-600"> <strong>ID:</strong> {product.id}</p>
              <p className="text-gray-600"> <strong>Price:</strong> ${product.price}</p>
              <p className="text-gray-600"> <strong>Category:</strong> {product.category}</p>
              <p className="text-gray-600 col-span-2">
                <strong>Description:</strong> {product.description}
              </p>
              <p className="text-gray-600">
                <strong>Rating:</strong> ⭐ {product.rating_rate}
              </p>
            </div>
          </div>
        )}
      </Box>
    </Modal>
  );
}
