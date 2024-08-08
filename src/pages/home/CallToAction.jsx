import React from 'react';

const CallToAction = () => {
  return (
    <div className="bg-primary-600 text-white py-10 px-5 text-center rounded-lg shadow-lg mt-20">
      <h2 className="text-3xl font-bold mb-4 text-yellow-300">Join Us Today!</h2>
      <p className="text-lg mb-6">Sign up now and start your journey with us. Don't miss out on our exclusive offers and updates.</p>
      <button className="bg-white text-blue-500 font-semibold py-2 px-4 rounded-full hover:bg-gray-200 transition duration-300">
        Get Started
      </button>
    </div>
  );
};

export default CallToAction;
