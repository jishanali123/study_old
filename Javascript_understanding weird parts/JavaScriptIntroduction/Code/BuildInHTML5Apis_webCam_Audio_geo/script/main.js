navigator.mediaDevices.getUserMedia({
	audio: false,
	video: true
}).then(function(stream) {
	var video = document.createElement('video');
	document.body.appendChild(video);
	video.src = URL.createObjectURL(stream);
	video.play();
})