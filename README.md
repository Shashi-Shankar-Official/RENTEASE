# RentEase

RentEase is a full-stack web application inspired by Airbnb, designed to facilitate property rentals. The application allows users to browse, list, and book properties with ease. This project demonstrates the integration of various technologies including EJS, Express.js, Node.js, JavaScript, and MongoDB.

## Live Demo

Check out the live site: [RentEase](https://rentease-ew1v.onrender.com/listings)

## Features

- **User Authentication:** Secure user authentication and authorization using Passport and Passport-Local
- **Property Listings:** Users can view, search, and filter property listings.
- **User Reviews:** Users can leave reviews and ratings for properties.
- **Responsive Design:** Fully responsive design for an optimal user experience on both desktop and mobile devices.
- **RESTful APIs:** Backend API endpoints to handle all CRUD operations.
- Middleware for efficient request handling, logging, and error management
- MVC architecture for maintainability and scalability

## Technology Stack

- **Frontend:**
  - Embedded JavaScript (EJS)
  - Bootstrap

- **Backend:**
  - Node.js
  - Express.js

- **Database:**
  - MongoDB Atlas

- **Authentication & Authorization:**
  - Passport
  - Passport-Local

- **Other:**
  - RESTful APIs
  - Git for version control

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Shashi-Shankar-Official/RENTEASE.git
    ```
2. Navigate to the project directory:
    ```bash
    cd RentEase
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Set up environment variables:
    - Create a `.env` file in the root directory.
    - Add the following variables:
        ```env
        PORT=3000
        MONGODB_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret
        ```
5. Start the application:
    ```bash
    npm start
    ```

## Usage

- Visit `http://localhost:80800` in your web browser.
- Register a new account or log in with an existing account.
- Browse properties, make bookings, and leave reviews.


## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For questions or feedback, please reach out to [shankarshashi902@gmail.com](mailto:shankarshashi902@gmail.com).

