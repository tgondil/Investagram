Auth.js:
Purpose: Manages authentication strategies using Passport.js.
Contents: Configuration for LocalStrategy and JwtStrategy using Passport.js, utilizing bcrypt for password comparison.
Key Components: Passport.js authentication strategies setup for local and JWT authentication.

AuthRoutes:
Purpose: Defines API endpoints related to authentication (password reset, username recovery).
Contents: Express router with routes for password reset and username recovery.
Key Components: Routes for handling password reset and username recovery, linked to corresponding controllers.

addToMain-Authentication:
Purpose: Contains code to be added to the main server file for integrating authentication.
Contents: Code to include authentication-related middleware and routes in the main Express application.
Key Components: Integration of authentication middleware and routes with the main server.

additionsToMainFileForAuth:
Purpose: Specifies the integration of authentication routes into the main application.
Contents: Code to include authentication routes in the main Express application.
Key Components: Integration of authentication routes with the main server.

authController.js:
Purpose: Handles the logic for authentication-related operations (password reset, username recovery).
Contents: Controller functions for handling password reset and username recovery requests.
Key Components: Business logic for processing authentication requests, utilizing bcrypt and JWT.

emailService.js:
Purpose: Manages sending emails for authentication-related operations.
Contents: Nodemailer setup for sending emails, particularly for password reset and username recovery.
Key Components: Configuration and function for sending emails.

usernamePasswordTESTING:
Purpose: Contains unit tests for authentication-related functionalities.
Contents: Jest test cases for password reset and username recovery functionalities.
Key Components: Jest test cases for verifying the behavior of authentication operations.
