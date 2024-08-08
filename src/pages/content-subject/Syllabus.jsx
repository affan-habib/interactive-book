import React, { useState } from 'react'
import Accordion from "@/components/ui/Accordion";
import { Icon } from "@iconify/react";
import ScriptModalContent from './ScriptModalContent';
import VideoModalContent from './VideoModalContent';
import QuizModalContent from './QuizModalContent';
import Modal from '../../components/ui/Modal';

const Syllabus = ({ data }) => {
    const [showModal, setShowModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const [selectedItemType, setSelectedItemType] = useState(null)

    const handleModalOpen = (item, type) => {
        setSelectedItem(item)
        setSelectedItemType(type)
        setShowModal(true)
    }

    const handleModalClose = () => {
        setSelectedItem(null)
        setSelectedItemType(null)
        setShowModal(false)
    }

    const renderModalContent = () => {
        if (selectedItemType === 'script') return <ScriptModalContent data={selectedItem} onClose={handleModalClose} />;
        if (selectedItemType === 'video') return <VideoModalContent data={selectedItem} onClose={handleModalClose} />;
        if (selectedItemType === 'quiz') return <QuizModalContent data={selectedItem} onClose={handleModalClose} />;
        return null;
    }

    return (
        <div>
            <div>
                <h4 className='mb-4'>Syllabus</h4>

                <div className='flex flex-col gap-4'>
                    {
                        data.content_outlines.map((outline) => (
                            <Accordion
                                title={outline.name}
                                content={
                                    <>
                                        {outline.videos.length > 0 || outline.scripts.length > 0 || outline.quiz.length > 0 ? (
                                            <>
                                                {outline.videos.map((content) => (
                                                    <div key={content.id} className="p-4 mb-2 border-l-4 rounded bg-green-100 border-green-500 flex items-center justify-between">
                                                        <div className='flex gap-2 items-center'>
                                                            <Icon icon="heroicons:play" className="mr-2 w-6 h-6" />
                                                            <p className='text-md'>{content.title}</p>
                                                        </div>
                                                        <button className="bg-green-500 px-4 py-2 text-white rounded-full" onClick={() => handleModalOpen(content, 'video')}>Watch</button>
                                                    </div>
                                                ))}
                                                {outline.scripts.map((script) => (
                                                    <div key={script.id} className="p-4 mb-2 border-l-4 rounded bg-blue-100 border-blue-500 flex items-center justify-between">
                                                        <div className='flex gap-2 items-center'>
                                                            <Icon icon="heroicons:document" className="mr-2 w-6 h-6" />
                                                            <p className='text-md'>{script.title}</p>
                                                        </div>
                                                        <button className="bg-blue-500 px-4 py-2 text-white rounded-full" onClick={() => handleModalOpen(script, 'script')}>Read</button>
                                                    </div>
                                                ))}
                                                {outline.quiz.map((quiz) => (
                                                    <div key={quiz.id} className="p-4 mb-2 border-l-4 rounded bg-red-100 border-red-500 flex items-center justify-between">
                                                        <div className='flex gap-2 items-center'>
                                                            <Icon icon="heroicons:question-mark-circle" className="mr-2 w-6 h-6" />
                                                            <p className='text-md'>{quiz.title}</p>
                                                        </div>
                                                        <button className="bg-red-500 px-4 py-2 text-white rounded-full" onClick={() => handleModalOpen(quiz, 'quiz')}>Start Quiz</button>
                                                    </div>
                                                ))}
                                            </>
                                        ) : (
                                            <p>No content found.</p>
                                        )}
                                    </>
                                }
                            />
                        ))
                    }
                </div>
            </div>
            {selectedItem && <Modal activeModal={showModal} onClose={handleModalClose} title={selectedItem.title} className={selectedItemType === 'video' || selectedItemType === 'script' ? 'w-[1000px]' : 'max-w-xl'}>
                {renderModalContent()}
            </Modal>}
        </div>
    )
}

export default Syllabus 