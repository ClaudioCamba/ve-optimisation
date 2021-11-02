  // SCRIPT ==========================================================================
    // All main variables
    let contentWrap = document.querySelector('.ved343-content'),
        modalClose = document.querySelector('.dy-lb-close'),
        localStorageAtt = 'VEDTYSurvey',
        SurveyCategory = 'DY thank you survey',
        secClasses = ['step1','step2','step3'],
        navElements = document.querySelectorAll('.step2-back, .step2 > .submit-btn, .rating-wrapper input, .step3-close'),
        step1Stars = document.querySelectorAll('.rating-wrapper input'),
        step2wordsWrap = document.querySelector('.response-btns'),
        step2words = `${Word Buttons}`,
        visSelection = {
            rating: '',
            feedback: [],
            price: 0
        }

    // Split / Clean words and convert string to array
    step2words = step2words.replace(/(\r\n|\n|\r)/gm,"").split(',');

    // check local storage for survey
    if (window.localStorage.hasOwnProperty(localStorageAtt)){
        console.log('LOCAL STORAGE: '+window.localStorage[localStorageAtt]);
    }

    // Storing revenue amount
    for (var i=0; i<dataLayer.length; i++){ 
        if (dataLayer[i].hasOwnProperty('ecommerce')){
            if (dataLayer[i].ecommerce.hasOwnProperty('purchase')){
                if (dataLayer[i].ecommerce.purchase.hasOwnProperty('actionField')){
                    if (dataLayer[i].ecommerce.purchase.actionField.hasOwnProperty('revenue')){
                        console.log(parseFloat(dataLayer[i].ecommerce.purchase.actionField.revenue));
                        // visSelection.price = parseFloat(dataLayer[i].ecommerce.purchase.actionField.revenue);
                    }
                }
            }
        }
    }

    // Click / Step Control
    function stepJourney(action){
        // Check clicked element
        if (action.getAttribute('action').indexOf('mentionme') > -1){ // 4/5 stars clicked
            visSelection.rating = action.getAttribute('value')+' stars'; // Store star rating
            visSelection.feedback = ['mentionme'] // Mention me feedback
            tracking();
        } else if (action.getAttribute('action').indexOf('close') > -1){ // Step3 close button
            modalClose.click();
        } else {
            // Check previous class before switch
            if (action.hasAttribute('value')){
                step2Func(action);
            } else if (action.classList.contains('submit-btn')){
                tracking(); 
            }

            // Switch Step classes 
            contentWrap.classList.remove(...secClasses);
            contentWrap.classList.add(action.getAttribute('action'));
        }
    };

    // Eventlistner on CTAs
    navElements.forEach(function(elem) {
        elem.addEventListener('click', function() {
            stepJourney(elem); // Nav function
            console.log(elem);
        });
    });

    function tracking(){
        localStorage.setItem(localStorageAtt, JSON.stringify(visSelection)); // Storing in localstorage
        // Sending data to GA
        visSelection.feedback.forEach(function(word) {
            // dyHelper.sendToGA(SurveyCategory,visSelection.rating,word); Tracking
            console.log(visSelection);
        });
    }

    // Section 2 functions
    function step2Func(data) {
                    
        step2wordsWrap.innerHTML = ''; // Clear step 2 word buttons
        visSelection.rating = data.getAttribute('value')+' stars'; // Store star rating
        visSelection.feedback = []; // Clear feedback
     
        // Insert new buttons
        step2words.forEach(function(elem) {
            step2wordsWrap.insertAdjacentHTML('beforeend', '<button>'+elem+'</button>'); 
        });

        // Add event to word buttons
        document.querySelectorAll('.response-btns button').forEach(function(elem) {
            elem.addEventListener('click', function() {
                if (visSelection.feedback.includes(elem.innerText) &&  elem.classList.contains('btn-active')){
                    visSelection.feedback.splice(visSelection.feedback.indexOf(elem.innerText), 1); // Store button text
                    elem.classList.remove('btn-active'); // Add class to selected button
                } else {
                    visSelection.feedback.push(elem.innerText); // Store button text
                    elem.classList.add('btn-active'); // Add class to selected button
                }
            });
        });
    }