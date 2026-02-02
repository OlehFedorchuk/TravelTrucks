# 🚐 TravelTrucks (Campers Catalog)

A web application for browsing and filtering camper vans with a detailed view for each vehicle.

Built with **React**, **Redux Toolkit**, and **Vite**.

---

## 🔗 Demo

- 👉 **Live demo:** https://travel-trucks-henna-sigma.vercel.app/
- 👉 **API:** https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers

---

## ✨ Features

- 📋 Camper vans catalog
- 🔍 Advanced filtering:
  - Location
  - Body type (Van, Fully Integrated, Alcove)
  - Equipment (AC, Kitchen, TV, Bathroom, etc.)
- 📄 Camper details page
- ⭐ Rating display
- 🗺️ Camper location
- ⚙️ Async data fetching from API
- ⏳ Loading state & error handling
- 📱 Fully responsive design

---

## 🛠️ Tech Stack

- React
- Redux Toolkit
- React Router
- Axios
- Vite
- CSS Modules
- clsx
- SVG Icons (SVGR)

---

## 📂 Project Structure

```text
src/
├── App.jsx
├── assets
│   ├── icons
│   │   ├── ac.svg
│   │   ├── alcove.svg
│   │   ├── automatic.svg
│   │   ├── bathroom.svg
│   │   ├── fullyIntegrated.svg
│   │   ├── gas.svg
│   │   ├── kitchen.svg
│   │   ├── line.svg
│   │   ├── map.svg
│   │   ├── microwave.svg
│   │   ├── petrol.svg
│   │   ├── radio.svg
│   │   ├── refrigerator.svg
│   │   ├── star.svg
│   │   ├── tv.svg
│   │   ├── van.svg
│   │   └── water.svg
│   └── images
│       └── hero-gb.jpg
├── components
│   ├── Button
│   ├── Card
│   ├── CatalogList
│   ├── Filters
│   ├── Location
│   └── Navigation
├── pages
│   ├── CatalogPage
│   ├── DetailsPage
│   ├── HomePage
│   └── NotFoundPage
├── redux
│   ├── carsOps.js
│   ├── carsSlice.js
│   ├── favoritesSlice.js
│   ├── filtersSlice.js
│   ├── listSelectedSlice.js
│   ├── selectors.js
│   ├── store.js
│   └── tabSlice.js
├── index.css
└── main.jsx
```

⸻

⚙️ Installation & Run

1️⃣ Clone the repository
git clone https://github.com/OlehFedorchuk/TravelTrucks.git

2️⃣ Navigate to the project folder
cd traveltrucks

3️⃣ Install dependencies
npm install

4️⃣ Start the development server
npm run dev

The app will be available at:
👉 http://localhost:5173

⸻

🔄 Redux Flow (Brief)
• Data is fetched using createAsyncThunk
• Stored in carsSlice
• Filters are stored in filtersSlice
• Components access state via useSelector
• Actions are dispatched via useDispatch

⸻

🧪 API Example
axios.get("/campers");

Base URL:
https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/

⸻

🚀 Future Improvements
• ❤️ Favorites
• 📄 Pagination

⸻

👤 Author

Oleh Fedorchuk
Frontend Developer (React / Redux / JavaScript)
