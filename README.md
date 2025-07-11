# Codelab

Codelab is a full-stack platform for freelancers and learners to share, discover, and manage resources, gigs, events, and more. It features a modern React frontend, a Node.js/Express backend, MongoDB for storage, and Cloudinary for media uploads.

---

## Screenshots

> _Below are some screenshots of the Codelab platform interface:_

- Auth Page
<p align="center">
  <img src="./ScreenShots/AuthPage.png" alt="Auth Page" width="700"/>
</p>

- Landing Page
<p align="center">
  <img src="./ScreenShots/landingPage.png" alt="Landing Page" width="700"/>
</p>

- Dashboard Page
<p align="center">
  <img src="./ScreenShots/DashboardPage.png" alt="Dashboard" width="700"/>
</p>

- Library Page
<p align="center">
  <img src="./ScreenShots/LibraryPage.png" alt="Resource List" width="700"/>
</p>

- create Library Page
<p align="center">
  <img src="./ScreenShots/createLibraryResources.png" alt="Create Resource" width="700"/>
</p>

- Library (Article) Page
<p align="center">
  <img src="./ScreenShots/LibraryArticle.png" alt="Library Article" width="700"/>
</p>

- Library (Code) Page
<p align="center">
  <img src="./ScreenShots/libraryCode.png" alt="Library Code" width="700"/>
</p>

- Library (Video) Page
<p align="center">
  <img src="./ScreenShots/libraryVideo.png" alt="Library Video" width="700"/>
</p>

- Crate Gigs Page
<p align="center">
  <img src="./ScreenShots/CrateGig.png" alt="Create Gig" width="700"/>
</p>

- GigDetails Page
<p align="center">
  <img src="./ScreenShots/GigDetails.png" alt="Gig Details" width="700"/>
</p>

- Event Page
<p align="center">
  <img src="./ScreenShots/EventPage.png" alt="Events" width="700"/>
</p>

- Inbox Page
<p align="center">
  <img src="./ScreenShots/InboxPage.png" alt="Inbox Page" width="700"/>
</p>

- Profile Page
<p align="center">
  <img src="./ScreenShots/ProfilePage.png" alt="Profile Page" width="700"/>
</p>

- Notification Page
<p align="center">
  <img src="./ScreenShots/NotificationPage.png" alt="Notifications" width="700"/>
</p>

- saved Page
<p align="center">
  <img src="./ScreenShots/savedPage.png" alt="Saved Page" width="700"/>
</p>

- Settings Page
<p align="center">
  <img src="./ScreenShots/settingPage.png" alt="Settings Page" width="700"/>
</p>

- Code-editor Page
<p align="center">
  <img src="./ScreenShots/CodeEditor.png" alt="Code Editor" width="700"/>
</p>

- Create Event Page
<p align="center">
  <img src="./ScreenShots/CreatePage.png" alt="Create Page" width="700"/>
</p>

---

## Features

- **User Authentication** (JWT, protected routes)
- **Resource Library**: Create, edit, delete, and browse articles, code, videos, and files
- **Freelancer Dashboard**: Manage gigs, events, connections, and personal resources
- **Gigs Marketplace**: Post, browse, and manage freelance gigs
- **Events Management**: Create, join, and manage events or challenges
- **File Uploads**: Upload and manage media files via Cloudinary
- **Real-time Chat**: Connect and communicate with other users
- **Notifications**: Get notified about important updates and activities
- **Connections**: Build and manage your professional network
- **Profile Management**: Edit your profile, settings, and preferences
- **Responsive UI**: Works seamlessly on desktop and mobile
- **RESTful API**: Well-structured backend endpoints for all features

---

## Tech Stack

**Frontend:**
- React
- Redux Toolkit (state management)
- Tailwind CSS (styling)
- Axios (API requests)
- React Router (routing)
- React Hot Toast (notifications)

**Backend:**
- Node.js
- Express.js
- MongoDB & Mongoose (database & ODM)
- Multer (file uploads)
- Cloudinary (media storage)
- JWT (authentication)
- dotenv (environment variables)

**Other:**
- ESLint & Prettier (code quality)
- Postman (API testing)
- Git & GitHub (version control & collaboration)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/adeshsinghbits/codelab.git
cd codelab
```

### 2. Install dependencies

#### Backend

```bash
cd Backend
npm install
npm run dev
```

#### Frontend

```bash
cd ../frontend
npm install
npm run dev
```

### 3. Environment Variables

#### Backend (`Backend/.env`)

```
PORT = 8000
CORS_ORIGIN = *
MONGODB_URI =your_mongodb_connection_string

CLOUDINARY_CLOUD_NAME =your_cloudinary_cloud_name
CLOUDINARY_API_KEY =your_cloudinary_api_key
CLOUDINARY_API_SECRET =your_cloudinary_api_secret

GOOGLE_CLIENT_ID =your_google_client_id
GOOGLE_CLIENT_SECRET =your_google_client_secret
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:8000
NODE_ENV=development

JWT_SECRET = your_jwt_secret

```

#### Frontend (`frontend/.env`)

```
VITE_API_URL=http://localhost:8000
```

### 4. Run the app

#### Backend

```bash
cd Backend
npm run dev
```

#### Frontend

```bash
cd ../frontend
npm run dev
```

---

## Folder Structure

```
codelab/
  Backend/
    src/
      controllers/
      models/
      routes/
      utils/
      ...
    .env
    ...
  frontend/
    src/
      features/
      components/
      pages/
      utils/
      ...
    .env
    ...
```

---

## API Endpoints

### Auth
- `POST   /auth/register` — Register a new user
- `POST   /auth/login` — Login user
- `GET    /auth/me` — Get current user profile

### Resource Library
- `POST   /resource` — Create a resource
- `GET    /resource` — Get all resources
- `GET    /resource/:id` — Get resource by ID
- `PUT    /resource/:id` — Update resource
- `DELETE /resource/:id` — Delete resource
- `POST   /resource/upload` — Upload file to Cloudinary
- `GET    /resource/freelancer/:freelancerId` — Get resources by freelancer

### Gigs
- `POST   /gigs` — Create a gig
- `GET    /gigs` — Get all gigs
- `GET    /gigs/:id` — Get gig by ID
- `PUT    /gigs/:id` — Update gig
- `DELETE /gigs/:id` — Delete gig
- `GET    /gigs/freelancer/:freelancerId` — Get gigs by freelancer

### Events
- `POST   /events` — Create an event
- `GET    /events` — Get all events
- `GET    /events/:id` — Get event by ID
- `PUT    /events/:id` — Update event
- `DELETE /events/:id` — Delete event
- `GET    /events/creator/:creatorId` — Get events by creator

### Chat & Connections
- `GET    /chat/connections/:userId` — Get user connections
- `POST   /chat/message` — Send a message
- `GET    /chat/messages/:chatId` — Get messages for a chat

### Notifications
- `GET    /notifications/:userId` — Get notifications for user
- `PUT    /notifications/:id/read` — Mark notification as read

---

## License

This project is licensed under the MIT License.

---

## Credits

- [Cloudinary](https://cloudinary.com/)
- [MongoDB](https://www.mongodb.com/)
- [React](https://react.dev/)