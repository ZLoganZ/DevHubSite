# Getting Started with Vite and React

This project was bootstrapped with Create React App, but we'll be using Vite instead. Vite is a faster and more efficient build tool than Create React App.

## Installation

First, make sure you have Node.js installed on your machine. Then, create a new React app using the following command:

```
npx create-react-app my-app
```

Once the app is created, navigate to the project directory and install Vite by running:

```
npm install vite --save-dev
```

## Configuration

1. In the root directory of your project, create a new file called `vite.config.js`.
2. Inside `vite.config.js`, add the following code:

```javascript
import reactRefresh from '@vitejs/plugin-react-refresh';

export default {
  plugins: [reactRefresh()],
};
```

3. In your `package.json` file, replace `"react-scripts start"` with `"vite"` in the `scripts` section.
4. Remove any other scripts that reference `react-scripts`.

Your `package.json` should now look like this:

```json
{
  "name": "my-app",
  "version": "0.1.0",
  "scripts": {
    "start": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2"
  },
  "devDependencies": {
    "@vitejs/plugin-react-refresh": "^1.3.1",
    "vite": "^2.6.10"
  }
}
```

## Usage

To start your app in development mode, run:

```
npm start
```

This will start the app at `http://localhost:3000`.

To build your app for production, run:

```
npm run build
```

This will create a production-ready build in the `build` folder.

For more information on using Vite with React, check out the [Vite documentation](https://vitejs.dev/guide/features.html#react).
