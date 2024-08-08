import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { CLMS_URL } from "@/config";

const initialUsers = () => {
    const item = window.localStorage.getItem("users");
    return item ? JSON.parse(item) : [];
};
// save users in local storage

const initialIsAuth = () => {
    const item = window.localStorage.getItem("isAuth");
    return item ? JSON.parse(item) : false;
};

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        users: initialUsers(),
        isAuth: initialIsAuth(),
    },
    reducers: {
        handleRegister: (state, action) => {
            const { name, email, password } = action.payload;
            const user = state.users.find((user) => user.email === email);
            if (user) {
                toast.error("User already exists", {
                    position: "top-right",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                state.users.push({
                    name,
                    email,
                    password,
                });
                window.localStorage.setItem(
                    "users",
                    JSON.stringify(state.users)
                );
                toast.success("User registered successfully", {
                    position: "top-right",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        },

        handleLogin: (state, action) => {
            state.isAuth = true;
            const data = action.payload.data;
            const _token = data.token;
            // save in local storage
            window.localStorage.setItem("isAuth", JSON.stringify(state.isAuth));
            window.localStorage.setItem("token", JSON.stringify(_token));
            window.localStorage.setItem("id", JSON.stringify(data.id));
            window.localStorage.setItem("name", JSON.stringify(data.name));
            window.localStorage.setItem("email", JSON.stringify(data.email));
            window.localStorage.setItem("username", JSON.stringify(data.username));
            window.localStorage.setItem("interests", JSON.stringify(data.interests));
            window.localStorage.setItem("user_type", JSON.stringify(data.user_type));
            window.localStorage.setItem("image", JSON.stringify(data.image));
            window.localStorage.setItem("address", JSON.stringify(data.address));
            window.localStorage.setItem("contact_no", JSON.stringify(data.contact_no));

        },
        handleLogout: (state, action) => {
            state.isAuth = action.payload;
            // remove isAuth from local storage
            window.localStorage.removeItem("isAuth");
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("id");
            window.localStorage.removeItem("name");
            window.localStorage.removeItem("email");
            window.localStorage.removeItem("username");
            window.localStorage.removeItem("interests");
            window.localStorage.removeItem("user_type");
            window.localStorage.removeItem("image");
            window.localStorage.removeItem("address");
            window.localStorage.removeItem("contact_no");
            window.localStorage.removeItem("updated_at");
            toast.success("User logged out successfully", {
                position: "top-right",
                autoClose: 700,
            });
            // window.location.href=CLMS_URL+"?logout=true";
        },
    },
});

export const { handleRegister, handleLogin, handleLogout } = authSlice.actions;
export default authSlice.reducer;
