import Web3 from 'web3';
import ElectionAbi from './Election.json';
// import { useState } from 'react';



export const connectDefault = async () => {
    if (window.ethereum) {
        await window.ethereum.request({method: 'eth_requestAccounts'})
        window.web3 = new Web3(window.ethereum);
    } 
    else if(window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)       
    }
    else {
        window.alert(
            "Non-Ethereum Browser detected, install metamask to continue to the voting process."
        )
    }
}

let currentAccount = null;
let adminAccount = null;
let pollID = null;

export const loadAdminAccount = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    currentAccount = adminAccount = accounts[0];
    return(adminAccount)
}

const loadContract = async () => {
    const web3 = window.web3;
    const networkID = await web3.eith.net.getId();
    const networkData = ElectionAbi.networks[networkID];

    if(networkData) {
        const election = new web3.eth.Contract(ElectionAbi.abi, networkData.address)
        return(election)
    }
    else{
        window.alert(
            "Smart Contract couldn't be deployed contact the IT Department"
        )
    }
}

export const loadVoterAccount = async (votername, voterID, phonenumber) => {
    const election = loadContract();
    try {
        election.methods.voterLogin(votername, voterID, phonenumber).call()
        return(true)
    } catch (error) {
        throw new Error(error)
    }
}

export const vote = async (voterIndex, candidateID) => {
    const election = loadContract()
    const voter = await election.voters(voterIndex)
    const voterAddress = await election.voters(voterIndex)[3]
    if(voter[4] === true){
        window.alert(
            "The address " + {voterAddress} + "has already voted, this window will close now."
        )
        window.close();

    }
    else{
        election.methods.vote(pollID, candidateID)
    }
    
    election.methods.vote(pollID, candidateID).call()
}

// export const 
