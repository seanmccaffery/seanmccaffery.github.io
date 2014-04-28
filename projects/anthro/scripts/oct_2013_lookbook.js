jQuery(document).ready(function () {
    'use strict';
    (function ($) {
    
        var html_body = $('html, body'), photo = $('#photo'), thumb = $('.thumb_wrapper .thumb'), number_of_images = 13, img_width, img_height, position, posArray = [], transR = 0, tip = true;
        var isiPad = navigator.userAgent.match(/iPad/i) !== null;
        
        function imgPosition() {
            var focused = $('.focused');
            var photoImg = $('#photo img');
            $('#photo, #envelope').css('margin-top', -(img_height/2) + 'px').css("top", "50%");
            section.removeClass('backface-visibility');
            focused.prev().addClass('backface-visibility');
            focused.prev().prev().addClass('backface-visibility');
            img_width = photoImg.width();
            img_height = photoImg.height();
            section.css('width', img_width);
            focused.find('.prodbox').css({
                'width' : img_width,
                'left' : img_width,
                'height' : img_height
            });
            photo.css('width', (number_of_images * img_width) + img_width * 1.75);
            
            position = focused.position();
            html_body.stop().animate({scrollLeft: (position.left - ($(window).width() * 0.5) + (img_width * 1.5) + transR)}, 300);
            $('.tip, .gohome').remove();
            focused.append("<a class=\"gohome\" href=\"#\"><div href=\"\"><img src=\"anthro/images/lookbook/10_13_Lookbook_anthro_logo_2.png\"></div></a>");
            focused.append("<div class=\"tip\"><img src=\"anthro/images/lookbook/10_13_Lookbook_anthro_shopthelook.png\"></div>");
            $('.tip img').css({
                'left' : img_width * 0.8,
                'top' : 0
            });
            $('.gohome img').css({
                'left' : img_width * 0.055,
                'top' : img_width * 0.004
            });
            transR = 0;

            //Responsive prodbox and tips
            var scale = img_height/690;
            $('.thumb_wrapper .thumb').css({
                'height' : 320 * scale + 'px',
                'width' : 400 * scale + 'px'
            });
            $('.tip img').css({
                'height' : 18 * scale + 'px',
                'width' : 76 * scale + 'px'
            });
            $('.end').css({
                'height' : 35 * scale + 'px',
                'width' : 133 * scale + 'px'
            });
        }

        function moveLeft() {
            if (section.eq(0).hasClass('focused')) {
                $('html, body').animate({scrollLeft: 0}, 400);
            } else {
                $('#photo .focused').prev().addClass('focused');
                $('#photo .focused').next().removeClass('focused');
                imgPosition();
            }
        }
    
        function moveRight() {
            if ($('#photo .focused').width() > img_width) {
                transR = -img_width;
            }
            $('#photo .focused').next().addClass('focused');
            $('#photo .focused').prev().removeClass('focused');
            imgPosition();
        }

        $(document).on('click', '.tip img', function () {
            photoClick($(this).parent().parent());
        });

        function hammerGestures() {
            var swipe_area = body;
            section.find('img').hammer().bind('tap', function(ev) {
                ev.gesture.preventDefault();
                photoClick($(this).parent());
                ev.gesture.stopDetect();
             });
             $('.end').hammer().bind('touch', function(ev) {
                ev.gesture.preventDefault();
                section.removeClass('focused');
                section.eq(0).addClass('focused');
                imgPosition();
                ev.gesture.stopDetect();
             });
             body.hammer().bind('dragright', function(ev) {
                ev.gesture.preventDefault();
                moveLeft();
                ev.gesture.stopDetect();
             });
             body.hammer().bind('dragleft', function(ev) {
                ev.gesture.preventDefault();
                moveRight();
                ev.gesture.stopDetect();
             });
        }

        function photoClick(thisPhoto) {
            var focused = $('#photo .focused');
            if ((thisPhoto.hasClass('focused') && thisPhoto.width() > img_width) || !thisPhoto.hasClass('focused')) {
                if (focused.width() > img_width && thisPhoto.index() > focused.index()) {
                    transR = -img_width;
                }
                section.removeClass('focused');
                thisPhoto.addClass('focused');
                imgPosition();
            } else if (thisPhoto.hasClass('focused')) {
                // photo.css('width', photo.css('width', (number_of_images * img_width) + (img_width * 2) + img_width));
                focused.find('.prodbox').fadeIn(100);
                if (tip && $('.focused .thumb').length > 2) {
                    $('.focused .thumb_wrapper', this).delay(300).animate({scrollTop: "150px"}, 750).animate({scrollTop: "0px"}, 500);
                    tip = false;
                }
                thisPhoto.addClass('focused-transition');
                thisPhoto.css('width', img_width * 2);
            }
        }

        /***************************
        ***      Initialize      ***
        ***************************/

        //Place catalog shots
        var x = 1;
        while (x <= number_of_images) {
            $('#photo').append("<section class=\"shot\"><img src=\"anthro/images/lookbook/10_13_Lookbook_"+x+".jpg\" alt=\"October Lookbook\"><div class=\"prodbox scrollable\"><div class=\"cover\"><div class=\"thumb_wrapper\"></div></div></div></section>");
            x++;
        }

        //Place product shots
        $('.thumb_wrapper').each(function (i) {
            var thumbArray = new Array(3, 4, 7, 2, 4, 4, 2, 2, 11, 3, 3, 3, 3);
            var thumbNameArray = new Array('test1', 'test2');

            var num = thumbArray[i];
            while (num > 0) {
                $(this).append("<div class=\"thumb\"></div>");
                num -= 1;
            }

            $('.thumb', this).css("background-image", "url(anthro/images/lookbook/10_13_strip_template_"+(i+1)+".jpg)");
            $('.thumb', this).each(function (x) {
                $(this).css("background-position", "0 " + (x * (100/(thumbArray[i] - 1))) + "%");
            });
        });

        //Place product id's
        // var prodIDArray = new Array("28560779", "29002961", "29001831", "29160611", "28757557", "29232352", "28928513", "29179249", "29014925", "30123293", "29205846", "29087459", "29459526", "28093417", "28720902", "29186533", "29386349", "28438422", "28903839", "29232220", "29207198", "29516705", "28513018", "29304334", "29581121", "28989614", "29204583", "29361771", "29398641", "29143724", "28946077", "29642154", "29634912", "29159548", "29285988", "25829185", "29530250", "29627692", "29420833", "29293248", "30103758", "29306008", "29032547", "28314235", "28555449", "29330198", "29062882", "29231172", "29151784", "29074291", "29222494");
        // $('.thumb').each(function (i) {
        //     $(this).append("<a href=\"javascript:launchQuickshop(\'"+prodIDArray[i]+"\')\"></a>");
        // });

        var section = $('#photo section');
        var body = $('body');

        section.last().append("<div><img class=\"end\" src=\"anthro/images/lookbook/10_13_Lookbook_anthro_backtofront.png\"></div>");

        hammerGestures();

        $('#photo img').bind("load", function () {
            section.css('left', '0px');
            photo.css('left', img_width/2);
            $('#photo section').eq(0).addClass('focused');
            imgPosition();
        });

        /***************************
        ***        Events        ***
        ***************************/

        //Arrow key behavior
        $(document.documentElement).keydown(function (e) {
            if (e.keyCode === 37) {
                moveLeft();
            } else if (e.keyCode === 39) {
                moveRight();
            } else if (e.keyCode === 32) {
                photoClick($('.focused'));
            } else if (e.keyCode === 38) {
                $('.focused .thumb_wrapper').stop().animate({scrollTop: '-=200'}, 250);
            } else if (e.keyCode === 40) {
                $('.focused .thumb_wrapper').stop().animate({scrollTop: '+=200'}, 250);
            }
        });
    
        //Refresh elements to proper sizing & behavior when window size changes
        $(window).resize(function () {
            //Checks if device is iPad before performing a responsive refresh
            if (!isiPad) {
                section.css('width', img_width*2);
                imgPosition();
            }
        });

        /***************************
        ***    Device Settings   ***
        ***************************/

        function iPadSet() {
            if (isiPad) {
                photo.css({
                    'max-height' : '670px !important',
                    'height' : '670px',
                    'top' : '0px',
                    'margin-top' : '0px'
                });
                $('#photo img').css({
                    'max-height' : '670px !important',
                    'height' : '670px'
                });
                $('#envelope img').css({
                    'max-height' : '670px !important',
                    'height' : '670px'
                });
            }
        }

        iPadSet();
        // launchQuickshop();

        $(window).bind('orientationchange', function(event) {
            imgPosition();
            if (window.orientation == 90 || window.orientation == -90) {
                iPadSet();
            }
        });

        //Prevent default image dragging behavior during swipe
        $('img').on('dragstart', function (e) { e.preventDefault(); });

        //Prevent overscrolling by killing scroll
        $(document).on('touchmove', function (e) {
            e.preventDefault();
        });

        //Allow scrolling on scrollable class
        body.on('touchmove','.scrollable',function (e) {
            e.stopPropagation();
        });

        //Allow user interaction to override vertical sliding tip
        thumb.hover(function () {
            $(this).dequeue();
        });
    
    })(jQuery);

});
