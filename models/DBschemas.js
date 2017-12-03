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

// To be used inside SettingsSchema
const AssetSelectionSchema = new Schema ({
		asset_class : {type : String, required : true},
		instruments : {type : [String]},
		underlyings : {type : [String]},
}, {_id : false});

// To be used inside Portfolio Schema
const SettingsSchema = new Schema ({
		selected_assets : {type : [AssetSelectionSchema]},
		// other settings
}, {_id : false});


const AssetClassSchema = exports.AssetClassSchema = new Schema ({
	classname : {type : String, required : true, enum : Object.keys(ac)},
	derivative : {type : Boolean, required : true, default : false},
	symbol : {type : String, required : true},
	tradable : {type : Boolean, required : true},
});

var assetclass = mongoose.model('AssetClass', AssetClassSchema);
//var query = assetclass.find({}).select('derivative');
// TODO: query inside middleware in order to do validation

/* 
 * Middleware checking if the asset class symbol is consistent
 * with the asset class name as provided for by the "ac" map 
 */
AssetClassSchema.post('save', function(doc, next) {
	if (ac[doc.classname] != doc.symbol) {
		next(new Error('Asset class inconsistency!'));
	}
	assetclass.find({}, function(err, doc) {
		console.log(doc);
	});
	next();
});

const PortfolioSchema = exports.PortfolioSchema = new Schema ({

	symbol : {type : String, required : true},
	accounts : {type : [String], required : true},
	currency : {type : String, required : true},
	settings : {type : SettingsSchema},
});

/* 
 * Middleware checking if instruments and underlyings are mutually exclusive
 */
PortfolioSchema.post('save', function(doc, next) {
	if (doc.settings != undefined) {
		doc.settings.selected_assets.forEach(function(s) {
			if (s.instruments.length > 0 && s.underlyings.length > 0) {
				next(new Error('instruments and underlyings are mutually exclusive!'));
			}
		});
	}
	next();
});

const CashTransactionSchema = new Schema  ({
	account_id : {type : String, required : true, unique : true},
	date : {type : Date, required : true},
	type : {type : String, required : true},
	amount : {type : Number, required : true},
});


const AccountSchema = exports.AccountSchema = new Schema  ({
	account_id : {type : String, required : true, unique : true},
	broker_symbol : {type : String, required : true},
	bank : {type : String, required : true},
	currency : {type : String, required : true},
});

const BrokerSchema = exports.BrokerSchema = new Schema ({
	symbol : {type : String, required : true, unique : true},
	description : {type : String},
	// the fee schema
	// all details necessary for FIX connections

});

const ExchangeSchema = exports.ExchangeSchema = new Schema ({
	symbol : {type : String, required : true, unique : true},
	name : {type : String, required : true}
});

const BookSchema = exports.BookSchema = new Schema ({
	order_id : {type : String, required : true, unique : true},
	order_tag : {type : String}, // to be verified
	security_id : {type : String, required : true},
	execution_broker_symbol : {type : String, required : true},
	clearing_broker_symbol : {type : String, required : true},
	timestamp : {type : Date, required : true},
	quantity : {type : Number, required : true}, // Number or Object?
	price : {type : Number, required : true},
	portfolio_id : {type : String, required : true}

});

const BlotterSchema = exports.BlotterSchema = new Schema ({
	order_id : {type : String, required : true, unique : true},
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
	order_id : {type : String, required : true, unique : true},
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

const tickers = new Schema ({
	provider : {type : String, required : true, default : "own"},
	symbol : {type : String, required : true},
}, {_id : false});

/* 
 * Discriminator: there are two parts in any registry: the former is 
 * common to each registry (i.e. all fields in Registry_2_Schema) the latter
 * must change according to the asset class (e.g. EquitySchema, IndexSchema).
 * Both parts are glued together by the discriminatoryKey and the 
 * Registry_2_Schema assumes a different form according to the discriminatoryKey
 */
const RegistrySchema = exports.RegistrySchema = new Schema ({

	instrument_id : {type : String, required : true, unique : true},
	exchange_symbol : {type : String},
	tickers : {type : [tickers], required : true},
	tick_size : {type : Number, required : true},
	currency : {type : String, required : true},
}, {discriminatorKey: 'type'});

/*
 * Middleware: after saving it checks if for each registry
 * the ticker schema has at least the 'own' provider with a
 * non empty symbol 
 */
RegistrySchema.post('save', function(doc, next) {
	doc.tickers.forEach(function(t) {
		if (t.provider == 'own' && t.symbol != '') {
			next();
		}
		next(new Error('The "own" ticker must be provided!'))
	});
});

/* All schemas below are the 'polymorphic' part of the Registry Schema*/
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

const FutureSchema = exports.FutureSchema = new Schema (
	{class :
		{
			tick_value : {type : Number , required : true},
			underlying : {type : String, required : true},
			issuing_date : {type : Date},
			expiring_date : {type : Date, required : true},
			first_notice_date : {type : Date},
			settlement : {type : String, required : true},
		}
	}, 
	{discriminatorKey : 'type'}
);

const OptionSchema = exports.OptionSchema = new Schema (
	{class : 
		{
			multiplier : {type : Number , required : true},
			underlying : {type : String, required : true},
			issuing_date : {type : Date},
			expiring_date : {type : Date, required : true},
			strike : {type : Number, required : true},
			right : {type : String, required : true},
			settlement : {type : String, required : true},
			exercise_type : {type : String, required : true}
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

var registry = mongoose.model('Registry', RegistrySchema);

var equities = registry.discriminator('Equity', EquitySchema);
var futures = registry.discriminator('Future', FutureSchema);
var options = registry.discriminator('Option', OptionSchema);
var indeces = registry.discriminator('Index', IndexSchema);

// End Case 2 ---------------------------------------------------------------

mongoose.model('User', UserSchema);
mongoose.model('Portfolio', PortfolioSchema);
//var assetclass = mongoose.model('AssetClass', AssetClassSchema);
mongoose.model('Account', AccountSchema);
mongoose.model('Broker', BrokerSchema);
mongoose.model('Exchange', ExchangeSchema);
mongoose.model('Book', BookSchema);
mongoose.model('Blotter', BlotterSchema);
mongoose.model('Execution', FillOrCancelSchema);
mongoose.model('Registry', RegistrySchema);
mongoose.model('Future', FutureSchema);
mongoose.model('Option', OptionSchema);
mongoose.model('Equity', EquitySchema);
mongoose.model('Index', IndexSchema);