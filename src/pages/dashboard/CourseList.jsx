import React from 'react';
import { Icon } from "@iconify/react";
import useFetch from "@/hooks/useFetch";
import Loading from '../../components/Loading';
const CourseList = () => {
  const { data: studentCourseList, isLoading, isError } = useFetch({ queryKey: 'studentCourseList', endPoint: 'student-course-list' });

  if (isLoading) return <Loading/>;
  if (isError) return <div>Error fetching data</div>;

  return (


    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-4 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Course Name</th>
            <th className="py-4 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Type</th>
            <th className="py-4 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Action</th>
          </tr>
        </thead>
        <tbody>
          {studentCourseList.data.map(course => (
            <tr key={course.id}>
              <td className="py-4 px-4 border-b border-gray-200">{course.title}</td>
              <td className="py-4 px-4 border-b border-gray-200">{course.category_name}</td>
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

export default CourseList;