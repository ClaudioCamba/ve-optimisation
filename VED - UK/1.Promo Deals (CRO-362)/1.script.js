
// HTML to be appended into the page
let pznElAppendAfter = '.container > .row',
    pznPageCat = dataLayer[5].pageCategory,
    pznStrategyId = 129739,
    pznRecProducts = '',
    pznSeeAllLink = '#';

// Get Recommended products
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
   
    DYO.recommendationWidgetData(strategyId, {maxProducts: 12, realtimeRules: realtimeRules}, function(err, data) {
      pznInsertHtml(data);
    });
  }
  
getProducts(pznStrategyId,pznPageCat);

// Insert HTML with data
function pznInsertHtml(data){

pznRecProducts = data;
// console.log(pznRecProducts.slots[0].item.image_url);

let pznRecProdHtml = [];

for (var i = 0; i < pznRecProducts.slots.length; i++){

    // Clean Before price, don't show if its the same
    let pznWasPrice;
    if (parseFloat(pznRecProducts.slots[i].item.was_price) === parseFloat(pznRecProducts.slots[i].item.dy_display_price)){
        // console.log('SAME PRICE');
        pznWasPrice = '';
    } else {
        pznWasPrice = '£'+parseFloat(pznRecProducts.slots[i].item.was_price).toFixed(2).replace(/\.0+$/,'')+'';
    }

    pznRecProdHtml.push(`
    <div class="prod-card" pos="`+i+`">
      <a href="`+pznRecProducts.slots[i].item.url+`">
        <div class="card-img">
          <div class="featured-flag white">23% OFF</div>
          <div class="featured-flag red">XMAS DEAL</div>
          <img alt="`+pznRecProducts.slots[i].item.name+`" src="`+pznRecProducts.slots[i].item.image_url+`">
        </div>
        <div class="card-copy">
          <div class="card-desc">
            <p>`+pznRecProducts.slots[i].item.name+`</p>
          </div>
          <p class="card-price">
            <span>`+'£'+parseFloat(pznRecProducts.slots[i].item.dy_display_price).toFixed(2).replace(/\.0+$/,'')+`</span> 
            <span>`+pznWasPrice+`</span>
          </p>
        </div>
      </a>
    </div>`);
    // console.log(pznRecProdHtml.toString());
}

let elHtml = `
    <div class="pzn-xmas-promo">
	<div class="promo-inner-wrap">
  <div class="pzn-prod-nav">
  <button class="pzn-back">&#60;</button>
  <button class="pzn-next">&#62;</button>
</div>
		<div class="content-wrap">
			<div class="promo-copy-cta">
				<h2>Christmas Deals</h2>
				<p class="txt-bold">Tis' the season for great deals</p>
				<p class="txt-reg">Gift somethinga little <br> extraordinary this year...</p>
                <a href="`+pznSeeAllLink+`">See all deals</a>
			</div>
			<div class="promo-product">
            <div class="product-inner">`+pznRecProdHtml.join('').toString()+`</div>
			</div>
		</div>
        <div class="pzn-promo-bg">
            <img class="pzn-dsk pzn-santa-img" alt="Santa image" src="https://www.virginexperiencedays.co.uk/files/CD-santa-desktop.png">
            <img class="pzn-mob pzn-santa-img" alt="Santa image" src="https://www.virginexperiencedays.co.uk/files/CD-santa-mobile.png">
            <img class="pzn-dsk pzn-snow-bg" alt="Snow background" src="https://www.virginexperiencedays.co.uk/files/CD-bg-desktop.png">
            <img class="pzn-mob pzn-snow-bg" alt="Snow background" src="https://www.virginexperiencedays.co.uk/files/CD-bg-mobile.png">
        </div>
	</div>
</div>
`;

document.querySelector(pznElAppendAfter).insertAdjacentHTML('afterbegin', elHtml);
 console.log(data);

// Detect scroll and hide santa image
  document.querySelectorAll('.promo-product')[0].addEventListener("scroll", function(){
    if (window.innerWidth <= 640){
      document.querySelectorAll('.pzn-mob.pzn-santa-img')[0].classList.add("pzn-hide");
    }
  })

 document.querySelectorAll('.pzn-prod-nav .pzn-back, .pzn-prod-nav .pzn-next').forEach(item => {
    item.addEventListener('click', event => {
    let pznProdSecWidth = document.querySelector('.product-inner').getBoundingClientRect(),
        pznProdCurPos = document.querySelector('.promo-product').scrollLeft;
      //handle click
      if (item.classList.contains('pzn-back')){
        document.querySelector('.promo-product').scrollLeft = pznProdCurPos - pznProdSecWidth.width;
     } else if (item.classList.contains('pzn-next')){
        document.querySelector('.promo-product').scrollLeft = pznProdCurPos + pznProdSecWidth.width;
     }
    })
  })

}
