import React from "react";
import useFooterType from "@/hooks/theme/useFooterType";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";
import googlePlay from './googleplay.svg';
import appstore from './appstore.svg';
import logo from './logo.svg';
import footerbg from './footerbg.svg';

const Footer = ({ className = "custom-class" }) => {
   const { t } = useTranslation();
   const [footerType] = useFooterType();
   const footerClassName = () => {
      switch (footerType) {
         case "sticky":
            return "sticky bottom-0 z-[999]";
         case "static":
            return "static";
         case "hidden":
            return "hidden";
      }
   };
   return (
      <div>
         <div className="relative bg-gradient-to-b from-[#FAFDFF] to-[#E8F8FE]">
            <div className="container py-10 mt-20">
               <footer className={className + " " + footerClassName()}>
                  <div className="px-6 py-4 relative">
                     <img src={footerbg} alt="Footer Background" className="absolute inset-0 w-[300px] h-auto object-cover opacity-50 mx-auto" />
                     <div className="relative grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div className="col-span-1 flex flex-col items-center md:items-start">
                           <img src={logo} alt="Logo" className="my-4" />
                           <div className="flex space-x-4">
                              <a href="#" className="bg-white border border-primary p-2 rounded">
                                 <Icon icon="fa-brands:facebook" className="h-6 w-6 text-primary-500" />
                              </a>
                              <a href="#" className="bg-white border border-primary p-2 rounded">
                                 <Icon icon="fa-brands:linkedin" className="h-6 w-6 text-primary-500" />
                              </a>
                           </div>
                        </div>
                        <div className="col-span-1 flex flex-col items-center md:items-start gap-3">
                           <h5 className="font-medium mb-2">Contact Us</h5>
                           <p className="flex items-center">
                              <Icon icon="mdi:map-marker" className="h-6 w-6 mr-2" />
                              123, abc, Dhaka -1000
                           </p>
                           <p className="flex items-center">
                              <Icon icon="mdi:phone" className="h-6 w-6 mr-2" />
                              +880##########
                           </p>
                           <p className="flex items-center">
                              <Icon icon="mdi:email" className="h-6 w-6 mr-2" />
                              abc@gmail.com
                           </p>
                           <p className="flex items-center">
                              <Icon icon="mdi:clock" className="h-6 w-6 mr-2" />
                              10.00 - 18.00 / Sun - Thu
                           </p>
                        </div>
                        <div className="col-span-1 flex flex-col items-center md:items-start gap-3">
                           <h5 className="font-medium mb-2">About Us</h5>
                           <a href="#" className="mb-1">Privacy Policy</a>
                           <a href="#" className="mb-1">Terms & Conditions</a>
                           <a href="#" className="mb-1">Contact Us</a>
                           <a href="#">Support Center</a>
                        </div>
                        <div className="col-span-1 flex flex-col items-center md:items-start">
                           <h5 className="font-medium mb-2">Install App</h5>
                           <div className="flex space-x-2">
                              <a href="#">
                                 <img src={appstore} alt="App Store" className="w-32" />
                              </a>
                              <a href="#">
                                 <img src={googlePlay} alt="Google Play" className="w-32" />
                              </a>
                           </div>
                        </div>
                     </div>
                  </div>
               </footer>
            </div>
         </div>
         <div style={{ background: 'linear-gradient(90deg, #0C5483 0%, #40A5E7 52.63%, #003456 100%)' }} className='flex justify-center items-center'>
            <p className='text-white py-2'>
               All right reserved @copy; 2024
            </p>
         </div>
      </div>
   );
};

export default Footer;