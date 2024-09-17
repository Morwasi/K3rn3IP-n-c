const axios = require('axios');

// Define the server IP or domain name
const SERVER = "http://52.40.184.137";

// Function to send a request and check the response code
const testEndpoint = async (endpoint, expectedStatus) => {
    try {
        const response = await axios.get(`${SERVER}${endpoint}`);
        if (response.status === expectedStatus) {
            console.log(`PASS: ${endpoint} returned ${expectedStatus}`);
        } else {
            console.log(`FAIL: ${endpoint} returned ${response.status}, expected ${expectedStatus}`);
        }
    } catch (error) {
        // If we hit the endpoint and get an error, log the status code if available
        if (error.response) {
            console.log(`FAIL: ${endpoint} returned ${error.response.status}, expected ${expectedStatus}`);
        } else {
            console.log(`FAIL: ${endpoint} request failed - ${error.message}`);
        }
    }
};

// List of endpoints to test
describe("API Endpoint Tests", () => {
    test("GET / should return 200", () => testEndpoint("/", 200));
    test("GET /api/v1/auth/docs should return 200", () => testEndpoint("/api/v1/auth/docs", 200));
    test("GET /api/v1/notification/ should return 200", () => testEndpoint("/api/v1/notification/", 200));
    test("GET /api/v1/rental/docs should return 200", () => testEndpoint("/api/v1/rental/docs", 200));
    test("GET /api/v1/bus-schedule/docs should return 200", () => testEndpoint("/api/v1/bus-schedule/docs", 200));
    test("GET /api/v1/navigation/docs should return 200", () => testEndpoint("/api/v1/navigation/docs", 200));
    test("GET /non-existent-page should return 404", () => testEndpoint("/non-existent-page", 404));
});
