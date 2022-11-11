## How to download and run the application
Clone the repo. From the root of the repo run "npm install" and then "npm start". The server should now be running. Open up a browser and input http://localhost:3000.

The database used is mongodb atlas. Create a cluster on mongodb atlas and connect it by adding the connection string in app.js.

## Description

This application uses Express, MongoDB, handlebars, and the Model view controller (MVC) design pattern. A user can register an account, and then log in, to view their own snippets, and create, update and delete snippets.

On the homepage you can register a new account, log in, and see all snippets created by all users.
![crud1](https://user-images.githubusercontent.com/112863208/201315343-0d94fe65-6a94-4574-be47-919596c65fd0.png)

Page for registering a new account.
![crud2](https://user-images.githubusercontent.com/112863208/201315379-4d8c68bc-39ac-4a30-a10a-a763530e03a0.png)

After registering a green flash message tells you if it was successful.
![crud3](https://user-images.githubusercontent.com/112863208/201315418-130c8dd4-428b-43aa-8ff5-6706cc9ac423.png)

If the username is already taken a red flash message is shown. The user then gets a new chance to pick a new username.
![crud4](https://user-images.githubusercontent.com/112863208/201315452-8835570a-bfc4-4c2d-aac5-f83021ceb624.png)

The page for logging in.
![crud7](https://user-images.githubusercontent.com/112863208/201315550-3d27df67-d426-458c-963b-48cb17a9bc34.png)

If successfully logged in a green flash message is shown. Here you can view cretaed snippets, and create, update, and delete your snippets.
![crud5](https://user-images.githubusercontent.com/112863208/201315596-a2c146f1-3f8b-4bae-a20c-41ededfdc834.png)





