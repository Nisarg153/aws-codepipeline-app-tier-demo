#!/bin/bash

# Set NVM_DIR explicitly to /home/ec2-user/.nvm and source nvm.sh
export NVM_DIR="/home/ec2-user/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

sudo chown -R ec2-user:ec2-user /home/ec2-user/app-tier

cd ~/app-tier
npm install
