(function() {
  var Turn, iframe, loader, loaders, surveyId, _i, _len, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  loaders = document.getElementsByClassName("turnmvp-survey");

  for (_i = 0, _len = loaders.length; _i < _len; _i++) {
    loader = loaders[_i];
    if (loader.getAttribute("data-survey-loaded")) {
      break;
    }
    surveyId = loader.getAttribute("data-survey-id");
    loader.setAttribute("data-survey-loaded", true);
    iframe = document.createElement("iframe");
    iframe.setAttribute("src", "//www.turnmvp.com/survey/" + surveyId + "/responses/new");
    iframe.setAttribute("id", "turnmvp-frame-" + surveyId);
    iframe.style.display = "none";
    iframe.style.position = "fixed";
    iframe.style.top = "0px";
    iframe.style.left = "0px";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.zIndex = 2147483647;
    iframe.style.margin = "0px";
    iframe.style.padding = "0px";
    document.body.appendChild(iframe);
  }

  Turn = (function() {
    function Turn() {
      this.onMessage = __bind(this.onMessage, this);      if (window.attachEvent) {
        window.attachEvent("onmessage", this.onMessage);
      } else if (window.addEventListener) {
        window.addEventListener("message", this.onMessage, false);
      }
    }

    Turn.prototype.onMessage = function(event) {
      if (event.data.message === "surveyClose") {
        return this.close(event.data.surveyId);
      }
    };

    Turn.prototype.trigger = function(surveyId) {
      iframe = document.getElementById("turnmvp-frame-" + surveyId);
      iframe.style.display = "block";
      iframe.contentWindow.postMessage({
        message: "surveyOpen",
        url: location.href,
        title: document.title
      }, "*");
      return false;
    };

    Turn.prototype.close = function(surveyId) {
      iframe = document.getElementById("turnmvp-frame-" + surveyId);
      iframe.style.display = "none";
      return false;
    };

    return Turn;

  })();

  if ((_ref = this.TurnMVP) == null) {
    this.TurnMVP = new Turn();
  }

}).call(this);
