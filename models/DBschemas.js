const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = exports.UserSchema = new Schema ({

	name : {type : String, required : true},
	description : {type : String},
	portfolios : {type : [String], required : true}

});

const AssetSelectionSchema = new Schema ({
		asset_class : {type : String, required : true},
		instruments : {type : [String], required : true}
});

// To be used inside Portfolio Schema
const SettingsSchema = new Schema ({
		selected_assets : {type : [AssetSelectionSchema]},
		// other settings
});

const PortfolioSchema = exports.PortfolioSchema = new Schema ({

	portfolio_id : {type : String, required : true},
	accounts : {type : [String], required : true},

	settings : {
	 	selected_assets : 
        [{
	 		asset_class : {type : String},
	 		instruments : {type : [String]}
	 	}]
	 }

});

// to be used inside Account Schema
const CashTransactionSchema = new Schema  ({
	date : {type : Date, required : true},
	type : {type : String, required : true},
	amount : {type : Number, required : true},
});


const AccountSchema = exports.AccountSchema = new Schema  ({

	account_id : {type : String, required : true},
	broker_id : {type : String, required : true},
	bank : {type : String, required : true},
	currency : {type : String, required : true},
	transactions : {type : [CashTransactionSchema], required : true}
});

const BrokerSchema = exports.BrokerSchema = new Schema ({

	broker_id : {type : String, required : true},
	description : {type : String},
	// the fee schema
	// all details necessary for FIX connections

});

const BookSchema = exports.BookSchema = new Schema ({
	order_id : {type : String, required : true},
	order_tag : {type : String}, // to be verified
	security_id : {type : String, required : true},
	execution_broker_id : {type : String, required : true},
	clearing_broker_id : {type : String, required : true},
	timestamp : {type : Date, required : true},
	quantity : {type : Number, required : true}, // Number or Object?
	price : {type : Number, required : true},
	portfolio_id : {type : String, required : true}

});

const BlotterSchema = exports.BlotterSchema = new Schema ({
	order_id : {type : String, required : true},
	symbol : {type : String, required : true},
	creation_time : {type : Date, required : true},
	timestamp : {type : Date, required : true}, // all amendation
	type : {type : String, required : true},
	action : {type : String, required : true},
	quantity : {type : String, required : true},
	price : {type : Number, required : true},
	duration : {type : String, required : true},
	status : {type : String, required : true},
	tag : {type : String, required : true},
	broker : {type : String, required : true},
	account : {type : String, required : true}
});

const FillOrCancelSchema = exports.FillOrCancelSchema  = new Schema ({
	order_id : {type : String, required : true},
	symbol : {type : String, required : true},
	timestamp : {type : Date, required : true}, 
	action : {type : String, required : true},
	quantity : {type : String, required : true},
	price : {type : Number, required : true},
	status : {type : String, required : true},
	tag : {type : String, required : true},
	broker : {type : String, required : true},
	account : {type : String, required : true}
});

const RegistrySchema = exports.RegistrySchema = new Schema ({

	instrument_id : {type : String, required : true},
	tradable : {type : Boolean, required : true}, // eliminate?
	exchange_id : {type : String},
	tickers : {type : Object, required : true},
	tick_size : {type : Number, required : true},
	currency : {type : String, required : true},
	class : {type : Object, required : true}

});

// Those schemas should polymorphically populate the "class"
// field in the Registry Schema 
const Future = new Schema ({

	type : {type : String, required : true},
	tick_value : {type : Number , required : true},
	underlying : {type : String, required : true},
	issuing_date : {type : Date},
	expiring_date : {type : Date, required : true},
	first_notice_date : {type : Date},
	settlement : {type : String, required : true}
	
});

const Option = new Schema ({

	type : {type : String, required : true},
	multiplier : {type : Number , required : true},
	underlying : {type : String, required : true},
	issuing_date : {type : Date},
	expiring_date : {type : Date, required : true},
	strike : {type : Number, required : true},
	right : {type : String, required : true},
	settlement : {type : String, required : true},
	exercise_type : {type : String, required : true}
	
});

const Equity = new Schema ({

	type : {type : String, required : true},
	right : {type : String, required : true},
	isin : {type : String , required : true},
	description : {type : String},
	country : {type : String},
	industry : {type : String},
	supersector : {type : String},
	sector : {type : String}
});

const Bond = new Schema ({

	type : {type : String, required : true},
	category : {type : String, required : true},
	isin : {type : String , required : true},
	issuer : {type : String, required : true},
	face_value : {type : Number, required : true},
	issue_price : {type : Number, required : true},
	issuing_date : {type : Date},
	expiring_date : {type : Date, required : true},	
	coupon_rate : {type : Number, required : true},
	coupon_date : {type : [Date], required : true},
	rating : {type : String}
	// other
});

const Index = new Schema ({

	type : {type : String, required : true},
	asset_class : {type : String, required : true},
	country : {type : String, required : true},
	industry : {type : String},
	supersector : {type : String},
	sector : {type : String}
	
});

const Currency = new Schema ({

	type : {type : String, required : true},
	isin : {type : String , required : true},
	country : {type : String}
	
});


mongoose.model('User', UserSchema);
mongoose.model('Portfolio', PortfolioSchema);
mongoose.model('Account', AccountSchema);
mongoose.model('Broker', BrokerSchema);
mongoose.model('Book', BookSchema);
mongoose.model('Blotter', BlotterSchema);
mongoose.model('Execution', FillOrCancelSchema);
mongoose.model('Registry', RegistrySchema);



