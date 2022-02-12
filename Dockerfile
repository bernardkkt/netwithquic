FROM alpine:latest

RUN apk --update add --no-cache curl unzip

RUN curl -L -o /tmp/v2ray.zip "https://github.com/v2fly/v2ray-core/releases/latest/download/v2ray-linux-64.zip"
RUN unzip /tmp/v2ray.zip -d /opt/v2ray && rm /tmp/v2ray.zip
RUN chmod a+x /opt/v2ray/v2ray /opt/v2ray/v2ctl

RUN mkdir -p /etc/v2ray
WORKDIR /etc/v2ray

ENV PATH="/opt/v2ray:$PATH"
CMD ["v2ray"]
