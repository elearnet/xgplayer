import Player from '../../player'
import RequestFullIcon from '../assets/requestFull.svg'
import ExitFullIcon from '../assets/exitFull.svg'

let s_fullscreen = function () {
  let player = this
  let util = Player.util
  let fullscreenBtn = player.config.fullscreenBtn ? player.config.fullscreenBtn : {}
  let btn, iconRequestFull, iconExitFull
  if (fullscreenBtn.type === 'img') {
    btn = util.createImgBtn('fullscreen', fullscreenBtn.url.request, fullscreenBtn.width, fullscreenBtn.height)
  } else {
    btn = util.createDom('xg-fullscreen', `<xg-icon class="xgplayer-icon">
                                             <div class="xgplayer-icon-requestfull">${RequestFullIcon}</div>
                                             <div class="xgplayer-icon-exitfull">${ExitFullIcon}</div>
                                           </xg-icon>`, {}, 'xgplayer-fullscreen')
  }

  let tipsText = {}
  tipsText.requestfull = player.lang.FULLSCREEN_TIPS
  tipsText.exitfull = player.lang.EXITFULLSCREEN_TIPS
  let tips = util.createDom('xg-tips', `<span class="xgplayer-tip-requestfull">${tipsText.requestfull}</span>
                                        <span class="xgplayer-tip-exitfull">${tipsText.exitfull}</span>`, {}, 'xgplayer-tips')
  btn.appendChild(tips)
  player.once('ready', () => {
    if(player.controls) {
      player.controls.appendChild(btn)
    }
  });

  ['click', 'touchend'].forEach(item => {
    btn.addEventListener(item, function (e) {
      e.preventDefault()
      e.stopPropagation()
      player.emit('fullscreenBtnClick')
    })
  })
}

Player.install('s_fullscreen', s_fullscreen)
