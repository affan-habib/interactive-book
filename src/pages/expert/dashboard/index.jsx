import React, { useState } from 'react';
import { Icon } from "@iconify/react";
import CourseList from './CourseList';
import StudentList from './StudentList';
import AssignmentList from './AssignmentList';
import UpdateLink from './UpdateLink';
import AttenededClassList from './AttenededClassList';
import OngoingClassList from './OngoingClassList';
import useFetch from '../../../hooks/useFetch';

const Dashboard = () => {
    const [selectedMenuItem, setSelectedMenuItem] = useState('MyCourseList');
    const menuItems = [
        // { id: 'Dashboard', icon: 'mdi:home', label: 'Dashboard' },
        { id: 'MyCourseList', icon: 'mdi:book', label: 'My Course List' },
        { id: 'MyStudentList', icon: 'mdi:list-box-outline', label: 'Student List' },
        { id: 'OngoingClasses', icon: 'mdi:list-box-outline', label: 'Ongoing Classes' },
        { id: 'AssignmentList', icon: 'mdi:file-document', label: 'Assignment List' },,
        { id: 'AttenededClassList', icon: 'mdi:file-document', label: 'Attended Class List' },,
        { id: 'UpdateLink', icon: 'mdi:cog', label: 'Update Link' },
    ];
    const { data: expertProfile, isLoading, isError } = useFetch({ queryKey: 'expertProfile', endPoint: 'mentor-profile' });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching data</div>;
    return (
        <div className='grid grid-cols-3 container gap-10'>
            <div>
                <div className="flex flex-col items-center p-4 border bg-white py-10">
                    <img
                        src={expertProfile.data.image ? expertProfile.data.image : 'https://picsum.photos/200'}
                        alt="Profile"
                        className="rounded-full border-4 border-gray-300 mb-4 w-32 h-32"
                    />
                    <div className="flex items-center mb-2">
                        <Icon icon="mdi:account" className="h-5 w-5 text-gray-700 mr-2" />
                        <span className="text-base font-semibold">{expertProfile.data.user.name}</span>
                    </div>
                    <div className="flex items-center mb-2">
                        <Icon icon="mdi:phone" className="h-5 w-5 text-gray-700 mr-2" />
                        <span className="text-base">{expertProfile.data.user.contact_no}</span>
                    </div>
                    <div className="flex items-center">
                        <Icon icon="mdi:briefcase" className="h-5 w-5 text-gray-700 mr-2" />
                        <span className="text-base">{expertProfile.data.user.user_type}</span>
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
                {selectedMenuItem === 'Dashboard' && <div>Dashboard Content</div>}
                {selectedMenuItem === 'MyStudentList' && <StudentList />}
                {selectedMenuItem === 'MyCourseList' && <CourseList />}
                {selectedMenuItem === 'AssignmentList' && <AssignmentList />}
                {selectedMenuItem === 'OngoingClasses' && <OngoingClassList />}
                {selectedMenuItem === 'AttenededClassList' && <AttenededClassList/>}
                {selectedMenuItem === 'UpdateLink' && <UpdateLink/>}
                {selectedMenuItem === 'Payment List' && <div>Payment List Content</div>}
            </div>
        </div>
    );
}

export default Dashboard;