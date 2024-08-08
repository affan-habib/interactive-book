import React, { useEffect, useState } from 'react';
import { Icon } from "@iconify/react";
import useFetch from '../../hooks/useFetch';
import Loading from '../../components/Loading';
import { useParams } from 'react-router-dom';

const ExamDetails = () => {
    const { id } = useParams();
    const { data, isLoading, isError } = useFetch({ queryKey: 'examDetails', endPoint: `student-quiz-result-details-by-id/${id}` });
    const [examDetails, setExamDetails] = useState(null);

    useEffect(() => {
        if (data) {
            setExamDetails(data.data.questions);
        }
    }, [data]);

    if (isLoading) return <Loading />;
    if (isError) return <div>Error fetching data</div>;

    return (
        <div className="container">
            <div className="exam-details">
                <h4 className="text-2xl font-semibold">Exam Details</h4>
                <div className="p-4 my-4 border">
                    <div className="flex gap-4 items-center">
                        <span className="font-semibold">Exam Title:</span>
                        <span>{data.data.title}</span>
                    </div>
                    <div className="flex gap-4 items-center">
                        <span className="font-semibold">Exam Date:</span>
                        <span>{data.data.created_at}</span>
                    </div>
                    <div className="flex gap-4 items-center">
                        <span className="font-semibold">Exam Time:</span>
                        <span>{data.data.duration} minutes</span>
                    </div>
                    <div className="flex gap-4 items-center">
                        <span className="font-semibold">Exam Mark:</span>
                        <span>{data.data.exam_mark}</span>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                {examDetails && examDetails.map((question, index) => (
                    <div key={index} className={`p-4 border-b border-gray-200 ${question.correct_answer1 === question.answer1 && question.correct_answer2 === question.answer2 && question.correct_answer3 === question.answer3 && question.correct_answer4 === question.answer4 ? 'bg-green-50' : 'bg-red-50'}`}>
                        <h3 className="text-lg font-semibold">{question.question_text}</h3>
                        <div className="mt-2">
                            <div style={{ color: question.correct_answer1 ? 'green' : 'black' }} className="flex items-center">
                                <input type="checkbox" checked={question.correct_answer1} disabled />
                                <p className="ml-2">{question.option1}</p>
                            </div>
                            <div style={{ color: question.correct_answer2 ? 'green' : 'black' }} className="flex items-center">
                                <input type="checkbox" checked={question.correct_answer2} disabled />
                                <p className="ml-2"> {question.option2}</p>
                            </div>
                            <div style={{ color: question.correct_answer3 ? 'green' : 'black' }} className="flex items-center">
                                <input type="checkbox" checked={question.correct_answer3} disabled />
                                <p className="ml-2"> {question.option3}</p>
                            </div>
                            <div style={{ color: question.correct_answer4 ? 'green' : 'black' }} className="flex items-center">
                                <input type="checkbox" checked={question.correct_answer4} disabled />
                                <p className="ml-2"> {question.option4}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ExamDetails;
