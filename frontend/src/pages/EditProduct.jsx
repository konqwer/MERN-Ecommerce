import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiUrl from '../constants/apiUrl';
import usePatchProduct from '../hooks/usePatchProduct';
import useProduct from '../hooks/useProduct';
import useUser from '../hooks/useUser';
import Button from '../UI/Button';
import Image from '../UI/Image';
import ErrorPage from './ErrorPage';
import LoadingPage from './LoadingPage';

const EditProduct = () => {
  const { productId } = useParams();
  const { product, isLoading, error: productIdError } = useProduct(productId);
  const [image, setImage] = useState(null);
  const { user } = useUser();
  const navigate = useNavigate();
  const { patch, error } = usePatchProduct();

  if (isLoading) {
    return <LoadingPage />;
  } else if (productIdError) {
    return <ErrorPage error={error.message} />;
  } else if (product.user !== user._id) {
    navigate('/');
  }

  const submitHandler = async e => {
    e.preventDefault();
    const { name, image, price, description } = e.target;
    patch({
      productId,
      productData: {
        name: name.value,
        price: price.value,
        description: description.value,
        image: image.files[0] // image should always be at the end
      }
    });
  };

  const setImageHandler = e => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setImage(reader.result);
    });
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="flex h-full items-center justify-center">
      <form
        onSubmit={submitHandler}
        className="w-[800px] rounded-sm border border-slate-300 p-4"
      >
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold first-letter:text-blue-600">
            Edit Product
          </h1>
          <Button className="bg-red-300" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </div>

        <div className="flex flex-col gap-8 sm:flex-row">
          <div className="h-[90vw] w-full sm:h-auto sm:w-1/2">
            <label
              htmlFor="image"
              className="${ relative flex h-full w-full items-center justify-center border-4 border-dashed border-slate-300 font-semibold uppercase after:absolute after:inset-0 after:hidden after:items-center after:justify-center after:bg-[rgb(148,163,184,0.4)] after:content-['CHANGE'] hover:border-slate-400
              hover:after:flex"
            >
              <Image src={image || apiUrl + 'images/' + product.image}></Image>
            </label>
            <input
              onChange={setImageHandler}
              id="image"
              type="file"
              className="hidden"
              accept="image/png, image/jpg, image/jpeg"
            ></input>
          </div>

          <div className="flex w-full flex-col gap-2 sm:w-1/2">
            <label className="text-2xl font-semibold" htmlFor="name">
              Name
            </label>
            <input
              defaultValue={product.name}
              autoComplete="off"
              id="name"
              className="mb-4 border-b-4 border-slate-300 bg-transparent focus:border-slate-400 focus:outline-none"
            />

            <label className="text-2xl font-semibold" htmlFor="price">
              Price
            </label>
            <input
              defaultValue={product.price}
              autoComplete="off"
              id="price"
              className="mb-4 border-b-4 border-slate-300 bg-transparent focus:border-slate-400 focus:outline-none"
            />

            <label className="text-2xl font-semibold" htmlFor="description">
              Description
            </label>
            <textarea
              defaultValue={product.description}
              id="description"
              className="mb-4 h-24 resize-none border-b-4 border-slate-300 bg-transparent focus:border-slate-400 focus:outline-none"
            />
            <Button>Submit</Button>
          </div>
        </div>
        {error && (
          <div className="mt-4 animate-slideBottom rounded-sm border border-red-300 bg-red-200 p-2">
            {error.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default EditProduct;
