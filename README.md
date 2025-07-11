# Gallery API

A NestJS-based API for uploading and managing images with support for:

- Multiple image uploads per request
- Simulated image processing delays
- Cursor-based pagination, sorting, and filtering for image metadata

---

## Features

- **Upload Multiple Images:**  
  Upload several images in a single request using the `files` field.
- **Simulated Processing:**  
  Each image upload is delayed to simulate processing time.
- **Fetch Images with Pagination:**  
  Retrieve image metadata (not content) with cursor-based pagination, sorting, and filtering.

---

## Endpoints

### 1. Upload Images

**POST** `/images/upload`

- Accepts multiple files using the `files` field (form-data).
- Additional fields: `title` (string), `description` (string, optional).
- Simulates processing delay for each file.

**Example (curl):**

```sh
curl -X POST http://localhost:3000/images/upload ^
  -F "files=@path\to\image1.jpg" ^
  -F "files=@path\to\image2.jpg" ^
  -F "title=My Gallery" ^
  -F "description=Multiple images"
```

**Request (Postman):**

- Set method to POST and URL to `/images/upload`
- In Body > form-data:
  - Key: `files` (type: File, select multiple files)
  - Key: `title` (type: Text)
  - Key: `description` (type: Text, optional)

---

### 2. Fetch Images (Metadata Only)

**GET** `/images`

**Query Parameters:**

- `cursor` (number, optional): For pagination, pass the last received `id` as the next cursor.
- `take` (number, optional): Number of images to fetch (default: 10).
- `sortBy` (string, optional): Field to sort by (default: `createdAt`).
- `sortOrder` (`asc` | `desc`, optional): Sort order (default: `desc`).
- `title` (string, optional): Filter by title (contains, case-insensitive).
- `description` (string, optional): Filter by description (contains, case-insensitive).

**Example:**

```
GET /images?take=5&sortBy=title&sortOrder=asc&title=cat
```

**Response:**

```json
{
  "images": [
    {
      "id": 1,
      "title": "Cat 1",
      "description": "A cute cat",
      "url": "https://...",
      "createdAt": "2024-07-12T12:00:00Z"
    }
    // ...
  ],
  "nextCursor": 6
}
```

---

## Notes

- Only image metadata is returned by the GET endpoint (not the image binary).
- Use the `nextCursor` value for paginating through results.
- Make sure to use the field name `files` when uploading multiple images.

---

## Running the Project

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the server:
   ```sh
   npm run start
   ```
3. The API will be available at `http://localhost:3000/`

---
