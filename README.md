# GolfLab
Website to host GolfLab services

#### Domain name ####
golflabusa.com
golflabusa.golf

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have Node.js and npm installed on your machine. You can download them from [https://nodejs.org/](https://nodejs.org/).

### Installing

1. Clone the repository:
git clone https://github.com/yourusername/GolfLab.git
cd GolfLab

2. Install the dependencies:
npm install


### Running the development server

To start the development server and run the app on localhost:3000, follow these steps:

1. Make sure you're in the project directory:
cd /Users/masonsherburne/Documents/GitHub/GolfLab

2. Start the app:
npm run dev

3. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

The page will reload if you make edits. You will also see any lint errors in the console.

### Testing
1. Run the test cases:
npm test

2. Run specific test files:
npm test -- server.test.js

# DB Stuff
To login to the root for mysql: 
mysql -u root -p 
(password is "root")

For the golflab_user account:
mysql -u golflab_user -p
(password is password)

You can't use the root account for this config so the golflab_user was created to work around this. 

To create a new database and give access to users:
mysql -u root -p 
(password is "root")
create database <db name>;
GRANT ALL PRIVILEGES ON <db name>.* TO '<user>'@'localhost';
FLUSH PRIVILEGES;

To drop all tables before undoing all migrations:
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS Payment;
DROP TABLE IF EXISTS Appointment;
DROP TABLE IF EXISTS Subscription;
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS AccessCode;

SET FOREIGN_KEY_CHECKS = 1;

THEN

npx prisma db push

Then

npm run seed


## Built With

* [React](https://reactjs.org/) - The web framework used

* Note: we use ES Modules here and not CommonJS so use import commands instead of const require

## Authors

* **Mason Sherburne** - *Initial work*

## License

This project is licensed under the ISC License - see the [LICENSE.md](LICENSE.md) file for details




###### TODOS ######
1. Authentication and Authorization: -- COMPLETED 4/19/2025
<!-- Implement user authentication (login, logout, register)
Set up middleware for protecting routes that require authentication
Implement role-based access control if needed (e.g., admin vs regular user) -->
2. Error Handling and Validation: -- COMPLETED 4/19/2025
Implement consistent error handling across all controllers
Add input validation for all routes (you can use libraries like Joi or express-validator)

---------------------- NOTE ----------------------
[0] (node:5136) ExperimentalWarning: Import assertions are not a stable feature of the JavaScript language. Avoid relying on their current behavior and syntax as those might change in a future version of Node.js.
[0] (Use `node --trace-warnings ...` to show where the warning was created)
[0] (node:5136) ExperimentalWarning: Importing JSON modules is an experimental feature and might change at any time

1. These warnings don't prevent your code from running, but they indicate that the syntax or behavior might change in future Node.js versions.
2. For production environments, you might want to consider alternatives to avoid potential issues in the future:
    a. For JSON imports: Instead of using dynamic imports with assertions, you could use fs.readFileSync and JSON.parse.
    b. For other module imports: Ensure you're using stable import syntax.

3. Environment Configuration: -- No change but eventually need to change
Ensure all sensitive information (database credentials, API keys) are stored in environment variables
4. Testing:
Write unit tests for your controllers and models
Set up integration tests for your API endpoints
5. API Documentation:
Consider using a tool like Swagger to document your API endpoints
6. Database Indexing:
Review your database queries and add indexes where necessary for performance
7. Logging:
Implement logging for important actions and errors
8. Rate Limiting:
Implement rate limiting to prevent abuse of your API
9. CORS Configuration:
Ensure your CORS settings are properly configured for your frontend
10. Data Relationships: ?? Prisma
Make sure all necessary relationships between your models (User, Appointment, Payment, Subscription, AccessCode) are properly set up in your Sequelize models
11. Middleware:
Implement any necessary custom middleware (e.g., for logging, error handling)
12. Security:
Implement security best practices (e.g., helmet for Express)