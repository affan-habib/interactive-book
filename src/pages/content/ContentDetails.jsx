    import React from 'react'
import Loading from '../../components/Loading';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { Icon } from "@iconify/react";

const ContentDetails = () => {

    const { id } = useParams()
    const navigate = useNavigate();
    const { data: contentDetails, isLoading, isError } = useFetch({ queryKey: `content-details`, endPoint: `content-details/${id}` });
    if (isLoading) return <Loading />;
    if (isError) return <div>Error fetching data</div>;
    return (
        <div className=" py-4">
            <div className="container mx-auto px-4">
                <h4 className="mb-4">Content Details</h4>
                <div className="mb-8 bg-gradient-to-r from-blue-500 to-blue-900 p-4 rounded">
                    <h3 className="text-3xl font-semibold mb-4 text-white">{contentDetails.data.title}</h3>
                    <p className="text-sm text-white">{contentDetails.data.description}</p>
                </div>
                <h4 className='mb-4'>Subject list</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {contentDetails.data.subjects.map((subject) => (
                        <div key={subject.id} className="border p-4 rounded-lg shadow bg-white cursor-pointer" onClick={() => navigate(`/content-subject-details/${subject.id}`)}>
                            <Icon icon="heroicons:book-open" className="w-6 h-6 text-gray-500" />
                            <h3 className="text-lg font-semibold">{subject.subject_name}</h3>
                            <p className="text-sm text-gray-600">{subject.class_name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ContentDetails