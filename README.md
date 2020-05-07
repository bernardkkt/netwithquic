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
#### For server
1. Create a file named `config.json` in a folder.
2. Visit to [this page](https://bernardkkt.github.io/netwithquic/) to generate the content for `config.json`.
    1. Choose **server** for **Generate configuration for**.
    2. Enter a port number you would like to use for listening to incoming connection from the client.
    3. Enter a UUID string. You can generate one from [here](https://uuidgen.org/v/4).
    4. Choose a value between 0-65535 for **Alternative ID**. The recommended value is 4. See **alterId** under [here](https://v2ray.com/en/configuration/protocols/vmess.html#userobject) for more information.
    5. It is recommended to set up the encryption setting. If you choose **None**, the **Key** field will be ignored. Otherwise, if you don't enter a key, the selection you have made for **Encryption** will be treated as **None**.
    6. Press the submit button and copy the output to `config.json`.
3. Save `config.json` with the new content.
4. Run the following command to start the server:
   ```
   docker run -v -p 0.0.0.0:$PORT:$PORT $PWD:/etc/v2ray netwithquic
   ```
   where $PORT refers to the selected port number above, and $PWD refers to the folder path that contains `config.json`.

#### For client
TBA
