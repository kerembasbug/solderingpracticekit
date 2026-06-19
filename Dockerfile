# syntax=docker/dockerfile:1

# ---------- Stage 1: build the static site ----------
FROM node:22-alpine AS build
WORKDIR /app

# Build-time configuration. In Coolify, set these as Build Variables so they are
# available during `npm run build`. PA-API keys are optional — without them the
# site builds from curated data and shows "Check price on Amazon".
ARG SITE_URL=https://solderingpracticekit.com
ARG AMAZON_PARTNER_TAG
ARG AMAZON_ACCESS_KEY
ARG AMAZON_SECRET_KEY
ARG AMAZON_HOST=webservices.amazon.com
ARG AMAZON_REGION=us-east-1
ARG AMAZON_MARKETPLACE=www.amazon.com
ARG AMAZON_STOREFRONT=amazon.com
ARG CONTACT_EMAIL

ENV SITE_URL=$SITE_URL \
    AMAZON_PARTNER_TAG=$AMAZON_PARTNER_TAG \
    AMAZON_ACCESS_KEY=$AMAZON_ACCESS_KEY \
    AMAZON_SECRET_KEY=$AMAZON_SECRET_KEY \
    AMAZON_HOST=$AMAZON_HOST \
    AMAZON_REGION=$AMAZON_REGION \
    AMAZON_MARKETPLACE=$AMAZON_MARKETPLACE \
    AMAZON_STOREFRONT=$AMAZON_STOREFRONT \
    CONTACT_EMAIL=$CONTACT_EMAIL

# Install dependencies against the lockfile for reproducible builds.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---------- Stage 2: serve with nginx ----------
FROM nginx:1.27-alpine AS runtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
