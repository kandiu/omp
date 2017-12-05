const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ac = {
	Equity : 'STK',
	Future : 'FUT',
	Option : 'OPT',
	Index  : 'IDX',
};

const UserSchema = exports.UserSchema = new Schema ({

	name : {type : String, required : true},
	description : {type : String},
	portfolios : {type : [String], required : true}

});

// const AssetSelectionSchema = new Schema ({
// 		asset_class : {type : String, required : true},
// 		instruments : {type : [String], required : true}
// });

// // To be used inside Portfolio Schema
// const SettingsSchema = new Schema ({
// 		selected_assets : {type : [AssetSelectionSchema]},
// 		// other settings
// });

const PortfolioSchema = exports.PortfolioSchema = new Schema ({

	portfolio_id : {type : String, required : true},
	accounts : {type : [String], required : true},
	settings : {
	 	selected_assets : 
        [{
	 		asset_class : {type : String, enum : Object.keys(ac)},
	 		// how to contraint oneOf underlyings and instruments
	 		// and only if the asset class is a derivative, otherwise
	 		// only instrument is allowed
	 		underlyings : {type : [String]},
	 		instruments : {type : [String]},
	 	}]
	}
});

const AssetClassSchema = exports.AssetClassSchema = new Schema ({
	classname : {type : String, required : true, enum : Object.keys(ac)},
	derivative : {type : Boolean, required : true, default : false},
	symbol : {type : String, required : true},
	tradable : {type : Boolean, required : true},
});

AssetClassSchema.post('validate', function(doc) {
	if (ac[doc.classname] != doc.symbol) {
		throw new Error('Asset class inconsistency!');
	}
});

/* TODO : validation check if all elements of ac object are actually into the 
   AssetClassSchema */
// AssetClassSchema.post('find', function(result) {
// 	console.log(result.count());
// });

const CashTransactionSchema = new Schema  ({
	account_id : {type : String, required : true, unique : true},
	date : {type : Date, required : true},
	type : {type : String, required : true},
	amount : {type : Number, required : true},
});


const AccountSchema = exports.AccountSchema = new Schema  ({
	account_id : {type : String, required : true},
	broker_id : {type : String, required : true},
	bank : {type : String, required : true},
	currency : {type : String, required : true},
	//transactions : {type : [CashTransactionSchema], required : true}
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

/* TODO : validation check if at least the "own" field is present */
const tickers = new Schema ({
	provider : {type : String, 
		       //  validate : {
		       //    isAsync : true,
		       //    validator : function(v, cb) {
		       //      setTimeout(function() {
		       //        var checkInternal = v.some(x => x == 'own');
		       //        var msg = 'internal ticker must be specified!';
		       //        cb(checkInternal.test(v), msg);
		       //      }, 5);
		       //    },
		      	// },
		        required : true, default : "own"},
	symbol : {type : String, required : true},
});

/* 
 * Problem: the "class" field should 'polimorphically' be populated 
 * by different asset classes schemas each one with its own contents
 * (e.g. futures asset class has an "expiring_date" field, equities not)
 * Three solutions: 0) Mixed; 1) Population; 2) Discriminators
 */

// Begin Case 0 ---------------------------------------------------------

/* 
 * 0) Mixed solution: the field "class" is an Object. Drawback: 
 * it can be populated by whatever object and no validation is possible
 */
const RegistrySchema = exports.RegistrySchema = new Schema ({

	instrument_id : {type : String, required : true},
	exchange_id : {type : String},
	//tickers : {type : Object, required : true},
	tickers : {type : [tickers], required : true},
	tick_size : {type : Number, required : true},
	currency : {type : String, required : true},
	class : {type : Object, required : true}

});

// All schema up to Currency should be nested into the class field
const Option = new Schema ({

	//type : {type : String, required : true},
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

	//type : {type : String, required : true},
	right : {type : String, required : true},
	isin : {type : String , required : true},
	description : {type : String},
	country : {type : String},
	industry : {type : String},
	supersector : {type : String},
	sector : {type : String}
});

const Bond = new Schema ({

	//type : {type : String, required : true},
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

	//type : {type : String, required : true},
	asset_class : {type : String, required : true},
	country : {type : String, required : true},
	industry : {type : String},
	supersector : {type : String},
	sector : {type : String}
	
});

const Currency = new Schema ({

	//type : {type : String, required : true},
	isin : {type : String , required : true},
	country : {type : String}
	
});

// End Case 0 ------------------------------------------------------------

// Begin Case 1 ---------------------------------------------------------- 

/* 
 * 1) Population: the field "class" has a "type" field that track the path
 * the Registry Schem must follow in order to find the correct Schema that
 * is supposed to populate the class field. The link between the two is 
 * guaranted by the _id
 */
const Registry_1_Schema = exports.Registry_1_Schema = new Schema ({

	instrument_id : {type : String, required : true},
	exchange_id : {type : String},
	tickers : {type : [tickers], required : true},
	tick_size : {type : Number, required : true},
	currency : {type : String, required : true},
	class : {
		type : {type: String, enum : Object.keys(ac)},
		item : {type : Schema.Types.ObjectId, refPath : 'class.type'},
	}
});

const FutureSchema = exports.FutureSchema = new Schema ({

	tick_value : {type : Number , required : true},
	underlying : {type : String, required : true},
	issuing_date : {type : Date},
	expiring_date : {type : Date, required : true},
	first_notice_date : {type : Date},
	settlement : {type : String, required : true}
	
});

// End Case 1 ---------------------------------------------------------------

// Begin Case 2 -------------------------------------------------------------

/* 
 * 2) Discriminator: there are two parts in any registry: the former is 
 * common to each registry (i.e. all fields in Registry_2_Schema) the latter
 * must change according to the asset class (e.g. EquitySchema, IndexSchema).
 * Both parts are glued together by the discriminatoryKey and the 
 * Registry_2_Schema assumes a different form according to the discriminatoryKey
 */
const Registry_2_Schema = exports.Registry_2_Schema = new Schema ({

	instrument_id : {type : String, required : true},
	exchange_id : {type : String},
	tickers : {type : [tickers], required : true},
	tick_size : {type : Number, required : true},
	currency : {type : String, required : true},
}, {discriminatorKey: 'type'});

var Registry2 = mongoose.model('Registry2', Registry_2_Schema);

const EquitySchema = exports.EquitySchema = new Schema (
	{class : 
		{
			right : {type : String, required : true},
			isin : {type : String , required : true},
			description : {type : String},
			country : {type : String},
			industry : {type : String},
			supersector : {type : String},
			sector : {type : String}
		}
	}, 
	{discriminatorKey : 'type'}
);

const IndexSchema = exports.IndexSchema = new Schema (
	{class : 
		{
			asset_class : {type : String, required : true},
			country : {type : String, required : true},
			industry : {type : String},
			supersector : {type : String},
			sector : {type : String}
		}
	}, 
	{discriminatorKey : 'type'}
);

var EquityRegistry = Registry2.discriminator('Equity', EquitySchema);
var IndexRegistry = Registry2.discriminator('Index', IndexSchema);

// End Case 2 ---------------------------------------------------------------

mongoose.model('User', UserSchema);
mongoose.model('Portfolio', PortfolioSchema);
mongoose.model('AssetClass', AssetClassSchema);
mongoose.model('Account', AccountSchema);
mongoose.model('Broker', BrokerSchema);
mongoose.model('Book', BookSchema);
mongoose.model('Blotter', BlotterSchema);
mongoose.model('Execution', FillOrCancelSchema);
mongoose.model('Registry', RegistrySchema);
mongoose.model('Registry1', Registry_1_Schema);
mongoose.model('Future', FutureSchema);
mongoose.model('Equity', EquitySchema);
mongoose.model('Index', IndexSchema);