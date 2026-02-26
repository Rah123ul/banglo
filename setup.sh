#!/bin/bash

# SNS Club React - Quick Start Script

echo "🚀 SNS Club React Setup"
echo "======================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Installation complete!"
    echo ""
    echo "🎉 Your SNS Club React app is ready!"
    echo ""
    echo "To start the development server, run:"
    echo "  npm start"
    echo ""
    echo "To build for production, run:"
    echo "  npm run build"
    echo ""
else
    echo ""
    echo "❌ Installation failed. Please check the errors above."
    exit 1
fi
