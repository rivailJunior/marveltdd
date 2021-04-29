# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:


### yarn 

To Install all dependecies 

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.




## Explanations


  Initially provider/requestContext had more 3 async functions - moved to model/ (with redux)
  
  1 - getCharacters
 
  2 - getCharacterByName - now I think its using best API endpoint :)
 
  3 - getCharacter (per id) - not used and remove
 
  I gotta confuse about "maintain state", whether or not to use redux.
  After first submission and yours feedback, I add redux to control state,
  but I didn't use other lib to preserve state like redux-persist.
  
  About this feedback -> "Não há armazenamento de estado ou histórico".
  I decide to add redux, not using redux-persist because I thought wasn't necessary,
  let me know if you want I add an persister to the store.
  
  I decide to let Context with one function (getParticipation) just to show you as an example of use. 
  I could move this to redux or just use as a single async function in description page.
  
  Didn't create an unit test to model/characters, because I tested this with config store at App.test.tsx.
 
