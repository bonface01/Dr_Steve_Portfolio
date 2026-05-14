# Firestore Schema

## Collections

### blogPosts

- `id`: string
- `slug`: string
- `title`: string
- `excerpt`: string
- `category`: `Psychology | Leadership | Education | Wellness`
- `coverImage`: string URL
- `content`: rich text HTML
- `author`: string
- `publishedAt`: ISO date string
- `likes`: number
- `featured`: boolean

### events

- `id`: string
- `slug`: string
- `title`: string
- `date`: ISO date string
- `type`: `Conferences | Workshops | Lectures | PDC events | University activities`
- `description`: string
- `coverImage`: string URL
- `gallery`: string URL array
- `location`: string
- `featured`: boolean

### galleryItems

- `id`: string
- `title`: string
- `category`: `Events | Lectures | Workshops | Community`
- `image`: string URL
- `description`: string

### comments

- `id`: string
- `entityType`: `blog | event`
- `entityId`: string
- `name`: string
- `message`: string
- `status`: `pending | approved`
- `createdAt`: ISO datetime string

### contactSubmissions

- `name`: string
- `email`: string
- `phone`: string
- `type`: string
- `message`: string
- `createdAt`: ISO datetime string
- `status`: `new | reviewed | archived`

## Storage

Use Firebase Storage folders:

- `blog/`
- `events/`
- `gallery/`

## Auth

Create admin users in Firebase Authentication with email/password. The dashboard uses Firebase Auth when public Firebase env vars are present.
