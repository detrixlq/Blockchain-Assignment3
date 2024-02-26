import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import ProposalComponent from './components/ProposalComponent';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './App.css'; // Import custom CSS
import DAO from './contracts/DAO.json';

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [daoContract, setDaoContract] = useState(null);

  useEffect(() => {
    console.log(daoContract); // Check if the contract instance is set
    console.log(account); // Check if the account address is set
}, [daoContract, account]);


  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
          try {
              await window.ethereum.request({ method: 'eth_requestAccounts' });
              const web3Instance = new Web3(window.ethereum);
              setWeb3(web3Instance);
              const accounts = await web3Instance.eth.getAccounts();
              setAccount(accounts[0]);
              const contractABI = DAO.abi;
              
              const daoInstance = new web3Instance.eth.Contract(
                contractABI,
                "0xDA907C1cfC417fa7E3ca3b755E85Ad8B9320010D",
              );
              setDaoContract(daoInstance);
              
              const networkId = await web3Instance.eth.net.getId();
              if (networkId !== 11155111) {
                  try {
                      // Request to switch to the Sepolia network
                      await window.ethereum.request({
                          method: 'wallet_switchEthereumChain',
                          params: [{ chainId: '0x' + (11155111).toString(16) }], // Chain ID must be in hexadecimal
                      });
                      alert("Connected to Sepolia network")
                  } catch (switchError) {
                      // Handle errors, such as user rejecting the switch request
                      console.error("Failed to switch to Sepolia:", switchError);
                  }
              } else {
              }


          } catch (error) {
              console.error("Could not connect to wallet:", error);
          }
      } else {
          alert('Please install MetaMask!');
      }
  };
  
  

    initWeb3();
  }, []);

  return (
    <div className="App">
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">DAO DApp</a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-white">{account}</small>
          </li>
        </ul>
      </nav>
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex justify-content-center">
            {daoContract && <ProposalComponent web3={web3} daoContract={daoContract} account={account} />}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
