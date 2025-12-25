(function ($) {
    "use strict";

    $(document).ready(function($){
        
        // Test jQuery is working
        console.log("jQuery is loaded and working!");
        
        // testimonial sliders
        $(".testimonial-sliders").owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            responsive:{
                0:{
                    items:1,
                    nav:false
                },
                600:{
                    items:1,
                    nav:false
                },
                1000:{
                    items:1,
                    nav:false,
                    loop:true
                }
            }
        });

        // homepage slider
        $(".homepage-slider").owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            nav: true,
            dots: false,
            navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
            responsive:{
                0:{
                    items:1,
                    nav:false,
                    loop:true
                },
                600:{
                    items:1,
                    nav:true,
                    loop:true
                },
                1000:{
                    items:1,
                    nav:true,
                    loop:true
                }
            }
        });

        // count down
        if($('.time-countdown').length){  
            console.log("Timer elements found: " + $('.time-countdown').length);
            $('.time-countdown').each(function() {
                var $this = $(this), finalDate = $(this).data('countdown');
                console.log("Timer target date: " + finalDate);
                $this.countdown(finalDate, function(event) {
                    var $this = $(this).html(event.strftime('' + '<div class="counter-column"><div class="inner"><span class="count">%D</span>Days</div></div> ' + '<div class="counter-column"><div class="inner"><span class="count">%H</span>Hours</div></div>  ' + '<div class="counter-column"><div class="inner"><span class="count">%M</span>Mins</div></div>  ' + '<div class="counter-column"><div class="inner"><span class="count">%S</span>Secs</div></div>'));
                });
            });
        } else {
            console.log("No timer elements found");
        }

        // projects filters isotop
        $(".product-filters li").on('click', function () {
            
            $(".product-filters li").removeClass("active");
            $(this).addClass("active");

            var selector = $(this).attr('data-filter');

            $(".product-lists").isotope({
                filter: selector,
            });
            
        });
        
        // isotop inner
        $(".product-lists").isotope();

        // magnific popup
        $('.popup-youtube').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });

        // light box
        $('.image-popup-vertical-fit').magnificPopup({
            type: 'image',
            closeOnContentClick: true,
            mainClass: 'mfp-img-mobile',
            image: {
                verticalFit: true
            }
        });

        // homepage slides animations
        $(".homepage-slider").on("translate.owl.carousel", function(){
            $(".hero-text-tablecell .subtitle").removeClass("animated fadeInUp").css({'opacity': '0'});
            $(".hero-text-tablecell h1").removeClass("animated fadeInUp").css({'opacity': '0', 'animation-delay' : '0.3s'});
            $(".hero-btns").removeClass("animated fadeInUp").css({'opacity': '0', 'animation-delay' : '0.5s'});
        });

        $(".homepage-slider").on("translated.owl.carousel", function(){
            $(".hero-text-tablecell .subtitle").addClass("animated fadeInUp").css({'opacity': '0'});
            $(".hero-text-tablecell h1").addClass("animated fadeInUp").css({'opacity': '0', 'animation-delay' : '0.3s'});
            $(".hero-btns").addClass("animated fadeInUp").css({'opacity': '0', 'animation-delay' : '0.5s'});
        });

       

        // stikcy js
        $("#sticker").sticky({
            topSpacing: 0
        });

        //mean menu
        $('.main-menu').meanmenu({
            meanMenuContainer: '.mobile-menu',
            meanScreenWidth: "992"
        });
        
        // search form
        $(".search-bar-icon").on("click", function(){
            $(".search-area").addClass("search-active");
        });

        $(".close-btn").on("click", function() {
            $(".search-area").removeClass("search-active");
        });

        // Search functionality
        function performSearch() {
            console.log("Search function called");
            var searchTerm = $("#search-input").val().toLowerCase().trim();
            console.log("Search term: " + searchTerm);
            
            if (searchTerm === '') {
                console.log("Empty search term, showing all products");
                // If search is empty, show all products
                $(".single-product-item").parent().show();
                $(".no-results-message").hide();
                // Reset filters to show all
                if ($(".product-filters li[data-filter='*']").length) {
                    $(".product-filters li").removeClass("active");
                    $(".product-filters li[data-filter='*']").addClass("active");
                    if ($(".product-lists").length) {
                        $(".product-lists").isotope({ filter: '*' });
                    }
                }
                return;
            }

            console.log("Searching for: " + searchTerm);
            // Hide all products first
            $(".single-product-item").parent().hide();
            
            // Search through all products
            var foundProducts = 0;
            $(".single-product-item").each(function() {
                var productName = $(this).find("h3").text().toLowerCase();
                var productPrice = $(this).find(".product-price").text().toLowerCase();
                
                console.log("Checking product: " + productName);
                
                // Check if search term matches product name or price
                if (productName.includes(searchTerm) || productPrice.includes(searchTerm)) {
                    $(this).parent().show();
                    foundProducts++;
                    console.log("Found match: " + productName);
                }
            });

            console.log("Total products found: " + foundProducts);

            // If no products found, show a message
            if (foundProducts === 0) {
                // Create or show no results message
                if ($(".no-results-message").length === 0) {
                    $(".product-lists, .row").first().append('<div class="col-12 text-center no-results-message"><h4>No products found for "' + searchTerm + '"</h4><p>Try searching for: Almonds, Cashews, Dates, Raisins, Walnuts, Pistachios, Apricots, Figs, Prunes, Hazelnuts</p></div>');
                } else {
                    $(".no-results-message").show().find("h4").text('No products found for "' + searchTerm + '"');
                }
            } else {
                // Hide no results message if products are found
                $(".no-results-message").hide();
            }

            // Close search area after search
            $(".search-area").removeClass("search-active");
        }

        // Search button click
        $("#search-btn, .search-area button").on("click", function(e) {
            e.preventDefault();
            performSearch();
        });

        // Search on Enter key press
        $("#search-input, .search-area input[type='text']").on("keypress", function(e) {
            if (e.which === 13) { // Enter key
                e.preventDefault();
                performSearch();
            }
        });

        // Clear search when input is cleared
        $("#search-input, .search-area input[type='text']").on("input", function() {
            if ($(this).val().trim() === '') {
                $(".single-product-item").parent().show();
                $(".no-results-message").hide();
                // Reset filters to show all
                if ($(".product-filters li[data-filter='*']").length) {
                    $(".product-filters li").removeClass("active");
                    $(".product-filters li[data-filter='*']").addClass("active");
                    if ($(".product-lists").length) {
                        $(".product-lists").isotope({ filter: '*' });
                    }
                }
            }
        });

        // Product Category Filtering
        $('.category-btn').on('click', function() {
            console.log("Category button clicked");
            
            // Remove active class from all buttons
            $('.category-btn').removeClass('active');
            
            // Add active class to clicked button
            $(this).addClass('active');
            
            // Get the category to filter
            var category = $(this).data('category');
            console.log("Selected category: " + category);
            
            // Show/hide products based on category
            if (category === 'all') {
                $('.product-item').show();
                console.log("Showing all products");
            } else {
                $('.product-item').hide();
                $('.product-item[data-category="' + category + '"]').show();
                console.log("Showing products for category: " + category);
            }
        });
    
    });


    jQuery(window).on("load",function(){
        jQuery(".loader").fadeOut(1000);
    });


}(jQuery));