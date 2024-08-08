import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Icon } from "@iconify/react";
import api from "@/server/api";
import { handleLogin } from "@/pages/auth/common/store";
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const initialValues = {
        username: 'kayw',
        password: '123456'
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    });
    const { isAuth } = useSelector((state) => state.auth);
    const token = localStorage.getItem("_token");
    useEffect(() => {
        if (isAuth) {
            const from = location.state?.from?.pathname || '/';
            navigate(from, { replace: true });
        }
    }, [isAuth, navigate]);
    const location = useLocation();
    const onSubmit = async (values, { setSubmitting }) => {
        try {
            setLoading(true);
            const response = await api.post('https://backend-saas.bacbonx.com/api/auth/login', values);
            dispatch(handleLogin(response.data));
            window.location.reload();

        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
            setLoading(false);
        }
    };

    return (
        <div class="max-w-7xl mx-auto h-screen">
            <div class="grid md:grid-cols-2 items-center gap-8 h-full">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    <Form class="max-w-lg max-md:mx-auto w-full p-6">
                        <div class="mb-12">
                            <h3 class="text-gray-800 text-4xl font-extrabold">Sign in</h3>
                            <p class="text-gray-800 text-sm mt-6">Immerse yourself in a hassle-free login journey with our intuitively designed login form. Effortlessly access your account.</p>
                        </div>

                        <div>
                            <label class="text-gray-800 text-[15px] mb-2 block">Username</label>
                            <Field name="username" type="text" required class="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-blue-600" placeholder="Enter username" />
                            <ErrorMessage name="username" component="div" />
                            <Icon icon="akar-icons:user" />
                        </div>

                        <div class="mt-4">
                            <label class="text-gray-800 text-[15px] mb-2 block">Password</label>
                            <Field name="password" type="password" required class="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-blue-600" placeholder="Enter password" />
                            <ErrorMessage name="password" component="div" />
                            <Icon icon="akar-icons:lock" />
                        </div>

                        <div class="flex flex-wrap items-center gap-4 justify-between mt-4">
                            <div class="flex items-center">
                                <Field id="remember-me" name="remember-me" type="checkbox" class="shrink-0 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-md" />
                                <label for="remember-me" class="ml-3 block text-sm text-gray-800">
                                    Remember me
                                </label>
                            </div>
                            <div class="text-sm">
                                <a href="javascript:void(0);" class="text-blue-600 font-semibold hover:underline">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <div class="mt-8">
                            <button type="submit" class={`w-full shadow-xl py-3 px-6 text-sm tracking-wide font-semibold rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none`} disabled={loading}>
                                {loading ? 'Loading...' : 'Log in'}
                            </button>
                        </div>
                        <p class="text-sm mt-8 text-center text-gray-800">Don't have an account? <a href="javascript:void(0);" class="text-blue-600 font-semibold tracking-wide hover:underline ml-1">Register here</a></p>
                    </Form>
                </Formik>

                <div class="h-full md:py-6 flex items-center relative max-md:before:hidden before:absolute before:bg-gradient-to-r before:from-gray-50 before:via-blue-300 before:to-blue-300 before:h-full before:w-3/4 before:right-0 before:z-0">
                    <img src="https://readymadeui.com/photo.webp" class="rounded-md lg:w-4/5 md:w-11/12 z-50 relative" alt="Dining Experience" />
                </div>
            </div>
        </div>
    )
}

export default Login