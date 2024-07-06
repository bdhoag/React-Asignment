import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function AddProduct(props) {

  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    currentPrice: '',
    image: ''
  });

  const handleInputChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value
    });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    props.newProduct(newProduct);
    handleClose();
    toast.success('Product added successfully');
  };

  useEffect(() => {
    if (props.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [props.isOpen]);

  const handleClose = () => {
    props.closeModal();
    setNewProduct({
      id: '',
      name: '',
      description: '',
      price: '',
      currentPrice: '',
      image: ''
    });
  };

  return (
    <div className={props.isOpen === false ? 'hidden' : ''}>
      <div className='text-gray-800'>
        <div className='fixed z-40 top-0 left-0 h-screen w-screen bg-gray-900 opacity-40'>
        </div>

        <div className='fixed z-50 top-0 left-0 h-screen w-screen flex justify-center items-center'>
          <div className='animate-fade-in-down w-fit px-10 pb-5 rounded-3xl shadow-2xl bg-gray-900 max-h-screen overflow-y-auto overflow-x-hidden'>
            <div className="flex py-3 -mr-5 text-white">
              <div className="text-2xl flex-1 flex justify-center items-center font-semibold ">
                Add Product
              </div>
              <button
                className='p-1 hover:bg-gray-200 hover:text-black rounded-full transition-all duration-300 ease-in-out'
                onClick={handleClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24" height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-x"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <form
              onSubmit={handleAddProduct}
              className="grid grid-cols-1 gap-4 w-[70vw] mx-auto"
            >
              <div className="grid grid-cols-12">
                <label
                  htmlFor="name"
                  className="mb-1 text-white col-span-3">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  required
                  className="border p-2 rounded col-span-9"
                />
              </div>
              <div className="grid grid-cols-12">
                <label
                  htmlFor="description"
                  className="mb-1 text-white col-span-3"
                >
                  Description:
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  required
                  className="border p-2 rounded col-span-9"
                />
              </div>
              <div className="grid grid-cols-12">
                <label
                  htmlFor="price"
                  className="mb-1 text-white col-span-3"
                >
                  Price:
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  required
                  className="border p-2 rounded col-span-9"
                />
              </div>
              <div className="grid grid-cols-12">
                <label
                  htmlFor="currentPrice"
                  className="mb-1 text-white col-span-3">
                  Current Price:
                </label>
                <input
                  type="text"
                  id="currentPrice"
                  name="currentPrice"
                  value={newProduct.currentPrice}
                  onChange={handleInputChange}
                  required
                  className="border p-2 rounded col-span-9"
                />
              </div>
              <div className="grid grid-cols-12">
                <label
                  htmlFor="image"
                  className="mb-1 text-white col-span-3"
                >
                  Image URL:
                </label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={newProduct.image}
                  onChange={handleInputChange}
                  required
                  className="border p-2 rounded col-span-9"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-900 ease-in-out duration-200 w-fit mx-auto font-semibold"
              >
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
