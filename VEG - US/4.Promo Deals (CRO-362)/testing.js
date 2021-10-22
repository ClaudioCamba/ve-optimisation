let catName = CLOUD_CONFIG.current_category.name,
streId = 132850;

function getProducts(strategyId, categoryName) {
var realtimeRules = [{
  "id": -2,
  "query": {
    "conditions": [{
      "field": "categories", // Condition
      "arguments": [{
        "action": "IS", // Action type IS / IS_NOT / CONTAINS / EQ / GT / GTE / LT / LTE 
        "value": categoryName // Value of condition
      }]
    }]
  },
  "type": "include", // Include or exclude
  "slots": [] // Position in widget
}];

DYO.recommendationWidgetData(strategyId, {
    maxProducts: 12, 
    realtimeRules: realtimeRules
}, function(err, data) {
  console.log(data);
});
}
getProducts(streId, catName); 