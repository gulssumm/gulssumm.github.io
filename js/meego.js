var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

jQuery(document).ready(function meego($){
    
        var vars = {
                    browserFeatures     :   'status=no, location=no, directories=no, toolbar=no, menubar=no, resizable=yes, scrollbars=yes',
                    categoryTitles      :   '',
                    content		:   $('.content'),
                    leftNav		:   $('.content .left-nav'),
                    leftNavIndex	:   '',
                    leftNavLinks        :   $('.left-nav li li a'),
                    leftNavSelected     :   '',
                    leftNavTitles       :   $('.left-nav > ul > li > a'),
                    leftNavUL           :   $('.left-nav > ul'),
                    mainNav             :   $('.header .main-nav li'),
                    mainNavLinks        :   $('.header .main-nav li a'),
                    pageLinks           :   '',
                    pageLinksContent    :   '',
                    pop                 :   '',
                    popUpPath           :   '',
                    url			:   ''
        }
        
        methods = {
                    addCaptionLinks     :   function() {
                                            $('.figcaption').each(function() {
                                                $(this).wrapInner('<a href="#" />');
                                            });
                                        },
                   
                    addFlash            :   function() {
                                            if($('#flash').length){
                                                var swfPath = ($('#flash > a').attr('href'));
                                                swfobject.embedSWF(swfPath, "flash", "240", "427", "10.0.0");
                                            }
                                        },
                    addPageLinks        :   function() {
                                                vars.categoryTitles = $('.category h1').not('.no-anchor');
                                                
                                                if( vars.categoryTitles.length ) {
                                                    
                                                    vars.pageLinks = $('<ul class="page-links"></ul>');
                                                    
                                                    vars.categoryTitles.each( function() {
                                                        // find uncommitted class & add to page links and also preceeding "|"
                                                        var commit = ( $(this).parents('.uncommitted').length !== 0 ) ? 'uncommitted' : '',
                                                            index = vars.categoryTitles.index(this),
                                                            separator = ( index < vars.categoryTitles.length - 1 ) ? '<span>|</span>' : '';
                                                            
                                                        $(this).wrap('<a class="title" id="category' + index +'" />');
                                                        
                                                        vars.pageLinksContent += '<li><a href="#category' + index + '" class="' + commit +'">' + $(this).text() + '</a></li>' + separator;
                                                        
                                                    });
                                                    
                                                    $(vars.pageLinks).html(vars.pageLinksContent);
                                                    
                                                    $('.page-title').after(vars.pageLinks);
                                                    
                                                    $('.page-links a').each(function() {
                                                        if($(this).hasClass('uncommitted')) {
                                                            $(this).parent().prev().addClass('uncommitted');
                                                        }
                                                    });
                                                }
                                            },
                    init                :	function(){
                        
                                                methods.setNav();
                                                
                                           
                                                
                                                methods.addPageLinks();
                                                
                                                methods.setPrevNext();
                                                
                                                $(vars.leftNavTitles).addClass('nav-title');
                                                
                                                methods.addCaptionLinks();
                                                
                                                methods.addFlash();
                                                
                                            },
                    popUp               :	function(){
                                                
                                                vars.pop = window.open( vars.popUpPath, 'largeView', 'width=' + screen.width / 100 * 60 +', height=' + screen.height / 100 * 60 + ', left=' + screen.width / 100 * 20 + ', top=' + screen.height / 100 * 10 + vars.browserFeatures );
        
                                                
                                                if( window.focus ){
                                                    vars.pop.focus();
                                                }
                                            },
                    setNav              :   function() {
                                                vars.url = window.location.toString();                                                
                                                
                                                //find which main nav link contains the left nav ul class & set selection
                                                $(vars.mainNavLinks + '[href*="' + vars.leftNavUL.attr('class') +'"]').parent().addClass('selected');
                                                
                                                $('.bg-top').attr('class','bg-top ' + $(vars.leftNavUL).attr('class'));
                                                
                                                $(vars.leftNavLinks).each(function() {
                                                    if (vars.url.indexOf( $(this).attr('href') ) != -1) {
                                                        $(this).parent().addClass('selected');
                                                        vars.leftNavSelected = this;
                                                        // hide left nav links except for the ul that contains the selected one
                                                        $(vars.leftNavTitles).parent().next().not($(this).parent().parent().parent()).addClass('up').css({ display: 'none' });
                                                        $(vars.leftNavTitles).not($(this).parent().parent().parent().prev().find('a')).addClass('closed');
                                                    };
                                                });
                                                
                                                $('.left-nav > ul').css({display : 'block'});
                                                
                                            },
                    setPrevNext         :   function() {
                        
                                                vars.leftNavIndex = $(vars.leftNavLinks).index(vars.leftNavSelected);
                                                
                                                $('.content-paging a').removeClass('disabled');
                                                
                                                if( !vars.leftNavSelected ) {
                                                    
                                                    $('.content-paging .prev').addClass('disabled');
                                                    
                                                } else if ( vars.leftNavIndex === vars.leftNavLinks.length -1 ){
                                                    
                                                    $('.content-paging .next').addClass('disabled');
                                                }
                                            }
        }
        
        $('a').live('click', function() {//when an <a> is clicked:
            // if it's a filter
            if ( $(this).parent().hasClass('filter') && !$(this).hasClass('selected') ) {
                
                $('.filter a').toggleClass('selected');
                
                if( $(this).hasClass('all') ) {
                    
                    $('.uncommitted').css({ display: 'block'});
                    
                } else {
                    
                    $('.uncommitted').css({ display: 'none'});
                }
                return false;
            
            } else 
            // if it's previous or next & isn't disabled
            if ( $(this).parent('.content-paging').length && !$(this).hasClass('disabled') ) {
                
                var i = (vars.leftNavSelected) ? $(vars.leftNavLinks).index(vars.leftNavSelected) : -1;
                
                if( $(this).hasClass('prev') ) {
                    
                    window.location = (vars.leftNavIndex === 0) ? $(vars.mainNavLinks + '[href*="' + vars.leftNavUL.attr('class') +'"]').attr('href') : $(vars.leftNavLinks[i - 1]).attr('href');
                    
                } else if ( $(this).hasClass('next') ) {
                    
                   window.location = $(vars.leftNavLinks[i + 1]).attr('href');
                   
                } else if ( $(this).hasClass('to-top') ) {
                    
                   window.scrollTo(0, 0);
                   
                }
                
                return false;
            
            } else
            //if it's prev/next disabled
            if ( $(this).parent('.content-paging').length && $(this).hasClass('disabled') ) {
                return false;
            } else
            // if it's a thumbnail or a caption
            if ( $(this).parents('.figure').length ) {
            
                var imageSrc = $(this).parents().find('img').attr('src');
                
                vars.popUpPath = imageSrc.substring(0, imageSrc.lastIndexOf( '-' )) + '.png';
                
                methods.popUp();
                                                
                return false;
            
            } else
            // if it's the legal link
            if ( $(this).hasClass('legal') ) {
                
                vars.popUpPath = $(this).attr('href');
                
                methods.popUp();
                
                return false;
            
            } else
            // if it's a left nav section title
            if ( $(vars.leftNavTitles).index(this) !== -1 ) {
                
                var ul = $(this).parent().next();
                
                if ( ul.is('.up') ) {
                    $(this).removeClass('closed');
                    ul.hide().removeClass('up').slideDown(200);
                    
                } else {
                    
                    $(this).addClass('closed');
                    ul.slideUp(190, function() {
                        ul.addClass('up');
                    });
                }
                
                return false;
            }
        });
        
        methods.init();
        
        $('.figure img').load(function() {
            $(this).parents('.figure').find('.figcaption').width($(this).width());
        });
        
        $(window).unload(function(){
            if(vars.pop){
                vars.pop.close();
            }
        });
            
});

}
/*
     FILE ARCHIVED ON 06:29:51 May 04, 2012 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 08:43:18 Sep 03, 2025.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.575
  exclusion.robots: 0.038
  exclusion.robots.policy: 0.028
  esindex: 0.011
  cdx.remote: 10.523
  LoadShardBlock: 247.634 (3)
  PetaboxLoader3.datanode: 113.342 (4)
  PetaboxLoader3.resolve: 370.204 (2)
  load_resource: 360.647
*/