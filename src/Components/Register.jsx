import React, {useEffect} from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ThemeToggle from "./ThemeToggle.jsx";

const Register = () => {
    const location = useLocation();
    const prefillEmail = location.state?.email;

    useEffect(() => {console.log(prefillEmail)},[])
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },

    } = useForm({
        defaultValues: {
            username: "",
            password: "",
            email: prefillEmail ,
        },
    });

    const onSubmit = async (data) => {
        try {
            const token = localStorage.getItem("token");
            console.log(token);
            console.log(data);
            const response = await axios.post(
                "http://localhost:8080/auth/user/register",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        // Accept: "application/json" // Explicitly request JSON
                    },
                    // Critical: Prevent axios from following redirects
                    // maxRedirects: 0,
                    // validateStatus: (status) => status === 200 // Only 200 is valid
                }
            );
            if(response.status === 208){
                toast("already present user")
            }
            else toast.success("User registered successfully.");
        } catch (error) {
            if (error.response?.status === 401) {
                // Token is invalid/expired - initiate OAuth flow
                window.location.href = "http://localhost:8080/oauth2/authorization/google";
                console.log(error.response.data);
            } else {
                toast.error(error.response?.data?.message || "Registration failed.");
            }
        }
    };
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border dark:border-gray-700">
                <section className="flex justify-end mb-4">
                    <ThemeToggle />
                </section>

                <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-6 text-center">
                    Register
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            {...register("username", { required: "Username is required" })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 bg-white text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-600"
                        />
                        {errors.username && (
                            <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
                        )}
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            {...register("password", { required: "Password is required" })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 bg-white text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-600"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            {...register("email", { required: "Email is required" })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 bg-white text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-600"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200 disabled:opacity-60"
                    >
                        {isSubmitting ? "Registering..." : "Register"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
