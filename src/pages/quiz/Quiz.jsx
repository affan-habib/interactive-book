import React from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../../components/Loading';
import useFetch from '../../hooks/useFetch';
import QuizForm from './QuizForm';
import Timer from './Timer';

const Quiz = () => {
    const { courseId, quizId } = useParams()
    const { data: quizdetails, isLoading, isError } = useFetch({
        queryKey: `quizdetails`, endPoint: `quiz-details/${quizId}`, params: {

            item_id: courseId,
            item_type: "Course"
        }
    });
    if (isLoading) return <Loading />;
    if (isError) return <div>Error fetching data</div>;
    return (
        <div className='relative '>
            <div className='container'>
                <div className='flex items-center justify-between bg-white container'>
                    <h4>{quizdetails.data.title}</h4>
                    <Timer />
                </div>
                <div className="mt-4">
                    <table className="min-w-full divide-y divide-gray-200 border">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Duration
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Positive Mark
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Negative Mark
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total Mark
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Number of Questions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        {quizdetails.data.duration}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        {quizdetails.data.positive_mark}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        {quizdetails.data.negative_mark}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        {quizdetails.data.total_mark}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        {quizdetails.data.number_of_question}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='pt-6'>

                    <QuizForm data={quizdetails.data} courseId={courseId} />
                </div>
            </div>
        </div>
    )
}

export default Quiz