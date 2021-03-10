// Key
// ---------------------------------
$(document).ready(function () {
  init();
});

// Global functions ---------------------------------
$.fn.isInViewport = function (offtop) {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();
  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + ($(window).height() / offtop);
  return elementBottom > viewportTop && elementTop < viewportBottom;
};

function init() {
  console.log("asdmfkl");
  $('#theme-styles-inline-css').remove();

  // Scroll ------------
  $('a[href^="#"]').click(function (event) {
    event.preventDefault()
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {
      var target = $(this.hash);

      if (this.hash == '#first_section') {
        var $next = $(this).closest('.section').next('div');
        $($next).attr('id', 'first_section');
        $('html,body').animate({
          scrollTop: $next.offset().top
        }, 300);
      }

      if (target.length) {
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 300);
        return false;
      }
    }
  });

  // Get url parameter ------------
  var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : sParameterName[1];
      }
    }
  };
  if (
    getUrlParameter('careers_submited') ||
    getUrlParameter('subscribed') ||
    getUrlParameter('footer_subscribe') ||
    getUrlParameter('contact')
  ) {
    if ($('#message').length > 0) {
      $('html,body').animate({
        scrollTop: $('#message').offset().top
      }, 300);
    }
  }

  // Chosen ------------
  if ( $('.page-oracle-school-bundle-ty').length == 0 ) {
    $("select").chosen({
      disable_search_threshold: 10
    });
  }


  // ACF ------------
  $("input[type=hidden]").trigger('change');
  $.each($('.acf-field-image'), function (index, acf_field_image) {
    var acf_field_image = $(acf_field_image);

    var label1 = acf_field_image.find('.acf-label label');
    var input = acf_field_image.find('.acf-image-uploader > input');

    label1.clone().prependTo(acf_field_image.find('.acf-image-uploader'));
    var label2 = acf_field_image.find('.acf-image-uploader > label');

    label2.addClass('file-upload');
    label2.wrapInner('<span class="text"></span>');
    label2.append('<span class="btn">Choose File</span>');
    input.prependTo(label2);

    var text = label2.find('.text').text();
    input = label2.find('> input');

    $(acf_field_image.find('.acf-basic-uploader input')).on('change', function (e) {
      var fileName = '';
      if ($(this).files && $(this).files.length > 1) {
        fileName = ($(this).getAttribute('data-multiple-caption') || '').replace('{count}', $(this).files.length);
      } else if (e.target.value) {
        fileName = e.target.value.split('\\').pop();
      }

      console.log(fileName);

      (fileName) ? $(this).closest('.acf-field-image').find('.file-upload .text').html(fileName): $(this).closest('.acf-field-image').find('.file-upload .text').html(text);
    })
  });

  $.each($('.acf-field-file'), function (index, acf_field_file) {
    var acf_field_file = $(acf_field_file);

    var label1 = acf_field_file.find('.acf-label label');
    var input = acf_field_file.find('.acf-file-uploader > input');

    label1.clone().prependTo(acf_field_file.find('.acf-file-uploader'));
    var label2 = acf_field_file.find('.acf-file-uploader > label');

    label2.addClass('file-upload');
    label2.wrapInner('<span class="text"></span>');
    label2.append('<span class="btn">Choose File</span>');
    input.prependTo(label2);

    var text = label2.find('.text').text();
    input = label2.find('> input');

    $(acf_field_file.find('.acf-basic-uploader input')).on('change', function (e) {
      var fileName = '';
      if ($(this).files && $(this).files.length > 1) {
        fileName = ($(this).getAttribute('data-multiple-caption') || '').replace('{count}', $(this).files.length);
      } else if (e.target.value) {
        fileName = e.target.value.split('\\').pop();
      }

      console.log(fileName);

      (fileName) ? $(this).closest('.acf-field-file').find('.file-upload .text').html(fileName): $(this).closest('.acf-field-file').find('.file-upload .text').html(text);
    })
  });

  // hero-slide ------------
  $('.testimonials .testimonials-wpr').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    dots: true,
    responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  $('.slider-wpr .arrow').on('click', function () {
    var circles_wpr = $(this).closest('.principles').find('.oval-wpr #circles');
    var titles = $(this).closest('.principles').find('.oval-wpr .title');

    if ($(this).hasClass('back')) {
      $(this).closest('.slider-wpr').find('.principle-text-slider').slick('slickPrev');

      $.each(titles, function (index, title) {
        var classes = $(title).attr("class");
        var new_pos = parseInt(classes.substring(10, 11)) + 1;
        if (new_pos == 7) {
          new_pos = 1;
        }
        $(title).attr('class', 'title pos-' + new_pos);
      });

      var classes = circles_wpr.attr("class");
      var new_pos = parseInt(classes.substring(4, 5)) + 1;
      if (new_pos == 7) {
        new_pos = 1;
      }
      circles_wpr.attr('class', 'pos-' + new_pos);

    } else {
      $(this).closest('.slider-wpr').find('.principle-text-slider').slick('slickNext');

      $.each(titles, function (index, title) {
        var classes = $(title).attr("class");
        var new_pos = parseInt(classes.substring(10, 11)) - 1;
        if (new_pos == 0) {
          new_pos = 6;
        }
        $(title).attr('class', 'title pos-' + new_pos);
      });

      var classes = circles_wpr.attr("class");
      var new_pos = parseInt(classes.substring(4, 5)) - 1;
      if (new_pos == 0) {
        new_pos = 6;
      }
      circles_wpr.attr('class', 'pos-' + new_pos);
    }
  });
  $('.oval-wpr .title').on('click', function () {
    var target = $(this).data("target");
    var classes = $(this).attr("class");
    var current_pos = parseInt(classes.substring(10, 11));
    var diff = current_pos - 1;

    if (current_pos == 5 || current_pos == 6) {

      if (current_pos == 6) {
        $('.slider-wpr .arrow.back').trigger('click');
      } else {
        $('.slider-wpr .arrow.back').trigger('click');
        setTimeout(function () {
          $('.slider-wpr .arrow.back').trigger('click');
        }, 525);
      }

    } else {
      for (var i = 0; i < diff; i++) {
        setTimeout(function () {
          $('.slider-wpr .arrow.next').trigger('click');
        }, (525 * i));
      }
    }
  });


  // Animation in ------------
  var animation_in = (function () {
    animation();
    $(window).on('resize scroll', animation);

    function animation() {
      if ($('.animation-in, .animation-reveal, .animation-reveal-2').length > 0) {
        $('.animation-in, .animation-reveal, .animation-reveal-2').each(function () {
          var a_trigger = ($(this).data("animation")) ? $(this).data("animation") : 1.1;
          ($(this).isInViewport(1.1)) ? $(this).addClass('animation-active'): null;
        });
      }
    }
  })();


  // Core Components - start here
  // --------------------------------------------

  // Mobile-nav
  $('.mobile-nav-wrapper').click(function () {
    $(this).toggleClass('active');
    $('.menu-main-menu-container').toggleClass('active');
  });

  // Nav ------------
  var nav = (function () {
    // var
    var mouse_is_inside = false;
    // cash
    var $header = $('header');
    var $nav = $('nav');
    var $close = $header.find('.toggle-nav');
    var $header_search = $('.header-search-form');

    // setup
    // events
    $close.on('click', toggleDropdown);

    $header.find('.right li.search').on('click', function () {
      $header_search.addClass('active');
    });

    $header_search.find('.close').on('click', function () {
      $header_search.removeClass('active');
    });

    $('header nav, header .toggle-nav').hover(function () {
      mouse_is_inside = true;
    }, function () {
      mouse_is_inside = false;
    });

    $("body").mouseup(function () {
      if (!mouse_is_inside && $nav.hasClass('active')) {
        toggleDropdown();
      }
    });

    $nav.find('.search form > div > span').on('click', function () {
      $nav.find('.search form > div .submit').trigger('click');
    });

    // function
    function toggleDropdown(e) {
      if ($nav.hasClass('active')) {
        $nav.removeClass('active');
        $close.removeClass('active');
        $('body').css('height', "");
        $('body').css('overflow', "");
      } else {
        $nav.addClass('active');
        $close.addClass('active');
        $('body').css('height', '100%');
        $('body').css('overflow', 'hidden');
      }
    }
  })();

  // breadcrumbs ------------
  var breadcrumbs = (function () {
    var wpr = $('.breadcrumbs');
    if (wpr.length > 0) {
      for (var i = 0; i < wpr.find('span').length; i++) {
        wpr.html(function () {
          return $(this).html().replace("»", "/");
        })
      }
    }
  })();

  // tiles_image_text ------------
  var tiles_image_and_text = (function () {
    var wpr = $('.tiles_image_and_text');

    if (wpr.length > 0) {
      var is_mobile = false;

      fixed_image();

      $(window).scroll(function () {
        fixed_image();
      });

      function fixed_image() {
        is_mobile = wpr.find('.image').css('position') == 'static';
        if (is_mobile) {
          wpr.find('.image').removeClass('fixed').removeClass('fixed_bottom');
        } else {
          var scrollTop = $(window).scrollTop();
          var scrollBottom = $(window).scrollTop() + $(window).outerHeight();
          var rows = wpr.find('.row');

          $.each(rows, function (key, value) {
            var value_top = $(value).offset().top;
            var value_bottom = value_top + $(value).outerHeight();
            var value_image = $(value).find('.image');

            if (scrollTop <= value_top) {
              value_image.removeClass('fixed');
              value_image.removeClass('fixed_bottom');
            } else if (scrollTop > value_top && scrollBottom <= value_bottom) {
              value_image.addClass('fixed');
              value_image.removeClass('fixed_bottom');
            } else {
              value_image.removeClass('fixed');
              value_image.addClass('fixed_bottom');
            }
          });
        }
      }
    }
  })();

  // FAQ ------------
  var faq = (function () {
    var wpr = $('.FAQ, .frequently_asked_questions');

    if (wpr.length > 0) {
      wpr.find('.question-title').on('click', function (e) {
        var question = $(e.target).closest('.question');
        question.find('.answer').slideToggle();
        question.find('.plus-minus-toggle').toggleClass('collapsed');
      });
    }
  })();

  // video_thumbnail ------------
  var video_thumbnail = (function () {
    var wpr = $('.video_thumbnail');

    if (wpr.length > 0) {
      wpr.find('.play-btn').on('click', function (e) {
        $(e.target).closest('.video_thumbnail').find('.video').addClass('active');
      });
    }
  })();

  // model ------------
  var model = (function () {
    var modelLink = $('.model-click');
    var model = $('.modal-wpr');
    var close = model.find('.close');
    var mouse_is_inside = false;

    var popups = $('.modal-wpr.popup');

    $.each(popups, function (key, value) {
      var target = $(value);

      if ( target.hasClass('page-exit') ) {
        $(document).mouseleave(function () {
          if ( ! getCookie('popup_123') ) {
            target.addClass('active');
            target.addClass('done');
            setCookie('popup_123',1,0.1);
          }
        });
      } else if ( target.hasClass('timer') ) {
        if ( ! getCookie('popup_123') ) {
          var time = target.data("time");
          setTimeout(function () {
            target.addClass('active');
            setCookie('popup_123',1,0.1);
          }, time);
        }
      }
    });

    $('.model-wpr .model').hover(function () {
      mouse_is_inside = true;
    }, function () {
      mouse_is_inside = false;
    });

    modelLink.on('click', function () {
      var target = $(this).data('target');
      $(target).toggleClass('active');

      if ($(target).hasClass('video-model')) {
        var iframe = $(target).find('iframe')[0];
        var player = new Vimeo.Player(iframe);
        player.play();
      }
    });

    close.on('click', function () {
      console.log('close');
      model.removeClass('active');

      if (model.hasClass('video-model')) {
        var iframe = $(this).closest('.modal-wpr').find('iframe')[0];
        var player = new Vimeo.Player(iframe);
        player.pause();
      }
    });

    model.mouseup(function () {
      if (!mouse_is_inside && model.hasClass('active')) {
        model.removeClass('active');

        if (model.hasClass('video-model')) {
          var iframe = $(this).closest('.modal-wpr').find('iframe')[0];
          var player = new Vimeo.Player(iframe);
          player.pause();
        }
      }
    });

    function setCookie(name,value,hours) {
      var expires = "";
      if (hours) {
        var date = new Date();
        date.setTime(date.getTime() + (hours*60*60*1000));
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }
    function getCookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
      }
      return null;
    }
  })();

  var blog_side_bar = (function () {
    scroll();
    $(window).on('scroll', scroll);

    function scroll() {
      var wpr = $('.tve-leads-shortcode');

      if (wpr.length > 0) {
        if (wpr.find('.add-image').length == 0) {
          wpr.find('.thrv_heading').after('<img class="add-image" src="/wp-content/themes/jupiter/images/ebook_mockup_02.png">');
        }
      }
    }
  })()

  var page_7Energieschallenge = (function () {
    var video_thumbnail = $('.top_section .video');

    if (video_thumbnail.length > 0) {
      var videoplayer = video_thumbnail.find('.video-player');

      video_thumbnail.find('.play-btn').on('click', function (e) {
        videoplayer.addClass('active');

        var iframe = videoplayer.find('iframe')[0];
        var player = new Vimeo.Player(iframe);
        player.play();
      });

      videoplayer.find('.close').on('click', function (e) {
        videoplayer.removeClass('active');

        var iframe = videoplayer.find('iframe')[0];
        var player = new Vimeo.Player(iframe);
        player.pause();
      });

      $(window).scroll(function () {
        var scrollTop = $(window).scrollTop();
        var top = video_thumbnail.offset().top;
        var bottom = top + video_thumbnail.outerHeight();

        if (scrollTop < bottom) {
          videoplayer.removeClass('fixed');
        } else {
          videoplayer.addClass('fixed');
        }
      });
    }

  })();

  var page_Vision_board_challenge = (function () {
    var video_thumbnail = $('.hero_section .video');

    if (video_thumbnail.length > 0) {
      var videoplayer = video_thumbnail.find('.video-player');

      video_thumbnail.find('.play-btn').on('click', function (e) {
        videoplayer.addClass('active');

        var iframe = videoplayer.find('iframe')[0];
        var player = new Vimeo.Player(iframe);
        player.play();
      });

      videoplayer.find('.close').on('click', function (e) {
        videoplayer.removeClass('active');

        var iframe = videoplayer.find('iframe')[0];
        var player = new Vimeo.Player(iframe);
        player.pause();
      });

      $(window).scroll(function () {
        var scrollTop = $(window).scrollTop();
        var top = video_thumbnail.offset().top;
        var bottom = top + video_thumbnail.outerHeight();

        if (scrollTop < bottom) {
          videoplayer.removeClass('fixed');
        } else {
          videoplayer.addClass('fixed');
        }
      });
    }

  })();

  var page_oracle_circle_membership = (function () {
    var video_thumbnail = $('.video');

    if (video_thumbnail.length > 0) {
      var videoplayer = video_thumbnail.find('.video-player');

      video_thumbnail.find('.play-btn').on('click', function (e) {
        var videoplayer = $(this).closest('.video').find('.video-player');
        videoplayer.addClass('active');

        var iframe = videoplayer.find('iframe')[0];
        var player = new Vimeo.Player(iframe);
        player.play();
      });

      // videoplayer.find('.close').on('click', function (e) {
      //   videoplayer.removeClass('active');
      //
      //   var iframe = videoplayer.find('iframe')[0];
      //   var player = new Vimeo.Player(iframe);
      //   player.pause();
      // });

      $(window).scroll(function () {
        var scrollTop = $(window).scrollTop();
        var top = video_thumbnail.offset().top;
        var bottom = top + video_thumbnail.outerHeight();

        if (scrollTop < bottom) {
          videoplayer.removeClass('fixed');
        } else {
          videoplayer.addClass('fixed');
        }
      });
    }

  })();

  // Timer ----------
  var timer_section = (function () {
    var wpr = $('.timer_section');

    if (wpr.length > 0) {
      var time = wpr.find('.timer').data("time");
      console.log(time);
      var newYork = moment(time).tz('America/New_York');
      initializeClock(newYork.format());
    }

    function getTimeRemaining(endtime) {
      var currentTime = moment().tz("America/New_York").format('YYYY-MM-DD HH:mm:ss');
      var bits = currentTime.split(/\D/);
      var currentTime = new Date(bits[0], --bits[1], bits[2], bits[3], bits[4], bits[5]);
      var t = Date.parse(endtime) - Date.parse(currentTime);
      var seconds = Math.floor((t / 1000) % 60);
      var minutes = Math.floor((t / 1000 / 60) % 60);
      var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      var days = Math.floor(t / (1000 * 60 * 60 * 24));
      return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
      };
    }

    function convertUTCDateToLocalDate(date) {
      var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

      var offset = date.getTimezoneOffset() / 60;
      var hours = date.getHours();

      newDate.setHours(hours - offset);

      return newDate;
    }

    function initializeClock(endtime) {
      var clock = wpr.find('.timer');
      var daysSpan = clock.find('.days');
      var hoursSpan = clock.find('.hours');
      var minutesSpan = clock.find('.minutes');
      var secondsSpan = clock.find('.seconds');

      function updateClock() {
        var t = getTimeRemaining(endtime);

        if (t.days >= 1000) {
          console.log('not time');
          clearInterval(timeinterval);
          wpr.css('opacity', 0);
        } else if (t.total <= 0) {
          clearInterval(timeinterval);
          console.log('time done');
          wpr.html('CLOSING NOW');
        } else {
          if (t.days >= 0) {
            daysSpan.html(t.days);
          }
          if (t.hours >= 0) {
            hoursSpan.html(t.hours);
          }
          if (t.minutes >= 0) {
            minutesSpan.html(t.minutes);
          }
          // if ( t.seconds >= 0 ) {
          //   secondsSpan.html( t.seconds );
          // }
        }
      }

      updateClock();
      var timeinterval = setInterval(updateClock, 1000);
    }
  })();


  var solstice_sales = (function () {
    var wpr = $('.video_text');
    console.log("solstice_sales");
    if (wpr.length > 0) {
      console.log("1");
      wpr.find('.play-btn').on('click', function (e) {
        console.log('2');
         wpr.find('.video_background').addClass('hide');
         wpr.find('.play-btn').addClass('hide');

        var iframe = wpr.find('iframe')[0];
        var player = new Vimeo.Player(iframe);
        player.play();
      });
    }
  })();

}
