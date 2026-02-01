🚐 TravelTrucks (Campers Catalog)

A web application for browsing and filtering camper vans with a detailed view for each vehicle.

The project is built using React, Redux Toolkit, and Vite.

🔗 Demo

👉 Live demo: https://vercel.com/olehs-projects-a8035e09/travel-trucks
👉 API: https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers

✨ Features

📋 Camper vans catalog

🔍 Filtering by:

location

body type (Van, Fully Integrated, Alcove)

equipment (AC, Kitchen, TV, Bathroom, etc.)

📄 Camper details page

⭐ Rating display

🗺️ Camper location

⚙️ Async data fetching from API

⏳ Loading state & error handling

📱 Responsive design

🛠️ Tech Stack

React

Redux Toolkit

React Router

Axios

Vite

CSS Modules

clsx

SVG Icons (SVGR)

📂 Project Structure
src/
├── assets/
│   └── icons/
├── components/
│   ├── Card/
│   ├── CatalogList/
│   ├── Filters/
│   ├── Location/
│   └── Button/
├── pages/
│   ├── CatalogPage/
│   └── DetailsPage/
├── redux/
│   ├── carsSlice.js
│   ├── carsOps.js
│   ├── filtersSlice.js
│   └── store.js
├── services/
├── App.jsx
└── main.jsx

⚙️ Installation & Run

Clone the repository:

git clone https://github.com/your-username/traveltrucks.git

Navigate to the project folder:

cd traveltrucks

Install dependencies:

npm install

Start the development server:

npm run dev

The app will be available at:
👉 http://localhost:5173

🔄 Redux Flow (Brief)

Data is fetched using createAsyncThunk

Stored in carsSlice

Filters are stored in filtersSlice

Components access state via useSelector

Actions are dispatched via useDispatch

🧪 API Example
axios.get("/campers");


Base URL: https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/

🚀 Future Improvements

❤️ Favorites

📄 Pagination

👤 Author

Oleh Fedorchuk
Frontend Developer (React / Redux / JavaScript)

📄 License

This project was created for educational purposes.
Free to use and modify.