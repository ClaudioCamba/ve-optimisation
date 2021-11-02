let pznRegion = CLOUD_CONFIG.current_region.name,
    pznCategory = CLOUD_CONFIG.current_category.name,
    pznControl = CLOUD_CONFIG.dispatcher.controller;

if (pznControl === 'index'){ 
  console.log('HOME - REC'); // HOME
} else if (pznCategory === 'Christmas Gifts') { // If its Xmas page
  console.log('XMAS - REC'); // XMAS
} else { 
if (pznCategory !== null && pznRegion !== 'All Locations'){ // CAT & LOC
  console.log('CAT & LOC - REC');
} else if (pznRegion !== 'All Locations' && pznCategory === null){ // LOC
  console.log('LOC - REC');
} else if (pznRegion === 'All Locations' && pznCategory !== null){ // CAT
  console.log('CAT - REC');
} else {
  console.log('BACKUP - REC'); // BACKUP
}
} 

// Category
let catName = CLOUD_CONFIG.current_category.name,
    streId = 132850;

function getProducts(strategyId, categoryName) {
var realtimeRules = [{
  "id": -2,
  "query": {
    "conditions": [{
      "field": "categories", // Condition
      "arguments": [{
        "action": "CONTAINS", // Action type IS / IS_NOT / CONTAINS / EQ / GT / GTE / LT / LTE 
        "value": categoryName // Value of condition
      }]
    }]
  },
  "type": "include", // Include or exclude
  "slots": [] // Position in widget
}];

DYO.recommendationWidgetData(strategyId, {maxProducts: 12, realtimeRules: realtimeRules}, function(err, data) {
  console.log(data);
});
}
getProducts(streId, catName); // Fire function

// Location
let pznlocal = CLOUD_CONFIG.current_region.name;
    streId = 132850;

function getProducts(strategyId, location) {
var realtimeRules = [{
  "id": -2,
  "query": {
    "conditions": [{
      "field": "all_regions", // Condition
      "arguments": [{
        "action": "CONTAINS", // Action type IS / IS_NOT / CONTAINS / EQ / GT / GTE / LT / LTE 
        "value": location // Value of condition
      }]
    }]
  },
  "type": "include", // Include or exclude
  "slots": [] // Position in widget
}];

DYO.recommendationWidgetData(strategyId, {maxProducts: 12, realtimeRules: realtimeRules}, function(err, data) {
  console.log(data);
});
}
getProducts(streId, pznlocal); // Fire function

// Location and category
let catName = CLOUD_CONFIG.current_category.name,
    pznlocal = CLOUD_CONFIG.current_region.name;
    streId = 132850;

function getProducts(strategyId, categoryName, location) {
var realtimeRules = [{
  "id": -2,
  "query": {
    "conditions": [{
      "field": "categories", // Condition
      "arguments": [{
        "action": "CONTAINS", // Action type IS / IS_NOT / CONTAINS / EQ / GT / GTE / LT / LTE 
        "value": categoryName // Value of condition
      }]
    }, {
        "field": "all_regions", // Condition
        "arguments": [{
          "action": "CONTAINS",
          "value": location
        }]
      }]
  },
  "type": "include", // Include or exclude
  "slots": [] // Position in widget
}];

DYO.recommendationWidgetData(strategyId, {maxProducts: 12, realtimeRules: realtimeRules}, function(err, data) {
  console.log(data);
});
}
getProducts(streId, catName, pznlocal); // Fire Function
