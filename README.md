# Ionic boilerplate

## Getting started

- install nodejs, npm, gulp, bower, cordova, ionic & sass (if not already done)
- `git clone git@github.com:loicknuchel/ionic-starter.git` : clone this repo
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