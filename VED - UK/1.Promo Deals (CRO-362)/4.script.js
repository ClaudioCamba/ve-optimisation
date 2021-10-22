// HTML to be appended into the page
let pznValues362 = {
    'christmas' : { // christmas values
        appendAfter : `.container > .row`,
        pagecat : dataLayer[5].pageCategory,
        strategyID : 129739,
        recProducts : ``,
        title: `Christmas Deals`,
        subtitle: `Tis' the season for great deals`,
        description: `Gift somethinga little <br> extraordinary this year...`,
        btntext: `SEE ALL DEALS`,
        buttonLink : `#`,
        whitetab: `% OFF`,
        redtab: `XMAS DEAL`,
        theme: `light`,
        time: new Date().getHours(),
        backgrounds: `
            <img class="pzn-dsk pzn-santa-img" alt="Santa image" src="https://www.virginexperiencedays.co.uk/files/CD-santa-desktop.png">
            <img class="pzn-mob pzn-santa-img" alt="Santa image" src="https://www.virginexperiencedays.co.uk/files/CD-santa-mobile.png">
            <img class="pzn-dsk pzn-snow-bg" alt="Snow background" src="https://www.virginexperiencedays.co.uk/files/christmas-deal-bg-desktop.png">
            <img class="pzn-mob pzn-snow-bg" alt="Snow background" src="https://www.virginexperiencedays.co.uk/files/christmas-deal-bg-mobile.png">
            `
    },
    'black-friday' : { // black friday values
        appendAfter : `.container > .row`,
        pagecat : dataLayer[5].pageCategory,
        strategyID : 129739,
        recProducts : ``,
        title: `THE LATEST DEALS`,
        subtitle: ``,
        description: `With new deals being released regularly,<br> be sure to check back often.`,
        btntext: `SIGN ME UP`,
        buttonLink : `#`,
        whitetab: `SAVE `,
        theme: 'dark',
        redtab: ``,
        backgrounds: `
            <img class="pzn-logo-img" alt="black friday logo" src="https://www.virginexperiencedays.co.uk/files/blackfriday-logo.png">
            <img class="pzn-dsk pzn-snow-bg" alt="black friday background" src="https://www.virginexperiencedays.co.uk/files/blackfriday-deal-bg-desktop.png">
            <img class="pzn-mob pzn-snow-bg" alt="black friday background" src="https://www.virginexperiencedays.co.uk/files/blackfriday-deal-bg-mobile.png">
            `
        
    },
    'cyber-monday' : { // cyber monday values
        appendAfter : `.container > .row`,
        pagecat : dataLayer[5].pageCategory,
        strategyID : 129739,
        recProducts : ``,
        title: `THE LATEST DEALS`,
        subtitle: ``,
        description: `With new deals being released regularly,<br> be sure to check back often.`,
        btntext: `SIGN ME UP`,
        buttonLink : `#`,
        whitetab: `SAVE `,
        theme: 'dark',
        redtab: ``,
        backgrounds: `
            <img class="pzn-logo-img" alt="cyber monday logo" src="https://www.virginexperiencedays.co.uk/files/cybermonday-logo.png">
            <img class="pzn-dsk pzn-snow-bg" alt="cyber monday background" src="https://www.virginexperiencedays.co.uk/files/cybermonday-deal-bg-desktop.png">
            <img class="pzn-mob pzn-snow-bg" alt="cyber monday background" src="https://www.virginexperiencedays.co.uk/files/cybermonday-deal-bg-mobile.png">
            `
        
    }
}

    // Control: value selector -------------------------------
    let pznVal = 'christmas'; // christmas / black-friday / cyber-monday
    // -------------------------------------------------------
    // Christmas dynamic background
    if (pznVal==='christmas'){
        console.log(pznValues362[pznVal].time);
        if (pznValues362[pznVal].time >= 18){
            pznValues362[pznVal].backgrounds =  pznValues362[pznVal].backgrounds.replaceAll('christmas-deal-bg', 'christmas-deal-bg2');
            pznValues362[pznVal].theme = 'dark';
        }
    }

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
    
    // Get product via DY function
    getProducts(pznValues362[pznVal].strategyID,pznValues362[pznVal].pagecat);
    
    // Insert HTML with data
    function pznInsertHtml(data){

    // Store data
    pznValues362[pznVal].recProducts = data;
    
    let pznRecProdHtml = [];

    // Loop products and make adjustments 
    for (var i = 0; i < pznValues362[pznVal].recProducts.slots.length; i++){


        // Clean Before price, don't show if its the same
        let pznWasPrice;
        if (parseFloat(pznValues362[pznVal].recProducts.slots[i].item.was_price) === parseFloat(pznValues362[pznVal].recProducts.slots[i].item.dy_display_price)){
            pznWasPrice = '';
        } else {
            pznWasPrice = 'WAS £'+parseFloat(pznValues362[pznVal].recProducts.slots[i].item.was_price).toFixed(2).replace(/\.0+$/,'')+'';
        }
    
        // Clean last 2 numbers
        let cleanDecimal = parseFloat(pznValues362[pznVal].recProducts.slots[i].item.dy_display_price).toFixed(2).replace(/\.0+$/,'');
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
            if (pznVal==='christmas'){
                savingsPercent = Math.floor(savingsPercent)+pznValues362[pznVal].whitetab;
                offerMsg = pznValues362[pznVal].redtab;
            } else {
                savingsPercent = pznValues362[pznVal].whitetab+Math.floor(savingsPercent)+'%'; // Round down saving %
                // savingsPercent = pznValues362[pznVal].whitetab+Math.round(savingsPercent)+'%'; // Round up/down saving %
            }
        }

        // Push card into module 
        pznRecProdHtml.push(`
        <div class="prod-card" pos="`+i+`">
          <a href="`+pznValues362[pznVal].recProducts.slots[i].item.url+`">
            <div class="card-img">
              <div class="featured-flag white">`+savingsPercent+`</div>
              <div class="featured-flag red">`+offerMsg+`</div>
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
    }
    
    // Module HTML 
    let elHtml = `
        <div class="pzn-deal-promo `+pznVal+` `+pznValues362[pznVal].theme+`">
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
                    <h2>`+pznValues362[pznVal].title+`</h2>
                    <p class="txt-bold">`+pznValues362[pznVal].subtitle+`</p>
                    <p class="txt-reg">`+pznValues362[pznVal].description+`</p>
                    <a href="`+pznValues362[pznVal].buttonLink+`">`+pznValues362[pznVal].btntext+`</a>
                </div>
                <div class="promo-product">
                <div class="product-inner">`+pznRecProdHtml.join('').toString()+`</div>
                </div>
            </div>
            <div class="pzn-promo-bg">
                `+pznValues362[pznVal].backgrounds+`
            </div>
        </div>
        </div>
    `;
    
    document.querySelector(pznValues362[pznVal].appendAfter).insertAdjacentHTML('afterbegin', elHtml);
    
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
        if (window.innerWidth <= 640 && Math.ceil(100*this.scrollLeft/this.scrollWidth) >= 2.6 && pznVal === 'christmas'){
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

    // Strategy for tests - monday w/ mark
    // Snap feature research

    // Add time variation
    // Add variables
    // Add tracking 

    