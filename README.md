# Shopping cart built using Ionic2 and Firebase

### Instructions

1. Create a firebase project [here](https://console.firebase.google.com/).

2. Enter the project credentials in [this file](/src/app/app.module.ts). [__DEMO](/DEMO/demo_firebase_cred.gif)

3. Enable Email authentication. [__DEMO](/DEMO/demo_email_auth.gif)

4. Import the data into firebase database using [this json](/FIREBASE_DATA/dekene-export.json). [__DEMO](/DEMO/demo_import_json.png)

5. Run the following the terminal

Getting started
---------------------
- install nodejs, npm, gulp, bower, cordova, ionic & sass (if not already done)
- `git clone https://github.com/roninprogrammer/e_commerce_android.git` : clone this repo
- `cd ionic-starter` : go to folder
- `bower install` : install app dependencies
- `npm install` : install build dependencies
- `ionic setup sass` : use sass
- `ionic serve` : start the app on your browser


To build/run for a platform (e.g. Android):

- `ionic platform add android` : add android platform to the project
- `ionic resources` : generate icon & splash-screen for project platforms
- `ionic run android` : run your app !

## Personnalize

As it's only a template project, you may want to change its name. For that, you just have to open :

- `config.xml` (widget id, name, description & author)
- `www/index.html` (title)
- `bower.json` (name, homepage, author & description)
- `package.json` (name & description)
- `ionic.project` (name)
