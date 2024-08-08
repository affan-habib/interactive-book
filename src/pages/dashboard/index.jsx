import React, { useState } from 'react';
import { Icon } from "@iconify/react";
import CourseList from './CourseList';
import ClassList from './ClassList';
import AssignmentList from './AssignmentList';
import ExamList from './ExamList';
import PurchaseList from './PurchaseList';
import useFetch from '../../hooks/useFetch';
import Loading from '../../components/Loading';

const Dashboard = () => {
    const [selectedMenuItem, setSelectedMenuItem] = useState('Dashboard');
    const menuItems = [
        { id: 'Dashboard', icon: 'mdi:home', label: 'Dashboard' },
        { id: 'Class List', icon: 'mdi:account', label: 'Class List' },
        { id: 'My Course List', icon: 'mdi:book', label: 'My Course List' },
        { id: 'My Assignment List', icon: 'mdi:file-document', label: 'My Assignment List' },
        { id: 'Exam List', icon: 'mdi:clipboard-check', label: 'Exam List' },
        { id: 'Purchase List', icon: 'mdi:shopping-cart', label: 'Purchase List' },
        { id: 'Payment List', icon: 'mdi:cash', label: 'Payment List' },
    ];
    const { data: studentProfile, isLoading, isError } = useFetch({ queryKey: 'studentProfile', endPoint: 'student-profile' });

    if (isLoading) return <Loading />;
    if (isError) return <div>Error fetching data</div>;
    return (
        <div className='grid grid-cols-3 container gap-10'>
            <div>
                <div className="flex flex-col items-center p-4 border bg-white py-10">
                    <img
                        src={studentProfile.data.image ? studentProfile.data.image : 'https://picsum.photos/200'}
                        alt="Profile"
                        className="rounded-full border-4 border-gray-300 mb-4 w-32 h-32"
                    />
                    <div className="flex items-center mb-2">
                        <Icon icon="mdi:account" className="h-5 w-5 text-gray-700 mr-2" />
                        <span className="text-base font-semibold">{studentProfile.data.user.name}</span>
                    </div>
                    <div className="flex items-center mb-2">
                        <Icon icon="mdi:phone" className="h-5 w-5 text-gray-700 mr-2" />
                        <span className="text-base">{studentProfile.data.user.contact_no}</span>
                    </div>
                    <div className="flex items-center">
                        <Icon icon="mdi:briefcase" className="h-5 w-5 text-gray-700 mr-2" />
                        <span className="text-base">{studentProfile.data.user.user_type}</span>
                    </div>
                </div>
                <div className="mt-4 bg-white">
                    <ul>
                        {menuItems.map((item) => (
                            <li onClick={() => setSelectedMenuItem(item.id)} key={item.id} className={`pl-6 flex items-center p-3 ${selectedMenuItem === item.id ? 'bg-gray-200' : 'hover:bg-gray-100'} rounded cursor-pointer`}>
                                <Icon icon={item.icon} className="h-5 w-5 text-gray-700 mr-2" />
                                <span className="text-base font-semibold" >{item.label}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="col-span-2">
                {selectedMenuItem === 'Dashboard' && <CourseList />}
                {selectedMenuItem === 'Class List' && <ClassList />}
                {selectedMenuItem === 'My Course List' && <CourseList />}
                {selectedMenuItem === 'My Assignment List' && <AssignmentList />}
                {selectedMenuItem === 'Exam List' && <ExamList />}
                {selectedMenuItem === 'Purchase List' && <PurchaseList />}
                {selectedMenuItem === 'Payment List' && <div>Payment List Content</div>}
            </div>
        </div>
    );
}

export default Dashboard;