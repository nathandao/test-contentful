# Test Netlify functions features

Copy .env.example to .env and fill up the values

```bash
cp .env.example .env
```

Install dependencies

```bash
npm i
```

Start the local netlify development environment

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
