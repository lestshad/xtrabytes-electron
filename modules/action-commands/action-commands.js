var method = ActionCommands.prototype;

function ActionCommands(rpc){
	this.rpc = rpc;
};

//sendtoaddress <xtrabytesaddress> <amount> 
method.sendCoins = function(xbyaddress, amount, password) {
	if (xbyaddress === undefined || amount === undefined || password === undefined) {
       //invalid input
	   console.log("invalid input");
	   $('#send-receive .msg').html("Please fill out all required fields.");
    } else {
		console.log("valid input for sendcoins");
		var self = this;
		var unlock = this.rpc.walletpassphrase(password, 5, function(err, ret) {
			if(err){
				console.error(err);
				console.log("wallet passphrase failed");
				$('#send-receive .msg').html("Please enter the correct password.");
			} else {
				console.log("sendcoins unlocked wallet");
				var tx =  self.rpc.sendtoaddress(xbyaddress, amount,  function (err, ret) {
					if (err) {
						console.error(err);
						$('#send-receive .msg').html("Failed to send coins. Please check the fields and try again.");
					}
					console.log("sendcoins succeeded");
					$('#send-receive .msg').html("Send of " + amount + " XBY to " + xbyaddress + " successful.");
					return ret.result;
				});
			}
		});
	}
}


//sendtoaddress <xtrabytesaddress> <amount> 
method.sendCoinsNoPassword = function(xbyaddress, amount) {
	if (xbyaddress === undefined || amount === undefined) {
       //invalid input
	   console.log("invalid input");
	   $('#send-receive .msg').html("Please fill out all required fields.");
    } else {
		console.log("valid input for sendcoins");
		var tx =  this.rpc.sendtoaddress(xbyaddress, amount,  function (err, ret) {
			if (err) {
				console.error(err);
				$('#send-receive .msg').html("Failed to send coins. Please enter password if your wallet is encrypted and try again.");
			}
			console.log("sendcoins succeeded");
			$('#send-receive .msg').html("Send of " + amount + " XBY to " + xbyaddress + " successful.");
			return ret.result;
		});
	}
}

	
// export the module
module.exports = ActionCommands;