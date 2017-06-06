var method = RefreshCommands.prototype;

function RefreshCommands(rpc){
	this.rpc = rpc;
};

method.refreshTotalBalance = function() {
    if (count === undefined) {
        var count = 15;
    }
	
	var tx = this.rpc.getBalance(function (err, ret) {
		if (err) {
			console.error(err);
		}
		balance = ret.result;
		$(".user-balance").html(balance);
	});
}

method.refreshTransactions = function(count) {
    if (count === undefined) {
        var count = 15;
    }
	
	var tx =  this.rpc.listTransactions("*", count, function (err, ret) {
		if (err) {
			console.error(err);
		}
		txids = ret.result;
		txids.reverse();
		var html = "<table>";
		var dateFormat = require('dateformat');

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

method.getExchangeData = function(ticker) {
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
		// errors
	});
}
	
method.getBitcoinData = function() {
	var json = this.getExchangeData("xtrabytes");
	var json = this.getExchangeData("bitcoin");
	var json = this.getExchangeData("ethereum");
	var json = this.getExchangeData("ripple");
	var json = this.getExchangeData("dash");
	var json = this.getExchangeData("monero");
	var json = this.getExchangeData("stratis");

}
	
	
// export the module
module.exports = RefreshCommands;