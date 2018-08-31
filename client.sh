#!/usr/bin/env bash

# Requires jq to run: https://stedolan.github.io/jq/

echo "Create a new camel"
# Save first created camel and its _id
CAMEL=$(curl -s -H "Content-Type: application/json" -X POST -d '{"color":"orange", "position":7}' http://localhost:3000/camels)
ID=$(echo "$CAMEL" | jq -r ._id)
echo "$CAMEL"
curl -w "\nstatus=%{http_code}\n" -H "Content-Type: application/json" -X POST -d '{"color":"green", "position":8}' http://localhost:3000/camels
curl -w "\nstatus=%{http_code}\n" -H "Content-Type: application/json" -X POST -d '{"color":"red", "position":9}' http://localhost:3000/camels

echo "Return a list of all camels"
curl -w "\nstatus=%{http_code}\n" -H "Content-Type: application/json" -X GET http://localhost:3000/camels

echo "Return the camel with ID"
curl -w "\nstatus=%{http_code}\n" -H "Content-Type: application/json" -X GET http://localhost:3000/camels/$ID

echo "Update the camel with ID"
curl -w "\nstatus=%{http_code}\n" -H "Content-Type: application/json" -X PUT -d '{"color":"red", "position":10}' http://localhost:3000/camels/$ID
