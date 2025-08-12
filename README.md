# Vinylogue 💿

### Your Digital Record Shelf

*Built with the MERN stack and styled with a bold, brutalist aesthetic.*

[](https://www.google.com/search?q=https://vercel.com/new/clone%3Frepository-url%3Dhttps%253A%252F%252Fgithub.com%252FJalpan04%252Fvinylogue-project)
[](https://render.com/deploy)

Vinylogue is a full-stack web application for music enthusiasts to discover, rate, review, and catalog albums. Inspired by Letterboxd's model for film, Vinylogue provides an opinionated, functional, and stylish platform for logging your musical journey.

**Live Demo:** `https://vinylogue-project.vercel.app/`

-----

## 📸 Screenshots

**I recommend you add these images to showcase the app's features and unique style.**

1.  **Homepage:** Take a screenshot of the main search page. This will show off your logo and the clean, brutalist design.
    `[YOUR HOMEPAGE SCREENSHOT HERE]`

2.  **Album Page:** A screenshot of a specific album's page. Capture the review form with the SVG star rating system and the red heart "like" button.
    `[YOUR ALBUM PAGE SCREENSHOT HERE]`

3.  **Profile Page:** After liking a few albums, take a screenshot of your profile page to show the grid of liked album covers.
    `[YOUR PROFILE PAGE SCREENSHOT HERE]`

-----

## ✨ Key Features

  * **User Authentication:** Secure user sign-up and login using JSON Web Tokens (JWT).
  * **Dynamic Album Search:** Search for any album using a debounced, real-time connection to the Spotify Web API.
  * **Refined Search Results:** Backend logic filters out singles, compilations, and duplicate album entries for a clean user experience.
  * **Album Rating & Reviewing:** A custom-built, interactive SVG star rating system (supporting half-star ratings) and a text review form.
  * **"Liking" System:** Users can "like" albums, which are then saved to their profile.
  * **User Profiles:** A dedicated page for each user to display their collection of liked albums.
  * **Account Management:** A settings page where users can view their details and permanently delete their account and all associated data.
  * **Responsive Design:** A clean and functional UI that works on various screen sizes.

-----

## 🛠️ Tech Stack

| Category      | Technology                                                                                                                                                                                                       |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend** | React, Vite, React Router, Axios, CSS3                                                                                                                                                                           |
| **Backend** | Node.js, Express.js, Mongoose                                                                                                                                                                                    |
| **Database** | MongoDB (with MongoDB Atlas for cloud hosting)                                                                                                                                                                   |
| **API** | Spotify Web API                                                                                                                                                                                                  |
| **Deployment**| **Frontend:** Vercel, **Backend:** Render                                                                                                                                                                        |

-----

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

  * Node.js (v18.x or later)
  * npm
  * Git

### Installation & Setup

1.  **Clone the repository:**

    ```sh
    git clone https://github.com/Jalpan04/vinylogue-project.git
    cd vinylogue-project
    ```

2.  **Install Backend Dependencies:**

    ```sh
    cd backend
    npm install
    ```

3.  **Install Frontend Dependencies:**

    ```sh
    cd ../frontend
    npm install
    ```

4.  **Set Up Environment Variables:**
    You will need to create two environment files. Use the `.env.example` files in each directory as a template.

      * In the `/backend` directory, create a `.env` file:

        ```env
        MONGO_URI=YOUR_MONGODB_ATLAS_CONNECTION_STRING
        PORT=5001
        JWT_SECRET=YOUR_SUPER_SECRET_JWT_KEY
        SPOTIFY_CLIENT_ID=YOUR_SPOTIFY_CLIENT_ID
        SPOTIFY_CLIENT_SECRET=YOUR_SPOTIFY_CLIENT_SECRET
        ```

      * In the `/frontend` directory, create a `.env.local` file:

        ```env
        VITE_API_URL=http://localhost:5001
        ```

5.  **Run the Application:**
    You will need to run the backend and frontend servers in two separate terminals.

      * To start the backend server (from the `/backend` directory):
        ```sh
        npm start
        ```
      * To start the frontend development server (from the `/frontend` directory):
        ```sh
        npm run dev
        ```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) (or the port specified by Vite) to view the app in your browser.

-----

## ☁️ Deployment

This project is configured for a split deployment:

  * The **backend** is deployed as a Web Service on **Render**. The `Root Directory` is set to `/backend`.
  * The **frontend** is deployed on **Vercel**. The `Root Directory` is set to `/frontend`, and the `VITE_API_URL` environment variable is set to the live Render URL.

-----

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
