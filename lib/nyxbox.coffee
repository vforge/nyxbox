$ = jQuery

class Nyxbox

  constructor: ->
    @enable()
    @build()

  enable: ->
    $('body').on 'click', 'a[data-nyxbox]', (e) =>
      @start $(e.currentTarget)
      false

  build: ->
    $('<div id="nyxbox-overlay"></div><div id="nyxbox"><div class="nyx-container"></div><span class="nyx-close"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEpJREFUeNpiYGBgEAXivUCsxYAAukC8CyoHlvwPxK+gErpQ9n+oHIrAKzS2LrKRMAkUSSYG3OAvNt1YrSDoSJg3ddG8CRITBQgwALGIIG7dYZgsAAAAAElFTkSuQmCC" /></span></div>').appendTo('body')

    @$overlay   = $('#nyxbox-overlay')
    @$nyxbox    = $('#nyxbox')
    @$container = @$nyxbox.find('.nyx-container')

    # overlay
    @$overlay
      .hide()
      .on 'click', () =>
        @end()
        false

    @$nyxbox.find('.nyx-close')
      .on 'click', () =>
        @end()
        false

    @$nyxbox
      .hide()
      .on 'click', (e) =>
        if $(e.target).attr('id') == 'nyxbox' then @end()
        false

    # nyxbox  
    @$nyxbox
      .hide()

  # start
  start: ($link) ->
    $(window).on 'resize', @sizeOverlay

    @$overlay
      .width( $(document).width() )
      .height( $(document).height() )
      .fadeIn( 500 )

    $window = $(window)
    top     = $window.scrollTop() + $window.height() / 10
    left    = $window.scrollLeft()

    @$nyxbox
      # .css
      #   top: top + 'px'
      #   left: left + 'px'
      .fadeIn( 500 )

    return

  # Stretch overlay to fit the document
  sizeOverlay: () ->
    $('#nyxbox-overlay')
      .width( $(document).width() )
      .height( $(document).height() )

  # close
  end: ->
    $(window).off 'resize', @sizeOverlay
    @$nyxbox.fadeOut 500
    @$overlay.fadeOut 500


$ ->
  nyxbox = new Nyxbox()
