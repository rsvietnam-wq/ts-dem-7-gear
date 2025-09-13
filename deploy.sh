#!/bin/bash

echo "🌱 Push code lên main + deploy gh-pages..."

git add .
git commit -m "update"
git push origin main

rm -rf .deploy
mkdir .deploy
cp -r * .deploy/
cd .deploy

git init
git checkout -b gh-pages
git remote add origin YOUR_REPO_URL
git add .
git commit -m "deploy"
git push -f origin gh-pages

cd ..
rm -rf .deploy

echo "🎉 Done! Mở web tại: https://USERNAME.github.io/REPO_NAME/"
