## Project:
Demo Application builds on top of the Virus Total Public API v2.0 PHP Wrapper library (https://github.com/jayzeng/virustotal_apiwrapper)

This application is used to illustrate how to use the wrapper library and I would suggest you NOT to use it on production without 
carefully reviewing the source code. The app is built on top of angularjs (angularjs.org). 

Project skeleton was generated with:
- yaomen (yeoman.io/)
- generator-angular (https://github.com/yeoman/generator-angular)
- generator-karam   (https://github.com/yeoman/generator-karma)

## Screenshot:
![screenshot](virus_total_demoapp.png)

## Dev Dependencies:
- yo - yeoman  (npm install yo)
- bower        (npm install bower)
- grunt        (npm install bower)
- grunt-cli    (npm install bower)
- compass      (gem install compass)

You may install them via npm install

## Install:
- bower install
- npm install
- open up GruntConfig.json (https://github.com/jayzeng/virustotal_demoapp/blob/master/GruntConfig.json), put in your api key

## Run:
Run local server
```bash
grunt server
```

Trigger unit test
```bash
grunt test
```

Deploy to your server:
```bash
grunt build
```

This generates all source code to the dist folder. 

List available grunt tasks:
```bash
grunt --help
```
