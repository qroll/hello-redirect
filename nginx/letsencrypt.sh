docker run -it --rm --name letsencrypt \
    -v "/root/hello-redirect/data/etc/letsencrypt:/etc/letsencrypt" \
    -v "/root/hello-redirect/data/var/lib/letsencrypt:/var/lib/letsencrypt" \
    -v "/root/hello-redirect/data/tmp/letsencrypt/www:/var/www" \
    certbot/certbot \
        certonly \
        -d rollplays.me \
        -d www.rollplays.me \
        --authenticator webroot \
        --webroot-path /var/www \
        --renew-by-default