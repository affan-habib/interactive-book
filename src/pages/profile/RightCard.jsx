import React from 'react';
import { useTranslation } from 'react-i18next';


const RightCard = ({data}) => {
    const { t } = useTranslation();

    return (
        <div className='grid grid-cols-4'>
            <div className="col-span-2 my-3 ml-2">
                <div className='flex items-center justify-between'>
                    <p>{t("Institute Name")}</p>
                    <span>:</span>
                </div>
            </div>
            <div className="col-span-2 my-3 ml-7 flex justify-start">
                <p className='text-primary-600'>{t("Institute Name (English)")}</p>
            </div>
            <div className="col-span-2 my-3 ml-2">
                <div className='flex items-center justify-between'>
                    <p>{t("Institute ID")}</p>
                    <span>:</span>
                </div>
            </div>
            <div className="col-span-2 my-3 ml-7 flex justify-start">
                <p className='text-primary-600'>114723</p>
            </div>
            <div className="col-span-2 my-3 ml-2">
                <div className='flex items-center justify-between'>
                    <p>{t("Website")}</p>
                    <span>:</span>
                </div>
            </div>
            <div className="col-span-2 my-3 ml-7 flex justify-start">
                <p className='text-primary-600'>www.bafsd.edu.bd</p>
            </div>
            <div className="col-span-2 my-3 ml-2">
                <div className='flex items-center justify-between'>
                    <p>{t("Teacher Type")}</p>
                    <span>:</span>
                </div>
            </div>
            <div className="col-span-2 my-3 ml-7 flex justify-start">
                <p className='text-primary-600'>সরকারি</p>
            </div>
        </div>
    );
};

export default RightCard;