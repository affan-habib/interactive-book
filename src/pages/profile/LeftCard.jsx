import React from 'react';
import { useTranslation } from 'react-i18next';

const LeftCard = ({ data }) => {
    const { t } = useTranslation();

    return (
        <div className='grid grid-cols-4'>

            <div className="col-span-2 my-3 ml-2">
                <div className='flex items-center justify-between'>
                    <p>{t('nID.number')}</p>
                    <span>:</span>
                </div>
            </div>
            <div className="col-span-2 my-3 flex justify-start ml-7">
                <p className='text-primary-600'>{data?.NID}</p>
            </div>
            <div className="col-span-2 my-3 ml-2">
                <div className='flex items-center justify-between'>
                    <p>{t('employee.id')}</p>
                    <span>:</span>
                </div>
            </div>
            <div className="col-span-2 my-3 flex justify-start ml-7">
                <p className='text-primary-600'>{data?.PDSID}</p>
            </div>
            <div className="col-span-2 my-3 ml-2">
                <div className='flex items-center justify-between'>
                    <p>{t('subject')}</p>
                    <span>:</span>
                </div>
            </div>
            <div className="col-span-2 my-3 flex justify-start ml-7">
                <p className='text-primary-600'>{data?.Subject}</p>
            </div>
            <div className="col-span-2 my-3 ml-2">
                <div className='flex items-center justify-between'>
                    <p>{t('zone')}</p>
                    <span>:</span>
                </div>
            </div>
            <div className="col-span-2 my-3 flex justify-start ml-7">
                <p className='text-primary-600'>{data?.BranchInstituteName}</p>
            </div>
            <div className="col-span-2 my-3 ml-2">
                <div className='flex items-center justify-between'>
                    <p>{t('division')}</p>
                    <span>:</span>
                </div>
            </div>
            <div className="col-span-2 my-3 flex justify-start ml-7">
                <p className='text-primary-600'>{data?.BranchInstituteCategory}</p>
            </div>
            <div className="col-span-2 my-3 ml-2">
                <div className='flex items-center justify-between'>
                    <p>{t('district')}</p>
                    <span>:</span>
                </div>
            </div>
            <div className="col-span-2 my-3 flex justify-start ml-7">
                <p className='text-primary-600'>{data?.BranchInstituteName}</p>
            </div>
            <div className="col-span-2 my-3 ml-2">
                <div className='flex items-center justify-between'>
                    <p>{t('upazila')}</p>
                    <span>:</span>
                </div>
            </div>
            <div className="col-span-2 my-3 flex justify-start ml-7">
                <p className='text-primary-600'>{data?.BranchInstituteName}</p>
            </div>
        </div>
    );
};

export default LeftCard;