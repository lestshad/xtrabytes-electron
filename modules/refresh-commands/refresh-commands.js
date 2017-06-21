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
		$("#send-receive  #current-balance").val(balance);
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
		var changeClass = "green";
		if(resp[0].percent_change_24h.indexOf('-') > -1){
			changeClass = "red";
		}
		var text = "<td>" + resp[0].name + " </td><td><strong>1 " + resp[0].symbol + "</strong> = </td><td><span class='"+changeClass+"'>"+resp[0].price_btc+"</span> BTC <span class='italic'>($" + resp[0].price_usd + ")</span></td>";
		
		if(resp[0].symbol == 'BTC') {
			text = "<td>" + resp[0].name + " </td><td><strong>1 " + resp[0].symbol + "</strong> = </td><td><span class='"+changeClass+"'>$"+resp[0].price_usd+"</span></td>";
		}
		
		//text += " | 1h: " + resp[0].percent_change_1h +  "% | 24h: " + resp[0].percent_change_24h +  "% | 7d: " + resp[0].percent_change_7d + "%" ;
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



//listreceivedbyaddress 0 true
method.refreshReceiveAddresses = function() {
    if (count === undefined) {
        var count = 15;
    }
	
	var tx = this.rpc.listReceivedByAddress(0, true, function (err, ret) {
		if (err) {
			console.error(err);
		}
		addresses = ret.result;
		//console.log(addresses);
		var html = "<table>";
		html += '<thead><tr><th class="label">Label</th><th class="address">Address</th></tr></thead><tbody>';
		for (var i=0; i < addresses.length; i++) {
			html += "<tr>";
			html += "<td class='label'>"+addresses[i].account+"</td><td class='address'>"+addresses[i].address+"</td>";
			html += "</tr>";
		}
		html += "</tbody></table>";
		
		$("#send-receive .bottom #addresslist").html(html);
	});
}



//listtransactions * 50
method.refreshAllTransactions = function() {
    if (count === undefined) {
        var count = 25000;
    }
	
	var tx = this.rpc.listTransactions("*", count, function (err, ret) {
		if (err) {
			console.error(err);
		}
		transactions = ret.result;
		transactions.reverse();
		console.log(transactions);
		var dateFormat = require('dateformat');
		var html = "<table class='transactions'>";
		html += '<thead><tr><th class="label">Label</th><th class="address">Address</th><th class="time">Date</th><th class="amount">Amount</th></tr></thead><tbody>';
		for (var i=0; i < transactions.length; i++) {
			var theDate = new Date(0);
			theDate.setUTCSeconds(transactions[i].time + theDate.getTimezoneOffset()*60);
			html += "<tr>";
			html += "<td class='label'>"+transactions[i].account+"</td><td class='address'>"+ transactions[i].address+"</td>";
			html += "<td class='time'>"+dateFormat(theDate, "d-m-yyyy")+"</td><td class='amount'>"+transactions[i].amount+"</td>";
			html += "</tr>";
		}
		html += "</tbody></table>";
		
		$("#history .main").html(html);
	});
}

method.drawGraph = function() {
	google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawCurveTypes);

function drawCurveTypes() {
      var data = new google.visualization.DataTable();
      data.addColumn('date', 'Date');
      data.addColumn('number', 'XBY');

/*
      data.addRows([
        [0, 0],    [1, 10],   [2, 23],  [3, 17],   [4, 18],  [5, 9],
        [6, 11],   [7, 27],  [8, 33],  [9, 40],  [10, 32], [11, 35],
        [12, 30], [13, 40], [14, 42], [15, 47], [16, 44], [17, 48],

      ]); */
	  
	  data.addRows([
        [new Date(2017, 6, 07), 1],    
		[new Date(2017, 6, 08), 333],   
		[new Date(2017, 6, 09), 4534],
		[new Date(2017, 6, 10), 22],    
		[new Date(2017, 6, 11), 465643],   
		[new Date(2017, 6, 12), 33333],
		[new Date(2017, 6, 13), 234234],    
		[new Date(2017, 6, 14), 3333],   
		[new Date(2017, 6, 15), 11],
		[new Date(2017, 6, 16), 7777],    
		[new Date(2017, 6, 17), 54554],   
		[new Date(2017, 6, 18), 4545],
		[new Date(2017, 6, 19), 55555],    
		[new Date(2017, 6, 20), 800000],   
		[new Date(2017, 6, 21), 900000],

      ]);
	  
  


      var options = {
        hAxis: {
          title: 'Time - last 30 days'
        },
        vAxis: {
          title: 'Balance'
        },
        series: {
          1: {curveType: 'function'}
        }
      };

      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    }
	
}

	
// export the module
module.exports = RefreshCommands;