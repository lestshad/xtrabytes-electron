// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.


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
console.log(rpc);


refreshTotalBalance();
refreshTransactions(12);
getBitcoinData() ;

function refreshTotalBalance() {
    if (count === undefined) {
        var count = 15;
    }
	
	var tx = rpc.getBalance(function (err, ret) {
		if (err) {
			console.error(err);
		}
		balance = ret.result;
		console.log(balance);
		$(".user-balance").html(balance);

	});
}

function refreshTransactions(count) {
    if (count === undefined) {
        var count = 15;
    }
	
	var tx = rpc.listTransactions("*", count, function (err, ret) {
		if (err) {
			console.error(err);
		}
		txids = ret.result;
		console.log(txids);
		
		txids.reverse();
		
		var html = "<table>";
		
		var dateFormat = require('dateformat');
		

		//for loop
		for (var i=0; i < txids.length; i++) {
			
			var theDate = new Date(0);
			theDate.setUTCSeconds(txids[i].time + theDate.getTimezoneOffset()*60);
			
			
			
			html += "<tr>";
			html += "<td class='date'>"+dateFormat(theDate, "d-m-yyyy")+"</td><td class='type "+txids[i].category+"'>"+txids[i].category+"</</td><td class='address'>"+txids[i].address+"</</td><td class='amount'>"+txids[i].amount+" XBY</td>";
			html += "</tr>";
		}
		html += "</table>";
		
		$(".recent-transactions").html(html);

	});
}


function getExchangeData(ticker) {

	var url = "https://api.coinmarketcap.com/v1/ticker/" + ticker;
	
	fetch(url) // Call the fetch function passing the url of the API as a parameter
	.then((resp) => resp.json()) // Transform the data into json
	.then(function(resp) {
		console.log(resp);
	var text = resp[0].name + ":   1 " + resp[0].symbol + " = $" + resp[0].price_usd;
	text += " | 1h: " + resp[0].percent_change_1h +  "% | 24h: " + resp[0].percent_change_24h +  "% | 7d: " + resp[0].percent_change_7d + "%" ;
	console.log(text);
	$("." + ticker).html(text);
		return resp;
	})
	.catch(function() {
		// This is where you run code if the server returns any errors
	});
}
	
	
function getBitcoinData() {
	var json = getExchangeData("xtrabytes");
	var json = getExchangeData("bitcoin");
	var json = getExchangeData("ethereum");
	var json = getExchangeData("ripple");
	var json = getExchangeData("dash");
	var json = getExchangeData("monero");
	var json = getExchangeData("stratis");

}
	
	

	
	
	
	
	
