import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {

  // constructor(props) {
  //   super(props);
  //
  //   this.state = {
  //     manager: '',
  //     players: [],
  //     balanceOfContract: '',
  //     value: '',
  //   }
  // }

  // ES2016 feature
  // 変数を単体でクラス内に定義すると、自動的にコンストラクタメソッド内に定義されたものとなる。
  state = {
    manager: '',
    players: [],
    balanceOfContract: '0',
    value: '',  // unit is wei
    message: '',
  };

  handleChange(e) {
    this.setState({value: e.target.value})
  }

  async handleSubmit(e) {
    e.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({message: 'Waiting on transaction success...'});

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether'),
    });

    this.setState({message: 'You have been entered!'});
  }

  async handleClick(e) {
    const accounts = await web3.eth.getAccounts();

    this.setState({message: 'Waiting on transaction success...'});

    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });

    this.setState({message: 'A winnder has been picked!'});


  }

  // async is inacceptable
  render() {
    // console.log
    // console.log(web3.version);
    // web3.eth.getAccounts().then(console.log);
    // console.log(lottery);

    return (
      <div>
        <h1>Lottery Contract</h1>
        <p>This contract is managed by {this.state.manager}.</p>
        <p>There are currently {this.state.players.length} people entered,
          competing to win {web3.utils.fromWei(this.state.balanceOfContract, 'ether')} ether!
        </p>
        <hr/>
        <h2>Want to try your luck?</h2>
        <form onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor="">Amount of Ether to enter</label>
          <input
            type="text"
            value={this.state.value}
            onChange={e => this.handleChange(e)}
          />
          <button>Enter</button>
        </form>
        <hr/>
        <h2>Ready to pick a winner?</h2>
        <button onClick={e => this.handleClick(e)}>Pick a winner!</button>
        <hr/>
        <p>{this.state.message}</p>
        <hr/>
      </div>
    );
  }

  async contractStateUpdate() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();

    // Object wrapped by BigNumber.js, not Number
    const balanceOfContract = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balanceOfContract });
  }

  componentDidMount() {
    this.contractStateUpdate();
  }

  componentDidUpdate() {
    this.contractStateUpdate();
  }
}

export default App;
