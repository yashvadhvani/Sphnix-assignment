# NestJS Backend Server Readme

This readme provides instructions for setting up and running the backend server using NestJS. The server exposes APIs to retrieve balance and transactions for a given Ethereum address.

## Prerequisite Steps

Before you start the backend server, make sure you follow these steps:

1. **Create an Environment File**: Create a `.env` file in the root directory of the project.

2. **Add Environment Variables**: Open the `.env` file and add the following environment variables with their respective values:

   - `INFURA_API_KEY`: Obtain an API key from Infura (https://infura.io/) and replace `YOUR_INFURA_API_KEY` with the actual key.
   - `ETHERSCAN_API_KEY`: Obtain an API key from Etherscan (https://etherscan.io/) and replace `YOUR_ETHERSCAN_API_KEY` with the actual key.

   Your `.env` file should look like this:

   ```plaintext
   INFURA_API_KEY=YOUR_INFURA_API_KEY
   ETHERSCAN_API_KEY=YOUR_ETHERSCAN_API_KEY
   ```

   Replace `YOUR_INFURA_API_KEY` and `YOUR_ETHERSCAN_API_KEY` with your actual API keys.

## Running the Server

To start the backend server, follow these steps:

1. **Install Dependencies**: Open a terminal and navigate to the root directory of the project. Run the following command to install the required dependencies:

   ```bash
   npm install
   ```

2. **Start the Server**: After installing the dependencies, run the following command to start the NestJS server:

   ```bash
   npm run start
   ```

   The server will start and listen on port 3000 by default.

## APIs

The following APIs are exposed by the backend server:

### 1. Get Balance

- **Endpoint**: `/balance/:address`
- **Method**: GET
- **Parameters**:
  - `address`: The Ethereum address for which you want to retrieve the balance.
- **Response**: The server will respond with the balance of the specified Ethereum address.

Example Request:

```http
GET /balance/0x1234567890123456789012345678901234567890
```

### 2. Get Transactions

- **Endpoint**: `/transactions/:address`
- **Method**: GET
- **Parameters**:
  - `address`: The Ethereum address for which you want to retrieve the transactions.
- **Response**: The server will respond with a list of transactions associated with the specified Ethereum address.

Example Request:

```http
GET /transactions/0x1234567890123456789012345678901234567890
```

## Port

The backend server runs on port 3000 by default. You can access the APIs using the following base URL:

```plaintext
http://localhost:3000
```

Please make sure you have provided the required environment variables in the `.env` file before starting the server.

# React Frontend Readme

This readme provides instructions for setting up and running the React frontend that interacts with the NestJS backend server. The frontend allows users to access Ethereum address information, including balance and transactions.

## Prerequisite Steps

Before you start the React frontend, make sure you have completed the following:

1. **Install Node.js**: Ensure you have Node.js installed on your machine. You can download it from [https://nodejs.org/](https://nodejs.org/).

2. **Start Backend Server**: Start the NestJS backend server before running the frontend. Refer to the backend readme for instructions on starting the server.

## Running the Frontend

To set up and run the React frontend, follow these steps:

1. **Clone the Repository**: Clone the repository containing the React frontend code to your local machine.

2. **Navigate to the Project Directory**: Open a terminal and navigate to the root directory of the React frontend project.

3. **Install Dependencies**: Run the following command to install the required dependencies:

   ```bash
   npm install
   ```

4. **Configure Backend URL**: Open the React frontend code and locate the file where you make API calls to the backend. Update the `backendUrl` variable to match the URL of your running NestJS backend server. This is typically found in a file like `api.js` or `services.js`.

   ```javascript
   // Update this variable to match your running backend server
   const backendUrl = "http://localhost:3000"; // Change port if necessary
   ```

5. **Start the Frontend**: After installing the dependencies and configuring the backend URL, run the following command to start the React frontend:

   ```bash
   npm start
   ```

   The frontend development server will start, and the application will be accessible through a web browser.

6. **Access the Application**: Open your web browser and navigate to the following URL:

   ```plaintext
   http://localhost:5187
   ```

   You should see the React frontend interface.

## Port

The React frontend development server runs on port 5187 by default. You can access the application using the provided URL.

Make sure you have already started the NestJS backend server before running the frontend to ensure proper communication between the frontend and backend.

Note: If you encounter any issues or errors, please refer to the troubleshooting section or reach out to the project maintainers for assistance.

Enjoy exploring Ethereum address information with the React frontend!
