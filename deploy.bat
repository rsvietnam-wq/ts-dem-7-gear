@echo off
echo 🌱 Push code len main + deploy gh-pages...

git add .
git commit -m "update"
git push origin main

rmdir /s /q .deploy
mkdir .deploy
xcopy * .deploy\ /E /H /C /I
cd .deploy

git init
git checkout -b gh-pages
git remote add origin YOUR_REPO_URL
git add .
git commit -m "deploy"
git push -f origin gh-pages

cd ..
rmdir /s /q .deploy

echo 🎉 Done! Mo web tai: https://USERNAME.github.io/REPO_NAME/
pause
