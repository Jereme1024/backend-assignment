#/bin/bash

SERVER_URL=${1:-"http://localhost:3000"}
echo "server: ${SERVER_URL}"

echo -e "\n===== Good index ===="
curl -H "Accept: application/json" -H "Content-Type: application/json" -X GET ${SERVER_URL}/

echo -e "\n===== Good heroes ===="
curl -H "Accept: application/json" -H "Content-Type: application/json" -X GET ${SERVER_URL}/heroes

echo -e "\n===== Good hero ===="
curl -H "Accept: application/json" -H "Content-Type: application/json" -X GET ${SERVER_URL}/heroes/1

echo -e "\n===== Good heroes with good user ===="
curl -H "Accept: application/json" -H "Content-Type: application/json" -H "Name: hahow" -H "Password: rocks" -X GET ${SERVER_URL}/heroes

echo -e "\n===== Good hero with good user ===="
curl -H "Accept: application/json" -H "Content-Type: application/json" -H "Name: hahow" -H "Password: rocks" -X GET ${SERVER_URL}/heroes/1

echo -e "\n===== Good heroes with bad user ===="
curl -H "Accept: application/json" -H "Content-Type: application/json" -H "Name: hahow" -H "Password: rocksxx" -X GET ${SERVER_URL}/heroes

echo -e "\n===== Good heroes with bad user ===="
curl -H "Accept: application/json" -H "Content-Type: application/json" -H "Name: hahow" -X GET ${SERVER_URL}/heroes

echo -e "\n===== Bad hero ===="
curl -H "Accept: application/json" -H "Content-Type: application/json" -X GET ${SERVER_URL}/heroes/5566

echo -e "\n"