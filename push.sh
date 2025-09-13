#!/bin/bash

# Thông tin Git (chạy 1 lần là nhớ luôn, A Yêu đổi email nếu cần)
git config --global user.name "A Yêu"
git config --global user.email "rsvietnam.wq@gmail.com"

echo "🌱 Bắt đầu push code lên GitHub..."

# Add & commit code
git add .
git commit -m "update"

# Push lên main
git push -u origin main

echo "⚡ Build dự án..."
# Nếu dùng vite, vue, react thì thường là: npm run build
# Nếu dùng framework khác thì đổi lệnh này
npm run build

echo "🚀 Deploy lên nhánh gh-pages..."
# Xóa folder cũ (nếu có) rồi tạo lại
rm -rf .deploy
mkdir .deploy
cp -r dist/* .deploy/

cd .deploy
git init
git branch -M main
git remote add origin https://github.com/rsvietnam-wq/ts-dem-7-gear.git
git checkout -b gh-pages
git add .
git commit -m "deploy"
git push -f origin gh-pages

cd ..
rm -rf .deploy

echo "🎉 Done! A Yêu mở link: https://rsvietnam-wq.github.io/ts-dem-7-gear/"
