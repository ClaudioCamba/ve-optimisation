// Category object
let prodCatSku = [
    {
        'cat': 'Adventure Activities',
        'sku': '${Adventure Activities}'
    },
    {
        'cat': 'Attractions',
        'sku': '${Attractions}'
    },
    {
        'cat': 'Creative',
        'sku': '${Creative}'
    },
    {
        'cat': 'Driving Experiences',
        'sku': '${Driving Experiences}'
    },
    {
        'cat': 'Flying Experiences',
        'sku': '${Flying Experiences}'
    },
    {
        'cat': 'Food & Drink',
        'sku': '${Food And Drink}'
    },
    {
        'cat': 'Getaways',
        'sku': '${Getaway Experiences}'
    },
    {
        'cat': 'Golf Gifts',
        'sku': '${Golf Lessons And Packages}'
    },
    {
        'cat': 'Life & Culture Experiences',
        'sku': '${Life And Culture}'
    },
    {
        'cat': 'Online Experiences',
        'sku': '${Online Experiences}'
    },
    {
        'cat': 'Private Experiences',
        'sku': '${Private Experiences}'
    },
    {
        'cat': 'Cruises & Sailing',
        'sku': '${Scenic Cruises}'
    },
    {
        'cat': 'Spa Packages',
        'sku': '${Spa Packages}'
    },
    {
        'cat': 'Tours & Sightseeing',
        'sku': '${Tours And Sightseeing}'
    },
    {
        'cat': 'Water Activities',
        'sku': '${Water Activities}'
    }

],
    pznStarHalf = '<i class="fa fa-star-half-o"></i>',
    pznStarFull = '<i class="fa fa-star"></i>',
    pznSku;

// Loop throughcat and find current page match
for (var i = 0; i < prodCatSku.length; i++) {
    if (CLOUD_CONFIG.current_category.name.indexOf(prodCatSku[i].cat) > -1) {
        pznSku = prodCatSku[i].sku;
        getProdData();
    } else {
        console.log('NO MATCH');
    }
}

//  Get product data from DY server
function getProdData() {
    DY.ServerUtil.getProductsData([pznSku], ['daily'], undefined, true, function (err, data) {
        console.log(data[pznSku].productData);
        getProduct(data);
    });
}

// Appending HTML to page
let getProduct = function (data) {

    // Sort out description
    let stringToHTML = function (str) {
        let parser = new DOMParser();
        let doc = parser.parseFromString(str, 'text/html');
        return doc.body;
    };

    let convertedDesc = stringToHTML(data[pznSku].productData.short_description);

    if (convertedDesc.querySelector('ul')) {
        convertedDesc.querySelector('ul').remove();
    }

    if (convertedDesc.querySelector('br')) {
        convertedDesc.querySelector('br').remove();
    }

    let descReady = convertedDesc.innerHTML;
    
    if (descReady.indexOf('<p>') < 0){
        descReady = '<p>'+descReady+'</p>';
    }

    // Clean rating stars 
    let pznCleanStars = [];

    if (data[pznSku].productData.reviews_rating.indexOf('.') > -1) {
        pznCleanStars.push(pznStarHalf);
    };

    for (var x = 0; x < parseInt(data[pznSku].productData.reviews_rating); x++) {
        pznCleanStars.unshift(pznStarFull);
    };



    // let descReady = convertedDesc.innerHTML;
    console.log(convertedDesc);

    let featureCardHtml = `
       
      <div class="pzn-feature-card">
      <a href="`+ data[pznSku].productData.url + `">
        <div class="pzn-card-inner">
            <div class="pzn-card-img"><img alt="img-alt"
                    src="`+ data[pznSku].productData.image_url + `">
            </div>
            <div class="pzn-card-copy">
                <div class="pzn-title-desc">
                    <div class="pzn-title-fet">
                        <h5>`+ data[pznSku].productData.name + `</h5>
                        <div class="featured-flag">FEATURED</div>
                    </div>
                    `+ descReady + `
                </div>
                <div class="pzn-rating-price">
                    <div class="pzn-rating">
                        <div class="product-grid-item-rating product-rating">
                            <div class="rating">
                                `+ pznCleanStars.join(',') + `
                                <span class="review-count">
                                    (`+ data[pznSku].productData.reviews_number + `<span class="review-count-label"> Reviews</span>)
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="pzn-location">
                        <div>
                            <span class="product-grid-item-region-label">
                                <i class="fa fa-map-marker"></i>
                            </span>
                            <span class="product-grid-item-region-value">
                            `+ data[pznSku].productData.location_description + ` </span>
                        </div>
                    </div>
                    <div class="pzn-price">
                        <div class="product-grid-item-price">
                            <span class="product-grid-item-price-label">
                                From:
                            </span>
                         
                            <span class="product-grid-item-price-value">
                                $`+ data[pznSku].productData.price + ` </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </a>
</div>
`;

    document.querySelectorAll('.prod-results')[0].insertAdjacentHTML('afterbegin', featureCardHtml);

};

// Hide same product card on page 
for (var a=0;a<document.querySelectorAll('.prod-results .product').length;a++){
    if (document.querySelectorAll('.prod-results .product')[a].getAttribute('data-product-sku') === "DRI-DAL-0018"){
        console.log(a);
        document.querySelectorAll('.prod-results .product')[a].style.display = 'none';
    }
}
