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


run();



function run() {
	//include html
	$("#dashboard").load("html/dashboard.html");
	$("#static-nodes").load("html/static-nodes.html");
	$("#send-receive").load("html/send-receive.html");
	$("#history").load("html/history.html");
	$("#block-explorer").load("html/block-explorer.html");
	$("#settings").load("html/settings.html");
	$("#backup").load("html/backup.html");
	
	
	var rpc = new RpcClient(config);
	var update = new RefreshCommands(rpc);

	update.refreshTotalBalance();
	update.refreshTransactions(12);
	update.getBitcoinData();
	
	
	watchMenuChanges();
}

function watchMenuChanges() {
	$("#leftpane .menu-link.dashboard").on('click', function(event) {
		event.preventDefault();
		$(".page").hide();
		$("#dashboard").show();
	});
	
	$("#leftpane .menu-link.static-nodes").on('click', function(event) {
		event.preventDefault();
		$(".page").hide();
		$("#static-nodes").show();
	});
	
	$("#leftpane .menu-link.send-receive").on('click', function(event) {
		event.preventDefault();
		$(".page").hide();
		$("#send-receive").show();
	});
	
	$("#leftpane .menu-link.history").on('click', function(event) {
		event.preventDefault();
		$(".page").hide();
		$("#history").show();
	});
	
	$("#leftpane .menu-link.block-explorer").on('click', function(event) {
		event.preventDefault();
		$(".page").hide();
		$("#block-explore").show();
	});
	
	$("#leftpane .menu-link.settings").on('click', function(event) {
		event.preventDefault();
		$(".page").hide();
		$("#settings").show();
	});
	
	$("#leftpane .menu-link.backup").on('click', function(event) {
		event.preventDefault();
		$(".page").hide();
		$("#backup").show();
	});
}


	
	
	
	
	
