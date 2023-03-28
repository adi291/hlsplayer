const url = window.location.href.split("#")[1];

if (Hls.isSupported()) {
    const video = document.getElementById('video');
    const hls = new Hls();
    const decodedUrl = decodeURIComponent(url)
    hls.loadSource(decodedUrl);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play();
    });
}