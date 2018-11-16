const fs = require('fs')
const Web3 = require('web3')

let web3 = new Web3('http://localhost:8545')

const abi = JSON.parse(fs.readFileSync('./contract/Bank_sol_Bank.abi').toString())
const bytecode = '0x' + fs.readFileSync('./contract/Bank_sol_Bank.bin').toString()

let bank = new web3.eth.Contract(abi)

web3.eth.getAccounts().then(function (accounts) {

    // deploy contract
    // your code
    bank.deploy({
        data: bytecode

    }).send({
        from: accounts[0],
        //from: await web3.eth.getCoinbase(),
        gas: 4700000
    }).on('receipt', function (receipt) {
        console.log(receipt)
        fs.writeFileSync('./address.txt', receipt.contractAddress)
    })
})

