#!/usr/bin/env bash
# .platform/hooks/postdeploy/00_get_certificate.sh
sudo certbot -n -d dev.ellarises.net --nginx --agree-tos --email admin@bromunity.app