#!/bin/bash

echo "🧹 Formatting Go code..."
go fmt ./...

echo "🔍 Running go vet..."
go vet ./...

if command -v golangci-lint &> /dev/null
then
  echo "🚀 Running golangci-lint..."
  golangci-lint run
else
  echo "⚠️ golangci-lint not found, skipping..."
fi

echo "✅ Go lint completed!"
