import React, { useState } from "react";
import TextInput from "@/components/ui/TextInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Checkbox from "@/components/ui/Checkbox";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { handleLogin } from "./store";
import Button from "@/components/ui/Button";
import api from "@/server/api";
import { useTranslation } from "react-i18next";

const schema = yup
    .object({
        username: yup.string().required("Username is Required"),
        password: yup.string().required("Password is Required"),
    })
    .required();

const LoginForm = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schema),
        mode: "all",
    });

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        data.remember_me = checked;

        setLoading(true);
        await api
            .post(`/login`, data)
            .then((response) => {
                if (response.status === 200) {
                    dispatch(handleLogin(response.data.data));
                    setTimeout(() => {
                        navigate("/dashboard");
                        setLoading(false);
                    }, 500);
                } else {
                    setLoading(false);
                }
            })
            .catch((error) => {
                setLoading(false);
            });
    };

    const [checked, setChecked] = useState(false);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <TextInput
                name="username"
                defaultValue={"admin"}
                type="text"
                register={register}
                error={errors.email}
            />
            <TextInput
                name="password"
                type="password"
                defaultValue={"admin"}
                register={register}
                error={errors.password}
            />
            <div className="flex justify-between">
                <Checkbox
                    name="remember_me"
                    value={checked}
                    onChange={() => setChecked(!checked)}
                    label={t("remember")}
                    txtColor="text-slate-100"
                    activeClass="bg-[#00654E]"
                />
                <Link
                    to="/forgot-password"
                    className="text-sm text-slate-100 dark:text-slate-400 leading-6"
                >
                    {t("forgot.password")}
                </Link>
            </div>

            <Button
                text="Sign in"
                className="btn bg-slate-200 btn-block shadow-md"
                type="submit"
                isLoading={loading}
            />
        </form>
    );
};

export default LoginForm;
