# HAProxy API Monetization Demo

This project demonstrates how to use HAProxy with Keycloak to restrict access to the 
API servers to only clients that present a valid OAuth 2 access token. Each token
includes a scope field that's set to *bronze*, *silver*, or *gold*. You could charge
clients a fee to access the API at the various subscription levels.

HAProxy enforces rate limits:

- Gold = up to 10 request/minute
- Silver = up to 100 requests/minute
- Gold = up to 1000 requests/minute

Setup
-----

To set up the demo project, initialize it with Docker Compose:

```
sudo docker-compose build
sudo docker-compose up -d
```

The application listens on *localhost*. Go to http://localhost/auth to set up clients in Keycloak. Keycloak issues access tokens, which HAProxy validates.