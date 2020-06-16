# Test Netlify functions features

Copy .env.example to .env and fill up the values

```bash
cp .env.example .env
```

Install dependencies

```bash
npm i
```

Make sure you're logged in to Netlify

```bash
npm run netlify login
# This will open the Netlify authentication page in your browser, where you can login and authorize the application from there.
```

Start the local netlify development environment. If you're logged in to Netlify, and have access to the Netlify application, the environment variables will be fetched automatically.

```bash
npm start
```

There should now be 2 Netlify functions listening at http://localhost:8888/.netlify/functions/hello-world and http://localhost:8888/.netlify/functions/about-page

## Netlify functions

Our Netlify functions should be located within the `./src/functions` folder. The `functions` folder location is defined in our `./netlify.toml` file.

For each function, the convension is to have the folder names inside `./src/functions` mapping to `http://hostname/.netlify/functions/folder-name`, with the main js file of the function having the same name as the folder, for example: `./src/functions/foo-bar/foo-bar.js`. Within `foo-bar.js` there should be an `exports.handler` function defined.

```
exports.handler = async (event, context) => ...
```

This will tell Netlify to execute this function upon invoking the route `http://hostname/.netlify/functions/foo-bar`

You can also create a function boilerplate with the command

```
npm run netlify functions:create function-name
# And go through the prompt to pick the most suitable use case
```

## Deployment

Currently, the deployment is created via configuring Netlify to listen to our github changes. Pushes to master branch will be deployed to production.

Environment Contentful variables are set within Netlify dashboard in `Settings > Build & Deploy > Environment`

For every PR created, Netlify would also create a separate environment for that PR, which can be accessed via Netlify dashboard, under the Deploys section :)
