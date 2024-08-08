import React from 'react';
import { Icon } from "@iconify/react";
import useFetch from "@/hooks/useFetch";
import moment from 'moment';
const StudentList = () => {
  const { data: studentList, isLoading, isError } = useFetch({ queryKey: 'mentorStudentList', endPoint: 'mentor-student-list' });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (


    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-4 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Student</th>
            <th className="py-4 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Contact</th>
            <th className="py-4 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Course</th>
            <th className="py-4 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Action</th>
          </tr>
        </thead>
        <tbody>
          {studentList.data.map(student => (
            <tr key={student.id}>
              <td className="py-4 px-4 border-b border-gray-200">{student.student_name}</td>
              <td className="py-4 px-4 border-b border-gray-200">{student.student_contact_no}</td>
              <td className="py-4 px-4 border-b border-gray-200">{student.course_title}</td>
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

export default StudentList;