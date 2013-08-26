(function() {
  var $, Nyxbox;

  $ = jQuery;

  Nyxbox = (function() {
    function Nyxbox() {
      this.enable();
      this.build();
    }

    Nyxbox.prototype.enable = function() {
      var _this = this;
      return $(document).on('click', '[data-nyxbox]', function(e) {
        e.preventDefault();
        e.stopPropagation();
        _this.start($(e.currentTarget));
        return false;
      });
    };

    Nyxbox.prototype.build = function() {
      var close_image_data, loader_image_data,
        _this = this;
      loader_image_data = 'data:image/gif;base64,R0lGODlhIAAgAPcAAP///7Ozs/v7+9bW1uHh4fLy8rq6uoGBgTQ0NAEBARsbG8TExJeXl/39/VRUVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgAAACwAAAAAIAAgAAAI+gABCBxIkOCCAwsKKlzIcOCBhwUJFGiocICBgg8PEBzAkSLBAg8DEMw4sADHAR5HPkQpkKTAkwRSDjTwkIFDiAAInJRJkMHDiwBcwuQ5cMABnxMfOsi5c6DOATFfMmCQcGCAnwp1ljwJdeCCqVNZGq3akGvHnmCnRvVodu3GtDZTPnW78CsDlnJ5EgBKtC9RsxxNLjBAuHBfwBwLK+Yr8+QCmAMGL/ZLWSZdipcZzvW4OaXZiQpNcuUJuGBpzHifclyruuvLy6oJdmbq+uVqAE1PgiYqWuzZ2Idv4z47vLbcpsWdIvcsPHlR4szxOneamWEBussrZzVOMSAAIfkEBQoAAAAsAAAAABgAEgAACIAAAQgcSLAggAEGEypkAIAhQQMLFEZUOJDBgQMJGWgs6FDggosYDWrsmBCkgYQLNhLsaAAkxYYMJhIkAFJmxoYEBFps6FIgAQMGEFZUWbBlToEDgAI9SoCB0JdIlUIsADXhT6lVFSY9mVVhgaddw3odQLYs2KpmzYolUHZBWbEBAQAh+QQFCgAAACwBAAAAHQAOAAAIiQABCBxIcOAABgUTKlwoEGHCAQwHEoBIkIFFggEiEjRggGJDAA4BUAzJkKMBAgMthiSpcYDJlApZMlzAceTFAiBFFsSpkIBJnAgRGvg40MCBA0MHDEA5kGYAj00JLjh69KRSpTwLDI14kOpRg1cJMNXo9QBUkVfPLjR6IGNPpWM1MoibUKxGjQEBACH5BAUKAAAALAcAAAAZABEAAAiBAAEIHAiAgAGCCBMqBLDAwAKEDxcWIIDQgEWCDDIuHDCg4sWBGjdyLDDQ4kGQDCImJMCxo0CTAheEXAigJUUAMAkwALCTpkCbOD/OROjyJ8ebBAf0rLk04QCkCpHuDOCTZs+mVSHGzOrTAEmuYMMmPEC27AGVYM2aFQuArAOzCwICACH5BAUKAAAALA4AAAASABgAAAiCAAEsIACgoMGDCAcsQAhgAEGGAhcsNLjAgAGIEScCIGDxIkSJGjsOwAiy4ICOGDMCKNDx4UeJDQMY0CiQAYOUBgoctMmAJkabAICmDBr05tCdRo8edKm0adOkKW9KdXrAIIORTpsaYHrUwIEDAah+/eoT4gAGYw9AxZnWo9IAZAEEBAAh+QQFCgAAACwOAAAAEgAeAAAImQABDCgAoKDBgwgFDkjIsOCAhwcHLFjQ8OFCgxMvJrRoUCLFihALTvzIkCOAkQ0dhswY0YABAgwJaCTg0qXGhgtqGiDZUOfLlB1tAkU4cKhRowySKhUIlAEAp1Cdplya9KjVgwStfjRw1SCDmw0JBDg4lqGBAzAFVm3I4IDbgwacggVAwO0BnkDPvrVql+vRAXav2s161CXDgAAh+QQFCgAAACwPAAEAEQAfAAAIjAABCBwIgEABgggTDhiQsGGBhQ0jLiQQkSCBhQwrCrwIUePGjgM5ehSIcQDFihwxaiyZUSPHkyMJwBxJE6GBmzgXaMTJ00DFngZ01hxKcwADBkI9Hj1ac+nShjpbCjyaVKBPpgN1MhB4oCuAgyQjdj1AEGvCsQO3VkRLk+1UtWcPOFDY0K3HBQeqagwIACH5BAUKAAAALAgADgAYABIAAAh9AAEIHEiwIIABCBMOKGCw4UCFCh06TLggIQGJGDNiHKAxowEDHDsa/EjyosiBBRaQNLBA5AAGJgmsDHnwgIGGDAwO+GgSAIMDB3ISJMCgKMYFQA+YFApgAVOHSW86LNpyZFKCT30aNZi0KsasAq9iPVDQa1mpA3OCPUmzY0AAIfkEBQoAAAAsAgASAB0ADgAACIkAAQgcSLCgQQAEDhIkwEChQQIDBiQ8aODAAQMOCUbcWECjxY8ZNW6MKJDBxwMMBmQkgHHgSJYnWyZcYHCAAQM0B0JUWfFAAII/AWBkQBRAgZsGJj4sqBJAQ6dQAdi8GXLgU4JFBS642bRqVKhXWVINWbQr0asAtrasihatS6UOu2IN6pXt2owBAQAh+QQFCgAAACwAAA8AGQARAAAIgAAXHBhI8ACAgwgTKjxYsODChwkFEnQwEKLFixgxFjCQseOCjg8ZgIQYIGEAAhgHQGTAQOXBlgsJDJiZ0CVHhCxFAjDAE4DMmQUSBlXIEiHPmz9dWmT5cWfPgzMHoHy4oKjRp1BpLk14tKbWhVav3kQ4FWJThAsMnB2p0EDZhAEBACH5BAUKAAAALAEACAARABgAAAh3AAccOGAAgMGDCA8aGDhwQcKHABgOZDAAIsIFEg9YTBhgYMGNHEGKHEmypMmTKDcuYMCgJEuWIF++BLmyJcICHx+ydHhwgQEDFQcINUggIYGfBgoAEFoRItKmTCEOQHow6kOkRQ1aTfizqdahDwl4/ToWpFgAAQEAIfkEBQoAAAAsAAACAA4AHQAACIoAAQgcCGCBAYIIBx44wCAhwoUHBjgcGADiRIULD15cYJFgQ4IQP3qUCIDAgQAEUYokMHHAR5ETFwiUeRFAAY01WzLYyROmwJ49E7rcCYBnzqMISV4cYMCAUoQEmkp1aFDqggJCrQ4kMACrwKhOCQ4Yy1Kg14EFxg4o61At24Rcx9ZUm1NuzgJvAwIAOw==';
      close_image_data = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEpJREFUeNpiYGBgEAXivUCsxYAAukC8CyoHlvwPxK+gErpQ9n+oHIrAKzS2LrKRMAkUSSYG3OAvNt1YrSDoSJg3ddG8CRITBQgwALGIIG7dYZgsAAAAAElFTkSuQmCC';
      $('<div id="nyxbox-overlay"></div><img id="nyx-loader" src="' + loader_image_data + '"/><div id="nyxbox"><div class="nyx-container"></div><span class="nyx-close"><img src="' + close_image_data + '" /></span></div>').appendTo('body');
      this.$overlay = $('#nyxbox-overlay');
      this.$nyxbox = $('#nyxbox');
      this.$container = this.$nyxbox.find('.nyx-container');
      this.$loader = $('#nyx-loader');
      this.xhr = null;
      this.$overlay.hide().on('click', function(e) {
        _this.end();
        return false;
      });
      this.$nyxbox.find('.nyx-close').on('click', function(e) {
        _this.end();
        return false;
      });
      this.$nyxbox.hide().on('click', function(e) {
        if ($(e.target).attr('id') === 'nyxbox') {
          _this.end();
        }
        return false;
      });
      this.$loader.hide().on('click', function(e) {
        _this.end();
        return false;
      });
      $(document).on('keydown', function(e) {
        if (e.keyCode === 27) {
          _this.end();
        }
        return true;
      });
      return $(document).on('nyxbox.close', function(e) {
        _this.end();
        return false;
      });
    };

    Nyxbox.prototype.start = function($link) {
      $(window).on('resize', this.sizeOverlay);
      this.$overlay.width($(document).width()).height($(document).height()).fadeIn(500);
      this.$loader.fadeIn(500);
      this.fillFromHrefAndData($link.attr('href'), $link.attr('data-nyxbox'));
    };

    Nyxbox.prototype.reveal = function(data, klass) {
      var $target, left, top;
      this.$container.html(data);
      $target = this.$container.clone().attr('style', 'position: absolute !important; visibility: hidden !important; display: block !important;').appendTo('body');
      top = $target.outerHeight() / -2;
      left = $target.outerWidth() / -2;
      $target.remove();
      this.$loader.fadeOut(500);
      return this.$nyxbox.css({
        marginTop: top + 'px',
        marginLeft: left + 'px'
      }).fadeIn(500);
    };

    Nyxbox.prototype.sizeOverlay = function() {
      return $('#nyxbox-overlay').width($(document).width()).height($(document).height());
    };

    Nyxbox.prototype.cancelAjax = function() {
      if (this.xhr) {
        this.xhr.abort();
        return this.xhr = null;
      }
    };

    Nyxbox.prototype.end = function() {
      this.cancelAjax();
      $(window).off('resize', this.sizeOverlay);
      this.$nyxbox.fadeOut(500);
      return this.$overlay.fadeOut(500);
    };

    Nyxbox.prototype.fillFromHrefAndData = function(href, data) {
      var reg_images, target, url;
      reg_images = /.+\.(jpg|jpeg|png|gif|webm)/i;
      if (data.match(/#.+/) || data.match(/\..+/)) {
        return this.fillFromContainer(data);
      } else if (data === 'image') {
        return this.fillFromImage(href);
      } else if (data.match(reg_images)) {
        return this.fillFromImage(data);
      } else if (href.match(/#/)) {
        url = window.location.href.split('#')[0];
        target = href.replace(url, '');
        if (target === '#') {
          return;
        }
        return this.fillFromContainer(target);
      } else if (href.match(reg_images)) {
        return this.fillFromImage(href);
      } else {
        return this.fillFromAjax(href);
      }
    };

    Nyxbox.prototype.fillFromContainer = function(data) {
      return this.reveal($(data).html(), 'container');
    };

    Nyxbox.prototype.fillFromImage = function(href) {
      var image,
        _this = this;
      image = new Image();
      image.onload = function() {
        return _this.reveal('<img class="nyx-image" src="' + image.src + '" />', 'image');
      };
      return image.src = href;
    };

    Nyxbox.prototype.fillFromAjax = function(href) {
      var _this = this;
      this.cancelAjax();
      return this.xhr = $.ajax({
        type: 'GET',
        url: href,
        cache: false,
        success: function(data) {
          return _this.reveal(data, 'ajax');
        },
        error: function(xhr, opts, error) {
          console.log(xhr);
          _this.reveal('<div class="nyx-error"><strong>Error</strong>: ' + xhr.statusText + "</div>", 'ajax-error');
          return false;
        }
      });
    };

    return Nyxbox;

  })();

  $(function() {
    var nyxbox;
    return nyxbox = new Nyxbox();
  });

}).call(this);
