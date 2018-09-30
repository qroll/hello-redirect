FROM nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.letsencrypt.conf /etc/nginx/conf.d/default.conf