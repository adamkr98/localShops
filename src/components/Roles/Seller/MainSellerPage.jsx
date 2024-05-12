import React, { useState, useEffect } from "react";
import Header from "../../Header/Header";

function MainSellerPage() {

    const loadProductData = (e) => {
        console.log(e.target.id);
    }

    const divs = Array.from({ length: 22 }, (_, index) => (
        <div key={index} onClick={(e) => {loadProductData(e); openModal(); }} className="w-[90vw] h-[40vh] bg bg-white md:w-[15rem] md:h-[15rem] md:mr-8 md:mb-4 shadow-lg">Div {index + 1}

            <p id="productName" className="hidden sm:block md:block">Banana</p>
            <p id="provenance" className="hidden sm:block md:block">Provenance</p>
            <p id="quantity" className="hidden sm:block md:block">Quantity per kg</p>
            <p id="culture" className="hidden sm:block md:block">Culture</p>
            <p id="category" className="hidden sm:block md:block">Category</p>
            <p id="description" className="hidden sm:block md:block">Description</p>
        </div>
    ));

    // Group divs into groups of 4
   
    // divs.forEach(div => {
    //     const parags = div.props.children.filter(child => child.type === 'p');
    //     parags.forEach(parag => {
            
    //     });
    //   });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
       setIsModalOpen((prev) => !prev);
    } 

    return (
        <>
            <Header />

            <div className="w-full md:w-full md:h-fit md:border md:bg-[#fafafa] md:flex md:flex-col md:justify-between">
            <div className="md:w-full md:flex md:flex-col md:items-end">
                        
                        <div className="w-full h-[10vh] flex justify-around items-center md:w-full md:h-[6rem] md:bg md:bg-[#fafafa] md:flex md:justify-end md:mb-7 md:mt-4 md:pr-[10vw] md:sticky md:top-0 md:shadow-md">

                        <div className="md:w-[64vw] md:ml-4">
                            <select name="" id="" className="h-[2rem] mr-7 md:bg md:bg-[#D9E6DC] rounded-md hover:cursor-pointer">
                                        <option value="">all products (abc)</option>
                                        <option value="">category</option>
                            </select>
                        </div>
                        <div className="relative w-fit md:w-[15rem]">
                            <input type="text" className="w-full h-[3rem] border-b border-black ml-14 pl-2 pr-10 md:w-[15rem] md:ml-0 md:rounded-sm focus:outline-none" />
                            <i className="fa-solid fa-magnifying-glass absolute text-[1.5rem] top-4 right-3 hover:cursor-pointer"></i>
                        </div>
                                
                        </div>

                        <div className="w-full md:w-[95vw] md:h-fit md:mr-4 flex flex-wrap justify-center">
                            
                            {divs.map((row, index) => (
                                <div key={index} className="flex">
                                    {row}
                                </div>
                            ))}
                        </div>
                    </div>

               {isModalOpen && (
                <div className="md:flex md:justify-center md:items-center fixed top-0 left-0 md:w-full md:h-full md:bg-white md:backdrop-blur-md md:bg-opacity-10">
                    <div className="absolute top-50 bottom-50 hidden sm:w-1/4 md:w-[80vw] md:h-[80vh] md:bg md:bg-slate-50 md:flex md:flex-row md:items-start md:pt-12 md:mr-1 md:border md:border-gray-400">

                    <div className="md:w-full md:h-[80vh]">
                    <div className="md:w-[95%] md:flex md:justify-end hover:cursor-pointer" onClick={() => setIsModalOpen((prev) => !prev)} >
                    <i className="fa-solid fa-x"></i>
                    </div>
                        <div className="sm:flex sm:flex-col md:w-full md:h-[60vh] md:flex md:flex-row md:items-end md:justify-around">
                            <div className="md:w-2/5 md:h-[55vh] md:flex md:flex-col md:justify-between md:items-center md:ml-4">
                                <div className="md:w-[25rem] md:flex md:flex-row md:justify-between">
                                    <div className="md:w-[10vw] md:h-fit md:flex md:flex-col">
                                        <label htmlFor="productName" className="md:w-fit md:h-fit">Product Name</label>
                                        <input type="text" className="md:w-full md:h-[2rem] rounded-md" />   
                                    </div>
                                    <div className="md:w-[10vw] md:h-fit md:flex md:flex-col">
                                        <label htmlFor="">Provenance</label>
                                        <input type="text" className="md:w-full md:h-[2rem] rounded-md" />
                                    </div>
                                </div>
                                <div className="md:w-[25rem] md:h-fit md:flex md:flex-col md:justify-between">
                                    <p className="md:w-fit md:h-fit">Quantity</p>

                                    <div className="md:w-full md:flex md:flex-row md:justify-between">
                                        <div className="md:w-fit md:h-fit md:mr-15 md:flex md:flex-col md:mr-12">
                                            <label htmlFor="quantityKg" className="md:w-fit whitespace-nowrap">(per kg)</label>
                                            <input type="number" id="quantityKg" className="w-[10vw] h-[2rem] pl-2 rounded-md" />
                                        </div>
                                        <div className="md:w-fit md:flex md:flex-col">
                                            <label htmlFor="quantityPiece" className="md:w-[3rem] whitespace-nowrap">(per piece)</label>
                                            <input type="number" id="quantityPiece" className="w-[10vw] h-[2rem] pl-2 rounded-md" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="md:w-[25rem] md:flex md:flex-col">
                                        <label htmlFor="category" className="md:w-[10vw] md:h-[3rem]">Category</label>
                                        <select type="text" className="w-[10vw] h-[2rem] mb-1 rounded-md bg-gray-200">
                                            <option value="Vegetables">Vegetables</option>
                                            <option value="Fruits">Fruits</option>
                                            <option value="Meat">Meat</option>
                                            <option value="Fish">Fish</option>
                                        </select>
                                    </div>
                                    <div className="md:w-[25rem] md:h-[4rem] md:flex md:flex-col">
                                        <label htmlFor="date" className="md:h-fit">Date</label>
                                        <input type="date" id="date" className="w-[10vw] h-[2rem] pl-2 rounded-md" />
                                    </div>
                                    <div className="md:w-[25rem] md:h-[4rem] md:flex md:flex-col">
                                        <label htmlFor="cultureType" className="md:h-fit">Culture</label>
                                        <input type="text" id="cultureType" className="w-[10vw] h-[2rem] pl-2 rounded-md" />
                                    </div>
                                </div>
                                <div className="md:w-2/5 md:h-[30rem] md:flex md:flex-col md:justify-around border">
                                    <div className="md:w-1/2 md:h-[10rem] md:bg md:bg-blue-400">
                                        <input type="file" />
                                    </div>
                                    <div className="md:w-full md:h-fit border md:flex md:flex-row">
                                        <div className="md:w-full md:h-[11rem] md:flex md:flex-col">
                                            <label htmlFor="productDescription" className="md:h-fit">Description</label>
                                            <textarea type="text" id="productDescription" className="w-[25vw] h-[6rem] pl-2 resize-none" />
                                            <div className="md:w-full md:h-fit md:flex md:flex-row md:justify-end">
                                            <button className="bg-white rounded-md px-4 py-1 md:mt-2 hover:bg-[#D9E6DC] hover:border-2 hover:border-white hover:text-white">Save</button>
                                        </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        
                        </div>
                        
                    </div> 
                    )}
                       
            </div>
        </>
    );
}



export default MainSellerPage;