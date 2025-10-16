📱 APK Management System
========================

A full-stack web platform for managing Android applications (APKs) developed by **SRA Integration**.\
This project is composed of **two repositories**:

-   🎨 **Frontend (Angular)** → [Gestion APK Frontend](https://github.com/eya222/GestApk)

-   ⚙️ **Backend (NestJS)** → [Gestion APK Backend](https://github.com/eya222/Gest_Apk_backend)

* * * * *

Overview
-----------

The APK Management System allows authenticated users to:

-   Manage all internal Android apps in one place

-   Upload and store APKs, demo videos, screenshots, and documents

-   Add new updates for each application

-   Securely store files using **Azure Blob Storage**

* * * * *

 Tech Stack
--------------

| Layer | Technology | Description |
| --- | --- | --- |
| **Frontend** | Angular | User interface |
| **Backend** | NestJS | REST API |
| **Database** | [MongoDB](https://www.mongodb.com/) | Application and update data |
| **Storage** | Azure Blob Storage | Files (APK, demo, photos, docs) |
| **Authentication** | JWT | Secure user access |

* * * * *

🧭 Project Structure
--------------------

`📂 gestion-apk/
├── frontend/  → Angular application
└── backend/   → NestJS API`


* * * * *

⚙️ Backend Setup (NestJS)
-------------------------

### 🪣 Repository

➡️ [Gestion APK Backend](https://github.com/eya222/Gest_Apk_backend)

### 1️⃣ Clone the backend

`git clone https://github.com/eya222/Gest_Apk_backend.git
cd Gest_Apk_backend
npm install`

### 2️⃣ Configure environment

Create a `.env` file in the backend root:

`MONGODB_URI=your_mongodb_connection_string
AZURE_STORAGE_CONNECTION_STRING=your_azure_blob_connection_string
JWT_SECRET=your_secret_key
PORT=3000`

### 3️⃣ Run the backend

`npm run start:dev`

✅ Backend will run on `http://localhost:3000`

* * * * *

💻 Frontend Setup (Angular)
---------------------------

### 🪣 Repository

➡️ [Gestion APK Frontend](https://github.com/eya222/GestApk)

### 1️⃣ Clone the frontend

`git clone https://github.com/eya222/GestAPK.git
cd GestApk
npm install`

### 2️⃣ Configure API URL

In `src/environments/environment.ts`, set your backend URL:

`export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'  // NestJS server
};`

### 3️⃣ Run the frontend

`ng serve`

✅ Frontend runs at <http://localhost:4200>

* * * * *

🌐 Features
-----------

### 👤 Authentication

-   JWT-based login and signup

-   Only users with `@sra-tunisie.com` email can register

### 🧩 App Management

-   Add, update, and view all applications

-   Upload APKs, demos, documents, and photos

### 🔁 Updates

-   Each update includes:

    -   Consultants (tech + functional)

    -   Description

    -   Files (APK, demo, photos, docs)

    -   Date (auto-generated)

* * * * *

☁️ Cloud Storage (Azure Blob)
-----------------------------

All uploaded files (APKs, demos, etc.) are stored in **Azure Blob Storage**, and their URLs are saved in MongoDB for easy retrieval.



🧩 Future Enhancements
----------------------

-   Role-based access control (admin / developer)

-   Dashboard with usage statistics

-   Notifications for new updates

-   Improved file versioning system

* * * * *

👩‍💻 Author
------------

**Eya Naimi**\
Intern at **SRA Integration**\
💡 Technologies: Angular - NestJS - MongoDB - Azure Blob Storage
