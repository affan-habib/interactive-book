import React from 'react';
import Card from "@/components/ui/Card";
import user from '@/assets/images/course/Admin.png';
import bar from '@/assets/images/course/bar.svg';
import LeftCard from './LeftCard';
import RightCard from './RightCard';
import Icon from "@/components/ui/Icon";
import useDataFetching from '@/hooks/useDataFetching';
import { BASE_URL } from '../../config';


const ProfileView = () => {
    const { data: userData, error } = useDataFetching({
        queryKey: 'user-data',
        endPoint: `${BASE_URL}/user-service/trainee/100310052`,
    });
    console.log(userData)
    if (error) {
        console.error('Error fetching user data:', error);
    }
    return (
        <div className='rounded-lg shadow-md border border-jade-50'>
            <div className='grid grid-cols-6 border border-b-primary-200 border-b-1 bg-primary-50 rounded-tl-lg rounded-tr-lg'>
                <div className="col-span-2 relative flex items-center gap-4 p-9">
                    <div>
                        <img src={user} alt="user" className='w-40 h-40 rounded-full mx-auto border border-primary-200 p-2' />
                        <Icon icon="bi:pencil-square" className="absolute ml-[130px] mt-[-40px] text-3xl" />
                    </div>
                    <div>
                        <h6 className='text-primary-600 ml-10 font-semibold'>{userData?.data?.emisUserJson?.Name}</h6>
                    </div>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                    <div>
                        <img src={bar} alt="bar" className='' />
                    </div>
                </div>
                <div className="col-span-3 flex items-center">
                    <div className=''>
                        <div className='flex items-center gap-2 mb-3'>
                            <div>
                                <Icon icon="bi:phone" className="text-primary-600 text-2xl" />
                            </div>
                            <div>
                                <p className=''>মোবাইল নম্বর</p>
                                <p className='text-primary-600'>{userData?.data?.emisUserJson?.MobileNo || 'Not found'}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-3'>
                            <div>
                                <Icon icon="bi:envelope" className="text-primary-600 text-2xl" />
                            </div>
                            <div>
                                <p>ইমেইল এড্রেস</p>
                                <p className='text-primary-600'>{userData?.data?.emisUserJson?.Email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-7 h-full'>
                <div className='col-span-3 pl-4 pt-4 pb-4 h-full'>
                    <Card className='h-full border border-primary-200'>
                        <LeftCard data={userData?.data?.emisUserJson} />
                    </Card>
                </div>
                <div className='col-span-4 pr-4 pt-4 pb-4 pl-4 h-full'>
                    <Card className='h-full border border-primary-200'>
                        <RightCard data={userData?.data?.emisUserJson} />
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ProfileView;