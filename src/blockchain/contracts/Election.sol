//SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

contract Election{

    struct Voter {

        string voterName;
        uint voterID;
        uint phoneNumber;
        address voterAddress;
        bool voted;
        uint vote;

    }

    struct VoterID {
        uint voterIndex;
    }

    struct Candidate {
        
        uint candidateID;
        string candidateName;
        uint constituencyID;
        string contituencyName;
        uint voteCount;
        string partyName;

    }
    

    struct Poll {

        uint pollID;
        string state;
        mapping (uint => Candidate) candidates;
        mapping (uint => Constituency) constituencies;
        mapping (uint => string) party;
        
    }

    struct Constituency {

        uint constituencyID;
        string contituencyName;
        uint constituencyWinnerID;

    }

    //The deployer becomes admin so that should be coded in the web3 part.
    address public admin;


    uint public voterCount = 0;
    bool public constituencyExist = false;
    uint public constituencyCount = 0;


    mapping(uint => uint) candidateCount;
    mapping(uint => Voter) public voters;
    mapping(address => VoterID) public voterIDs;
    mapping(uint => Poll) public poll;
    mapping(uint => uint) public winnerConstituencyCount;


    //The constructor gets executed when the contract is deployed and the address will assigned as admin.
    constructor() {
        admin = msg.sender;
    }

    //The modifier or a constraint tracker which defines the function that can be executed by the admin only.
    modifier onlyAdmin {
        require(msg.sender == admin);
        _;
    }

    //The modifier which makes sure that only voter can access(Prateek's part)
    modifier onlyVoter {
        require(msg.sender != admin);
        _;
    }


    //Sheetal's web3
    function addPoll(uint _pollID, string memory _state, uint _candidateID, string memory _candidateName, uint _constituencyID, string memory _constituencyName, string memory _partyName) public onlyAdmin {
        poll[_pollID].pollID = _pollID;
        poll[_pollID].state = _state;

        poll[_pollID].candidates[_candidateID].candidateID = _candidateID;
        poll[_pollID].candidates[_candidateID].candidateName = _candidateName;
        poll[_pollID].candidates[_candidateID].constituencyID = _constituencyID;
        poll[_pollID].candidates[_candidateID].contituencyName = _constituencyName;
        poll[_pollID].candidates[_candidateID].voteCount = 0;
        poll[_pollID].candidates[_candidateID].partyName = _partyName;
        poll[_pollID].party[_candidateID] = _partyName;
        candidateCount[_constituencyID]++;
        
        for(uint _constituencyIndex = 1; _constituencyIndex < constituencyCount; _constituencyIndex++){

          if(poll[_pollID].constituencies[_constituencyIndex].constituencyID == _constituencyID){
              constituencyExist=true;
          }
        }
        
        if(constituencyExist==false)
        {

            constituencyCount++;
            poll[_pollID].constituencies[_constituencyID].constituencyID = _constituencyID;
            poll[_pollID].constituencies[_constituencyID].contituencyName = _constituencyName;
            poll[_pollID].constituencies[_constituencyID].constituencyWinnerID = 0;
            winnerConstituencyCount[_candidateID] = 0;
            
        }

    }
    

    //Prateek's web3
    function voterLogin(string memory _voterName, uint _voterID, uint _phoneNumber) public onlyVoter {
         
        voterCount++;
        voters[voterCount].voterName = _voterName;
        voters[voterCount].voterID = _voterID;
        voters[voterCount].phoneNumber = _phoneNumber;
        voters[voterCount].voterAddress = msg.sender;
        voters[voterCount].voted = false;
        voterIDs[msg.sender].voterIndex = voterCount;

    }
    

    //Prateek's web3
    function vote(uint _pollID, uint _candidateID) public onlyVoter {

        uint _voterIndex = voterIDs[msg.sender].voterIndex;     
        require(!voters[_voterIndex].voted, "Voter can vote only once.");
        voters[_voterIndex].voted = true;
        voters[_voterIndex].vote = _candidateID;
        poll[_pollID].candidates[_candidateID].voteCount += 1;
    }


    //Harsha's web3
    function constituencyWinner(uint _pollID, uint _candidateID, uint _constituencyID) public onlyAdmin returns (uint _winnerID){
        uint maxVoteCount = 0;
        for(uint _candidateIndex = 1; _candidateIndex < candidateCount[_constituencyID]; _candidateIndex++){
            if(poll[_pollID].candidates[_candidateIndex].voteCount > maxVoteCount){

                maxVoteCount = poll[_pollID].candidates[_candidateIndex].voteCount;
                _winnerID = _candidateIndex;
                winnerConstituencyCount[_candidateID]++;
            }
        }
    }


    //Harsha's web3
    function electionWinner(uint _pollID) public view onlyAdmin returns (string memory _winningParty){
        uint _winnerConstituencyCount = 0;
        for(uint _constituencyIndex = 0; _constituencyIndex < constituencyCount; _constituencyIndex++){
            if(_winnerConstituencyCount < winnerConstituencyCount[_constituencyIndex]){
                _winningParty = poll[_pollID].candidates[_constituencyIndex].partyName;
            }
        }
    }
  
}