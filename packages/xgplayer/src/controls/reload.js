import Player from '../player'

let reload = function () {
  let player = this
  let reloadConfig = player.config.reload
  if (!reloadConfig) { return }

  function onReloadBtnClick () {
    Player.util.removeClass(player.root, 'xgplayer-is-error')
    player.src = player.config.url
  }
  player.on('reloadBtnClick', onReloadBtnClick)

  function onDestroy () {
    player.off('reloadBtnClick', onReloadBtnClick)
    player.off('destroy', onDestroy)
  }
  player.once('destroy', onDestroy)
}

Player.install('reload', reload)
