# karma-openui5-sample
Example for building and automated testing an OpenUI5 project integrated in Maven 

This sample is based on the [testing tutorial application](https://openui5beta.hana.ondemand.com/#docs/guide/291c9121e6044ab381e0b51716f97f52.html)

The project uses the [Frontend Maven Plugin](https://github.com/eirslett/frontend-maven-plugin) to automatically download and install nodejs and all required dependencies.


## Prerequisites
Maven 3.1 or higher should be installed. 


## Running
You can run the sample by checking out and then execute:
1. mvn install

This downloads node.js and npm.
Then it executes 
node install
bower install
grunt build
karma start

Finally it packages the application as war file that can be deployed on a Java Webserver.
Then open baseurl/test/testService.html to check the app
For this it uses the OpenUI5 jar distribution created by [Webjars](http://www.webjars.org/) as dependency.

## Configuration
The project layout integrates the [basic folder structure](https://openui5beta.hana.ondemand.com/#docs/guide/003f755d46d34dd1bbce9ffe08c8d46a.html) that OpenUI5 proposes into a [Maven project layout](https://maven.apache.org/guides/introduction/introduction-to-the-standard-directory-layout.html)
Javascript sources are found at src/main/javascript (layout as defined by OpenUI5)
<Pre> 
Project layout is:<br />
+ Project basedir<br />
  +src/main/javascript <br />
            +controller<br />
            +i18n<br />
            +localService<br />
            +model<br />
            +test<br />
            +view<br />
            -Component.js<br />
            -mainfest.json<br />
  -.eslintrc<br />
  -bower.json<br />
  -Gruntfile.js<br />
  -karma.ci.conf.js<br />
  -karma.conf.js<br />
  -package.json<br />
 </Pre> 

Karma runner is configured in karma.conf.js and karma.ci.conf.js for CI specific overrides. 
The sample uses a mockserver and runs QUnit and OPA tests automatically in PhantoJS. 
Test output is recorded as JUnit xml at target/surefire-reports.

## Note
- Npm and bower local package directories are not configurable. They download the dependencies to the project root folder.
- Clean plugin is configured to clean them as well