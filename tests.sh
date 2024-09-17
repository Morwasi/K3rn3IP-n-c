#!/bin/bash

# Define the server IP or domain name
SERVER="http://52.40.184.137"

# Function to send a request and check the response code
test_endpoint() {
    local endpoint=$1
    local expected_status=$2

    response=$(curl -s -o /dev/null -w "%{http_code}" "$SERVER$endpoint")
    
    if [ "$response" -eq "$expected_status" ]; then
        echo "PASS: $endpoint returned $expected_status"
    else
        echo "FAIL: $endpoint returned $response, expected $expected_status"
    fi
}

# List of endpoints to test
test_endpoint "/" 200
test_endpoint "/api/v1/auth/docs" 200
test_endpoint "/api/v1/notification/" 200
test_endpoint "/api/v1/rental/docs" 200
test_endpoint "/api/v1/bus-schedule/docs" 200
test_endpoint "/api/v1/navigation/docs" 200

# Error pages
test_endpoint "/non-existent-page" 404

# Save this script as test_nginx.sh, make it executable with chmod +x test_nginx.sh, and run it using ./test_nginx.sh.
