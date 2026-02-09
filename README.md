# Fake Store Product App

This project is a simple web application that integrates with **[https://fakestoreapi.com](https://fakestoreapi.com)** to display products, product details, and basic e-commerce–style functionality.
It was built to demonstrate frontend–backend data fetching, state management, and clean project structure.

---

## Setup Instructions

### Prerequisites

* Node.js (v18+ recommended)
* npm

### Installation

1. Enter Project

```bash
cd frontend
```

2. Install dependencies

```bash
npm install
```

3. Run the development server

```bash
npm run dev
```

4. Open your browser and go to

```
http://localhost:3000
```

---

## Features Implemented

* Fetch product data from **Fake Store API**
* Display product information including:

  * Product image
  * Product name
  * Price
  * Category
* Handle **Loading** and **Error** states during API requests
* Fully **Responsive Design** for mobile and desktop devices
* Implement **Product Detail View** for individual product pages
* Support **Infinite Scroll** to efficiently load and display large product lists

### Search and Filter Functionality

* **Auto Search** for products
* Filter products by **Category**
* Filter products by **Price Range**:

  * Below 100
  * Between 100 – 500
  * Above 500

### Cart System

* Add products to the **Shopping Cart**
* Persist cart data using **LocalStorage** to maintain state after page refresh

### Data Export

* Implement **Cart Export** functionality
* Transform nested cart data into a **Flattened Object (Dot Notation)**
  for analytics, logging, or integration with external systems

---

## Time Spent

| Task                                                | Time         |
| --------------------------------------------------- | ------------ |
| Project setup and initial configuration             | 1 hour       |
| Integrating Fake Store API and data handling        | 2 hours      |
| UI development and responsive layout                | 2 hours      |
| Infinite scroll implementation                      | 1 hour       |
| Search and filter features (category & price range) | 1.5 hours    |
| Cart functionality and LocalStorage integration     | 1 hour       |
| Cart export and data flattening                     | 0.5 hour     |
| Testing and refinements                             | 1 hour       |
| **Total**                                           | **11 hours** |

---

## Technical Decisions and Trade-offs

### API

* Used **Fake Store API** because it is free, simple, and suitable for demonstrating REST API integration.
* Trade-off: Limited control over data structure and availability.
---

### Frontend Framework

* Chose **Next.js** because it provides:

  * A component-based architecture
  * Built-in routing
  * Convenient data fetching capabilities
* **Trade-off:** There is a slightly steeper learning curve compared to vanilla JavaScript, but the benefits outweigh the cost for scalable applications.

---

### State Management

* Used **local component state and React Context** instead of a global state management library to keep the implementation simple.
* **Trade-off:** This approach may not scale well for very large or complex applications, where a dedicated global state solution would be more suitable.

---

### Styling

* Used **utility-first CSS** (e.g. **Tailwind CSS**) to speed up UI development and maintain consistent styling.
* **Trade-off:** Markup can become more verbose, but the overall development speed and maintainability improve.


