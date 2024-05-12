{/*import React, { useState } from "react"; DO NOT NEED THIS COMPONENT. SEE REGISTER.jsx!!!!
import supabase from "../../config/supabaseClient";

function LogIn() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const LogInUser = async (e) => {
        e.preventDefault();

    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return(
        <div className="w-full h-[50vh] flex justify-center items-center">
            <form onSubmit={LogInUser} className="w-[10rem] flex flex-col bg bg-red">
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border-2 border-red"
                />

                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="border-2 border-red"
                />

                <button
                    type="submit"
                    className="border-2 border-red-400"
                >
                    LogIn
                </button>
            </form>
        </div>
    );
} 

export default LogIn;*/}