var app = (function($, window, document, undefined) {
	var $window = $(window),
		$document = $(document);

	var _pageInit = function() {
         _cardBoardInit();
         _validationInit();
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
            var $ul = $li.children("ul");

            $ul.slideToggle(400, function() {
                if ($ul.is(":visible"))
                    $li.addClass("expanded");
                else
                    $li.removeClass("expanded");
            });
        });

        $(".cards-board").isotope({
            itemSelector: "article.card"
        });

        function handleCardFavorites(card, favIcon){
            var $card = card,
                $favIcon = favIcon;
            var unselected_html = '&#xE49D;'
            var selected_html = '&#xE0B5;'

            if ($favIcon.is(":animated") || $favIcon.data().busy)
                return;

            var selected = !$favIcon.is(".selected");
            $favIcon.data().busy = true;

            var anim_down = function(elem) {
                return elem.animate({ scale: 0.6 },{
                        duration: 250,
                        done: function() {
                            if (elem.data().busy)  anim_up(elem);
                            else anim_end(elem);

                }});
            }

            var anim_up = function(elem) {
                return elem.animate({ scale: 0.8 },{
                        duration: 250,
                        done: function() { anim_down(elem);
                }});
            }

            var anim_end = function(elem) {
                if (selected) {
                    elem.addClass("selected");
                    elem.html(selected_html);
                } else {
                    elem.removeClass("selected");
                    elem.html(unselected_html);
                }
                return elem.animate({ scale: 1 },{ duration: 250 });
            }

            anim_down($favIcon);

            $favIcon.prop("title", selected ? $favIcon.data().remove : $favIcon.data().add);
            $.ajax({
                url: $favIcon.attr("href"),
                dataType: 'json',
                success: function(){
                    $favIcon.data().busy = false;
                },
                error: function(){
                    selected = !selected;
                    $favIcon.data().busy = false;
                }
            });
        }
	};

    jQuery.extend(jQuery.validator.messages, {
        required: "Obavezno polje",
        email: "Molimo unesite ispravnu e-mail adresu",
        minlength: "Molimo unesite barem {0} znakova",
        maxlength: "Molimo unesite najviše {0} znakova"
    });

	var _formInit = function(sel) {
        var v = $(sel).validate({
            showErrors: function(errorMap, errorList) {
                this.defaultShowErrors();
                $("label.error").attr("title", function() {return $(this).text();});
            }
        });

        return v;
	};

    var _validationInit = function() {
        //_formInit();
        $("#login-form").validate();
    };

    var dropDown = function(el) {
        var obj = this;
        obj.dd = el;
        obj.inp = this.dd.children('input');
        obj.placeholder = this.dd.children('span');
        obj.opts = this.dd.find('ul.dropdown > li');
        obj.val = '';
        obj.dd.on('click', function(event){
            $(this).toggleClass('active');
            return false;
        });
        obj.opts.on('click',function(){
            var opt = $(this);
            obj.val = opt.text();
            obj.placeholder.text(obj.val);
            $(obj.inp).val(obj.val);
            $(obj.inp).attr('value', obj.val);
            console.log(obj.inp);
        });
    };
    
	return {
		init: _pageInit,
        formInit: _formInit,
        dropDown: dropDown
	};
})(jQuery, this, this.document);