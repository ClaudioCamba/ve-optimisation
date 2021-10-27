// HTML to be appended into the page
let pznValues362 = {
  'christmas' : { // christmas values
      // appendAfter : `.row.result-container`,
      appendPage : {
          'home' : `.homepage-section.homepage-egiftcard-section`, // Homepage append
          'special' : `.maincontent > .categoryPage`, // Special page append
          'category' : `.row.result-container`, // Category page append
          'xmas' : `.row.result-container` // Xmas page append
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
  },
  'black-friday' : { // black friday values
      // appendAfter : `.row.result-container`,
      // catAppendAfter : `.result-container > .col-xs-12.col-sm-9`, // Category page append
      appendPage : {
          'home' : `.homepage-section.homepage-egiftcard-section`, // Homepage append
          'category2' : `.row.result-container`, // Category page append outside result
          'special' : `.categoryPage > .container > .row`, // Special page append
          //'special' : `.maincontent > .categoryPage`, // Special page append
          'category' : `.result-container > .col-xs-12.col-sm-9`, // Category page append
          'xmas' : `.row.result-container` // Xmas page append
      },
      pagecat : window.pageName,
      strategyID : Math.round('${BF CM Strategy ID}'),
      recProducts : ``,
      title: `${BF CM Title}`,
      subtitle: ``,
      description: `${BF CM Description}`,
      btntext: `${BF CM Button Text}`,
      buttonLink : `${BF CM Button Link}`,
      whitetab: `${BF CM Red Label} `,
      theme: 'dark',
      redtab: ``,
      backgrounds: `
          <img class="pzn-logo-img" alt="${BF Logo Alt}" src="${BF Image Logo}">
          <img class="pzn-dsk pzn-snow-bg" alt="${BF BG Alt}" src="${BF BG Desktop}">
          <img class="pzn-mob pzn-snow-bg" alt="${BF BG Alt}" src="${BF BG Mobile}">
          `
  },
  'cyber-monday' : { // cyber monday values
      // appendAfter : `.row.result-container`,
      // catAppendAfter : `.result-container > .col-xs-12.col-sm-9`, // Category page append
      appendPage : {
          'home' : `.homepage-section.homepage-egiftcard-section`, // Homepage append
          'category2' : `.row.result-container`, // Category page append outside result
          // 'special2' : `.maincontent > .categoryPage`, // Special page append
          'special' : `.categoryPage > .container > .row`, // Special page append
          //'special' : `.maincontent > .categoryPage`, // Special page append
          'category' : `.result-container > .col-xs-12.col-sm-9`, // Category page append
          'xmas' : `.row.result-container` // Xmas page append
      },
      pagecat : window.pageName,
      strategyID : Math.round('${BF CM Strategy ID}'),
      recProducts : ``,
      title: `${BF CM Title}`,
      subtitle: ``,
      description: `${BF CM Description}`,
      btntext: `${BF CM Button Text}`,
      buttonLink : `${BF CM Button Link}`,
      whitetab: `${BF CM Red Label} `,
      theme: 'dark',
      redtab: ``,
      backgrounds: `
          <img class="pzn-logo-img" alt="${CM Logo Alt}" src="${CM Image Logo}">
          <img class="pzn-dsk pzn-snow-bg" alt="${CM BG Alt}" src="${CM BG Desktop}">
          <img class="pzn-mob pzn-snow-bg" alt="${CM BG Alt}" src="${CM BG Mobile}">
          `
  }
}

  // Control: value selector =======================================
  let promoEvent = '${Theme Option}', // christmas / black-friday / cyber-monday
      pageTypes = '', // Home / Category / Special / Xmas / Auto
      variationType = 'uncompressed', // Uncompressed / Compressed 
      xmasTime = Math.round('${Christmas BG Time}'), // 24 Hour format
      prodNumber = Math.round('${Number of Products}'), // Number of products for DY to pull
      xmasCat = '${Xmas Page Backup Category}', // xmas page category
      homeCat = '${homepage Backup Category}', // home page category
      backupCat = '${General Backup Category}', // backupcat if return is 0 products
      dealfilter = '${Promo Filter}';
  // Get Page Values ==================================================
  let pznRegion = CLOUD_CONFIG.current_region.name,
      pznCategory = CLOUD_CONFIG.current_category.name,
      pznControl = CLOUD_CONFIG.dispatcher.controller,
      pznCatReg = 'categories'; // all_regions | categories
   
  // Override values ==================================================
  if (pznControl === 'index'){
    pageTypes = 'home';
    pznValues362[promoEvent].pagecat = homeCat;
    overrideClean();
    console.log('HOME - REC'); // HOME
  } else if (pznCategory === 'Christmas Gifts') { // If its Xmas page
    pageTypes = 'xmas';
    pznValues362[promoEvent].pagecat = xmasCat;
    overrideClean();
    console.log('XMAS - REC'); // XMAS
  } else if (pznControl === 'category' || pznControl === 'region') {
    pageTypes = 'category';
    overrideClean();
    if (pznCategory !== null && pznRegion !== 'All Locations'){ // CAT & LOC
      console.log('CAT & LOC - REC');
      pznCatReg = 'catAndRegion';
    } else if (pznRegion !== 'All Locations' && pznCategory === null){ // LOC
      console.log('LOC - REC: '+pznRegion);
      pznCatReg = 'all_regions';
    } else if (pznRegion === 'All Locations' && pznCategory !== null){ // CAT
      console.log('CAT - REC: '+pznCategory);
      pznCatReg = 'categories';
    } else {
      console.log('BACKUP - REC: '+backupCat); // BACKUP
      pznValues362[promoEvent].pagecat = backupCat;
    }
  } 

  // Conditions depending on variation ==================================================
  function overrideClean(){
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
          if (pageTypes === 'home'){
              variationType = 'uncompressed'; // Overriding to only show uncompressed on homepage
          }
          if (variationType === 'catPageVar'){
              prodNumber = 3; // Overidding number of products if compressed
          }
          if (pageTypes === 'category'){
              if (variationType === 'uncompressed'){
                  pageTypes = 'category2'; // Overriding appending location
              } else {
                  pageTypes = 'category'; // Overriding appending location
              }
          }
      }
  }
  
    // Get Recommended products - LOC or CAT ==================================================
  function getProducts(strategyId, categoryOrLocation) {
    var realtimeRules = [{
      "id": -2,
      "query": {
        "conditions": [{
          "field": pznCatReg, // Condition
          "arguments": [{
            "action": "CONTAINS", // Action type IS / IS_NOT / CONTAINS / EQ / GT / GTE / LT / LTE 
            "value": categoryOrLocation // Value of condition
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
      // if (data.slots.length < 1){
      //   getProducts(pznValues362[promoEvent].strategyID,backupCat);
      // } else {
        pznInsertHtml(data);
      // } 
    });
  }
  
  // Get Recommended products - LOC & CAT ==================================================
  function getProductsTwo(strategyId, categoryName, locationName) {
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
              "value": locationName
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
              // if (data.slots.length < 1){
        //   getProducts(pznValues362[promoEvent].strategyID,backupCat);
        // } else {
          pznInsertHtml(data);
        // } 
      });
    }
  
  // Main function fire control
  if (pznControl === 'index'){
    if (pznRegion === 'All Locations'){
      console.log('Using backup category: '+pznValues362[promoEvent].pagecat);
      getProducts(pznValues362[promoEvent].strategyID,pznValues362[promoEvent].pagecat); // Get product via DY function
    } else {
      console.log('Using page region: '+pznRegion);
      pznCatReg = 'all_regions';
      getProducts(pznValues362[promoEvent].strategyID,pznRegion); // Get product via DY function
    }
    
  } else if (pznCategory === 'Christmas Gifts'){
    console.log('Using page category: '+pznCategory);
    getProducts(pznValues362[promoEvent].strategyID,xmasCat); // Get product via DY function
  } else if (pznCatReg === 'catAndRegion'){
    console.log('TEST1');
    getProductsTwo(pznValues362[promoEvent].strategyID,pznCategory,pznRegion);
  }else if (pznCatReg === 'categories'){
    console.log('Using page category: '+pznCategory);
    getProducts(pznValues362[promoEvent].strategyID,pznCategory); // Get product via DY function
  } else if (pznCatReg === 'all_regions'){
    console.log('Using page region: '+pznRegion);
    getProducts(pznValues362[promoEvent].strategyID,pznRegion); // Get product via DY function
  } else {
    getProducts(pznValues362[promoEvent].strategyID,backupCat); // Get product via DY function
  }


      
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
      } else if (parseFloat(pznValues362[promoEvent].recProducts.slots[i].item.was_price) === 0){
        pznWasPrice = '';
      } else {
          pznWasPrice = 'WAS $'+parseFloat(pznValues362[promoEvent].recProducts.slots[i].item.was_price).toFixed(2).replace(/\.0+$/,'')+'';
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
      
      if (savingsPercent === 0 || isNaN(savingsPercent)){
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
            <p class="card-loc"><i class="fa fa-map-marker"></i>`+pznValues362[promoEvent].recProducts.slots[i].item.location_description+`</p>
            <p class="card-price">
              <span>`+'$'+cleanDecimal+`</span> 
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
        <i class="fa fa-angle-left"></i>
      </button>
      <button class="pzn-next">
        <i class="fa fa-angle-right"></i>
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
          document.querySelector('.pzn-prod-nav').classList.add('navs-right');
          document.querySelector('.pzn-prod-nav').classList.remove('navs-left');
      } else if (Math.ceil(100*document.querySelectorAll('.promo-product')[0].scrollLeft/wrapScrollWidth) >= 95){
          document.querySelector('.pzn-prod-nav').classList.remove('navs-right');
          document.querySelector('.pzn-prod-nav').classList.add('navs-left');
      } else {
          document.querySelector('.pzn-prod-nav').classList.remove('navs-left','navs-right');
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
  

