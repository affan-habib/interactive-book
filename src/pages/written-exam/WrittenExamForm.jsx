import React from 'react'
import { Formik, FieldArray, Form } from 'formik';
import { Icon } from "@iconify/react";
import api from '@/server/api';
import { useNavigate } from 'react-router-dom';

const WrittenExamForm = ({ resultId, chapterQuizId, courseId }) => {
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{
        files: [null],
      }}
      onSubmit={(values) => {
        const formData = new FormData();
        formData.append("data", JSON.stringify({
          result_id: resultId,
          chapter_quiz_id: chapterQuizId,
          attach_count: values.files.filter(file => file).length
        }));
        values.files.forEach((file, index) => {
          if (file) formData.append(`attachment_file[${index}][attachment_${index}]`, file);
        });
        api.post('submit-written-answer', formData).then((response) => {
          navigate(`/course-details/${courseId}`);
        });
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className="space-y-4 my-4">
          <FieldArray
            name="files"
            render={(arrayHelpers) => (
              <div>
                {values.files && values.files.map((file, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <input
                      id={`file-${index}`}
                      name={`files.${index}`}
                      type="file"
                      onChange={(event) => {
                        setFieldValue(`files.${index}`, event.currentTarget.files[0]);
                      }}
                      className="file:mr-4 file:py-2 file:px-4
                                 file:rounded-full file:border-0
                                 file:text-sm file:font-semibold
                                 file:bg-violet-50 file:text-violet-700
                                 hover:file:bg-violet-100 mb-4"
                    />
                    <button
                      type="button"
                      onClick={() => arrayHelpers.remove(index)}
                      className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => arrayHelpers.push(null)}
                  className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mt-4"
                >
                  Add More
                </button>
              </div>
            )}
          />
          <button type="submit" className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default WrittenExamForm