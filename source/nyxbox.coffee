$ = jQuery

class Nyxbox

  constructor: ->
    @enable()
    @build()

  enable: ->
    # bind event
    $(document).on 'click', '[data-nyxbox]', (e) =>
      e.preventDefault()
      e.stopPropagation()

      @start $(e.currentTarget)
      false

  build: ->
    # add markup to body element
    loader_image_data = 'data:image/gif;base64,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'
    close_image_data = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEpJREFUeNpiYGBgEAXivUCsxYAAukC8CyoHlvwPxK+gErpQ9n+oHIrAKzS2LrKRMAkUSSYG3OAvNt1YrSDoSJg3ddG8CRITBQgwALGIIG7dYZgsAAAAAElFTkSuQmCC'

    $('<div id="nyxbox-overlay"></div><img id="nyx-loader" src="' + loader_image_data + '"/><div id="nyxbox"><div class="nyx-container"></div><span class="nyx-close"><img src="' + close_image_data + '" /></span></div>').appendTo('body')

    # set up class vars
    @$overlay   = $('#nyxbox-overlay')
    @$nyxbox    = $('#nyxbox')
    @$container = @$nyxbox.find('.nyx-container')
    @$loader    = $('#nyx-loader')
    @xhr        = null

    # setup overlay
    @$overlay
      .hide()
      .on 'click', (e) =>
        @end()
        false

    # setup close button
    @$nyxbox.find('.nyx-close')
      .on 'click', (e) =>
        @end()
        false

    # setup nyxbox
    @$nyxbox
      .hide()
      .on 'click', (e) =>
        @end() if $(e.target).attr('id') == 'nyxbox' 
        false

    # setup loader
    @$loader
      .hide()
      .on 'click', (e) =>
        @end()
        false

    # bind close modal event to ESC keyboard button
    $(document).on 'keydown', (e) =>
      @end() if e.keyCode == 27
      true

    # make jQuery(document).trigger('nyxbox.close') possible
    $(document).on 'nyxbox.close', (e) =>
      @end()
      false

  start: ($link) ->
    $(window).on 'resize', @sizeOverlay

    @$overlay
      .width( $(document).width() )
      .height( $(document).height() )
      .fadeIn 500

    @$loader.fadeIn 500

    @fillFromHrefAndData $link.attr('href'), $link.attr('data-nyxbox')

    return

  reveal: (data, klass) ->
    @$container
      .html( data )

    # clone container
    $target = @$container
      .clone()
      .attr( 'style', 'position: absolute !important; visibility: hidden !important; display: block !important;' )
      .appendTo 'body' 

    # get clone's width and height => set nyxbox top and left margin
    top     = ($target.outerHeight() / -2)  # $(window).scrollTop() + $window.height() / 10
    left    = ($target.outerWidth() / -2)   # $(window).scrollLeft()

    # destroy clone
    $target.remove()

    @$loader
      .fadeOut 500

    @$nyxbox
      .css
        marginTop: top + 'px'
        marginLeft: left + 'px'
      .fadeIn 500 


  # Stretch overlay to fit the document
  sizeOverlay: ->
    $('#nyxbox-overlay')
      .width( $(document).width() )
      .height( $(document).height() )

  # cancel ajax request (if present)
  cancelAjax: ->
    if @xhr
      @xhr.abort()
      @xhr = null

  # close
  end: ->
    @cancelAjax()

    $(window).off 'resize', @sizeOverlay

    @$nyxbox.fadeOut 500
    @$overlay.fadeOut 500

  fillFromHrefAndData: (href, data) ->
    reg_images = /.+\.(jpg|jpeg|png|gif|webm)/i

    # fill from data-nyxbox attribute
    if data.match(/#.+/) or data.match(/\..+/)
      @fillFromContainer data

    else if data == 'image'
      @fillFromImage href

    else if data.match reg_images
      @fillFromImage data

    # guess from href
    else if href.match(/#/)
      url    = window.location.href.split('#')[0]
      target = href.replace(url, '')
      return if target == '#'
      @fillFromContainer target

    else if href.match reg_images
      @fillFromImage href

    # ultimate fallback
    else
      @fillFromAjax href

  fillFromContainer: (data) ->
    @reveal $(data).html(), 'container'


  fillFromImage: (href) ->
    image = new Image()

    image.onload = =>
      @reveal '<img class="nyx-image" src="' + image.src + '" />', 'image'

    image.src = href

  fillFromAjax: (href) ->
    @cancelAjax()

    @xhr = $.ajax
            type: 'GET'
            url: href
            cache: false
            success: (data) =>
              @reveal data, 'ajax'
            error: (xhr, opts, error) =>
              console.log xhr
              @reveal '<div class="nyx-error"><strong>Error</strong>: ' + xhr.statusText + "</div>", 'ajax-error'
              false

# initialize Nyxbox
$ ->
  nyxbox = new Nyxbox()
