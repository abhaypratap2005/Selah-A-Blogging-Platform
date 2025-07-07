
# Selah - A Blogging Platform

![Banner](src/components/assets/WhatsApp%20Image%202025-07-08%20at%2002.15.45_d2097d46.jpg)

A modern blog application built with **React** and **Vite** on the frontend and **Appwrite** as the backend. It supports user authentication (login/sign-up), file uploads, and secure data storage.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (>=14.x)
- **npm** or **yarn**
- An **Appwrite** account (self-hosted or Appwrite Cloud)

---


### Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/my-blog-app.git
    cd my-blog-app
    ```

2. **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3. **Configure environment variables**

    Create a `.env` file in the project root and add:

    ```env

    VITE_APPWRITE_URL=https://<YOUR_APPWRITE_ENDPOINT>/v1
    VITE_APPWRITE_PROJECT_ID=<YOUR_PROJECT_ID>
    VITE_APPWRITE_DATABASE_ID=<YOUR_DATABASE_ID>
    VITE_APPWRITE_COLLECTION_ID=<YOUR_COLLECTION_ID>
    VITE_APPWRITE_BUCKET_ID=<YOUR_BUCKET_ID>
    ```

4. **Start the development server**
    ```bash

    npm run dev
    # or
    yarn dev
    ```

5. **Open your browser** at [http://localhost:5173](http://localhost:5173)

---

## 🛠️ Built With

- **React** – A JavaScript library for building user interfaces
- **Vite** – Next Generation Frontend Tooling
- **Appwrite** – Open-source backend server for authentication, database, and file storage

---

## 🎯 Features

- **User Authentication:** Sign up, login, and logout powered by Appwrite
- **Blog Posts:** Create, read, update, and delete your posts
- **File Uploads:** Upload images and files via Appwrite Storage
- **Responsive UI:** Mobile-friendly layout with Tailwind CSS
- **State Management:** Global state with Redux Toolkit

---

## 📈 How It Works

**Frontend:**

- Built with React & Vite
- Routes managed by React Router Dom
- UI components styled with Tailwind CSS
- State management using Redux Toolkit

**Backend:**
- Appwrite handles user sessions and database queries
- Secure file uploads to Appwrite Storage
- Queries made with Appwrite's JavaScript SDK

---

## 📦 Available Scripts

In the project directory, you can run:

- `npm run dev` – Starts the Vite development server
- `npm run build` – Bundles the app for production
- `npm run preview` – Locally preview the production build

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

