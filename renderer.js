// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// require the refresh-commands module.
var RefreshCommands = require('./modules/refresh-commands/refresh-commands.js');
var ActionCommands = require('./modules/action-commands/action-commands.js');
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
	var action = new ActionCommands(rpc);

run(rpc, update, action);



//refresh every 10 sec
window.setInterval(function(){
	shortRefresh(rpc, update, action);
	console.log("Short Refresh Occurred");
}, 10000, rpc, update, action);


//refresh every 60 sec
window.setInterval(function(){
	longRefresh(rpc, update, action);
	console.log("Long Refresh Occurred");
}, 60000, rpc, update, action);




function run(rpc, update, action) {
	
	//include html
	$("#dashboard").load("html/dashboard.html");
	$("#static-nodes").load("html/static-nodes.html");
	$("#send-receive").load("html/send-receive.html");
	$("#history").load("html/history.html");
	$("#block-explorer").load("html/block-explorer.html");
	$("#settings").load("html/settings.html");
	$("#backup").load("html/backup.html");
	
	update.refreshTotalBalance();
	update.refreshTransactions(12);
	update.getBitcoinData();
	update.refreshReceiveAddresses();
	update.refreshAllTransactions();
	update.drawGraph();
	
	setTimeout(interactions, 2000, action, update);
	watchMenuChanges();
}

function shortRefresh(rpc, update, action) {
	update.refreshTotalBalance();
	update.refreshTransactions(12);
	update.refreshReceiveAddresses();
	update.refreshAllTransactions();
	setTimeout(interactions, 2000, action, update);
}


function longRefresh(rpc, update, action) {
	update.getBitcoinData();
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
		$("#block-explorer").show();
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

function interactions(action, update) {
	//console.log($('#addresslist tr'));
	$('#addresslist tr').hover(function() {
		console.log("hover");
		$(this).css('background-color', '#b8e1ff');
	}, function() {
		console.log("hoveroff");
		$(this).css('background-color', '#fff');
	});
	
	$('#addresslist td').on('click', function(event) {
		
		$('#addresslist td').css('background-color', '');
		$(this).css('background-color', '#83b7de');
		
	});
	
	$('#send.button').on('click', function(event) {
		event.preventDefault(); //BBCRUjZBvi3hSfNDC2g2phbxeomsKcLKb8
		var xbyaddress = $('#send-receive #send-address').val();
		var amount = $('#send-receive #amount').val();
		var password = $('#send-receive #password').val();
		
		
		
		
		if(password) {
			action.sendCoins(xbyaddress, amount, password);
		} else {
			action.sendCoinsNoPassword(xbyaddress, amount);
		}
		
		setTimeout(update.refreshTotalBalance(), 1000);
		
	});
}
	
	
	
	
	
