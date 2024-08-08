import React, { useState } from 'react';
import { Icon } from "@iconify/react";
import useFetch from "@/hooks/useFetch";
import moment from 'moment';
import Loading from '../../../components/Loading';
const AttenededClassList = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const { data: attendedClassList, isLoading, isError } = useFetch({ queryKey: ['mentor-completed-class-list', startDate, endDate], endPoint: `mentor-completed-class-list?start_date=${startDate}&end_date=${endDate}` });

  if (isLoading) return <Loading/>;
  if (isError) return <div>Error fetching data</div>;

  return (
    

    <div className="overflow-x-auto">
    <div className="grid grid-cols-2 gap-4 mt-4 mb-4">
      <input className='form-control p-2' type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      <input className='form-control p-2' type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
    </div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-4 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Course and Student</th>
            <th className="py-4 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Date</th>
            <th className="py-4 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Start</th>
            <th className="py-4 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">End</th>
            <th className="py-4 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Total</th>
          </tr>
        </thead>
        <tbody>
          {attendedClassList?.list?.map((attendedClass, index) => (
            <tr key={index}>
              <td className="py-4 px-4 border-b border-gray-200">{attendedClass.course_title} <br /> {attendedClass.student_name} </td>
              <td className="py-4 px-4 border-b border-gray-200">{moment(attendedClass.schedule_datetime).format('MMMM Do YYYY')}</td>
              <td className="py-4 px-4 border-b border-gray-200">{attendedClass.total_minutes}</td>
              <td className="py-4 px-4 border-b border-gray-200">{attendedClass.has_completed ? 'Completed' : 'Not Completed'}</td>
              <td className="py-4 px-4 border-b border-gray-200">
                <button className="text-blue-500">Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>


  );
}

export default AttenededClassList;    