#!/bin/bash

java -jar wiremock/wiremock-standalone-2.1.11.jar --root-dir="./data/files" --proxy-all="http://localhost:8000" --record-mappings  --verbose
