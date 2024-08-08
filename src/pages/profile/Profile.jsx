import React, { useState } from 'react';
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import ProfileView from './ProfileView';
import ProgressView from './ProgressView';

const Profile = () => {
    const [infoType,setInfoType] = useState('personal');
    const handleInfo = (type) =>{
        setInfoType(type);
    }
    return (
        <div>
            <div className='flex justify-between mb-5'>
                <div>
                    <Button onClick={()=>handleInfo('personal')} className={`${infoType === "personal" ?'bg-primary-600 text-white' : 'btn-outline-secondary'} mr-5`}>ব্যক্তিগত তথ্য</Button>
                    <Button onClick={()=>handleInfo('progress')} className={`${infoType === "progress" ?'bg-primary-600 text-white' : 'btn-outline-secondary'} mr-5`}>অগ্রগতির তথ্য</Button>
                </div>
                
            </div>
           <>
           {
            infoType === "personal" ? <ProfileView/> : <ProgressView/>
           }
           </>
        </div>
    );
};

export default Profile;