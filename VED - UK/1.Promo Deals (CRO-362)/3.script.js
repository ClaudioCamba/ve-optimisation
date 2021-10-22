
// HTML to be appended into the page
let pznValues362 = {
'xmas' : {
    appendAfter : '.container > .row',
    pagecat : dataLayer[5].pageCategory,
    strategyID : 129739,
    recProducts : '',
    buttonLink : '#',
    
},
'bf' : {

}

}
// value selector
let pznVal = 'xmas';

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
   
    DYO.recommendationWidgetData(strategyId, {maxProducts: 10, realtimeRules: realtimeRules}, function(err, data) {
      pznInsertHtml(data);
    });
  }
  
getProducts(pznValues362[pznVal].strategyID,pznValues362[pznVal].pagecat);

// Insert HTML with data
function pznInsertHtml(data){

pznValues362[pznVal].recProducts = data;
// console.log(pznValues362[pznVal].recProducts.slots[0].item.image_url);

let pznRecProdHtml = [];

for (var i = 0; i < pznValues362[pznVal].recProducts.slots.length; i++){

    // Clean Before price, don't show if its the same
    let pznWasPrice;
    if (parseFloat(pznValues362[pznVal].recProducts.slots[i].item.was_price) === parseFloat(pznValues362[pznVal].recProducts.slots[i].item.dy_display_price)){
        // console.log('SAME PRICE');
        pznWasPrice = '';
    } else {
        pznWasPrice = 'WAS £'+parseFloat(pznValues362[pznVal].recProducts.slots[i].item.was_price).toFixed(2).replace(/\.0+$/,'')+'';
    }

    // Clean last 2 numbers
    let cleanDecimal = parseFloat(pznValues362[pznVal].recProducts.slots[i].item.dy_display_price).toFixed(2).replace(/\.0+$/,'');

    if (cleanDecimal.indexOf('.') > -1){
        cleanDecimal = cleanDecimal.split('');
        cleanDecimal.splice(cleanDecimal.indexOf('.')+1 , 0, '<span class="pzn-deci">');
        cleanDecimal.splice(cleanDecimal.length+1, 0, '</span>');
        cleanDecimal = cleanDecimal.join('').toString();
    }

    pznRecProdHtml.push(`
    <div class="prod-card" pos="`+i+`">
      <a href="`+pznValues362[pznVal].recProducts.slots[i].item.url+`">
        <div class="card-img">
          <div class="featured-flag white">23% OFF</div>
          <div class="featured-flag red">XMAS DEAL</div>
          <img alt="`+pznValues362[pznVal].recProducts.slots[i].item.name+`" src="`+pznValues362[pznVal].recProducts.slots[i].item.image_url+`">
        </div>
        <div class="card-copy">
          <div class="card-desc">
            <p>`+pznValues362[pznVal].recProducts.slots[i].item.name+`</p>
          </div>
          <p class="card-price">
            <span>`+'£'+cleanDecimal+`</span> 
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
    <button class="pzn-back">
      <span class="icon icon-angle-left"></span>
    </button>
    <button class="pzn-next">
      <span class="icon icon-angle-right"></span>
    </button>
    </div>
		<div class="content-wrap">
			<div class="promo-copy-cta">
				<h2>Christmas Deals</h2>
				<p class="txt-bold">Tis' the season for great deals</p>
				<p class="txt-reg">Gift somethinga little <br> extraordinary this year...</p>
                <a href="`+pznValues362[pznVal].buttonLink+`">See all deals</a>
			</div>
			<div class="promo-product">
            <div class="product-inner">`+pznRecProdHtml.join('').toString()+`</div>
			</div>
		</div>
        <div class="pzn-promo-bg">
            <img class="pzn-dsk pzn-santa-img" alt="Santa image" src="https://www.virginexperiencedays.co.uk/files/CD-santa-desktop.png">
            <img class="pzn-mob pzn-santa-img" alt="Santa image" src="https://www.virginexperiencedays.co.uk/files/CD-santa-mobile.png">
            <img class="pzn-dsk pzn-snow-bg" alt="Snow background" src="https://www.virginexperiencedays.co.uk/files/christmas-deal-bg-desktop.png">
            <img class="pzn-mob pzn-snow-bg" alt="Snow background" src="https://www.virginexperiencedays.co.uk/files/CD-bg-mobile.png">
        </div>
	</div>
</div>
`;

document.querySelector(pznValues362[pznVal].appendAfter).insertAdjacentHTML('afterbegin', elHtml);
//  console.log(data);

//  Scroll - class swap for nav buttons
function scrollClassSwap(){
    let wrapScrollWidth = document.querySelectorAll('.promo-product')[0].scrollWidth/100*70;

    if (Math.ceil(100*document.querySelectorAll('.promo-product')[0].scrollLeft/wrapScrollWidth) <= 5){
        document.querySelector('.pzn-prod-nav').classList.add('nav-right');
        document.querySelector('.pzn-prod-nav').classList.remove('nav-left');
    } else if (Math.ceil(100*document.querySelectorAll('.promo-product')[0].scrollLeft/wrapScrollWidth) >= 95){
        document.querySelector('.pzn-prod-nav').classList.remove('nav-right');
        document.querySelector('.pzn-prod-nav').classList.add('nav-left');
    } else {
        document.querySelector('.pzn-prod-nav').classList.remove('nav-left','nav-right');
    }
 }


// Scroll eventlistner
document.querySelectorAll('.promo-product')[0].addEventListener("scroll", function(){
    // Scroll class change
    scrollClassSwap();
    // Scroll santa hide
    if (window.innerWidth <= 640 && Math.ceil(100*this.scrollLeft/this.scrollWidth) >= 2.6){
      document.querySelectorAll('.pzn-mob.pzn-santa-img')[0].classList.add("pzn-hide");
    }
  })

// Click  - nav button eventlistner
 document.querySelectorAll('.pzn-prod-nav .pzn-back, .pzn-prod-nav .pzn-next').forEach(item => {
    item.addEventListener('click', event => {
    let pznProdSecWidth = document.querySelector('.product-inner').getBoundingClientRect(),
        pznProdCurPos = document.querySelector('.promo-product').scrollLeft,
        pznCard = document.querySelectorAll('.prod-card')[0];
        
    let pznCardStyle = pznCard.currentStyle || window.getComputedStyle(pznCard);

        // console.log(item);
      //handle click
      if (item.classList.contains('pzn-back')){
        document.querySelector('.promo-product').scrollLeft = pznProdCurPos - (pznProdSecWidth.width + parseFloat(pznCardStyle.marginRight));
     } else if (item.classList.contains('pzn-next')){
        document.querySelector('.promo-product').scrollLeft = pznProdCurPos + (pznProdSecWidth.width + parseFloat(pznCardStyle.marginRight));
     }
    })
  })

  // Scroll nav function
  scrollClassSwap();

// Add elipsis ... 
}
