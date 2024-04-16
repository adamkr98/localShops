import React, { useState, useEffect } from "react";
import supabase from "../../config/supabaseClient";
import backgroundImg from "/andrea-de-santis-HTzW5--Rt6c-unsplash.jpg";

function Register() {

    const [isLoginBtnAct, setLoginBtnAct] = useState(false);

    const [formData, setFormData] = useState({
        newEmail: '',
        newPassword: '',
    });

    const signupUser = async (e) => {
        e.preventDefault(); 
        try {
            let { data, error } = await supabase.auth.signUp({
                email: formData.newEmail,
                password: formData.newPassword,
            });
        
            if (error) {
                alert("Error sigUp:", error.message);
            } else {
                console.log("User signedUp successfully:", data);
                alert("Signed Up!");
            }
        } catch (error) {
            console.error("Error signing Up:", error.message);
        }
    };

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            let { data, error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            });

            if (error) {
                alert("Error sigUp:", error.message);
            } else {
                console.log("User signedUp successfully:", data);
                alert("Signed Up!");
            }
  
        } catch (error) {
            console.error("Error log in:", error.message);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        setFormData({
            email: '',
            password: '',
        });
    }, [isLoginBtnAct]); 

    return(
            <div className="w-full h-[40vh] md:w-full md:h-[100vh] md:flex md:flex-row border">
                    
                        <img src={backgroundImg} alt="" className="w-full h-[40vh] object-cover relative md:w-1/2 md:h-full" />
                        <p className="text-xs absolute bottom-0 left-0 p-2">Photo de <a href="https://unsplash.com/fr/@santesson89?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Andrea De Santis</a> sur <a href="https://unsplash.com/fr/photos/un-tas-de-fruits-et-legumes-assis-les-uns-a-cote-des-autres-HTzW5--Rt6c?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
                        </p>
                       
                
                <div className="w-full top-[40vh] left-0 md:w-1/2">
                    

                    {isLoginBtnAct ? (
                        <>
                            <div className="md:w-full md:flex md:flex-row md:justify-end">
                            <button onClick={() => setLoginBtnAct(false)} className="md:w-fit md:p-2 md:bg-[#154535] md:mt-2 md:mr-2 md:text-white">Register</button>
                            </div>
                            <form onSubmit={loginUser} className="w-full flex flex-col items-center md:mt-[50vh]">
                            <label htmlFor="newEmail" className="w-fit">Email</label>
                            <input
                                id="email"
                                type="text"
                                name="email"
                                placeholder=" Your email goes here.."
                                value={formData.email}
                                onChange={handleInputChange}
                                className="border-2 border-red rounded-md w-[20rem] h-[2rem] mb-2"
                            />

                            <label htmlFor="newPassword" className="w-fit">Password</label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                placeholder=" Your password.."
                                value={formData.password}
                                onChange={handleInputChange}
                                className="border-2 border-red rounded-md w-[20rem] h-[2rem] mb-2"
                            />

                            <button
                                type="submit"
                                className="bg bg-[#154535] rounded-md w-[6rem] pt-1 pb-1 text-white"
                            >
                                LogIn
                            </button>
                            </form>
                        </>
                    ):(
                        <>
                            <div className="md:w-full md:flex md:flex-row md:justify-end">
                            <button onClick={() => setLoginBtnAct(true)} className="md:w-fit md:p-2 md:bg-[#154535] md:mt-2 md:mr-2 md:text-white">Login</button>
                            </div>
                            <div className="md:w-fit md:mt-[10rem] md:ml-[5rem]">
                                <p className="md:text-[3.5rem] md:text-[#154535]">Local <span className="font-bold">Does</span><br />taste better!</p>
                            </div>

                            <form onSubmit={signupUser} className="w-full flex flex-col items-center md:mt-[10vh]">
                            <label htmlFor="newEmail" className="w-fit">Email</label>
                            <input
                                id="newEmail"
                                type="text"
                                name="newEmail"
                                placeholder=" Your email goes here.."
                                value={formData.newEmail}
                                onChange={handleInputChange}
                                className="border-2 border-red rounded-md w-[20rem] h-[2rem] mb-2"
                            />

                            <label htmlFor="newPassword" className="w-fit">Password</label>
                            <input
                                id="newPassword"
                                type="password"
                                name="newPassword"
                                placeholder=" Your password.."
                                value={formData.newPassword}
                                onChange={handleInputChange}
                                className="border-2 border-red rounded-md w-[20rem] h-[2rem] mb-2"
                            />

                            <div className="md:w-[20rem] md:flex md:flex-row md:justify-center">
                                <div className="md:w-[10rem]">
                                    <label htmlFor="role" className="w-fit">Role</label>
                                    <input
                                        id="role"
                                        type="radio"
                                        name="seller"
                                        onChange={handleInputChange}
                                        className="border-2 border-red rounded-md w-fit h-[2rem] mb-2"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="role" className="w-fit">Role</label>
                                    <input
                                        id="role"
                                        type="radio"
                                        name="buyer"
                                        onChange={handleInputChange}
                                        className="border-2 border-red rounded-md w-fit h-[2rem] mb-2"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="bg bg-[#154535] rounded-md w-[6rem] pt-1 pb-1 text-white"
                            >
                                Register
                            </button>
                        </form>
                    </>
                    )}
                    
                </div>

                
            </div>
    );
}

export default Register;