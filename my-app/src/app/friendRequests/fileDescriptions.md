friendRequestModel:
Purpose: Defines the MongoDB schema for storing friend requests.
Contents: Mongoose schema for friend requests with fields such as senderId, recipientId, status, and createdAt.
Key Components: Mongoose schema setup for friend requests.

friendRequestRoutes.js:
Purpose: Defines API endpoints for handling friend requests (sending, accepting, rejecting).
Contents: Express router with routes for sending, accepting, and rejecting friend requests.
Key Components: Express routes related to friend requests, linked to corresponding controllers.

friendRequestService:
Purpose: Provides services for handling friend requests, including sending, accepting, and rejecting.
Contents: Functions for sending friend requests, accepting friend requests, rejecting friend requests, and retrieving pending requests.
Key Components: MongoDB queries to handle friend requests, services for friend request operations.

friendRequestTesting:
Purpose: Contains unit tests for friend request functionalities.
Contents: Jest test cases for sending, accepting, and rejecting friend requests.
Key Components: Jest test cases for verifying the behavior of friend request operations.

needToAddToMain:
Purpose: Specifies the integration of friend request routes into the main application.
Contents: Code to include friend request routes in the main Express application.
Key Components: Integration of friend request routes with the main server.

usernamefriendRequestController:
Purpose: Handles the logic for sending, accepting, and rejecting friend requests.
Contents: Controller functions for sending, accepting, and rejecting friend requests.
Key Components: Business logic for handling friend request operations.
