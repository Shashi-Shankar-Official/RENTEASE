# RentEase

RentEase is a full-stack web application inspired by Airbnb, designed to facilitate property rentals. The application allows users to browse, list, and book properties with ease. This project demonstrates the integration of various technologies including EJS, Express.js, Node.js, JavaScript, and MongoDB.

## Features

- **User Authentication:** Secure user registration and login using JSON Web Tokens (JWT).
- **Property Listings:** Users can view, search, and filter property listings.
- **Booking System:** Functionality for booking properties, viewing booking history, and managing reservations.
- **User Reviews:** Users can leave reviews and ratings for properties.
- **Responsive Design:** Fully responsive design for an optimal user experience on both desktop and mobile devices.
- **RESTful APIs:** Backend API endpoints to handle all CRUD operations.

## Technologies Used

- **Frontend:** EJS, HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **Version Control:** Git, GitHub
- **Deployment:** Heroku/AWS (choose the one you used)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/RentEase.git
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

- Visit `http://localhost:3000` in your web browser.
- Register a new account or log in with an existing account.
- Browse properties, make bookings, and leave reviews.


## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For questions or feedback, please reach out to [shankarshashi902@gmail.com](mailto:shankarshashi902@gmail.com).

