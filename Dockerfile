FROM lucee/lucee52-nginx:5.2.3.35

COPY docker/lucee/lucee-server.xml /opt/lucee/server/lucee-server/context/lucee-server.xml
COPY docker/lucee/lucee-web.xml.cfm /opt/lucee/web/lucee-web.xml.cfm
