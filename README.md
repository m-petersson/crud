## How to download and run the application
Clone the repo. From the root of the repo run "npm install" and then "npm start". The server should now be running. Open up a browser and input http://localhost:3000.

The database used is mongodb atlas. Create a cluster on mongodb atlas and connect it by adding the connection string in app.js.

## Description

On the homepage you can register a new account, log in, and see all snippets created by all users.



Page for registering a new account.


After registering a green flash message tells you if it was successful.

If the username is already taken a red flash message is shown. The user then gets a new chance to pick a new username.

The page for logging in.


If successfully logged in a green flash message is shown. Here you can view cretaed snippets, and create, update, and delete your snippets.





