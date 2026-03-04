#!/bin/bash

echo "🚀 Veesioo Full-Stack Deployment Script"
echo "======================================="
echo ""

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null
then
    echo "❌ Railway CLI not found. Installing..."
    npm install -g @railway/cli
fi

# Login to Railway
echo "🔐 Logging into Railway..."
railway login

# Initialize Railway project
echo "📦 Initializing Railway project..."
railway init

# Add PostgreSQL database
echo "🗄️  Adding PostgreSQL database..."
railway add --database postgres

# Get DATABASE_URL
echo "📋 Copy the DATABASE_URL from Railway dashboard"
echo "   Then add it with: railway variables set DATABASE_URL=your_url"
echo ""

# Deploy
echo "🚀 Deploying to Railway..."
railway up

echo ""
echo "✅ Deployment complete!"
echo "🌐 Your app URL: railway add --domain"
echo "📱 Build APK: https://www.pwabuilder.com/"
