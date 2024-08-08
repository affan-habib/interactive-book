import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from "@/hooks/useFetch";
import { Icon } from "@iconify/react";
import Accordion from "@/components/ui/Accordion";
import Syllabus from './Syllabus';
import Loading from '../../components/Loading';

const CourseDetails = () => {
    const { id } = useParams()
    const { data: coursedetails, isLoading, isError } = useFetch({ queryKey: `course-details`, endPoint: `course-details/${id}` });
    if (isLoading) return <Loading />;
    if (isError) return <div>Error fetching data</div>;
    return (
        <div className='container'>
            <div className='grid grid-cols-3 gap-6'>
                <div className='col-span-2 shadow-lg p-4'>
                    <h4 className='mb-4'> {coursedetails.data.title}</h4>
                    <p> {coursedetails.data.description}</p>
                    <Syllabus data={coursedetails.data} />
                    <div>
                        <h4 className='mb-4'>Course Routine</h4>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border">
                                <thead>
                                    <tr>
                                        <th className="py-4 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Day</th>
                                        <th className="py-4 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Class Title</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {coursedetails.data.course_routine.map((routine, index) => (
                                        <tr key={index}>
                                            <td className="py-4 px-4 border-b border-gray-200">{routine.day}</td>
                                            <td className="py-4 px-4 border-b border-gray-200">{routine.class_title}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>
                        <h4 className='mb-4'>Course Mentors</h4>
                        <div className="flex flex-wrap -mx-3">
                            {coursedetails.data.course_mentor.map((mentor, index) => (
                                <div key={index} className="w-full md:w-1/2 xl:w-1/3 p-3">
                                    <div className="bg-white border rounded shadow-md p-4">
                                        <div className="flex items-center mb-4">
                                            {mentor.mentor_image ? (
                                                <img src={`http://api-saas.bacbonx.com/uploads/${mentor.mentor.image}`} alt={mentor.name} className="w-12 h-12 rounded-full mr-4" />
                                            ) : (
                                                <img src={`https://picsum.photos/200/300?random=${index}`} alt={mentor.name} className="w-12 h-12 rounded-full mr-4" />
                                            )}
                                            <h5 className="text-lg">{mentor.mentor.name}</h5>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <Icon icon="heroicons:academic-cap" className="mr-2" /> <span>{mentor.mentor.education ? mentor.mentor.education : '...'}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <Icon icon="uil:university" className="mr-2" /> <span>{mentor.mentor.institute ? mentor.mentor.institute : '...'}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-8">
                        <h4 className="mb-2">FAQs</h4>
                        {coursedetails.data.course_faq.map((faq, index) => (
                            <div className='mb-2'>
                                <Accordion
                                    key={index}
                                    title={faq.title}
                                    content={faq.answer}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="shadow-lg p-4 rounded-lg">
                    {coursedetails.data.course_feature.map((feature, index) => (
                        <React.Fragment key={index}>
                            <div className="flex items-center mb-2 pl-4">
                                <Icon icon="mdi:checkbox-marked-circle" className="mr-2" />
                                <p>{feature.title}</p>
                            </div>
                            <hr className="my-2 border-t border-gray-200 w-full" />
                        </React.Fragment>
                    ))}
                    <div className="mt-4 text-center">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-full">
                            {coursedetails.data.is_purchased ? 'Purchased' : 'Purchase'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseDetails