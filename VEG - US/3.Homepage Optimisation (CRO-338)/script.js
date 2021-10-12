// Variables and controls
let veg338 = {
    body : document.querySelector('body'),
	searchtool : {
		searchHide : false,  // true = Hide / false = Show
		searchMove : false, // true = Move below category sec / false = stay
		searchToolModule : document.querySelector('.container-fluid.search-experiences-hp'),
		searchToolParent:  document.querySelector('.homepage-hero.homepage-section'),
		brandInfoMod : document.querySelector('.homepage-ved-inner.container')
	},
	recommendation: {
		strategyId: 130129,
		categoryName : 'Driving Experiences',
		recModScroll : true, // true = scroll / false = grid
		recomData : [],
		cardHolder : []
	},
	categorymodule: {
		categoryMod : document.querySelector('.homepage-popular.homepage-categories'),
		egiftMod : document.querySelector('.homepage-section.homepage-egiftcard-section')
	}
}
// Append activity class to body
veg338.body.classList.add('veg338');

// Search tool deciding -------------------------------------------------------------------
 if (veg338.searchtool.searchHide){
    veg338.searchtool.searchToolModule.style.display = 'none'
	console.log('Hide Dont move');
 } else if (veg338.searchtool.searchMove) {
	veg338.body.classList.add('rec-search-move');
	veg338.searchtool.brandInfoMod.before(veg338.searchtool.searchToolModule);
	console.log('Show move');
 } else {
	console.log('Stay as is');
 }


 // Move category module ------------------------------------------------------------------
 veg338.searchtool.searchToolParent.after(veg338.categorymodule.egiftMod);
 veg338.searchtool.searchToolParent.after(veg338.categorymodule.categoryMod);

 // Get Recommended products --------------------------------------------------------------
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
      "slots": [1, 2, 3] // Position in widget
    }];
   
    DYO.recommendationWidgetData(strategyId, {maxProducts: 5, realtimeRules: realtimeRules}, function(err, data) {
	  recomModuleAppend(data);
    });
  }

function recomModuleAppend(data){

	let recomData = data;

	for (var o=0; o < recomData.slots.length; o++){
		// console.log(recomData.slots[o]);
		veg338.recommendation.cardHolder.push(`
			<li class="rec-card">
				<a href="`+recomData.slots[o].item.url+`">
					<div class="rec-img"><img alt="`+recomData.slots[o].item.name+`" src="`+recomData.slots[o].item.image_url+`"></div>
					<div class="rec-titles">
						<p>`+recomData.slots[o].item.name+`</p>
					</div>
					<div class="rec-details">
						<p class="rec-card-currentprice">$`+recomData.slots[o].item.dy_display_price+`</p>
						<p class="rec-card-location">`+recomData.slots[o].item.location_description+`</p>
					</div>
				</a>
			</li>
		`);
	}

	let recomModule = `
		<div class="pzn-recsec">
			<div class="inner-recsec">
				<div class="recsec-title">
					<h2>You may also like...</h2>
				</div>
				<div class="rec-slider-nav">
				<button class="nav-left">
					<i class="fa fa-angle-left"></i>
				</button>
					<button class="nav-right">
						<i class="fa fa-angle-right"></i>
					</button>
				</div>
				<div class="recsec-cards">
					<ul class="recsec-cards-inner">
						`+veg338.recommendation.cardHolder.join('').toString()+`
					</ul>
				</div>
			</div>
		</div>
	`;

	// Append Recommendation module
	veg338.searchtool.searchToolParent.insertAdjacentHTML('afterend', recomModule);

	// Add scroll styling for max-width 991
	if (veg338.recommendation.recModScroll){
		veg338.body.classList.add('rec-scroll');
	} else {
		veg338.body.classList.add('rec-grid');
	}

	// Scroll Nav function 
	document.querySelectorAll('.rec-slider-nav .nav-left, .rec-slider-nav .nav-right').forEach(item => {
		item.addEventListener('click', event => {
		let pznProdCurPos = document.querySelector('.recsec-cards').scrollLeft,
			vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)

		  //handle click
		  if (item.classList.contains('nav-left')){
			document.querySelector('.recsec-cards').scrollLeft = pznProdCurPos - vw;
		 } else if (item.classList.contains('nav-right')){
			document.querySelector('.recsec-cards').scrollLeft = pznProdCurPos + vw;
		 }
		})
	  })
}

// Get Products
getProducts(veg338.recommendation.strategyId,veg338.recommendation.categoryName);
//  DYO.recommendationWidgetData(130129,{},function(error, data) { /* code */ })