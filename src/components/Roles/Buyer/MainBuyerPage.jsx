import React from "react";

function MainBuyerPage ({ isAuthenticated, logOutUser }) {
    
    if(!isAuthenticated) {
        <div className="w-full h-[100vh]">
            <p>You need to be logged in to access this page!</p>
        </div>
    }

    return (
        <div className="w-full h-[100vh] bg bg-orange-600">
            <p>Buyer Profile Main Page</p>
            <button onClick={logOutUser}>SignOut</button>
        </div>
    )
}

export default MainBuyerPage;