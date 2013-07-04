var app = (function($, window, document, undefined) {
	
	var $window = $(window),
		$document = $(document);
	
	var _pageInit = function() {
        console.log("app start");
	};
	
	var _innerPageInit = function() {
		_pageInit();
		
        $("section.offer-details-images a").magnificPopup({
            type: "image",
            gallery:{
                enabled:true
            }
        });
	};
	
	var _contactInit = function() {
    	_innerPageInit();
    	
    	jQuery.extend(jQuery.validator.messages, {
    		required: "Obavezno polje",
    		email: "Molimo unesite ispravnu e-mail adresu",
    	});

        var v = $("form").validate({
    		showErrors: function(errorMap, errorList) {
    			this.defaultShowErrors();
    			
    			$("label.error").attr("title", function() {return $(this).text();});
    		}
    	});
    	
    	setTimeout(function(){
            $("#contact-form-success").addClass("flip");
		}, 5000);
	};
	
	var _homePageInit = function() {
		_pageInit();
		
		//	Handle home page slider 
		window.slider = window.setTimeout(function(){
			$("#homepage-slider div.slider-content").slider();
		}, 100);
	};
	
	return {
		init: _pageInit
	};
	
})(jQuery, this, this.document);