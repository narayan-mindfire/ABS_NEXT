# ABS Next

ABS Next is a modern web application designed to streamline business processes and enhance productivity. This documentation provides an overview of the application's structure, features, and setup instructions.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Features

- Modular and scalable architecture
- User authentication and authorization
- RESTful API integration
- Responsive UI with modern design
- Role-based access control
- SSR used wherever necessary to enhance search engine friendliness

## Project Structure

```
abs-next/
├── public/             # Static assets
├── src/                # Application source code
│   ├── app/            # Main application
│   ├── components/     # Reusable components and utility components
│   ├── const/          # constants
│   ├── context/        # global state using context api
│   ├── hooks/          # custom hooks used
│   ├── types/          # types and interfaces
│   ├── storage/        # local storage functions
│   ├── utils/          # utility functions
│   ├── storage/        # local storage functions
│
├── middleware.ts       # Middleware for route protection
├── .env                # Environment variables
├── package.json        # Project metadata and scripts
└── README.md           # Project documentation
```

## Getting Started

0. **Pre requisite**

- The application requires its backend(buit with node+express+mongoose) please refer:
  `https://github.com/narayan-mindfire/ABS_BACKEND/blob/main/README.md`
  to get started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/narayan-mindfire/ABS_NEXT.git
   cd abs-next
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Open the app:**
   - Visit [http://localhost:3000](http://localhost:3000) in your browser.
