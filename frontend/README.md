# Training module app

**Tech Stack:**

React

Vite

Tailwind CSS

Node.js

Express.js

MongoDB

Mongoose

Jwt

bycrypt

Cloudinary

Multer (for file uploads)

## Frontend
`**HomePage.jsx**` 

- Displays a list of modules and options to create a new module, login, or signup.
`**Login.jsx**` 

- Provides a form for users to log in.
`**Signup.jsx**` 

- Provides a form for users to register a new account.
`**ModulePage.jsx**` 

- Displays a module with pages, showing text content on the left and video player on the right.
- Includes a progress tracker that updates as videos play.
`**CreateModulePage.jsx**` 

- Provides a form to create a new module with text and video uploads.
`**VideoUpload.jsx**` 

- Component for uploading video files.
`**ProgressBar.jsx**` 

- Displays the progress of the module as a progress bar.


## Backend
**Auth Routes (**`**auth.js**` **):**

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Authenticate a user.
**Module Routes (**`**modules.js**` **):**

- **POST /api/modules**: Create a new module.
- **GET /api/modules**: Retrieve all modules.
- **POST /api/modules/upload**: Upload a video.
**User Routes (**`**users.js**` **):**

- **POST /api/users/progress**: Update user progress.
and respective controllers

## things its lacking
Add user authentication checks and enhance user experience.

Implement additional features like video playback controls or module search.



