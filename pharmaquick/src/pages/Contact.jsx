import React, { useState } from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';

const Contact = () => {
  const [showJobsMessage, setShowJobsMessage] = useState(false); // State to track if the message should be shown

  const handleExploreJobs = () => {
    setShowJobsMessage(true); // Set state to true when Explore Jobs is clicked
  };

  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="Contact Us" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Office</p>
          <p className='text-gray-500'>
            1050 Senapati Bapat Road <br /> Suite 350, Pune, India
          </p>
          <p className='text-gray-500'>
            Tel: (+91) 841-788-7516 <br /> Email: pharmaquick@gmail.com
          </p>
          <p className='font-semibold text-xl text-gray-600'>Careers at Pharma Quick</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <button
            className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'
            onClick={handleExploreJobs} // On click, change state to show the message
          >
            Explore Jobs
          </button>

          {/* Conditionally render the message */}
          {showJobsMessage && <p className='mt-4 text-red-500'>No Jobs Available As Of Now</p>}
        </div>
      </div>

      {/* <NewsletterBox /> */}
    </div>
  );
};

export default Contact;
