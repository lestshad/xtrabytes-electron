// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// require the refresh-commands module.
var RefreshCommands = require('./modules/refresh-commands/refresh-commands.js');
var RpcClient = require('bitcoind-rpc');

var userBalance = "loading...";
$(".user-balance").html( userBalance);

var config = {
	protocol: 'http',
	user: 'rpcuser',
	pass: 'rpcpassword',
	host: '127.0.0.1',
	port: '35001',
};

var rpc = new RpcClient(config);
var update = new RefreshCommands(rpc);

update.refreshTotalBalance();
update.refreshTransactions(12);
update.getBitcoinData();

	
	
	
	
	
