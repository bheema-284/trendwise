// src/pages/Login.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RootContext from '../config/rootcontext';
import { useContext } from 'react';
import { useEffect } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

const Login = () => {
    const { rootContext, setRootContext } = useContext(RootContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        mobile: "",
        email: "",
        password: "",
        remember: false,
    });

    const [isEmail, setIsemail] = useState({
        isErr: false,
        errVisible: false
    });
    const [showPassword, setShowPassword] = useState(false);
    function emailregex() {
        const regex = /^[\w-.]+@[\w.]+/gm;
        return regex;
    }

    const handleChange = (e, field) => {
        const updatedformData = { ...formData };
        if (field === "email") {
            if (updatedformData.email !== "" && emailregex().test(e.target.value)) {
                setIsemail({
                    isErr: true,
                    errVisible: false
                });
            } else {
                setIsemail({
                    isErr: false,
                    errVisible: true
                });
            }
        } else if (field === "mobile") {
            updatedformData[field] = e.target.value;
        } else if (field === "password") {
            updatedformData[field] = e.target.value;
        } else if (field === "remember") {
            updatedformData[field] = e;
        }
        setFormData(updatedformData);
    };
    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:10000/auth/google'; // Change to deployed URL in production
    };

    const onSave = (e) => {
        e.preventDefault(); // Prevent page refresh
        // Email and password correct
        const username = formData.name || formData.email.split("@")[0];

        const resp = {
            ...rootContext,
            authenticated: true,
            loader: false,
            user: {
                name: username,
                email: formData.email,
                mobile: formData?.mobile || 9000013354,
                password: formData?.password,
                token: formData?.token || "",
            },
            remember: formData?.remember || false,
        };

        setRootContext({
            ...resp,
            toast: {
                show: true,
                dismiss: true,
                type: "success",
                title: "Login Successful",
                message: "Welcome back!",
            },
        });
        localStorage.setItem("user_details", JSON.stringify(resp.user));
        // Optional: Navigate to dashboard
        navigate("/admin");
    };


    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const token = query.get("token");
        const name = query.get("name");
        const email = query.get("email");

        // The backend does NOT send 'mobile', 'password', or other details directly in the URL query
        // These would typically come from the user object *inside* the JWT if needed,
        // or fetched from an API after authentication.

        if (token && name && email) {
            try {
                // Here you would typically *decode* the JWT token to verify it
                // and extract any additional user details stored within the token's payload.
                // For a simple demonstration, we'll just use the name/email from query params.
                // In a real app, you'd use a library like 'jwt-decode' (on the client-side).

                // Example of JWT decoding (install 'jwt-decode'):
                // import { jwtDecode } from 'jwt-decode';
                // const decodedToken = jwtDecode(token);
                // console.log("Decoded Token Payload:", decodedToken);
                // const userIdFromToken = decodedToken.user._id; // Access user details from payload

                const userDetails = {
                    name: name,
                    email: email,
                    // If you need mobile or password, they *should not* be in the URL.
                    // They would either be in the JWT payload (if mobile is a public detail)
                    // or require a subsequent API call to fetch private user profile data.
                    // For now, setting them to null/undefined as they aren't in the URL.
                    mobile: null, // Not provided in current backend redirect
                    password: null, // Definitely not provided
                    token: token,
                    // You might want to store other details from the token payload here
                    // e.g., _id: decodedToken.user._id
                };

                console.log("Extracted User Details:", userDetails);
                console.log("Token:", token);

                const resp = {
                    ...rootContext, // Maintain existing context properties
                    authenticated: true,
                    loader: false, // Assuming you had a loader state
                    user: userDetails, // Set the extracted user details
                    remember: formData?.remember || false, // Use optional chaining for formData
                };

                setRootContext({
                    ...resp,
                    toast: {
                        show: true,
                        dismiss: true,
                        type: "success",
                        title: "Login Successful",
                        message: `Welcome back, ${name}!`, // Personalized message
                    },
                });

                localStorage.setItem("user_details", JSON.stringify(resp.user));
                localStorage.setItem("auth_token", token); // It's good practice to store the token separately

                navigate("/admin"); // Or wherever you want to go after login
            } catch (err) {
                console.error("Failed to process authentication details:", err);
                // Optionally redirect to an error page or show a toast
                setRootContext(prev => ({
                    ...prev,
                    loader: false,
                    toast: {
                        show: true,
                        dismiss: true,
                        type: "error",
                        title: "Authentication Error",
                        message: "Could not process login details.",
                    },
                }));
            }
        } else {
            // Handle cases where token, name, or email are missing from the URL
            // This might happen if the Google authentication itself failed or if
            // someone directly navigated to /auth/success without proper params.
            console.warn("Authentication details (token, name, or email) missing from URL.");
            // Optionally, redirect to login page or show an error
            // navigate("/login");
        }
    }, [location.search, navigate, setRootContext]); // Add all dependencies


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-xl shadow">
                <h2 className="text-center text-2xl font-bold text-gray-900">
                    Sign in to your account
                </h2>

                <form className="mt-8 space-y-6" onSubmit={onSave}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div className={"w-full"}>
                            <div className={`relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 ${"focus-within:ring-purple-600 focus-within:border-purple-600"} bg-white `}>
                                <label htmlFor="name" className={`label capitalize text-gray-500`}>
                                    {'Email'}
                                    {"*"}
                                </label>
                                <input
                                    title={"Your Email"}
                                    type={"text"}
                                    placeholder={"Enter Email"}
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    onBlur={(e) => handleChange(e, "email")}
                                    required={true}
                                />
                            </div>

                            {isEmail.errVisible && (
                                <p className={`text-red-600 mt-2 text-sm`} id="email-error">
                                    {"Enter Valid Email"}
                                </p>
                            )}
                        </div>

                        <div className="relative">
                            <div className={`relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 ${"focus-within:ring-purple-600 focus-within:border-purple-600"} bg-white `}>
                                <label htmlFor="name" className={`label capitalize text-gray-500`}>
                                    {'Password'}
                                    {"*"}
                                </label>
                                <input
                                    title={"Password"}
                                    type={showPassword ? "text" : "password"}
                                    placeholder={"Enter Password"}
                                    value={formData.password}
                                    onChange={(e) => handleChange(e, "password")}
                                    required={true}
                                />
                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                                >
                                    {showPassword ? (
                                        <EyeIcon className="w-4 h-4 text-gray-400" />
                                    ) : (
                                        <EyeSlashIcon className="w-4 h-4 text-gray-400" />
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <div className="mt-6">
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full inline-flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        <img
                            className="h-5 w-5 mr-2"
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="Google logo"
                        />
                        Sign in with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
