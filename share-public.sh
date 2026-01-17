#!/bin/bash

echo "🌐 Creating Public Link for Majha Umred Portal"
echo "=============================================="
echo ""

# Check if ngrok is installed
if ! command -v ngrok &> /dev/null; then
    echo "❌ ngrok is not installed!"
    echo ""
    echo "To install ngrok:"
    echo "1. Download from: https://ngrok.com/download"
    echo "2. Or install via snap: sudo snap install ngrok"
    echo "3. Or install via npm: npm install -g ngrok"
    echo ""
    echo "After installation, sign up at https://ngrok.com to get an auth token"
    echo "Then run: ngrok config add-authtoken YOUR_TOKEN"
    echo ""
    exit 1
fi

# Check which port to expose
PORT=${1:-3001}

echo "📡 Starting ngrok tunnel on port $PORT..."
echo ""
echo "ℹ️  Your application should be running on http://localhost:$PORT"
echo "ℹ️  If not, start it first with: ./run.sh"
echo ""
echo "🔗 Public URL will be displayed below:"
echo "=============================================="
echo ""

# Start ngrok
ngrok http $PORT
