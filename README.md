# Gallery Application

A modern web application for managing image uploads, storage, and metadata. Built with NestJS, Prisma, PostgreSQL, and Supabase Storage.

## Features

- Upload images with title and description
- Store image metadata in PostgreSQL
- Store image files in Supabase Storage
- Retrieve all images or a single image by ID
- Delete images (removes both metadata and file)
- RESTful API with clear endpoints

## Tech Stack

- **Backend:** [NestJS](https://nestjs.com/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Database:** PostgreSQL
- **Cloud Storage:** [Supabase Storage](https://supabase.com/storage)
- **Node.js:** v16 or later

## Getting Started

### Prerequisites

- Node.js v16+
- PostgreSQL database
- Supabase project with a storage bucket named `gallery`

### Installation

```sh
git clone https://github.com/re00zq/gallery
cd gallery
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```
DATABASE_URL="your_postgres_connection_string"
SUPABASE_URL="your_supabase_url"
SUPABASE_KEY="your_supabase_service_role_key"
```

### Database Migration

Run Prisma migrations to set up the database schema:

```sh
npx prisma migrate deploy
```

### Running the Application

```sh
npm run start:dev
```

The server will start on `http://localhost:3000`.

## API Endpoints

All endpoints are prefixed with `/images`.

### 1. Upload Image

- **URL:** `POST /images/upload`
- **Description:** Upload a new image with title and description.
- **Request:**
  - Content-Type: `multipart/form-data`
  - Fields:
    - `file`: Image file (required)
    - `title`: String (required)
    - `description`: String (optional)
- **Response:** Returns the created image metadata.

#### Example (using curl):

```sh
curl -X POST http://localhost:3000/images/upload \
  -F "file=@/path/to/image.jpg" \
  -F "title=Sample Image" \
  -F "description=An example image"
```

---

### 2. Get All Images

- **URL:** `GET /images`
- **Description:** Retrieve a list of all images.
- **Response:** Array of image objects.

---

### 3. Get Image by ID

- **URL:** `GET /images/:id`
- **Description:** Retrieve a single image by its ID.
- **Response:** Image object.

---

### 4. Delete Image

- **URL:** `DELETE /images/:id`
- **Description:** Delete an image by its ID (removes both metadata and file from storage).
- **Response:** Deleted image object.

---

## Project Structure

```
src/
  app.module.ts
  main.ts
  images/
    images.controller.ts
    images.module.ts
    images.service.ts
  prisma/
    prisma.service.ts
  supabase/
    supabase.service.ts
prisma/
  schema.prisma
  migrations/
```
