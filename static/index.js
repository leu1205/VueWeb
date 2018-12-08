$(document).ready(function(){
    var navHeight = $('nav').height();
    $(this).scrollTop(0);
    $('#menu-item-1').addClass('active');
    $(document).on('click', 'a[href*="#"]', function (event) {
        event.preventDefault();
        var scrollTop = $($.attr(this, 'href').substring(1)).offset().top-navHeight;
        $('html, body').animate({
            scrollTop: scrollTop
        }, "slow");
    });
    $('#contactForm').submit(function(e){
        e.preventDefault();
        if($(this)[0].checkValidity() === false){
            e.stopPropagation();
            $(this).addClass('was-validated');
        }else{
            $(this).removeClass('was-validated');
        }
    });
});