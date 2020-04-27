var dictionary = {
  outboundFreedom: {
    protocol: 'freedom'
  },
  outboundSink: {
    tag: 'Reject',
    protocol: 'blackhole'
  },
  inboundQuic: {
    port: 8080,
    protocol: 'vmess',
    settings: {
      clients: [{
        id: '00000000-0000-0000-0000-000000000000',
        alterId: 0
      }]
    },
    streamSettings: {
      network: 'quic',
      quicSettings: {
        security: 'none',
        key: '',
        header: {
          type: 'none'
        }
      }
    }
  }
}


var template = {
  inbounds: [],
  outbounds: []
}

var addition = {
  dns: {},
  routing: {}
}

function main () {
  var mainObj, server, client, socks, http, dns, adblock
  server = true
  if (server) {
    mainObj = template
    mainObj.outbounds.push(dictionary.outboundFreedom)
    mainObj.inbounds.push(dictionary.inboundQuic)
    // update mainObj with user input: port, alterId, id
    console.log(mainObj)

  } else if (client) {
    return
  } else {
    console.log("Error! Must be either client or server but not empty")
    return 1
  }
  return mainObj
}

main()
