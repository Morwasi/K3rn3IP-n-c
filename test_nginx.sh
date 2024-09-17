#!/bin/bash

# Test the root
echo "Testing root..."
curl -I http://localhost:8080/ | grep HTTP

# Test Auth Service
echo "Testing Auth Service..."
curl -I http://localhost:8080/api/v1/auth/docs | grep HTTP

# Test Notifications Service
echo "Testing Notifications Service..."
curl -I http://localhost:8080/api/v1/notification/ | grep HTTP

# Test Rental Service
echo "Testing Rental Service..."
curl -I http://localhost:8080/api/v1/rental/docs | grep HTTP

# Test Bus Schedule Service
echo "Testing Bus Schedule Service..."
curl -I http://localhost:8080/api/v1/bus-schedule/docs | grep HTTP

# Test Navigation Service
echo "Testing Navigation Service..."
curl -I http://localhost:8080/api/v1/navigation/docs | grep HTTP
