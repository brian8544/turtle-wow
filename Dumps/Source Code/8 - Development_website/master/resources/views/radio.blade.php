@include('layout.head')

<body>


@include('layout.header')

<div class="stream-container mb-5" style="background-image: url('{{ Vite::asset('resources/images/subpagebackground.png') }}');">
    <div class="player-container d-flex flex-column justify-content-between">
        <div class="d-flex justify-content-between w-100 mt-3 pl-3 pr-3 responsive-row">
            <div class="album-art mb-3">
                <img src="{{ Vite::asset('resources/images/downloads/logotypes/radio_logo_smaller.png') }}" alt="Radio Logo"/>
            </div>
            <div class="player mb-3">
                <i class="fa fa-volume-down"></i>
                <i class="fa fa-play" id="playPauseBtn"></i>
                <i class="fa fa-volume-up"></i>
            </div>
        </div>
        <footer class="w-100 d-flex flex-column align-items-center">
            <div class="radio-title mt-3 mb-3 text-dark-white">Everlook Broadcasting Co.</div>
            <div class="d-flex align-items-center volume-control">
                <i class="fa fa-volume-up volume-icon"></i>
                <input type="range" class="volume-slider" min="0" max="100" value="50" aria-label="Volume">
            </div>

        </footer>

    </div>

</div>

<script>
    let playerVisible = true;

    function togglePlayerVisibility() {
        const playerPanel = document.getElementById('playerPanel');
        if (playerVisible) {
            playerPanel.style.opacity = '0';
            document.getElementById('togglePlayerBtn').innerHTML = '<i class="fas fa-chevron-down"></i>';
        } else {
            playerPanel.style.opacity = '1';
            document.getElementById('togglePlayerBtn').innerHTML = '<i class="fas fa-close"></i>';
        }
        playerVisible = !playerVisible;
    }

    document.addEventListener('DOMContentLoaded', function () {
        const volumeSlider = document.querySelector('.volume-slider');
        let audioPlayer;
        let isInitialized = false;

        const btn = document.getElementById('playPauseBtn');

        function initializeAudioPlayer() {
            if (!isInitialized) {
                audioPlayer = new Audio('{{ config('customs.radio.stream_url') }}');
                audioPlayer.volume = volumeSlider.value / 100;
                volumeSlider.addEventListener('input', function () {
                    audioPlayer.volume = this.value / 100;
                });
                isInitialized = true;
            }
        }

        function togglePlayPause() {
            initializeAudioPlayer();
            if (audioPlayer.paused) {
                btn.classList.replace('fa-play', 'fa-spinner');
                audioPlayer.play().then(() => {
                    btn.classList.remove('fa-spinner');
                    btn.classList.add('fa-pause');
                }).catch(e => {
                    console.error('Error playing the stream:', e);
                    btn.classList.replace('fa-spinner', 'fa-play');
                });
            } else {
                audioPlayer.pause();
                btn.classList.replace('fa-pause', 'fa-play');
            }
        }

        function adjustVolume(change) {
            if (!isInitialized) return;
            let newVolume = audioPlayer.volume + change;
            newVolume = Math.min(Math.max(0, newVolume), 1);
            audioPlayer.volume = newVolume;
            volumeSlider.value = newVolume * 100;
        }

        btn.addEventListener('click', togglePlayPause);
        document.querySelector('.fa-volume-down').addEventListener('click', () => adjustVolume(-0.1));
        document.querySelector('.fa-volume-up').addEventListener('click', () => adjustVolume(0.1));
    });

</script>


@include('layout.footer')

@include('layout.dependency')

@include('layout.script')

</body>

</html>
