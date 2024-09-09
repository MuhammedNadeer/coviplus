
# Coviplus

Coviplus is a web application designed to help people who are suffering diseases from COVID-19. It's basically a health management app with a health chatbot and an ML based disease prediction system. The project consists of a **frontend** built with React, Vite, and Tailwind CSS, and a **backend** built with Flask, along with an integrated machine learning model.

## Project Structure

```
Coviplus/
│
├── coviplus_frontend/
│   └── coviplus_react/   # React + Vite + Tailwind CSS code
│
└── coviplus_backend/
    ├── server.py         # Flask server file
    ├── requirements.txt  # Dependencies for Flask and ML model
    └── static            # Uploaded files
```

---

## Frontend

The frontend of Coviplus is developed using **React** with **Vite** as the build tool and **Tailwind CSS** for styling.

### Prerequisites

- **Node.js** (v16+)
- **Vite** (comes with React template)
- **NPM** or **Yarn** (NPM comes with Node.js installation)

### Setup

1. **Install Dependencies**

   Navigate to the `coviplus_react` folder inside `coviplus_frontend`.

   ```bash
   cd coviplus_frontend/coviplus_react
   npm install
   ```

2. **Run the Development Server**

   To start the frontend development server, use the following command:

   ```bash
   npm run dev
   ```

   The app should now be running at `http://localhost:3000`.

### Build for Production

To build the frontend for production, run:

```bash
npm run build
```

This will create an optimized production build of your React app in the `dist` folder.

---

## Backend

The backend of Coviplus is powered by **Flask**, which serves as the API for the frontend and integrates a machine learning model for predictions (or any other ML tasks).

### Prerequisites

- **Python 3.8+**
- **Flask** (listed in `requirements.txt`)

### Setup

1. **Create a Virtual Environment (optional but recommended)**

   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install Dependencies**

   Navigate to the `coviplus_backend` folder and install the required packages using `pip`:

   ```bash
   cd coviplus_backend
   pip install -r requirements.txt
   ```

3. **Run the Backend Server**

   To start the Flask server, run:

   ```bash
   python server.py
   ```

   The backend will now be running at `http://localhost:5000`.

### Running the ML Model

The ML model is integrated with the Flask API, and the necessary code is in `server.py`. Depending on your model's structure, make sure the model file is located in the correct path and that it loads properly when the Flask server is running.

---

## Frontend-Backend Integration

Ensure both the frontend and backend are running simultaneously for the application to function properly. If your backend API is being called from the frontend, update the frontend configuration to point to the correct backend URL (e.g., `http://localhost:5000` for local development).

---