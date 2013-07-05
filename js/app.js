var app = (function($, window, document, undefined) {
	
	var $window = $(window),
		$document = $(document);
	
	var _pageInit = function() {
        console.log("app start");
        
        _cardBoardInit();
	};
	
	var _cardBoardInit = function() {
        
        $("article.card").on("click", function(event){
            event.preventDefault();
            
            var $eventTarget = $(event.target);
            
            if($eventTarget.is("a.card-favorite")) {
                handleCardFavorites($(this), $eventTarget); 
            } 
            else {
               window.location = $(this).data().details; 
            }
        });
        
        $("#cards-board-filter-nav > li > a").on("click", function(event){
            event.preventDefault();
           
            var $li = $(this).parent();
            
            $li.toggleClass("expanded"); 
        });
        
        $(".cards-board").isotope({
            itemSelector: "article.card",
			layoutMode: "masonry",
			resizable: true
        });
        
        function handleCardFavorites(card, favIcon){
            var $card = card,
                $favIcon = favIcon;
            
            $favIcon.toggleClass("selected");
                
            $favIcon.prop("title", ($favIcon.is(".selected")) ? $favIcon.data().remove : $favIcon.data().add);
            
            // TODO: Card Favorites Functionality
        };
        
	};
	
	var _innerPageInit = function() {
		_pageInit();
	};
	
	var _formInit = function() {
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
	};
	
	return {
		init: _pageInit
	};
	
})(jQuery, this, this.document);