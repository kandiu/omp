
// Dummie module: TODO implement FIX interface

module.exports.processOrder = function(order) {

    let logText = "\n  ********************\n" +
                    "  * PROCESSING ORDER *\n" +
                    "  ********************\n\n";

   
    for (let field in order)
        logText += "  " + field + " : " + order[field] + "\n";

    logText += "\n";

    console.log(logText);
}
