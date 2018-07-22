import Web3 from 'web3';

// Get the provider already injected by Metamask
const web3 = new Web3(window.web3.currentProvider);

export default web3;