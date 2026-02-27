# Use official Strapi image for simplicity
FROM strapi/strapi:latest

WORKDIR /srv/app

# Copy any custom configuration or plugins (none for now)
COPY ./ ./

# Expose default port
EXPOSE 1337

# Start Strapi
CMD ["strapi", "start"]
