#!/bin/bash
# Wait for the server to be ready
sleep 30

# Launch browser as pi user with proper display
sudo -u pi DISPLAY=:0 chromium-browser --disable-dev-shm-usage --no-first-run http://localhost:3000
