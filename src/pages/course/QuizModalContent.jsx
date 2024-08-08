import React, { useState } from 'react'
import { Icon } from "@iconify/react";
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import api from '../../server/api';

const QuizModalContent = ({ data, onClose }) => {
    const navigate = useNavigate();
    
    const { id } = useParams()
    const handleStartQuiz = () => {
        api.post('start-quiz', { course_id: 1, chapter_quiz_id: 1 })
            .then(response => {
                if (response.data.status) {
                    navigate(`/quiz/${data.chapter_quiz_id}/${id}/${response.data.data.id}`);
                }
            })
            .catch(error => {
                console.error('Failed to start quiz:', error);
            });
        navigate(`/quiz/${data.chapter_quiz_id}/${id}/${data.id}`);
    };
    const { data: quizdetails, isLoading, isError } = useFetch({ queryKey: `quizStart`, endPoint: `quiz-start-details/${data.chapter_quiz_id}` });

    return (
        <div>
            {isLoading ? (
                <div className="flex flex-col items-center justify-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-purple-500"></div>
                    <p>Loading...</p>
                </div>
            ) : (
                <>
                    <h2 className="text-lg font-semibold mb-2">{quizdetails?.data?.title}</h2>
                    <p className="mb-2">Time: 5 Minutes</p>
                    <p className="mb-2">No. Of Questions: {quizdetails?.data?.number_of_question}</p>
                    <p>Total Marks: {quizdetails?.data?.total_mark}</p>
                    <div className="flex justify-between mt-4">
                        <button className="bg-blue-500 px-4 py-2 text-white rounded-full" onClick={handleStartQuiz}>Start Quiz</button>
                        <button className="bg-red-500 px-4 py-2 text-white rounded-full" onClick={onClose}>Close</button>
                    </div>
                </>
            )}
        </div>
    )
}

export default QuizModalContent