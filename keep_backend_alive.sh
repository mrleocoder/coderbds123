#!/bin/bash
cd /app/backend
while true; do
    if ! curl -s http://localhost:8001/api/ > /dev/null; then
        echo "Backend not responding, restarting..."
        pkill -f "python server.py"
        sleep 2
        python server.py > /dev/null 2>&1 &
        sleep 5
    fi
    sleep 10
done