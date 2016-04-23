var viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var enabled_menu = false;
var toggledMenuDesktop = false;
// Im really sad about it, but it dont support Opera
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
if ( isOpera ) {
  window.location.href = "http://salvatorecriscione.com/opera";
}

function setActive(menu_item) {
  jQuery('.navitems').removeClass('active');
  jQuery('.nav' + menu_item).addClass('active');
}

function fixPostWidth() {
  // Fix width of viewport
  //jQuery('#portfoliocontainer').width(jQuery(window).width() - jQuery('#portfolionav').outerWidth());
}

jQuery(function() {
  jQuery('a[href*="#"]:not([href="#"])').click(function() {
    if ( viewport_width < 991 ) {
      menuToggleMobile();
    }
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = jQuery(this.hash);
      target = target.length ? target : jQuery('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        jQuery('html, body').animate({
          scrollTop: target.offset().top
        }, 900);
        return false;
      }
    }
  });
});

function movethis() {
  var y_scroll_pos = window.pageYOffset;
  var vw_height = jQuery(window).height();

  var scroll_pos_about_start = Math.round(jQuery('#aboutme').offset().top);
  var scroll_pos_about_end = scroll_pos_about_start + jQuery('#aboutme').outerHeight();

  var scroll_pos_portfolio_start = Math.round(jQuery('#portfolio').offset().top);
  var scroll_pos_portfolio_end = scroll_pos_portfolio_start + jQuery('#portfolio').outerHeight();

  if(y_scroll_pos < vw_height ) {
    jQuery('#intro').addClass('active');
    //console.log('trigged top home');
  }
  else {
    jQuery('#intro').removeClass('active');
  }
  if(y_scroll_pos > scroll_pos_about_start - 20)
    if( y_scroll_pos < scroll_pos_about_end)
      setActive(2);
  if(y_scroll_pos > scroll_pos_about_start) {
    if( y_scroll_pos < scroll_pos_about_end)
      setActive(2);
    if(y_scroll_pos > (scroll_pos_about_end-vw_height)) {

      jQuery('#aboutnav').css('position','absolute');
      jQuery('#aboutnav').css('top',(scroll_pos_about_end-vw_height) + 'px');
      jQuery('#aboutnav').css('right','0');
    }else {
      jQuery('#aboutnav').css('position','fixed');
      jQuery('#aboutnav').css('top','0');
      jQuery('#aboutnav').css('right','0');
    }
  } else {
    jQuery('#aboutnav').css('position','absolute');
    jQuery('#aboutnav').css('top','60%');
    jQuery('#aboutnav').css('top','60vh');
    jQuery('#aboutnav').css('right','0');
  }

  if(y_scroll_pos > scroll_pos_portfolio_start - 20)
    if( y_scroll_pos < scroll_pos_portfolio_end){
      setActive(3);
      fixContactMenu();
    }

  if(y_scroll_pos > scroll_pos_portfolio_start) {
    if(y_scroll_pos > (scroll_pos_portfolio_end-vw_height)) {
      jQuery('#portfolionav').css('position','absolute');
      jQuery('#portfolionav').css('top',(scroll_pos_portfolio_end-vw_height) + 'px');
      jQuery('#portfolionav').css('right','0');
    }else {
      jQuery('#portfolionav').css('position','fixed');
      jQuery('#portfolionav').css('top','0');
      jQuery('#portfolionav').css('right','0');
    }
  } else {
    jQuery('#portfolionav').css('position','absolute');
    jQuery('#portfolionav').css('top',scroll_pos_about_end + 'px');
    jQuery('#portfolionav').css('right','0');
  }
  if ( y_scroll_pos > scroll_pos_portfolio_end - 20) {
    setActive(4);
  }
}

function fixContactMenu() {
  if ( viewport_width > 991 ) {
    jQuery('#contactsnavbar').css('top',jQuery('#contacts').offset().top + 'px');
    //console.log('fixed contacts navbar');
  }
}


function initMenus() {
  //console.log('init menu callback');
  jQuery(window).on('scroll', function($) {
    movethis();
  });

  jQuery(window).load(function($) {
    fixContactMenu();
  })

  jQuery('#contentPortfolio').load(function($) {
    setTimeout(function(){fixContactMenu();}, 1300);
  });

  jQuery(document).ready(function($) {
    movethis();
    fixPostWidth();
  });
}
function menuToggleMobile() {
  jQuery('#contactsnavbar').toggleClass('active');
  jQuery('.menutoggle').toggleClass('active');
  jQuery('#menutoggleinner').toggleClass('fa-bars');
  jQuery('#menutoggleinner').toggleClass('fa-times');
  jQuery('.blackbg').toggleClass('active');
  //jQuery('.backtosite').toggleClass('backtositeopen');
  jQuery('.blackbg').click(function($) {
    menuToggleMobile();
  });
}

function initMenusMobile() {
  jQuery('.menutoggle').click(function($) {
    menuToggleMobile();
  });
}

function initAll() {
  viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  if ( viewport_width > 991 ) {
    initMenus();
    enabled_menu = true;
  } else {
    //console.log('disabled desktop navbar');
    enabled_menu = false;
    initMenusMobile();
  }
}
// console.log('viewport_width', viewport_width);
initAll();

jQuery(window).on('resize', function() {
  initAll();
});
/*
jQuery(function(){
  jQuery(".headintro1").typed({
    strings: ["SALVO", "SALVATORE"],
    typeSpeed: 30,
    startDelay: 1000,
    backDelay: 750,
    callback: function() {
        jQuery(".headintro2").typed({
          strings: ["CRISCIION", "CRISCIONE"],
          typeSpeed: 30,
          backDelay: 740
        });
    }
  });
});
*/
