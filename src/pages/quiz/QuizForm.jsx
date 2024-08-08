import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Icon } from "@iconify/react";
import { useNavigate, useParams } from 'react-router-dom';
import api from '@/server/api';
import Modal from '@/components/ui/Modal';

const QuizForm = ({ data, courseId }) => {
    const navigate = useNavigate();
    const { resultId } = useParams();
    const [showWrittenExamModal, setShowWrittenExamModal] = useState(false);
    const formik = useFormik({
        initialValues: {
            chapter_quiz_id: data.id,
            result_id: resultId,
            answers: data.questions.map(question => ({
                question_id: question.id,
                question_text: question.question_text,
                option1: question.option1,
                option2: question.option2,
                option3: question.option3,
                option4: question.option4,
                answer1: false,
                answer2: false,
                answer3: false,
                answer4: false
            }))
        },
        onSubmit: values => {

            api.post(`submit-quiz`, values).then(() => {
                if (data.written_question) {
                    setShowWrittenExamModal(true);
                } else {
                    navigate(`/course-details/${courseId}`);
                }
            });
        },
    });

    useEffect(() => {
        const timeout = setTimeout(() => {
            formik.handleSubmit();
        }, data.duration * 60000); // Convert minutes to milliseconds
        return () => clearTimeout(timeout);
    }, [data.duration]);

    return (
        <div>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
                {formik.values.answers.map((answer, index) => (
                    <div key={index} className="p-4 border rounded-md shadow-sm">
                        <h5 className="mb-4">{index + 1}: {answer.question_text}</h5>
                        <div className="flex flex-wrap justify-between">
                            {[1, 2, 3, 4].map((opt, idx) => (
                                <div key={idx} className="flex flex-col space-y-2 w-1/2 p-2">
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            name={`answers[${index}].answer${opt}`}
                                            value={formik.values.answers[index][`answer${opt}`]}
                                            checked={formik.values.answers[index][`answer${opt}`]}
                                            onChange={() => {
                                                const newAnswers = formik.values.answers.map((ans, idx) => {
                                                    if (idx === index) {
                                                        return {
                                                            ...ans,
                                                            [`answer${opt}`]: !ans[`answer${opt}`],
                                                        };
                                                    }
                                                    return ans;
                                                });
                                                formik.setFieldValue('answers', newAnswers);
                                            }}
                                            className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                                        />
                                        <span>{answer[`option${opt}`]}</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                {!data.written_question ? (
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
                        Submit
                    </button>
                ) : (
                    <button onClick={() => setShowWrittenExamModal(true)} className="px-4 py-2 bg-blue-500 text-white rounded-md">
                        Submit and Start Written Exam
                    </button>
                )}
            </form>
            {showWrittenExamModal && (
                <Modal activeModal={showWrittenExamModal} onClose={() => setShowWrittenExamModal(false)}>
                    <div>
                        <h4 className="text-lg mb-4">Do you want to start written exam? The MCQ Answer will be submitted autometically before start!</h4>
                        <button onClick={() => navigate(`/quiz/written-exam/${resultId}/${data.id}/${courseId}`)} className="px-4 py-2 bg-blue-500 text-white rounded-md mr-4">Start Written Exam </button>
                        <button onClick={() => setShowWrittenExamModal(false)} className="px-4 py-2 bg-red-500 text-white rounded-md">No</button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default QuizForm;
