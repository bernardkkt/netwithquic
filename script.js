var dictionary={dns:{servers:[]},adroute:{domainStrategy:"IPIfNonMatch",rules:[{type:"field",outboundTag:"Reject",domain:["geosite:category-ads-all","geosite:category-ads"]}]},adsink:{protocol:"blackhole",tag:"Reject"},outboundFreedom:{protocol:"freedom"},outboundSink:{tag:"Reject",protocol:"blackhole"},inboundSocks:{tag:"socks-in",port:1080,listen:"::",protocol:"socks",settings:{udp:!0}},inboundHttp:{tag:"http-in",port:8123,listen:"::",protocol:"http"},outboundQuic:{protocol:"vmess",settings:{vnext:[{address:"example.com",port:8080,users:[{id:"00000000-0000-0000-0000-000000000000",alterId:0}]}]},streamSettings:{network:"quic",quicSettings:{security:"none",key:"",header:{type:"none"}}}},inboundQuic:{port:8080,protocol:"vmess",settings:{clients:[{id:"00000000-0000-0000-0000-000000000000",alterId:0}]},streamSettings:{network:"quic",quicSettings:{security:"none",key:"",header:{type:"none"}}}}},template={inbounds:[],outbounds:[]};

function switchForm () {
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

function main () {
  var mainObj, server, client, socks, http, dns, adblock
  server = true

  if (server) {
    mainObj = template
    mainObj.outbounds.push(dictionary.outboundFreedom)
    mainObj.inbounds.push(dictionary.inboundQuic)
    // update mainObj with user input: port, alterId, id, security, key

    console.log(mainObj)
  } else if (client) {
    mainObj = template
    if (socks) {
      mainObj.inbounds.push(dictionary.inboundSocks)
    }
    if (http) {
      mainObj.inbounds.push(dictionary.inboundHttp)
    }
    if (adblock) {
      mainObj.outbounds.push(dictionary.adsink)
      mainObj.routing = dictionary.adroute
    }
    if (dns) {
      mainObj.dns = dictionary.dns
    }
    mainObj.outbounds.push(dictionary.outboundQuic)
    // update mainObj with user input: host address, port, alterId, id, security, key

    console.log(mainObj)
  } else {
    console.log('Error! Must be either client or server but not empty')
    return 1
  }
  return mainObj
}

switchForm()
