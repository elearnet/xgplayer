
import querystring from 'querystring'
class XHR {
  constructor ({url, method = 'GET', type = 'arraybuffer', data = {}} = {}) {
    return new Promise((resolve, reject) => {
      let R = new window.XMLHttpRequest()
      let _method = method.toUpperCase()
      let _data = []
      if (type) {
        R.responseType = type
      }
      let splitUrls = url.split('?');
      let search = data;
      if(splitUrls[1]){
        Object.assign(search, querystring.parse(splitUrls[1])) ;
      }
      if (_method === 'GET') {
        let u = Object.keys(search).length > 0 ? `${splitUrls[0]}?${querystring.stringify(search)}` : splitUrls[0];
        R.open(_method, u) 
        R.send()
      } else if (_method === 'post') {
        if (url.indexOf('data:application/json;base64') === 0) {
          R.open(_method, url, true)
          R.timeout = 0
          R.withCredentials = false
          R.send(_data)
        } else {
          R.open(_method, url)
          R.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
          R.send(_data.join('&'))
        }
      } else {
        throw new Error(`xhr ${_method} is not supported`)
      }
      R.onload = () => {
        if (R.status === 200 || R.status === 206) {
          resolve(R)
        } else {
          reject(R)
        }
      }
      R.onerror = () => {
        reject(R)
      }
    })
  }
}

export default XHR
