$ = jQuery

class Nyxbox

  constructor: ->
    @enable()
    @build()

  enable: ->
    $('body').on 'click', '[data-nyxbox]', (e) =>
      e.preventDefault()
      e.stopPropagation()

      @start $(e.currentTarget)
      false

  build: ->
    $('<div id="nyxbox-overlay"></div><div id="nyxbox"><div class="nyx-container"></div><span class="nyx-close"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEpJREFUeNpiYGBgEAXivUCsxYAAukC8CyoHlvwPxK+gErpQ9n+oHIrAKzS2LrKRMAkUSSYG3OAvNt1YrSDoSJg3ddG8CRITBQgwALGIIG7dYZgsAAAAAElFTkSuQmCC" /></span></div>').appendTo('body')

    @$overlay   = $('#nyxbox-overlay')
    @$nyxbox    = $('#nyxbox')
    @$container = @$nyxbox.find('.nyx-container')
    @xhr        = null

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
        @end() if $(e.target).attr('id') == 'nyxbox' 
        false

    $(document).on 'keydown', (e) =>
      @end() if e.keyCode == 27
      true

  # start
  start: ($link) ->
    $(window).on 'resize', @sizeOverlay

    @$overlay
      .width( $(document).width() )
      .height( $(document).height() )
      .fadeIn( 500 )

    @fillFromHrefAndData $link.attr('href'), $link.attr('data-nyxbox')

    return

  reveal: (data, klass) ->
    @$container
      .html( data )

    # clone container
    $target = @$container
      .clone()
      .attr( 'style', 'position: absolute !important; visibility: hidden !important; display: block !important;' )
      .appendTo( 'body' )

    # get clone's width and height => set nyxbox top and left margin
    top     = ($target.outerHeight() / -2)  # $(window).scrollTop() + $window.height() / 10
    left    = ($target.outerWidth() / -2)   # $(window).scrollLeft()

    # destroy clone
    $target.remove()

    @$nyxbox
      .css
        marginTop: top + 'px'
        marginLeft: left + 'px'
      .fadeIn( 500 )


  # Stretch overlay to fit the document
  sizeOverlay: () ->
    $('#nyxbox-overlay')
      .width( $(document).width() )
      .height( $(document).height() )

  # close
  end: ->
    if @xhr
      @xhr.abort()
      @xhr = null

    $(window).off 'resize', @sizeOverlay

    @$nyxbox.fadeOut 500
    @$overlay.fadeOut 500

  fillFromHrefAndData: (href, data) ->
    # fill from data-nyxbox attribute
    if data.match(/#.+/) or data.match(/\..+/)
      @fillFromContainer data

    else if data == 'image'
      @fillFromImage href

    # guess from href
    else if href.match(/#/)
      url    = window.location.href.split('#')[0]
      target = href.replace(url, '')
      return if target == '#'
      @fillFromContainer target

    else if href.match(/\.(jpg|jpeg|png|gif|webm)/i)
      @fillFromImage href

    # ultimate fallback
    else
      @fillFromAjax href

  fillFromContainer: (data) ->
    @reveal $(data).html(), 'container'


  fillFromImage: (href) ->
    image = new Image()

    image.onload = =>
      @reveal '<image src="' + image.src + '" />', 'image'

    image.src = href

  fillFromAjax: (href) ->
    @xhr = $.ajax
            type: 'GET'
            url: href
            dataType: 'script'
            success: (data) =>
              @reveal data, 'ajax'
            error: (xhr, opts, error) =>
              @reveal 'Error: ' + xhr.statusText, 'ajax-error'
              false

$ ->
  nyxbox = new Nyxbox()
