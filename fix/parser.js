var convert = require("xml-js")
var fs = require("fs")

FIX42_spec = fs.readFileSync("./FIX42.xml","utf8")

FIX42_spec = convert.xml2json(FIX42_spec, {compact: true})
FIX42_spec = JSON.parse(FIX42_spec)


let dict = {};
let tags = FIX42_spec.fix.fields.field;

for (let i=0; i<tags.length; i++){
	data = tags[i]._attributes;
	let name=data.name[0].toLowerCase()+data.name.slice(1);
	dict[data.number]=name
}

function tagsToNames(message){
	if (typeof message !== "object") return null;

	for (x in message){
		message[dict[x]]=message[x]
		delete message[x];
	}

	return message;
}


module.exports.tagsToNames = tagsToNames;


