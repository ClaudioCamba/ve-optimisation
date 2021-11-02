// HTML to be appended into the page
let pznValues362 = {
    'christmas' : { // christmas values
        // appendAfter : `.container > .row`,
        appendPage : {
            'home' : `.container > .categoryBoxes`, // Homepage append
            'special' : `.maincontent > .categoryPage`, // Special page append
            'category' : `.container > .row`, // Category page append
            'xmas' : `#categorypage > div:nth-of-type(2)` // Xmas page append
        },
        pagecat : window.pageName,
        strategyID : Math.round('${Christmas Strategy ID}'),
        recProducts : ``,
        title: `${Christmas Title}`,
        subtitle: `${Christmas Subtitle}`,
        description: `${Christmas Description}`,
        btntext: `${Christmas Button Text}`,
        buttonLink : `${Christmas Button Link}`,
        whitetab: `${Christmas White Label}`,
        redtab: `${Christmas Red Label}`,
        theme: `light`,
        time: new Date().getHours(),
        backgrounds: `
            <img class="pzn-dsk pzn-santa-img" alt="${Santa Image Alt}" src="${Santa Desktop Image}">
            <img class="pzn-mob pzn-santa-img" alt="${Santa Image Alt}" src="${Santa Mobile Image}">
            <img class="pzn-dsk pzn-snow-bg" alt="${Christmas BG Day Alt}" src="${Christmas BG Desktop Day}">
            <img class="pzn-mob pzn-snow-bg" alt="${Christmas BG Day Alt}" src="${Christmas BG Mobile Day}">
            `,
        backgrounds2: `
          <img class="pzn-dsk pzn-santa-img" alt="${Santa Image Alt}" src="${Santa Desktop Image}">
          <img class="pzn-mob pzn-santa-img" alt="${Santa Image Alt}" src="${Santa Mobile Image}">
          <img class="pzn-dsk pzn-snow-bg" alt="${Christmas BG Night Alt}" src="${Christmas BG Desktop Night}">
          <img class="pzn-mob pzn-snow-bg" alt="${Christmas BG Night Alt}" src="${Christmas BG Mobile Night}">
        `
    }
  }
  
    // Control: value selector =======================================
    let promoEvent = 'christmas', // christmas / black-friday / cyber-monday
        pageTypes = '', // Home / Category / Special / Xmas / Auto
        variationType = '${Module Variation}', // Uncompressed / Compressed 
        xmasTime = Math.round('${Christmas BG Time}'), // 24 Hour format
        prodNumber = Math.round('${Number of Products}'), // Number of products for DY to pull
        xmasCat = '${Xmas Page Backup Category}', // xmas page category
        specialCat = '${Special Page Backup Category}', // special page category
        homeCat = '${homepage Backup Category}', // home page category
        backupCat = '${General Backup Category}', // backupcat if return is 0 products
        dealfilter = '${Promo Filter}';
    // ================================================================
    
    // Override values ================================================================
      // Auto select position depending on page
      if (window.location.pathname.indexOf('/christmas-gifts') > -1){
        pageTypes = 'xmas';
      } else if (window.pageName === 'Special Offers'){
        pageTypes = 'special';
      } else if (window.pageType === 'Home'){
        pageTypes = 'home';
      } else {
        pageTypes = 'category';
      }
    
    // Christmas Variation Modifications
    if (promoEvent==='christmas'){
        if (pznValues362[promoEvent].time >= xmasTime){
            pznValues362[promoEvent].backgrounds =  pznValues362[promoEvent].backgrounds2;
            pznValues362[promoEvent].theme = 'dark';
        }
  
        // Override if its Xmas promo
        variationType = 'uncompressed';
    }
  
    // Black Friday & Cyber Monday Variation Modifications
    if (promoEvent==='black-friday' || promoEvent==='cyber-monday'){
        
        if (pageTypes === 'home' || pageTypes === 'xmas'){
            //console.log('Testing 1');
            variationType = 'uncompressed';
        }
  
        if (variationType === 'catPageVar'){
            console.log('Testing 2');
            prodNumber = 3; // Overidding number of products if compressed
        }
        
        if (pageTypes === 'special' || pageTypes === 'category'){
            if (variationType === 'uncompressed'){
                console.log('Testing 3');
            
                if (pageTypes === 'special'){
                    pageTypes = 'special';
                } else {
                    pageTypes = 'category2'; // Overriding appending location
                }
  
            } else {
                pageTypes = 'category'; // Overriding appending location
            }
        }
    }
    
    // Checking page category and overriding 
    if (typeof window.pageName != "undefined") { // Check if page category exists
      if (window.pageName === 'Special Offers'){
        pznValues362[promoEvent].pagecat = specialCat;
      } else {
        pznValues362[promoEvent].pagecat = window.pageName;
      }
    } else {
      if (window.location.pathname.indexOf('/christmas-gifts') > -1){
        pznValues362[promoEvent].pagecat = xmasCat;
      } else if (window.pageType === 'Home'){
        pznValues362[promoEvent].pagecat = homeCat;
      } else {
        pznValues362[promoEvent].pagecat = backupCat;
      }
    }
    
    // ================================================================================
    
    // Get Recommended products
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
            },{
              "field": "keywords", // Condition
              "arguments": [{
                  "action": "CONTAINS",
                  "value": dealfilter
              }]
            }]
          },
          "type": "include", // Include or exclude
          "slots": [] // Position in widget
        }];
        
        DYO.recommendationWidgetData(strategyId, {maxProducts: prodNumber, realtimeRules: realtimeRules}, function(err, data) {
          console.log(pznValues362[promoEvent].pagecat);
          console.log(window.pageName);
          if (data.slots.length < 1){
            dealfilter = '';
            getProducts(pznValues362[promoEvent].strategyID,backupCat);
          } else {
            pznInsertHtml(data);
          } 
        });
      }
    
    // Get product via DY function
    getProducts(pznValues362[promoEvent].strategyID,pznValues362[promoEvent].pagecat);
    
    // Insert HTML with data
    function pznInsertHtml(data){
        console.log(data);
    // Store data
    pznValues362[promoEvent].recProducts = data;
    
    let pznRecProdHtml = [];
  
    // Loop products and make adjustments 
    for (var i = 0; i < pznValues362[promoEvent].recProducts.slots.length; i++){
  
  
        // Clean Before price, don't show if its the same
        let pznWasPrice;
        if (parseFloat(pznValues362[promoEvent].recProducts.slots[i].item.was_price) === parseFloat(pznValues362[promoEvent].recProducts.slots[i].item.dy_display_price)){
            pznWasPrice = '';
        } else {
            pznWasPrice = 'WAS £'+parseFloat(pznValues362[promoEvent].recProducts.slots[i].item.was_price).toFixed(2).replace(/\.0+$/,'')+'';
        }
    
        // Clean last 2 numbers
        let cleanDecimal = parseFloat(pznValues362[promoEvent].recProducts.slots[i].item.dy_display_price).toFixed(2).replace(/\.0+$/,'');
        // Wrap decimals
        if (cleanDecimal.indexOf('.') > -1){
            cleanDecimal = cleanDecimal.split('');
            cleanDecimal.splice(cleanDecimal.indexOf('.')+1 , 0, '<span class="pzn-deci">');
            cleanDecimal.splice(cleanDecimal.length+1, 0, '</span>');
            cleanDecimal = cleanDecimal.join('').toString();
        }
  
        // Clean savings
        let savingsPercent = parseFloat(data.slots[i].item.saving_amount),
            offerMsg = '';
  
        if (savingsPercent===0){
            savingsPercent = '';
        } else {
            if (promoEvent==='christmas'){
                savingsPercent = Math.floor(savingsPercent)+pznValues362[promoEvent].whitetab;
                offerMsg = pznValues362[promoEvent].redtab;
            } else {
                // savingsPercent = pznValues362[promoEvent].whitetab+Math.floor(savingsPercent)+'%'; // Round down saving %
                savingsPercent = pznValues362[promoEvent].whitetab+Math.round(savingsPercent)+'%'; // Round up/down saving %
            }
        }
  
    // Push card into module 
        pznRecProdHtml.push(`
        <div class="prod-card" pos="`+i+`">
          <a href="`+pznValues362[promoEvent].recProducts.slots[i].item.url+`">
            <div class="card-img">
              <div class="featured-flag white">`+savingsPercent+`</div>
              <div class="featured-flag red">`+offerMsg+`</div>
              <img alt="`+pznValues362[promoEvent].recProducts.slots[i].item.name+`" src="`+pznValues362[promoEvent].recProducts.slots[i].item.image_url+`">
            </div>
            <div class="card-copy">
              <div class="card-desc">
                <p>`+pznValues362[promoEvent].recProducts.slots[i].item.name+`</p>
              </div>
              <p class="card-price">
                <span>`+'£'+cleanDecimal+`</span> 
                <span>`+pznWasPrice+`</span>
              </p>
            </div>
          </a>
        </div>`);
    }
    
    // Module HTML 
    let elHtml = `
        <div class="`+variationType+` pagetype-`+pageTypes+` pzn-deal-promo `+promoEvent+` `+pznValues362[promoEvent].theme+`">
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
                    <h2>`+pznValues362[promoEvent].title+`</h2>
                    <p class="txt-bold">`+pznValues362[promoEvent].subtitle+`</p>
                    <p class="txt-reg">`+pznValues362[promoEvent].description+`</p>
                    <a href="`+pznValues362[promoEvent].buttonLink+`">`+pznValues362[promoEvent].btntext+`</a>
                </div>
                <div class="promo-product">
                <div class="product-inner">`+pznRecProdHtml.join('').toString()+`</div>
                </div>
            </div>
            <div class="pzn-promo-bg">
                `+pznValues362[promoEvent].backgrounds+`
            </div>
        </div>
        </div>
    `;
    console.log(pznValues362[promoEvent].appendPage[pageTypes]);
    document.querySelector(pznValues362[promoEvent].appendPage[pageTypes]).insertAdjacentHTML('afterbegin', elHtml);
    
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
        if (window.innerWidth <= 640 && Math.ceil(100*this.scrollLeft/this.scrollWidth) >= 2.6 && promoEvent === 'christmas'){
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
  
          // Handle click
          if (item.classList.contains('pzn-back')){
            document.querySelector('.promo-product').scrollLeft = pznProdCurPos - (pznProdSecWidth.width + parseFloat(pznCardStyle.marginRight));
         } else if (item.classList.contains('pzn-next')){
            document.querySelector('.promo-product').scrollLeft = pznProdCurPos + (pznProdSecWidth.width + parseFloat(pznCardStyle.marginRight));
         }
        })
      })
    
    // Scroll nav function
    scrollClassSwap();
    
    }
  