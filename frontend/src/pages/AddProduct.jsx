import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useAddProducts from '../hooks/useAddProduct';
import Button from '../UI/Button';
import Image from '../UI/Image';

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const { add, data, error, isLoading } = useAddProducts();
  const errorRef = useRef();

  useEffect(() => {
    if (errorRef.current) {
      errorRef.current.focus();
    }
  }, [errorRef.current]);

  const submitHandler = async e => {
    e.preventDefault();
    const { name, image, price, description } = e.target;
    add({
      name: name.value,
      price: price.value,
      description: description.value,
      image: image.files[0] // image should always be at the end
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
        <h1 className="mb-12 text-4xl font-bold first-letter:text-blue-600">
          Add Product
        </h1>
        <div className="flex flex-col gap-8 sm:flex-row">
          <div className="h-[90vw] w-full sm:h-auto sm:w-1/2">
            <label
              htmlFor="image"
              className={`relative flex h-full w-full items-center justify-center border-4 border-dashed border-slate-300 font-semibold uppercase after:absolute after:inset-0 after:hidden after:items-center after:justify-center after:bg-[rgb(148,163,184,0.4)] after:content-['CHANGE'] hover:border-slate-400 ${
                image ? 'hover:after:flex' : ''
              }`}
            >
              {image ? <Image src={image}></Image> : 'Upload image'}
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
              autoComplete="off"
              id="name"
              className="mb-4 border-b-4 border-slate-300 bg-transparent focus:border-slate-400 focus:outline-none"
            />

            <label className="text-2xl font-semibold" htmlFor="price">
              Price
            </label>
            <input
              autoComplete="off"
              id="price"
              className="mb-4 border-b-4 border-slate-300 bg-transparent focus:border-slate-400 focus:outline-none"
            />

            <label className="text-2xl font-semibold" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              className="mb-4 h-24 resize-none border-b-4 border-slate-300 bg-transparent focus:border-slate-400 focus:outline-none"
            />
            <Button>Add</Button>
          </div>
        </div>
        {error && (
          <div
            ref={errorRef}
            tabIndex="0"
            className="mt-4 animate-slideBottom rounded-sm border border-red-300 bg-red-200 p-2"
          >
            {error.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default AddProduct;
