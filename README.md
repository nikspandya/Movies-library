# Movie Library App

This is a Movie Library app in which users can see the movie library dashboard. Also, the User can add new movies and delete or update existing movies in the movie dashboard.

## Install movie-library-client

First, install all the dependencies by running the following commands from the project root folder

```bash
yarn install
```

Then run the following commands to start the development server locally:

```bash
yarn dev
```

OR

Run the following command to build and start the app locally:

```bash
yarn build

yarn start
```

Then open [http://localhost:8080](http://localhost:8080) with your browser to see the result.

You can start editing the page by the components or the pages in the `components/` dir or the `pages/index.tsx`. The page auto-updates as you edit the file.

_Additionally, I have configured an ESLint to make code more consistent and avoid bugs._

Therefore, when working on the project and, especially before pushing new code to the repo, please run the following command in the project's dir to check for mistakes:

```bash
yarn lint:fix
```

The code formatter prettier with a specific configuration is used with this project.

While running `yarn lint:fix` the code will be auto formatted.


## Usage

* Go to [Movies](http://localhost:8080/movies) for viewing existing movie dashboard, adding new movies or editing deleting exsiting movies.
