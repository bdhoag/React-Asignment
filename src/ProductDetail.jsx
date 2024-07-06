// src/components/ProductDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    currentPrice: '',
    image: ''
  });

  useEffect(() => {
    axios.get('/Products.json')
      .then(response => {
        setProduct(response.data.products.find(p => p.id === id));
        setUpdatedProduct(response.data.products.find(p => p.id === id));
      })
      .catch(error => {
        console.error('Failed to fetch product details', error);
        toast.error('Failed to fetch product details');
      });
  }, [id]);

  const calcDiscount = (price, currentPrice) => {
    const priceProduct = parseFloat(price.replace(/[.,đ]/g, '').trim());
    const currentPriceProduct = parseFloat(currentPrice.replace(/[.,đ]/g, '').trim());
    return Math.round(((priceProduct - currentPriceProduct) / priceProduct) * 100);
  };

  const handleInputChange = (e) => {
    setUpdatedProduct({
      ...updatedProduct,
      [e.target.name]: e.target.value
    });
  };

  const handleEditProduct = (e) => {
    e.preventDefault();
    setProduct(updatedProduct);
    setIsEditing(false);
    toast.success('Product updated');
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    toast.info('Edit canceled');
  };


  return (
    <div className="bg-gray-800 min-h-screen text-white">
      <ToastContainer />
      {product
        ?
        <>
          <div className="text-3xl font-bold py-8 text-center">
            {isEditing ? "Edit Product" : product.name}
          </div>
          {isEditing ?
            (<form
              onSubmit={handleEditProduct}
              className="flex flex-col gap-4 max-w-lg mx-auto"
            >
              <div className="grid grid-cols-12">
                <label
                  htmlFor="name"
                  className="mb-1 col-span-3"
                >
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={updatedProduct.name}
                  onChange={handleInputChange}
                  required
                  className="border p-2 rounded text-black col-span-9"
                />
              </div>
              <div className="grid grid-cols-12">
                <label
                  htmlFor="description"
                  className="mb-1 col-span-3"
                >
                  Description:
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={updatedProduct.description}
                  onChange={handleInputChange}
                  required
                  className="border p-2 rounded text-black col-span-9"
                />
              </div>
              <div className="grid grid-cols-12">
                <label
                  htmlFor="price"
                  className="mb-1 col-span-3"
                >
                  Price:
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={updatedProduct.price}
                  onChange={handleInputChange}
                  required
                  className="border p-2 rounded text-black col-span-9"
                />
              </div>
              <div className="grid grid-cols-12">
                <label
                  htmlFor="currentPrice"
                  className="mb-1 col-span-3"
                >
                  Current Price:
                </label>
                <input
                  type="text"
                  id="currentPrice"
                  name="currentPrice"
                  value={updatedProduct.currentPrice}
                  onChange={handleInputChange}
                  required
                  className="border p-2 rounded text-black col-span-9"
                />
              </div>
              <div className="flex justify-center mt-4 gap-1.5">
                <div
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-900 ease-in-out duration-200 cursor-pointer">
                  Cancel
                </div>
                <button
                  type="submit"
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-900 ease-in-out duration-200"
                >
                  Save Product
                </button>
              </div>
            </form>
            ) : (
              <div className="flex flex-col gap-3 text-center">
                <img
                  src={`/${product.image}`}
                  alt={product.name}
                  className="w-64 h-64 object-cover rounded-lg mx-auto"
                />
                <div className="text-xl">
                  {product.description}
                </div>
                <div className="text-lg">
                  Price: {product.price} đ
                </div>
                <div className="text-lg">
                  Current Price: {product.currentPrice} đ
                </div>
                <div className="text-lg">
                  Discount: {calcDiscount(product.price, product.currentPrice)}%
                </div>
                <div className="flex justify-center gap-2">
                  <div
                    onClick={() => navigate('/')}
                    className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-900 ease-in-out duration-200"
                  >
                    Back Home
                  </div>
                  <div
                    onClick={() => setIsEditing(true)}
                    className="bg-red-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-red-900 ease-in-out duration-200"
                  >
                    Edit
                  </div>
                </div>
              </div>
            )}
        </>
        :
        <div className="text-white h-52 text-2xl font-semibold content-center text-center animate-pulse">
          Loading
        </div>
      }
    </div>

  );
};

export default ProductDetail;
