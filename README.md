# **#Introduction**

The package allows you to run the cypress tests in parallel inside gitlab without using cypress dashboard feature

#To Install package and save it as dev dependency 
```console
  npm i cypress-gitlab-parallel-runner
```


# **#Steps to Use the package**

1) Import the package inside plugin cdfolder if you are using older version or inside cypress.config.js file as given below. 
The second parameter tells that you wanted to run the specs in parallel. If false it will not run create any parallel spec file and execution will fail.


```javascript
const getspecFiles = require("cypress-gitlab-parallel-runner")
module.exports = (on, config) => {
      getspecFiles("PATH TO TEST FOLDER",true)
  return config;
};

```
2) Inside getfiles() function you have to specify the path of the folder where your test files are present
```javascript
getspecFiles("../cypress/e2e",true)
```
3) This will create one temp spec file which you can execute using the npx command. For example: 

```console
npx cypress run --browser chrome --headed --spec "cypress/e2e/tmp/parallel.cy.js"
```


**Note: The parallel execution works only on Gitlab CI Instance.**