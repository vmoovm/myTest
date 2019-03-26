/* ------------------------------------------------------------------------
	prettyCheckboxes
	维度端前端网整理 http://www.weiduduan.com/
	Developped By: Stephane Caron (http://www.no-margin-for-errors.com)
	Inspired By: All the non user friendly custom checkboxes solutions ;)
	Version: 1.1
	
	Copyright: Feel free to redistribute the script/modify it, as
			   long as you leave my infos at the top.
------------------------------------------------------------------------- */
	
	jQuery.fn.prettyCheckboxes = function(settings) {
		settings = jQuery.extend({
					checkboxWidth: '2.4rem',
					checkboxHeight: '2.4rem',
					className : 'prettyCheckbox'
//					display: 'list'
				}, settings);

		$(this).each(function(){
			// Find the label
			$label = $('label[for="'+$(this).attr('id')+'"]');

			// Add the checkbox holder to the label
			$label.prepend("<span class='holderWrap'><span class='holder'></span></span>");

			// If the checkbox is checked, display it as checked
			if($(this).is(':checked')) { $label.addClass('zpchecked'); };

			// Assign the class on the label
			$label.addClass(settings.className).addClass('zp'+$(this).attr('type'));

			// Assign the dimensions to the checkbox display
			$label.find('span.holderWrap').width(settings.checkboxWidth).height(settings.checkboxHeight);
			$label.find('span.holder').width(settings.checkboxWidth);

			// Hide the checkbox
			$(this).addClass('hiddenCheckbox');
n=0;
			// Associate the click event
			$label.bind('click',function(){
				$('input#' + $(this).attr('for')).triggerHandler('click');
				
				if($('input#' + $(this).attr('for')).is(':checkbox')){
					$(this).toggleClass('zpchecked');
					$('input#' + $(this).attr('for')).checked = true;
					
					$(this).find('span.holder').css('top',0);
				}else{
					$toCheck = $('input#' + $(this).attr('for'));

					// Uncheck all radio
					$('input[name="'+$toCheck.attr('name')+'"]').each(function(){
						$('label[for="' + $(this).attr('id')+'"]').removeClass('zpchecked');	
					});

					$(this).addClass('zpchecked');
					$toCheck.checked = true;
				};
			});
			
			$('input#' + $label.attr('for')).bind('keypress',function(e){
				if(e.keyCode == 32){
					if($.browser.msie){
						$('label[for="'+$(this).attr('id')+'"]').toggleClass("zpchecked");
					}else{
						$(this).trigger('click');
					}
					return false;
				};
			});
		});
	};
	
	checkAllPrettyCheckboxes = function(caller, container){
		if($(caller).is(':checked')){
			// Find the label corresponding to each checkbox and click it
			$(container).find('input[type=checkbox]:not(:checked)').each(function(){
				$('label[for="'+$(this).attr('id')+'"]').trigger('click');
				if($.browser.msie){
					$(this).attr('checked','checked');
				}else{
					$(this).trigger('click');
				};
			});
		}else{
			$(container).find('input[type=checkbox]:checked').each(function(){
				$('label[for="'+$(this).attr('id')+'"]').trigger('click');
				if($.browser.msie){
					$(this).attr('checked','');
				}else{
					$(this).trigger('click');
				};
			});
		};
	};

