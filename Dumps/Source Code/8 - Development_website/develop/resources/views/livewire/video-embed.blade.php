<div class="embed-container" style="height:{{ $height }}">
    <div class="video-container">
        <video id="{{ $id }}"
               class="video-js"
               controls
               preload="auto"
               poster="{{ $thumb }}"
               data-setup="{}">
            <source src="{{ $urlSCE }}" type="video/webm"/>
            <p class="vjs-no-js">
                To view this video please enable JavaScript, and consider upgrading to a
                web browser that
                <a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
            </p>
        </video>
    </div>
</div>
