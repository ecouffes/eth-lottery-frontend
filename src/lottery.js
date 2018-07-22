import web3 from './web3';

// see deploy.js of eth-lottery repository

// contract address on Rinkeby test network
const address = '0xE6A36118D6aDe275EBC6a039d17e96EA9DABd38A';

// contract abi on Rinkeby test network
const abi = [{
  "constant": true,
  "inputs": [],
  "name": "manager",
  "outputs": [{"name": "", "type": "address"}],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [],
  "name": "pickWinner",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "getPlayers",
  "outputs": [{"name": "", "type": "address[]"}],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [],
  "name": "enter",
  "outputs": [],
  "payable": true,
  "stateMutability": "payable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{"name": "", "type": "uint256"}],
  "name": "players",
  "outputs": [{"name": "", "type": "address"}],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "constructor"
}];

// get local contract instance
// not need promise
const lottery = new web3.eth.Contract(abi, address);

export default lottery;


