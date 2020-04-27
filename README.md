# netwithquic
Access the internet with QUIC technology

## Introduction
**netwithquic** is a project aims to transmit all network packets via QUIC protocol across the internet. According to [The Chromium Projects](https://www.chromium.org/quic), QUIC is a new transport protocol developed by Google, and it is implemented on top of UDP (see link for more details). This project uses [Project V](https://github.com/v2ray/v2ray-core) in a Docker container, which is intended to run on the client and the server during runtime. The server receives incoming packets from the Project V client in QUIC and redirects them to their corresponding destinations. When the destinations respond to the server, the server forwards the packets back to the Project V client in QUIC. The type of the QUIC protocol used by Project V is IETF QUIC [[1](https://www.v2ray.com/en/configuration/transport/quic.html)].

## Usage
### Prerequisite
* [Docker](https://docs.docker.com/engine/install/)
* Active internet connection

### Installation
Run the following code on your terminal/command prompt of your server/client:
```bash
$ docker build -t "netwithquic" https://github.com/bernardkkt/netwithquic.git
```

### Usage
TBA
