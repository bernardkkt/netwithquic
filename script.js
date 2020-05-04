var dictionary={dns:{servers:[]},adroute:{domainStrategy:"IPIfNonMatch",rules:[{type:"field",outboundTag:"Reject",domain:["geosite:category-ads-all","geosite:category-ads"]}]},adsink:{protocol:"blackhole",tag:"Reject"},outboundFreedom:{protocol:"freedom"},outboundSink:{tag:"Reject",protocol:"blackhole"},inboundSocks:{tag:"socks-in",port:1080,listen:"::",protocol:"socks",settings:{udp:!0}},inboundHttp:{tag:"http-in",port:8123,listen:"::",protocol:"http"},outboundQuic:{protocol:"vmess",settings:{vnext:[{address:"example.com",port:8080,users:[{id:"00000000-0000-0000-0000-000000000000",alterId:0}]}]},streamSettings:{network:"quic",quicSettings:{security:"none",key:"",header:{type:"none"}}}},inboundQuic:{port:8080,protocol:"vmess",settings:{clients:[{id:"00000000-0000-0000-0000-000000000000",alterId:0}]},streamSettings:{network:"quic",quicSettings:{security:"none",key:"",header:{type:"none"}}}}}; var template={inbounds:[],outbounds:[]};

function switchForm() {
  var sform = document.getElementById('serverform')
  var cform = document.getElementById('clientform')
  var item = document.getElementById('type').selectedIndex

  if (item) {
    // Show client form
    sform.style.display = 'none'
    cform.style.display = 'block'
  } else {
    // Show server form
    sform.style.display = 'block'
    cform.style.display = 'none'
  }
}

function submit() {
  var formType = document.getElementById('type').selectedIndex
  var itemsObj = {}
  if (formType) {
    // Client selected
    var haddr = document.getElementById('haddr')
    var hport = document.getElementById('hport')
    var hid = document.getElementById('hid')
    var haid = document.getElementById('haid')
    var henc = document.getElementById('henc')
    var hkey = document.getElementById('hkey')
    var dns = document.getElementById('dns')

    if (haddr.validity.valid && hport.validity.valid && hid.validity.valid && haid.validity.valid) {
      // Enough data to proceed
      itemsObj.isServer = false
      itemsObj.addr = haddr.value
      itemsObj.port = hport.value
      itemsObj.uuid = hid.value
      itemsObj.aid = haid.value

      if (henc.selectedIndex && hkey.value.length !== 0) {
        // Enable encryption
        itemsObj.enc = henc.value
        itemsObj.key = hkey.value
      } else {
        alert('Warning: Encryption settings unavailable or invalid.')
      }
      if (dns.value.length !== 0) {
        // Enable custom DNS
        itemsObj.dns = dns.value
      }
      if (document.getElementById('adb').selectedIndex) {
        // Enable adblock
        itemsObj.adb = true
      }
    } else {
      // Unsufficient information
      alert('Error! Please review the data you have entered and submit again.')
      return 1
    }
  } else {
    // Server selected
    var port = document.getElementById('port')
    var id = document.getElementById('id')
    var alterId = document.getElementById('alterId')
    var enc = document.getElementById('enc')
    var key = document.getElementById('key')

    if (port.validity.valid && id.validity.valid && alterId.validity.valid) {
      // Enough data to proceed
      itemsObj.isServer = true
      itemsObj.port = port.value
      itemsObj.uuid = id.value
      itemsObj.aid = alterId.value

      if (enc.selectedIndex && key.value.length !== 0) {
        // Enable encryption
        itemsObj.enc = enc.value
        itemsObj.key = key.value
      } else {
        alert('Warning: Encryption settings unavailable or invalid.')
      }
    } else {
      // Unsufficient information
      alert('Error! Please review the data you have entered and submit again.')
      return 1
    }
  }
  console.log(itemsObj)
  main(itemsObj)
}

function main(inputObj) {
  var mainObj, socks, http
  mainObj = JSON.parse(JSON.stringify(template))
  console.log(mainObj)

  if (inputObj.isServer) {
    mainObj.outbounds.push(dictionary.outboundFreedom)
    mainObj.inbounds.push(dictionary.inboundQuic)
    // update mainObj with user input: port, alterId, id, security, key
    mainObj.inbounds[0].port = inputObj.port
    mainObj.inbounds[0].settings.clients[0].id = inputObj.uuid
    mainObj.inbounds[0].settings.clients[0].alterId = inputObj.aid

    if (inputObj.hasOwnProperty('enc')) {
      mainObj.inbounds[0].streamSettings.quicSettings.security = inputObj.enc
      mainObj.inbounds[0].streamSettings.quicSettings.key = inputObj.key
    }

    console.log(mainObj)
  } else {
    // For now always host SOCKS5 Proxy
    socks = true
    if (socks) {
      mainObj.inbounds.push(dictionary.inboundSocks)
    } else {
      mainObj.inbounds.push(dictionary.inboundHttp)
    }
    mainObj.outbounds.push(dictionary.outboundQuic)
    // update mainObj with user input: host address, port, alterId, id, security, key
    mainObj.outbounds[0].settings.vnext[0].address = inputObj.addr
    mainObj.outbounds[0].settings.vnext[0].port = inputObj.port
    mainObj.outbounds[0].settings.vnext[0].users[0].alterId = inputObj.aid
    mainObj.outbounds[0].settings.vnext[0].users[0].id = inputObj.uuid

    if (inputObj.hasOwnProperty('enc')) {
      mainObj.outbounds[0].streamSettings.quicSettings.security = inputObj.enc
      mainObj.outbounds[0].streamSettings.quicSettings.key = inputObj.key
    }
    if (inputObj.hasOwnProperty('adb')) {
      mainObj.outbounds.push(dictionary.adsink)
      mainObj.routing = JSON.parse(JSON.stringify(dictionary.adroute))
    }
    if (inputObj.hasOwnProperty('dns')) {
      mainObj.dns = JSON.parse(JSON.stringify(dictionary.dns))
      mainObj.dns.servers.push(inputObj.dns)
    }

    console.log(mainObj)
  }

  document.getElementById('stdout').innerHTML = JSON.stringify(mainObj)
}

switchForm()

