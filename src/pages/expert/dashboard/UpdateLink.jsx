import React , { useState } from 'react';
import { Icon } from "@iconify/react";
import useFetch from "@/hooks/useFetch";
import moment from 'moment';
import Loading from '../../../components/Loading';
import api from "@/server/api";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
const UpdateLink = () => {
  const { data: mentorLink, isLoading, isError } = useFetch({ queryKey: 'examList', endPoint: 'mentor-live-link' });

  const [loading, setLoading] = useState(false);
  if (isLoading) return <Loading/>;
  if (isError) return <div>Error fetching data</div>;

  const validationSchema = Yup.object().shape({
    live_link: Yup.string().required('Link is required'),
});

const onSubmit = async (values, { setSubmitting }) => {
  try {
      setLoading(true);
      const response = await api.post('update-link', values);
  } catch (error) {
      console.error(error);
  } finally {
      setSubmitting(false);
      setLoading(false);
  }
};
  return (
    

    <div className="overflow-x-auto">
         <Formik
                    initialValues={
                      {live_link: mentorLink?.data?.live_link}
                    }
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    <Form className="w-full">
                       

                        <div>
                            <label className="text-gray-800 text-[15px] mb-2 block">Live Link</label>
                            <Field name="live_link" type="text" required className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-blue-600" placeholder="Enter Zoom Link" />
                            <ErrorMessage name="live_link" component="div" />
                        </div>

            


                        <div className="mt-8">
                            <button type="submit" className={`w-full shadow-xl py-3 px-6 text-sm tracking-wide font-semibold rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none`} disabled={loading}>
                                {loading ? 'Updating...' : 'Update Link'}
                            </button>
                        </div>
                        
                    </Form>
                </Formik>

    </div>


  );
}

export default UpdateLink;    