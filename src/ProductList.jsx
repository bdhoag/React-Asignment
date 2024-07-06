import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import AddProduct from './AddProduct';


export default function ProductList() {

  const [productList, setProductList] = useState();
  const [addProduct, setAddProduct] = useState(false);

  useEffect(() => {
    axios.get('/Products.json')
      .then(res => {
        setProductList(res.data.products);
      })
      .catch(() => {
        toast.error('Failed to load products');
      });
  }, []);

  const handleDelete = (product) => {
    if (window.confirm(`${product.name} will be deleted! Do you want to delete this product?`)) {
      setProductList(productList.filter(prod => prod.id !== product.id));
      toast.info('Product deleted');
    }
  };

  const handleCreate = (product) => {
    setProductList([...productList, { ...product, id: Date.now().toString() }]);
  }

  const closeModal = () => {
    setAddProduct(false);
  }

  return (
    <div className='bg-gray-800 min-h-screen pb-3'>
      <ToastContainer />
      <AddProduct
        isOpen={addProduct}
        closeModal={closeModal}
        newProduct={handleCreate}
      />
      <div className="text-white text-center text-3xl font-bold py-2">
        Product List
      </div>

      {productList && (productList?.length > 0)
        ?
        <>
          <div className="grid grid-cols-4 gap-5 px-3 h-full">
            {productList.map((product) => (
              <div
                key={product.id}
                className="h-full bg-white rounded-lg "
              >
                <img
                  src={`/${product.image}`}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4 flex flex-col justify-between h-80 gap-3">
                  <div className="text-red-600 font-semibold text-lg">
                    {product.name}
                  </div>
                  <div className="">
                    {product.description}
                  </div>
                  <div className="text-center line-through">
                    {product.price} đ
                  </div>
                  <div className="text-center text-red-500 font-semibold">
                    {product.currentPrice} đ
                  </div>
                </div>
                <div className="flex gap-1.5 items-center justify-center p-1">
                  <Link
                    className="w-full text-center py-2 px-3 bg-blue-600 text-white rounded-md hover:bg-blue-800 cursor-pointer font-semibold ease-in-out duration-200"
                    to={`/${product.id}`}
                  >
                    View Details
                  </Link>
                  <div
                    onClick={() => handleDelete(product)}
                    className="w-full text-center py-2 px-3 bg-red-600 text-white rounded-md hover:bg-red-800 cursor-pointer font-semibold ease-in-out duration-200"
                  >
                    Delete
                  </div>
                </div>
              </div>
            ))}
            <div className="h-full text-center content-center">
              <div className="py-3 px-5 text-lg font-semibold bg-blue-600 text-white rounded hover:bg-blue-900 ease-in-out duration-200 cursor-pointer"
                onClick={() => setAddProduct(true)}
              >
                Add Product
              </div>
            </div>
          </div>
        </>
        :
        <div className="text-white h-52 text-2xl font-semibold content-center text-center">
          No products found.
        </div>
      }
    </div>
  )
}
