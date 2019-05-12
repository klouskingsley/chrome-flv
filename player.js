var flv;
// var hls;
var debug;


function playFLV(url){
  var video = document.getElementById('video');
  if(native){
    video.classList.add("native_mode");
    video.classList.remove("zoomed_mode");
  } else {
    video.classList.remove("native_mode");
    video.classList.add("zoomed_mode");
  }
  if(flv){ flv.destroy(); }
  
  var flvUrl = decodeURIComponent(url)
  flv = flvjs.createPlayer({
    type: 'flv',
    url: flvUrl
  })
  console.log(flv, typeof flv)
  flv.attachMediaElement(video)
  flv.load()
  flv.play()
  document.title = url
}

chrome.storage.local.get({
  flvjs: currentVersion,
  debug: false,
  native: false
}, function(settings) {
  debug = settings.debug;
  native = settings.native;
  var s = document.createElement('script');
  var version = currentVersion
  if (supportedVersions.includes(settings.flvjs)) {
    version = settings.flvjs
  }
  s.src = chrome.runtime.getURL('flvjs/flv.'+version+'.min.js');
  s.onload = function() { playFLV(window.location.href.split("#")[1]); };
  (document.head || document.documentElement).appendChild(s);
});

$(window).bind('hashchange', function() {
  playFLV(window.location.href.split("#")[1]);
});