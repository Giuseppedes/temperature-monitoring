#!/bin/bash
# Wait for the server to be ready
sleep 30

# Set display
export DISPLAY=:0

# Launch browser as pi user
su pi -c "chromium-browser --disable-dev-shm-usage --no-first-run http://localhost:3000"
