import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [account, setAccount] = useState(null);

  // Function to connect to MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert(
        "MetaMask is not installed. Please install it to use this feature."
      );
    }
  };

  useEffect(() => {
    // Check if MetaMask is already connected
    if (window.ethereum && window.ethereum.selectedAddress) {
      setAccount(window.ethereum.selectedAddress);
    }
  }, []);

  return (
    <>
      <nav className="p-5 fixed flex justify-between w-full z-50">
        <div className="font-black glassbg h-16 px-5 bg-red-200 text-4xl uppercase flex items-center justify-center rounded-xl border-2 border-[#] whitespace-nowrap">
          <Link to="/">
            {" "}
            <h1>
              terra <span className="imp">block</span>
            </h1>
          </Link>
        </div>
        <div className="glassbg h-16 bg-red-200 text-lg gap-10 px-5 flex items-center justify-center rounded-xl border-2 border-[#]">
          <Link to="/explore">Explore Estates</Link>
          <Link to="/about">About Tokenization</Link>
          {/* If account is connected, show the address, else show connect button */}
          {account ? (
            <h1>
              Connected:{" "}
              {`${account.substring(0, 6)}...${account.substring(
                account.length - 4
              )}`}
            </h1>
          ) : (
            <button onClick={connectWallet} className="">
              Connect your Wallet
            </button>
          )}
          <div className="h-12 w-12 bg-red-300 rounded-full">
            <img
              className="h-full w-full object-cover rounded-full"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn46jTBmOWuFQdPeHVogPzmBxUJv9bzXJ-wg&s"
              alt="profile"
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
