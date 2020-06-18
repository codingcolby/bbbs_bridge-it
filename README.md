# Bridge-iT - A Big/Little matching tool for Big Brothers Big Sisters of Kansas City

## Description

**Duration:** 3 week sprint

**Team:** Caleb Wistuba, Andrew Nguyen, McKenna Lusk, Cole Chelton, Nicole 'Colby' Blechynden

Big Brothers Big Sisters plays an important role in pairing Bigs and Littles. Currently, the process of probing through a lot of summaries, home locations, individual requirements, and using that info to match a Big and Little, has proved to be complex. Bridge-iT is an application that will help to simplify this complex process allowing the staff to concentrate more on the human aspect of making these connections.

Bridge-iT generates a pinned location on a map once the Big or Little information has been loaded. You can reduce the number of pins by selecting preferences or radius. Once the pins have been narrowed, you can select on the toggle button to have a side by side view of the Big and Little profiles. This allows you to easily compare the two profiles and see if the two would be a good match.

To see the fully functional site, please visit: DEPLOYED VERSION OF THE APP - _COMING SOON!_

## Screen Shots

_COMING SOON!_

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Installation

- Run `npm install` in your terminal
- Create a `.env` file at the root of the project and paste this line into the file:
  ```
  SERVER_SESSION_SECRET=superDuperSecret
  ```
  While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
- Start postgres if not running already by using `brew services start postgresql`

- Run `npm run server`

- Run `npm run client`
- Navigate to `localhost:3000`

<!-- ## Create database and table

Create a new database called `bbbs_matches` and create a `user` table:

```SQL
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);
```

If you would like to name your database something else, you will need to change `bbbs_matches` to the name of your new database name in `server/modules/pool.js`

Copy and paste the content into your init.sql  -->

## Usage

### Administrator-

When the administrator is logged in, they will be able to view the user credential
Clicking the “Reset User” button begins the process of resetting the shared Big Brothers Big Sisters account credentials.

**The Reset Process:**

1. Click the “Reset User” button
1. Enter a new username and password for the shared Big Brothers Big Sisters account
1. Click “Save” to finish changing the shared account credentials

### Staff -

## Built With These Technologies

- Axios
- CSS
- Docker
- Express
- Google Maps API
- Heroku
- JavaScript
- HTML
- Material- UI
- Moment
- Node
- PDF- Parse
- PostgreSQL
- React
- Redux
- Redux-Saga
- SweetAlert
- TypeScript

## License

[MIT](./LICENSE.txt)

## Acknowledgement

Thanks to [Prime Digital Academy](https://www.primeacademy.io/) and our cohort peers for guiding us though the fundamentals of full stack development, providing us with a solid foundation in modern technologies, and their continued support in our development as software engineers.

## Feedback, Suggestions, Support

Please reach out to us on LinkedIn if you have comments, ideas, or interest in contributing to this project

- [Caleb Wistuba](https://www.linkedin.com/in/calebwistuba)
- [Andrew Nguyen](https://www.linkedin.com/in/andrew-th-nguyen)
- [McKenna Lusk](https://www.linkedin.com/in/mckenna-lusk)
- [Cole Chelton](https://www.linkedin.com/in/cole-chelton)
- [Nicole Blechynden](https://www.linkedin.com/in/nicoleblechynden/)

## Preliminary Instructions and Information for Development - ALL BELOW THIS LINE WILL BE REMOVED AS APPROPRIATE

This version uses React, Redux, Express, Passport, and PostgreSQL (a full list of dependencies can be found in `package.json`).

We **STRONGLY** recommend following these instructions carefully. It's a lot, and will take some time to set up, but your life will be much easier this way in the long run.

## Download (Don't Clone) This Repository

- Don't Fork or Clone. Instead, click the `Clone or Download` button and select `Download Zip`.
- Unzip the project and start with the code in that folder.
- Create a new GitHub project and push this code to the new repository.

## Create database and table

Create a new database called `prime_app` and create a `user` table:

```SQL
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);
```

If you would like to name your database something else, you will need to change `prime_app` to the name of your new database name in `server/modules/pool.js`

## Debugging

To debug, you will need to run the client-side separately from the server. Start the client by running the command `npm run client`. Start the debugging server by selecting the Debug button.

![VSCode Toolbar](documentation/images/vscode-toolbar.png)

Then make sure `Launch Program` is selected from the dropdown, then click the green play arrow.

![VSCode Debug Bar](documentation/images/vscode-debug-bar.png)

## Testing Routes with Postman

To use Postman with this repo, you will need to set up requests in Postman to register a user and login a user at a minimum.

Keep in mind that once you using the login route, Postman will manage your session cookie for you just like a browser, ensuring it is sent with each subsequent request. If you delete the `localhost` cookie in Postman, it will effectively log you out.

1. Start the server - `npm run server`
2. [Import the sample routes JSON file](./PostmanPrimeSoloRoutes.json) by clicking `Import` in Postman. Select the file.
3. Click `Collections` and `Send` the following three calls in order:
   1. `POST /api/user/register` registers a new user, see body to change username/password
   2. `POST /api/user/login` will login a user, see body to change username/password
   3. `GET /api/user` will get user information, by default it's not very much

After running the login route above, you can try any other route you've created that requires a logged in user!

## Production Build

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

- Start postgres if not running already by using `brew services start postgresql`
- Run `npm start`
- Navigate to `localhost:5000`

## Lay of the Land

- `src/` contains the React application
- `public/` contains static assets for the client-side
- `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site
- `server/` contains the Express App

This code is also heavily commented. We recommend reading through the comments, getting a lay of the land, and becoming comfortable with how the code works before you start making too many changes. If you're wondering where to start, consider reading through component file comments in the following order:

- src/components
  - App/App
  - Footer/Footer
  - Nav/Nav
  - AboutPage/AboutPage
  - InfoPage/InfoPage
  - UserPage/UserPage
  - LoginPage/LoginPage
  - RegisterPage/RegisterPage
  - LogOutButton/LogOutButton
  - ProtectedRoute/ProtectedRoute

## Deployment

### API Keys

For deployment, you will need to register and an API key for:

- [Google Maps](https://developers.google.com/maps/gmp-get-started)

1. Create a new Heroku project
1. Link the Heroku project to the project GitHub Repo
1. Create an Heroku Postgres database
1. Connect to the Heroku Postgres database from Postico
1. Create the necessary tables
1. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security
1. Add an environment variable for `REACT_APP_API_GMAP` with your Google Maps API key
1. In the deploy section, select manual deploy

## Update Documentation

Customize this ReadMe and the code comments in this project to read less like a starter repo and more like a project. Here is an example: https://gist.github.com/PurpleBooth/109311bb0361f32d87a2
