const VideoPlayer = (function () {

  const defaultSkipTime = 2;

  let clicks = 0;

  let video = null;
  let controls = null;
  let toggleBtn = null;
  let progress = null;
  let progressWrapper = null;
  let volume = null;
  let playbackRate = null;
  let player = null;
  /** 
   * @desc Fucntion init. 
   * @param {HTMLVideoElement} videoEl - video tag
   * @returns {Object}
  */
  function init(videoEl) {
    video = videoEl;

    _initTemplate();
    _setElements();
    _initEvents();

    return {
      play,
      stop
    }
  }

  function toggle() {
    const method = video.paused ? 'play' : 'pause';
    toggleBtn.textContent = video.paused ? '❚ ❚' :  '►';
    video[method]();
  }

  function play() {
    video.play()
  }

  function stop() {
    video.currentTime = 0;
    video.pause()
  }

  function _initTemplate() {
    // кула вставлять новую разметку
    const parent = video.parentElement;

    const playerWrapper = _playerWrapperTemplate();
    const controlsTemplate = _controlsTemplate();

    playerWrapper.appendChild(video);
    playerWrapper.insertAdjacentHTML("beforeend", controlsTemplate);
    parent.insertAdjacentElement('afterbegin', playerWrapper);
  }

  function _playerWrapperTemplate() {
    const playerWrapper = document.createElement('div');
    playerWrapper.classList.add('player');
    return playerWrapper;
  }

  function _controlsTemplate() {
    return `
    <div class="player__controls">
      <div class="progress">
        <div class="progress__filled"></div>
      </div>
      <button class="player__button toggle" title="Toggle Play">►</button>
      <input type="range" name="volume" class="player__slider" min=0 max="1" step="0.05" value="1">
      <input type="range" name="playbackRate" class="player__slider" min="0.5" max="2" step="0.1" value="1">
      <button data-skip="-1" class="player__button">« 1s</button>
      <button data-skip="1" class="player__button">1s »</button>
    </div>
    `;
  }

  function _setElements() {
    toggleBtn = document.querySelector('.toggle');
    progress = document.querySelector('.progress__filled');
    progressWrapper = document.querySelector('.progress');
    volume = document.querySelector('.player__slider[name=volume]');
    playbackRate = document.querySelector('.player__slider[name=playbackRate]');
    controls = document.querySelector('.player__controls');
    player = document.querySelector('.player');
  }

  function _handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progress.style.flexBasis = `${percent}%`;
  }

  function _scrub(e) {
    video.currentTime = (e.offsetX / progressWrapper.offsetWidth) * video.duration;
  }

  function _changeVolume(e) {
    video.volume = e.target.value;
  }

  function _changePlaybackRate(e) {
    video.playbackRate = e.target.value;
  }

  function _handleSkipButtons(e) {
    if (e.target.hasAttribute('data-skip')) {
      return _skip(e.target.dataset.skip);
    }
  }

  function handleSidesClick(e) {
    let skipTime = e.offsetX / video.offsetWidth > 0.5 ? defaultSkipTime : -defaultSkipTime;

    _skip(skipTime);
  }
  
  function _skip(time) {
    video.currentTime = video.currentTime + parseInt(time);
  }

  function _handleClicks(e) {
    clicks++;

    let singleClick = setTimeout(function() {
      if (clicks === 1) {
        toggle();

        clicks = 0;
      }
    }, 300);

    if (clicks === 2) {
      clearTimeout(singleClick);

      handleSidesClick(e);

      clicks = 0;
    }
  }
  
  function _handleMouseDown(e) {
    player.addEventListener('mousemove', _scrub);

    document.addEventListener('mouseup', mouseup);

    function mouseup() {
      player.removeEventListener('mousemove', _scrub);
      document.removeEventListener('mouseup', mouseup);
    }
  }
 
  function _initEvents() {
    toggleBtn.addEventListener('click', toggle);
    video.addEventListener('click', _handleClicks);
    video.addEventListener('timeupdate', _handleProgress);
    controls.addEventListener('click', _handleSkipButtons);
    progressWrapper.addEventListener('click', _scrub);
    progressWrapper.addEventListener('mousedown', _handleMouseDown);
    volume.addEventListener('change', _changeVolume);
    playbackRate.addEventListener('change', _changePlaybackRate);
  }

  return {
    init
  }
} ());

const video = document.querySelector('.player__video');
const player1 = VideoPlayer.init(video);
