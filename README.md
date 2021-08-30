# EBS

Initial repo for the Genome Alberta funded Enabling Bioinformatic Solutions (EBS) project.
https://genomealberta.ca/funding/new-funding-for-bioinformatics-in-alberta.aspx

## Getting Started

### Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Run the production server:

```bash
yarn build
# and
yarn start
```

Open [http://YOURDOMAIN] with your browser to see the result.

## Dev Notes

### 1. User Authentication Conflict

Conflict issue between CSRF (backend) and JWT (frontend).
When the issue occurs, users must clean up caches and cookies of their browser.

### 2. API Request Optimization needed

Multiple requests are sent when connection is established between the backend and the frontend.

### 3. 'AND' join issue on the Filters in the side menu

Multiple selection is not working, when user select more than 1 item in different category.

### 4. Global Search is not properly working

When search field is used, partial keyword matching doesn't work properly. It might be caused by a custom filter definition in the backend.
