import React from "react";
import useFetch from "@/hooks/useFetch";
import { Icon } from "@iconify/react";
import Grid from "../../components/skeleton/Grid";
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  return (
    <div className="border rounded-b-lg relative bg-white cursor-pointer" onClick={() => navigate(`/course-details/${course.id}`)}>
      <div className="relative">
        <img src={course.thumbnail ? `http://api-saas.bacbonx.com/uploads/${course.thumbnail}` : 'https://picsum.photos/200/300'} alt={course.title} className="mb-4 w-full h-[200px] object-cover" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-opacity-50 bg-white rounded-full p-4 flex items-center justify-center">
            <div className="bg-white rounded-full p-3 flex items-center justify-center">
              <Icon icon="mdi:play" className="h-8 w-8 text-danger-500" />
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 pb-4">
        <h2 className="text-xl">{course.title}</h2>
        <p className="text-gray-600 line-clamp-2 my-2">{course.description}</p>
        <div className="flex justify-center">
          <button className="border border-primary-500 text-primary-500 py-2 px-10 rounded hover:bg-primary-500 hover:text-white transition">Enroll Now</button>
        </div>
      </div>
    </div>
  );
};

const Courses = () => {
  
  const { data: courseList, isLoading, isError } = useFetch({ queryKey: 'courseList', endPoint: 'course-list' });

  if (isLoading) {
    return (
      <div className="container mx-auto">
        <h1 className="mb-6 text-4xl text-primary-500">Our Courses</h1>
        <Grid count={8} />
      </div>
    );
  }
  if (isError) return <div>Error fetching courses</div>;

  return (
    <div className="container mx-auto">
      <h1 className="mb-6 text-4xl text-primary-500">Our Courses</h1>
      <div className="grid grid-cols-4 gap-6">
        {courseList.data.data.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Courses;
