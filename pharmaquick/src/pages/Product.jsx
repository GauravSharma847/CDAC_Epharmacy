import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

// Step 1: OpenAI API call function
const generateEnhancedText = async (prompt) => {
  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer YOUR_OPENAI_API_KEY`, // Replace with your OpenAI API key
    },
    body: JSON.stringify({
      model: 'text-davinci-003', // Use the latest GPT model
      prompt: prompt,
      max_tokens: 100, // Adjust based on your needs
      temperature: 0.7, // Controls creativity (0 = deterministic, 1 = creative)
    }),
  });

  const data = await response.json();
  return data.choices[0].text.trim();
};

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [size, setSize] = useState("");
  const [image, setImage] = useState("");
  const [reviewCount, setReviewCount] = useState(0); // Random review count
  const [enhancedDescription, setEnhancedDescription] = useState(""); // Enhanced description

  // Step 2: Fetch enhanced description using OpenAI API
  const fetchEnhancedDescription = async (productName, productDescription) => {
    const prompt = `Enhance the following product description for "${productName}":\n\n${productDescription}\n\nEnhanced Description:`;
    const enhancedDescription = await generateEnhancedText(prompt);
    setEnhancedDescription(enhancedDescription);
  };

  // Fetch product data
  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  // Generate random review count (1 to 1000)
  const generateRandomReviewCount = () => {
    const randomCount = Math.floor(Math.random() * 1000) + 1;
    setReviewCount(randomCount);
  };

  useEffect(() => {
    fetchProductData();
    generateRandomReviewCount();
  }, [productId]);

  useEffect(() => {
    if (productData) {
      fetchEnhancedDescription(productData.name, productData.description);
    }
  }, [productData]);

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* -------- Product Images ---------- */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image.map((item, index) => (
              <img key={index} onClick={() => setImage(item)} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' src={item} alt="" />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>

        {/* -------- Product Info ---------- */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img className='w-3.5' src={assets.star_icon} alt="" />
            <img className='w-3.5' src={assets.star_icon} alt="" />
            <img className='w-3.5' src={assets.star_icon} alt="" />
            <img className='w-3.5' src={assets.star_icon} alt="" />
            <img className='w-3.5' src={assets.star_dull_icon} alt="" />
            <p className='pl-2'>({reviewCount})</p> {/* Random review count */}
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{enhancedDescription || productData.description}</p> {/* Enhanced description */}
          <button onClick={() => addToCart(productData._id)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>
            ADD TO CART
          </button>

          <hr className='mt-8 sm:w-4/5' />

          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* -------- Product Description ---------- */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews ({reviewCount})</p> {/* Random review count */}
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>{enhancedDescription || productData.description}</p> {/* Enhanced description */}
        </div>
      </div>

      {/* -------- Related Products ---------- */}
      <RelatedProducts category={productData.category} />
    </div>
  ) : (
    <div className='opacity-0'></div>
  );
};

export default Product;