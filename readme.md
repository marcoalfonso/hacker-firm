The Hacker Firm App - Mean Stack

Coded with ❤ by Marco Lavielle

From the app's root run

To start the app:
grunt --force

To deploy to heroku -

Generate build from the main folder with:
grunt build

Then go to dist folder:
cd dist

Make sure there is a Procfile with:
web: node dist/server/app.js

Push to heroku:
git push heroku master
