import React from "react";

const Main = () => {
    
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    return (
        <div className="navbar h-16 bg-green-500 flex items-center justify-between">
            <h1 className="text-yellow-400 text-lg ml-4">BLINKIT</h1>
            <button className="white-btn" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default Main;
