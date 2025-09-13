#!/bin/bash

git config --global user.name "A Yêu"
git config --global user.email "rsvietnam.wq@gmail.com"

echo "🌱 Push code lên main..."
git add .
git commit -m "update"
git push -u origin main

echo "🚀 Deploy lên nhánh gh-pages..."

rm -rf .deploy
mkdir .deploy
cp -r * .deploy/
cd .deploy

git init
git branch -M main
git checkout -b gh-pages
git remote add origin https://github.com/rsvietnam-wq/ts-dem-7-gear.git
git add .
git commit -m "deploy"
git push -f origin gh-pages

cd ..
rm -rf .deploy

echo "🎉 Done! Vào link: https://rsvietnam-wq.github.io/ts-dem-7-gear/"
