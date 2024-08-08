import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../../components/Loading';
import useFetch from '../../hooks/useFetch';
import Syllabus from './Syllabus';

const ContentSubjectDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate();
    const { data, isLoading, isError } = useFetch({ queryKey: `content-outline`, endPoint: `content-outline-details/${id}` });
    if (isLoading) return <Loading />;
    if (isError) return <div>Error fetching data</div>;
    return (
        <div className='container grid grid-cols-3'>
            <div className='col-span-2'>

                <Syllabus data={data.data} />
                <div className="mt-8">
                    <h4 className="mb-2">FAQs</h4>
                    {/* {data.data.content_faq.map((faq, index) => (
                        <div className='mb-2'>
                            <Accordion
                                key={index}
                                title={faq.title}
                                content={faq.answer}
                            />
                        </div>
                    ))} */}
                </div>
            </div>
            <div className='col-span-1'>
            </div>
        </div>
    )
}

export default ContentSubjectDetails