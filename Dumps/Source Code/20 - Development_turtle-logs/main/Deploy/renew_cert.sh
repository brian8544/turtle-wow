systemctl stop nginx
systemctl stop postfix
certbot renew
systemctl start nginx
systemctl start postfix