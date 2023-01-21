#!/bin/bash

# Path to docker
cd "${0%/*}"
cd ./docker

docker-compose up --build
