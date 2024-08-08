import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch';
import Loading from '../../components/Loading';
import WrittenExamForm from './WrittenExamForm';

const WrittenExam = () => {
    const { quizId, resultId, courseId } = useParams()
    const { data: quizdetails, isLoading, isError } = useFetch({
        queryKey: `quizdetails`, endPoint: `quiz-details/${quizId}`, params: {
            item_id: quizId,
            item_type: "Course"
        }
    });
    return (
        <div className='container'>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="p-4 bg-white shadow rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Quiz Details</h2>
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-gray-700">Question Attachment:</p>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                            View Attachment
                        </button>
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
                </div>
            )}
            <WrittenExamForm resultId={resultId} chapterQuizId={quizId} courseId={courseId} />
        </div>
    )
}

export default WrittenExam