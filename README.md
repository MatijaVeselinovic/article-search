# A simple article fetching and filtering app

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Technology stack
list of major technologies and libraries used within the project:
* [SCSS](https://sass-lang.com/)
* [ReactJS](https://reactjs.org/): Version 17.0.2
* [React Redux](https://react-redux.js.org/): Version 7.2.5
* [Redux Toolkit](https://redux-toolkit.js.org/): Version 1.6.2
* [Swiper](https://swiperjs.com): Version 7.0.8
* [Webpack](https://webpack.js.org/): Version 5.58.1

## Notes and comments for the reviewer
1. You can uncomment a few lines inside the `GameCategory.jsx` and `GameCategory.scss` to enable images and their lazy loading. It's defaultly commented out because of huge number of missing images.
2. The sample project in itself did not require managing data via redux store, however I personally wanted to try out something new with using *redux-toolkit's* `createSlice` function to easily export reducers and define actions without having to worry about immutability, which is something *redux-toolkit* does under the hood.
3. There are two different versions of loader component without any specific reason, I just wanted to show of the diversity and also I thought it visually looks better.
4. I wasn't really creative with the design, but I've tried to recreate a smooth and simplified version of the website that was referenced in the task.
5. This is getting a bit too long, have fun. :)

##
#### Author: [Matija Veselinovic](https://github.com/MatijaVeselinovic/)
