import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../config/supabaseClient";
import bcrypt from 'bcryptjs';

import backgroundImg from "/andrea-de-santis-HTzW5--Rt6c-unsplash.jpg";

function Register({isAuthenticated, setIsAuthenticated}) {
    const navigate = useNavigate();

    const [isLoginBtnAct, setLoginBtnAct] = useState(false);
{/* const [isUserLoggedIn, setUserLoggedIn] = useState(false);*/}
    const [activeRole, setActiveRole] = useState('seller');
    // const [user, setUser] = useState(null);

    const handleChange = (role) => {
        setActiveRole(role);
        console.log(`Role: ${role}`);   
      };

    const [registeredData, setRegisteredData] = useState({
        newEmail: '',
        newPassword: '',
    });

    const [loginData, setLoginData] = useState({
        email: 'seller1@gmail.com',
        password: 'seller1',
    })

    const signupUser = async (e) => {
        e.preventDefault();

        const hashedPassword = await bcrypt.hash(registeredData.newPassword, 10);

        try {
            const { data:user, error } = await supabase.auth.signUp({
                email: registeredData.newEmail,
                password: registeredData.newPassword,
            });

            console.log(user);
            if (error) {
                alert("Error signUp:", error.message);
            } else {
                console.log("User signedUp successfully:", user);
                const currentUserId = user.user.id

                try {
                    await sendUserRole(currentUserId);
                    alert("SignedUp!");
                } catch (roleError) {
                    console.error("Error sending user Role", roleError.message)
                }
            }
        } catch (error) {
            console.error("Error signing Up:", error.message);
        }
    };

    const loginUser = async (e) => {
        e.preventDefault();

        try {
            let { data: user, error } = await supabase.auth.signInWithPassword({
                email: loginData.email,
                password: loginData.password,
            });

            const currentUserId = user.user.id
            console.log(currentUserId);
            if (error) {
                alert("Error login:", error.message);
                return;
            } else {
                console.log("User loggedIn successfully:", currentUserId);

                    try {
                        const { data: userRoleData, error: userRoleError } = await supabase
                        .from('usersData')
                        .select("userRole")
                        .eq('user_id', currentUserId);
    
                        let userRole = userRoleData[0].userRole;
    
                        if(userRoleError) {
                            console.error("Error fetching user role", userRoleError.message)
                        } 
                        
                        console.log("User role now:", userRole);
                        if(userRole === "seller") {
                            navigate('/seller')
                        } else if(userRole === "buyer") {
                            navigate('/buyer');
                        }
                    } catch (error) {
                        console.error(error);
                    }
            }
        } catch (error) {
            console.error("Error log in:", error.message);
        }
    };

  
    
    const sendUserRole = async (userId) => {
        try {
            const { data, error } = await supabase 
                .from('usersData')
                .insert([{ user_id: userId ,userRole: activeRole }]);
           
                if (error) {
                    console.error("Error inserting user role:", error.message);
                    alert("Failed to assign role: " + error.message);
                } else {
                    console.log("User role assigned successfully:", data);
                }

        }   catch (error) {
            console.error("Error sending role",error.message);
        }
  
    }
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if(isLoginBtnAct) {
            setLoginData({
                ...loginData,
                [name]: value,
            });
        } else {
            setRegisteredData({
                ...registeredData,
                [name]: value,
            });
        }
    };

    useEffect(() => {
        console.log(loginData.email, loginData.password);
    })
    // useEffect(() => {
    //     setRegisteredData({
    //         newEmail: '',
    //         newPassword: '',
    //     });
    // }, [isLoginBtnAct]); 

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

                            <div className="md:w-fit md:mt-[10rem] md:ml-[5rem]">
                                <p className="md:text-[3.5rem] md:text-[#154535]">Hello again <br />Lets start!</p>
                            </div>

                            <form onSubmit={loginUser} className="w-full flex flex-col items-center md:mt-[10vh]">
                            <label htmlFor="newEmail" className="w-fit">Email</label>
                            <input
                                id="email"
                                type="text"
                                name="email"
                                placeholder=" Your email goes here.."
                                value={loginData.email}
                                onChange={handleInputChange}
                                className="border-2 border-red rounded-md w-[20rem] h-[2rem] mb-2 pl-2"
                            />

                            <label htmlFor="newPassword" className="w-fit">Password</label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                placeholder=" Your password.."
                                value={loginData.password}
                                onChange={handleInputChange}
                                className="border-2 border-red rounded-md w-[20rem] h-[2rem] mb-2 pl-2"
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
                            <button onClick={() => setLoginBtnAct(true)} className="md:w-fit md:p-2 md:bg-[#154535] md:mt-2 md:mr-2 md:text-white md:rounded-md">Login</button>
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
                                value={registeredData.newEmail}
                                onChange={handleInputChange}
                                className="border-2 border-red rounded-md w-[20rem] h-[2rem] mb-2 pl-2"
                            />

                            <label htmlFor="newPassword" className="w-fit">Password</label>
                            <input
                                id="newPassword"
                                type="password"
                                name="newPassword"
                                placeholder=" Your password.."
                                value={registeredData.newPassword}
                                onChange={handleInputChange}
                                className="border-2 border-red rounded-md w-[20rem] h-[2rem] mb-2 pl-2"
                            />

                            <div className="md:w-[20rem] md:flex md:flex-col md:justify-center">
                                <label className="md:w-full md:flex md:justify-center">Role</label>

                                <div className="md:w-full md:flex md:flex-row">
                                    <div className="md:w-1/2 pb-3">
                                        <div
                                        id="roleSeller"
                                        name="seller"
                                        className={`border-2 border-[#154535] text-white w-full rounded-tl-md rounded-bl-md flex justify-center ${activeRole === 'seller' ? 'bg-[#154535]' : 'bg-white'}`}
                                        >
                                        <label
                                            htmlFor="sellerBtn"
                                            className={`w-full py-2 text-center cursor-pointer ${activeRole === 'seller' ? 'bg-[#154535] text-white' : 'bg-white rounded-tl-md rounded-bl-md text-black'}`}
                                        >
                                            Seller
                                        </label>
                                        <input
                                            type="checkbox"
                                            id="sellerBtn"
                                            className="invisible"
                                            checked={activeRole === 'seller'}
                                            onChange={() => handleChange('seller')}
                                        />
                                        </div>
                                    </div>
                                    <div className="md:w-1/2 pb-3">
                                        <div
                                        id="roleBuyer"
                                        name="buyer"
                                        className={`border-2 border-[#154535] text-black w-full rounded-tr-md rounded-br-md flex justify-center ${activeRole === 'buyer' ? 'bg-[#154535]' : 'bg-white'}`}
                                        >
                                        <label
                                            htmlFor="buyerBtn"
                                            className={`w-full py-2 text-center cursor-pointer ${activeRole === 'buyer' ? 'bg-[#154535] text-white' : 'bg-white text-black rounded-tl-md rounded-bl-md'}`}
                                        >
                                            Buyer
                                        </label>
                                        <input
                                            type="checkbox"
                                            id="buyerBtn"
                                            className="invisible"
                                            checked={activeRole === 'buyer'}
                                            onChange={() => handleChange('buyer')}
                                        />
                                        </div>
                                    </div>
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
                     <div>
      {isAuthenticated ? (
        <p>User is authenticated.</p>
      ) : (
        <p>User is not authenticated.</p>
      )}
      </div>
                </div>

              
            </div> 
    );
}

export default Register;