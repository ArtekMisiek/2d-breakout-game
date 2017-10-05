var canvas = document.getElementById("canvas");
canvas.height = 759;
canvas.width = 960;

var totalImages = 174;
var videoFrames = [];
for (var i = 0; i <= totalImages; i++) {
    var videoFrame = new Image;
    if (i < 10) {
        var videoFrameUrl = '/wp-content/uploads/video-frames-vsi/vsi-video-frames/patrick_animation/patrick_flipped/patrick_flipped/patrick01_000' + i + '.jpg';
    }
    else if (i >= 10 && i < 100) {
        var videoFrameUrl = '/wp-content/uploads/video-frames-vsi/vsi-video-frames/patrick_animation/patrick_flipped/patrick_flipped/patrick01_00' + i + '.jpg';
    }
    else {
        var videoFrameUrl = '/wp-content/uploads/video-frames-vsi/vsi-video-frames/patrick_animation/patrick_flipped/patrick_flipped/patrick01_0' + i + '.jpg';
    }
    videoFrame.src = videoFrameUrl;
    videoFrames.push(videoFrame);
}
jQuery("#videoScrollBar").on("input", function (event) {
    var currentImage = videoFrames[event.target.value - 1];
    var context = canvas.getContext("2d");
    context.drawImage(currentImage, 0, 0);
});

jQuery(document).ready(function () {
    var context = canvas.getContext("2d");
    var img = new Image();
    img.onload = function () {
        context.drawImage(img, 0, 0);
    };
    img.src = '/wp-content/uploads/video-frames-vsi/vsi-video-frames/patrick_animation/patrick_flipped/patrick_flipped/patrick01_0085.jpg';
});
var scrollVideo = jQuery('#scrollVideo').offset().top;
jQuery(window).scroll(function (event) {
    var scrollTop = jQuery(window).scrollTop();
    if (scrollscrollTop > 1000) {

        jQuery({ val: 1 }).animate({ val: 86 }, {
            duration: 1500,
            easing: 'swing',
            step: function (val) {
                jQuery("#videoScrollBar").val(val);
                jQuery("#videoScrollBar").trigger("input");
            }
        });

        jQuery(window).off('scrollTop');

    }

});

/*jQuery(window).scroll(function() {
    if (isScrolledIntoView(scrollVideo)) {

        var iterations = 74;
        var interval = setInterval(foo, 100);
        var scrollBar = document.getElementById('videoScrollBar');

        function foo() {            		
            scrollBar.value = iterations;
            var currentImage = videoFrames[iterations-1];
            var context = canvas.getContext("2d");
            context.drawImage(currentImage, 0, 0);

            if (iterations > 85)
                clearInterval(interval);
            iterations++;
        }
    }
});

function isScrolledIntoView(elem)
{
    var docViewTop = jQuery(window).scrollTop();
    var docViewBottom = docViewTop + jQuery(window).height();

    var elemTop = jQuery('#scrollVideo').offset().top;
    var elemBottom = elemTop + jQuery(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}	*/