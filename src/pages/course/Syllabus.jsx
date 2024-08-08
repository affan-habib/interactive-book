import React, { useState } from 'react'
import Accordion from "@/components/ui/Accordion";
import { Icon } from "@iconify/react";
import Modal from '../../components/ui/Modal';
import QuizModalContent from './QuizModalContent';
import VideoModalContent from './VideoModalContent';
import ScriptModalContent from './ScriptModalContent';

const Syllabus = ({ data }) => {
    const [showModal, setShowModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)

    const handleModalOpen = (item) => {
        setSelectedItem(item)
        setShowModal(true)
    }

    const handleModalClose = () => {
        setSelectedItem(null)
        setShowModal(false)
    }

    const renderModalContent = () => {
        if (selectedItem?.chapter_script_id) return <ScriptModalContent data={selectedItem} onClose={handleModalClose} />;
        if (selectedItem?.chapter_video_id) return <VideoModalContent data={selectedItem} onClose={handleModalClose} />;
        if (selectedItem?.chapter_quiz_id) return <QuizModalContent data={selectedItem} onClose={handleModalClose} />;
        return null;
    }

    return (
        <div>
            <div>
                <h4 className='mb-4'>Syllabus</h4>

                {
                    data.course_category.map((outline) => (
                        <Accordion
                            title={outline.name}
                            content={outline.course_outlines.map((content) => (
                                <div key={content.id} className={`p-4 mb-2 border-l-4 rounded ${content.chapter_script_id ? 'bg-blue-100 border-blue-500' : content.chapter_video_id ? 'bg-green-100 border-green-500' : content.chapter_quiz_id ? 'bg-red-100 border-red-500' : 'bg-gray-100 border-gray-500'} flex items-center justify-between`}>
                                    <div className='flex gap-2 items-center'>
                                        <Icon icon={content.chapter_script_id ? 'heroicons:document' : content.chapter_video_id ? 'heroicons:play' : content.chapter_quiz_id ? 'heroicons:question-mark-circle' : 'heroicons:user'} className="mr-2 w-6 h-6" />
                                        <p className='text-md'>{content.title}</p>
                                    </div>
                                    {data.is_purchased ? (
                                        content.chapter_script_id ? <button className="bg-blue-500 px-4 py-2 text-white rounded-full" onClick={() => handleModalOpen(content)}>Read</button> : content.chapter_video_id ? <button className="bg-green-500 px-4 py-2 text-white rounded-full" onClick={() => handleModalOpen(content)}>Watch</button> : content.chapter_quiz_id ? <button className="bg-red-500 px-4 py-2 text-white rounded-full" onClick={() => handleModalOpen(content)}>Start Quiz</button> : null
                                    ) : (
                                        content.chapter_script_id ? <button className="bg-blue-500 px-4 py-2 text-white rounded-full opacity-50 cursor-not-allowed" disabled>Read</button> : content.chapter_video_id ? <button className="bg-green-500 px-4 py-2 text-white rounded-full opacity-50 cursor-not-allowed" disabled>Watch</button> : content.chapter_quiz_id ? <button className="bg-red-500 px-4 py-2 text-white rounded-full opacity-50 cursor-not-allowed" disabled>Start Quiz</button> : null
                                    )}
                                </div>
                            ))}
                        />
                    ))
                }
            </div>
            {selectedItem && <Modal activeModal={showModal} onClose={handleModalClose} title={selectedItem.chapter_script_id || selectedItem.chapter_video_id ? selectedItem.title : ''} className={selectedItem.chapter_script_id || selectedItem.chapter_video_id ? 'w-[980px]' : 'max-w-xl'}>
                {renderModalContent()}
            </Modal>}
        </div>
    )
}

export default Syllabus 