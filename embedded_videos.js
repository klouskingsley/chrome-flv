var videos = document.getElementsByTagName('video');
for (var i = 0; i < videos.length; i++) { 
	var video = videos[i]
	var srcs = new Array();
	if(video.getAttribute("src")){
		srcs.push(video.getAttribute("src"));
	}
	var sources = video.getElementsByTagName('source')
	for (var i = 0; i < sources.length; i++) {
		srcs.push(sources[i].getAttribute("src"));
	}
	for (var i = 0; i < srcs.length; i++) {
		var src = srcs[i]
		if(src.includes(".m3u8")){
			
	  		flv = new flvjs.createPlayer({
				  type: 'flv',
				  url: src
			  })
			flv.attachMediaElement(video)
			flv.load()
			flv.play()
	  	}
	}
}