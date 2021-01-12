#!/bin/bash

# Example: sh ./scripts/deploy-github.sh "[Added] Function refactored"

git add . &&
git commit -am "$1" &&
git push origin master

echo "Commit finished"
