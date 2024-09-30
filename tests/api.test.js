const axios = require('axios');
const jwt = require('jsonwebtoken');
const jwtMiddleware = require('../jwtMiddleware');
require('dotenv').config(); // Load environment variables

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

describe('JWT Middleware Tests', () => {
    it('should allow requests with valid token', () => {
        const validToken = jwt.sign({ userId: 'testUser' }, process.env.JWT_SECRET); // Use the actual JWT_SECRET
        const req = { headers: { authorization: `Bearer ${validToken}` }};
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();

        jwtMiddleware(req, res, next);
        expect(next).toBeCalled();
    });

    it('should deny requests with invalid token', () => {
        const req = { headers: { authorization: 'Bearer invalidtoken' }};
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();

        jwtMiddleware(req, res, next);
        expect(res.status).toHaveBeenCalledWith(400);
    });
});

const token = jwt.sign({ userId: 'testUser' }, process.env.JWT_SECRET); // Use the actual JWT_SECRET
console.log('Generated JWT:', token);
