import React from 'react';
import RunningBatch from '../dashboard/RunningWeek';
import Icon from "@/components/ui/Icon";
import Badge from "@/components/ui/Badge";
import { useTranslation } from 'react-i18next';
const ProgressView = () => {
    const { t } = useTranslation();
    return (
        <div>
            <RunningBatch />
            <div>
                <h6 className='text-primary-600 mt-4'>{t('completed.course')}</h6>
                <div className='grid grid-cols-3 mt-4 gap-5'>
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className='lg:col-span-1 col-span-3'>
                            <div className="relative border border-[#B6DED4] p-4 rounded-md bg-primary-100">
                                <Badge className="mb-3 text-[15px] bg-primary-600 text-white px-5 py-3 absolute top-0 right-0 rounded-tl-none rounded-br-none">
                                    সম্পূর্ণ
                                </Badge>

                                <div className='flex items-center mx-2 border-b-2 border-dashed border-jade-50 py-3'>
                                    <div className='grid grid-cols-4'>
                                        <div className='col-span-3'>
                                            <p className='text-lg'>বেসিক পেডাগোজি অধ্যায় ১</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className='flex justify-between mt-3'>
                                        <div>
                                            <p className='flex items-center gap-2 mt-1'>
                                                <Icon icon="material-symbols:calendar-month" className="ml-2 w-5 h-5 text-primary-600" />
                                                কোর্সটি সম্পন্ন হয়েছে</p>
                                        </div>
                                        <div>
                                            <p className='flex items-center gap-2 mt-1'>
                                                ১ জুলাই ২০২৩
                                            </p>
                                        </div>
                                    </div>
                                    <div className='flex justify-between mt-3 mb-3'>
                                        <div>
                                            <p className='flex items-center gap-2 mt-1 mb-1'>
                                                <Icon icon="material-symbols:emoji-events" className="ml-2 w-5 h-5 text-primary-600" />
                                                অর্জিত মার্ক</p>
                                        </div>
                                        <div>
                                            <p className='flex items-center gap-2 mt-1 mb-1'>
                                                ৯০.২৫%
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h6 className='text-primary-600 mt-4'>{t('upcoming.course')}</h6>
                <div className='grid grid-cols-3 gap-5 mt-4'>
                    {[...Array(2)].map((_, index) => (
                        <div className='lg:col-span-1 col-span-3' key={index}>
                            <div className="relative border border-[#B6DED4] p-4 rounded-md bg-primary-100">
                                <Badge className="mb-3 text-[15px] bg-primary-600 text-white px-5 py-3 absolute top-0 right-0 rounded-tl-none rounded-br-none">
                                    আসন্ন
                                </Badge>
                                <div className='flex items-center mx-2 border-b-2 border-dashed border-jade-50 py-3'>
                                    <div className='grid grid-cols-4'>
                                        <div className='col-span-3'>
                                            <p className='text-lg'>বেসিক পেডাগোজি অধ্যায় ১</p>
                                            <p className='text-sm my-1'>শুরুর সময় : ১ জানুয়ারী ২০২৪ - ৬ মার্চ ২০২৪</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='border-b-2 border-dashed border-gray-300'>
                                    <div className='flex justify-between mt-3'>
                                        <div>
                                            <p className='flex items-center gap-2 mt-1'>
                                                <Icon icon="bi:play-btn" className="ml-2 w-5 h-5 text-primary-600" />
                                                ভিডিও দেখার সময়</p>
                                        </div>
                                        <div>
                                            <p className='flex items-center gap-2 mt-1'>
                                                ১২ মিনিট ৪৩ সেকেন্ড
                                            </p>
                                        </div>
                                    </div>
                                    <div className='flex justify-between mt-3 mb-3'>
                                        <div>
                                            <p className='flex items-center gap-2 mt-1 mb-1'>
                                                <Icon icon="bi:newspaper" className="ml-2 w-5 h-5 text-primary-600" />
                                                স্ক্রিপ্ট পড়ার সময়</p>
                                        </div>
                                        <div>
                                            <p className='flex items-center gap-2 mt-1 mb-1'>
                                                ২৩ মিনিট
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h6 className='mt-2 ml-2 text-primary-600'>প্রাপ্ত মার্ক</h6>
                                    <div className='flex justify-between mt-3'>
                                        <div>
                                            <p className='flex items-center gap-2 mt-1 mb-1'>
                                                <Icon icon="bi:file-earmark-break" className="ml-2 w-5 h-5 text-primary-600" />
                                                এসাইনমেন্ট ১</p>
                                        </div>
                                        <div>
                                            <p className='flex items-center gap-2 mt-1 mb-1'>
                                                ৮ / ১০
                                            </p>
                                        </div>
                                    </div>
                                    <div className='flex justify-between mt-3 mb-3'>
                                        <div>
                                            <p className='flex items-center gap-2 mt-1 mb-1'>
                                                <Icon icon="bi:question-square-fill" className="ml-2 w-5 h-5 text-primary-600" />
                                                মূল্যায়ন ১</p>
                                        </div>
                                        <div>
                                            <p className='flex items-center gap-2 mt-1 mb-1'>
                                                ৮ / ১০
                                            </p>
                                        </div>
                                    </div>
                                    <div className='flex justify-between mt-3 mb-3'>
                                        <div>
                                            <p className='flex items-center gap-2'>
                                                <Icon icon="bi:question-square-fill" className="ml-2 w-5 h-5 text-primary-600" />
                                                মূল্যায়ন ২</p>
                                        </div>
                                        <div>
                                            <p className='flex items-center gap-2'>
                                                ৮ / ১০
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProgressView;