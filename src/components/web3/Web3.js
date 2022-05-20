import Web3 from 'web3';
import ElectionAbi from '../../blockchain/build/contracts/Election.json';


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
let adminAccount = null;
let pollID = null;

export const loadAdminAccount = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    adminAccount = accounts[0];
    return(adminAccount)
}

const loadContract = async () => {
    const web3 = window.web3;
    const networkID = await web3.eth.net.getId();
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
        await election.methods.vote(pollID, candidateID).send( {from: voterAddress} ).on('transactionhash', () => {
            console.log('Vote Success')
        })
        window.alert(
            "Vote has successfully been recorded, you will be redirected to the home page."
        )
    }
    
}

export const addPoll = async (pollID, state, candidateID, candidateName, constituencyID, constituencyName, partyName) => {
    const election = loadContract()
    await election.methods.addPoll(pollID, state, candidateID, candidateName, constituencyID, constituencyName, partyName).send( {from: adminAccount}).on('transactionhash', () => {
        window.alert(
            "Poll has been successfully created"
        )
    })
}

export const constituencyWinner = async (pollID, candidateID, constituencyID) => {

    const election = loadContract()
    const winnerID = await election.methods.constituencyWinner(pollID, candidateID, constituencyID).send( {from: adminAccount}).on('transactionhash', () => {
        console.log("Success declaration of winner")
    }).catch( (error) => {
        console.log(error)
    })
    return winnerID

}

export const electionWinner = async (pollID) => {

    const election = loadContract()
    const winningParty = await election.methods.electionWinner(pollID).send({from: adminAccount}).on('transactionhash', () => {
        console.log("Success declaration of winner")
    }).catch( (error) => {
        console.log(error)
    })
    return winningParty
}