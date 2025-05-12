#!/bin/bash

echo "Stopping application and cleaning up old files"
rm -rf /home/ec2-user/app-tier/*

echo "cleaning up old files"

# Set NVM_DIR explicitly to /home/ec2-user/.nvm and source nvm.sh
export NVM_DIR="/home/ec2-user/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

pm2 describe index > /dev/null
if [ $? -eq 0 ]; then
  echo "Stopping existing PM2 process"
  pm2 stop index
  pm2 delete index
else
  echo "No PM2 process found. Continuing..."
fi

echo "Stopped application"
