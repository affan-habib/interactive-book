import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '@/components/form/InputField';
import InputSelect from '@/components/form/InputSelect';
import DateTimePicker from '../../../components/form/DateTimePicker';
import useFetch from "@/hooks/useFetch";

const CreateAssignment = () => {
    const initialValues = {
        title: '',
        description: '',
        subject: '',
        course: '',
        class: '',
        chapter: '',
        deadline: '',
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        subject: Yup.string().required('Subject is required'),
        course: Yup.string().required('Course is required'),
        class: Yup.string().required('Class is required'),
        chapter: Yup.string().required('Chapter is required'),
        deadline: Yup.date().required('Deadline is required').min(new Date(), 'Deadline must be in the future'),
    });

    const handleSubmit = (values, { setSubmitting }) => {
        // Handle form submission here
        console.log(values);
        setSubmitting(false);
    };

    const { data: courseList } = useFetch({ queryKey: 'mentorCourseList', endPoint: 'mentor-course-list' });
    const { data: classList } = useFetch({ queryKey: 'mentorClassList', endPoint: 'mentor-class-list' });
    const { data: subjectList } = useFetch({ queryKey: 'mentorSubjectList', endPoint: 'mentor-subject-list' });

    const courseOptions = courseList?.data?.map(course => ({
        value: course.id.toString(),
        label: course.title
    })) || [];

    return (
        <div className="w-full p-6 bg-white rounded-lg shadow-md">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, values }) => (
                    <Form>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField
                                label="Title"
                                name="title"
                                type="text"
                                required
                            />
                            <DateTimePicker
                                label="Deadline"
                                name="deadline"
                                required
                            />
                            <div className="md:col-span-2">
                                <InputField
                                    label="Description"
                                    name="description"
                                    isTextArea
                                    rows={5}
                                    required
                                />
                            </div>
                            <InputSelect
                                label="Subject"
                                name="subject"
                                options={subjectList?.data?.map(subject => ({
                                    value: subject.id.toString(),
                                    label: subject.name
                                })) || []}
                                required
                            />
                            <InputSelect
                                label="Course"
                                name="course"
                                options={courseOptions}
                                required
                            />
                            <InputSelect
                                label="Class"
                                name="class"
                                options={classList?.data?.map(classItem => ({
                                    value: classItem.id.toString(),
                                    label: classItem.name
                                })) || []}
                                required
                            />
                            <InputSelect
                                label="Chapter"
                                name="chapter"
                                options={[]} // You might need to fetch chapters based on the selected course
                                required
                            />
                        </div>
                        <div className="mt-6">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Create Assignment
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CreateAssignment;
