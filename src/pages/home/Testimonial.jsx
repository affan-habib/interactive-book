import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import SwiperCore, { Autoplay, Navigation } from 'swiper';
import { Icon } from '@iconify/react';

SwiperCore.use([Autoplay, Navigation]);

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    title: "CEO of Company",
    testimonial: "This product has greatly improved our workflow and efficiency. Highly recommended! The customer service is outstanding and the product itself is top-notch.",
    image: "https://picsum.photos/150?random=1"
  },
  {
    id: 2,
    name: "Jane Smith",
    title: "Marketing Manager",
    testimonial: "The customer service is outstanding and the product itself is top-notch.The customer service is outstanding and the product itself is top-notch.",
    image: "https://picsum.photos/150?random=2"
  },
  {
    id: 3,
    name: "John Doe",
    title: "CEO of Company",
    testimonial: "This product has greatly improved our workflow and efficiency. Highly recommended!The customer service is outstanding and the product itself is top-notch.",
    image: "https://picsum.photos/150?random=3"
  },
  {
    id: 4,
    name: "Jane Smith",
    title: "Marketing Manager",
    testimonial: "The customer service is outstanding and the product itself is top-notch.",
    image: "https://picsum.photos/150?random=4"
  },
  {
    id: 5,
    name: "John Doe",
    title: "CEO of Company",
    testimonial: "This product has greatly improved our workflow and efficiency. Highly recommended!",
    image: "https://picsum.photos/150?random=5"
  },
];

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="border rounded-lg p-6 bg-white shadow-md flex space-x-6 relative">
      <div className="w-1/3 flex flex-col items-center">
        <img src={testimonial.image} alt={testimonial.name} className="w-20 h-20 rounded-full mb-4 -top-5 absolute border-4 border-primary-50" />
        <div className="text-center mt-12">
          <h3 className="text-xl font-semibold text-primary-600">{testimonial.name}</h3>
          <p className="text-gray-500">{testimonial.title}</p>
        </div>
      </div>
      <div className="flex flex-row justify-center">
        <svg width="10" height="142" viewBox="0 0 10 142" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 141L1 1" stroke="#E5F0F8" strokeWidth="2" strokeLinecap="round" />
          <path d="M9 121L9 21" stroke="#E5F0F8" strokeWidth="2" strokeLinecap="round" />
        </svg>

      </div>
      <div className="w-2/3">
        <p className="text-gray-700 mt-4">
          <Icon icon="mdi:format-quote-open" className="inline-block h-6 w-6 text-primary-600" />
          {testimonial.testimonial}
          <Icon icon="mdi:format-quote-close" className="inline-block h-6 w-6 text-primary-600" />
        </p>
      </div>
    </div>
  );
};

const Testimonial = () => {
  return (
    <div className="container mx-auto pt-20 relative">
      <h1 className="text-4xl mb-8 flex flex-col text-gray-600">
        <span>What Client Say !!! </span>
      </h1>
      <div className='relative'>

        <Swiper
          className='mx-20'
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 3000 }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 2,
            },
          }}
        >

          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className='pt-10'>
                <TestimonialCard testimonial={testimonial} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;