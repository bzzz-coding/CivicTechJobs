# OUTDATED

<!-- TODO: Update this doc with Vite notes -->

# Frontend Architecture

```yml
├── .github/
│   └── ISSUE_TEMPLATE/
├── app/
│    ├── config/
│          └── settings.py
│    ├── frontend/ # Frontend
│    ├── server/
|    ├── tests/  # Frontend
|    ├── .babelrc  # Frontend
|    ├── .jest.config.js  # Frontend
│    ├── manage.py
│    ├── requirements.txt
│    ├── package.json # Frontend
│    ├── package-lock.json # Frontend
│    └── vite.config.mts # Frontend
├── dev/
│    ├── django.dockerfile
│    ├── vite.Dockerfile
│    └── dev.env
├── .dockerignore
├── .gitignore
├── jsconfig.json
├── CONTRIBUTING.md
├── docker-compose.yml
├── LICENSE
└── README.md
```

_<p style="text-align: center;">Overall project structure</p>_

```yml
├── frontend/
│   ├── src/
│       ├── assets/
│       ├── components/
│           ├── Apps.js
│           └── <Components>/
│       ├── context/
│           ├── QualifiersContext.tsx
│       ├── pages/
│       ├── templates/
│           └── index.html
│       ├── index.js
│       └── index.scss
│   ├── static
│   └── templates
├── tests/
├── .babelrc
├── .jest.config.js
├── package-lock.json
├── package.json
└── vite.config.mts
```

_<p style="text-align: center;">Frontend Architecture</p>_

These diagrams show how data flows through the app: [Frontend and Backend UML diagrams](https://github.com/hackforla/CivicTechJobs/issues/236)

## Summary

**Frontend Tech Stack**: React, Babel, webpack, Jest, React Testing Library, HTML, SCSS, JS, TailwindCSS

The over ninety percent of our frontend architecture is housed in our `frontend/` directory. This directory is a [Django app](https://docs.djangoproject.com/en/3.2/intro/tutorial01/), which is a set of files that can be ported to any Django-based application.

Since our frontend is a Django app, it takes advantage of the way Django serves its static assets. Every Django app, by default, looks to the `templates/`\* directory within the app for the `html` template file to serve. This template usually contains `<script>` and `<style>` tags denoting the location of SCSS and JS files. In Django, these files are usually located inside the `static/`\* directory. Likewise, our frontend app store our templates and static assets within these directories.

Despite these similiarties, however, the files in these two directories should never be manipulated by a developer. These files are automatically generated by an application called [webpack](https://webpack.js.org/) via configurations in `webpack.config.js` and `.babelrc`.

The files that should be manipulated by developers are housed within the `src/` directory. Inside of here are directories for `assets/`, `componenents/`, `pages/`, `router`, and `templates/`. Each of these directories contains the files which webpack reads and then bundle into output files for the `static/` and `template/` directories.

> ###### _\*Note: The `templates/` and `static/` directories contain within them a `frontend/` directory in order to namespace template and static files. Although this serves little purpose for our project, it is a Django convention that prevents Django from confusing the `templates/` and `static/` directories from the frontend app vs another app._

## Overview of Directories and Files

- **frontend/:** houses all the frontend files.
- **frontend/src/:** houses all the files for developers to manipulate. The files here are read by webpack before being bundled into the `static/` and `templates/` directories.
  - **assets/:** this is where we store all of our miscellaneous files, such as .jpegs, .svgs, .gifs, etc.
  - **componenents/:** this is where we store the files that generate our components, such as buttons and cards. To learn more about this in-depth, read the [components](#components-directory) section of this guide.
  - **context/:** contains the logic and data management utilities related to context providers and consumers. Contexts are used for managing global state within our application, providing a way to pass data through the component tree without having to pass props manually at every level. - **COP (Community of Practice) JSON Structure:** The COP data represents different communities of practice within our organization, each consisting of various roles and descriptions. Below is the JSON structure of the COP data for QualifierPageRoles.tsx:
  ```
  {
    "COPs": {
      "UI/UX": [
        "UI/UX_Designer",
        "UX_Researcher",
        "UX_Writing",
        "UX_Practice_Lead"
      ],
      "Engineering": [
        "Back_End_Developer",
        "Front_End_Developer",
        "Full_Stack_Developer",
        "Engineering_Practice_Lead"
      ],
      "Data_Science": [
        "Data_Scientist",
        "Data_Analyst",
        "Data_Engineer",
        "Data_Science_Practice_Lead"
      ],
      "Project/Product_Management": [
        "Product_Manager",
        "Project_Manager",
        "Business_Analyst",
        "Product_Owner",
        "Special_Projects_Coordinator",
        "Product_Management_Practice_Lead"
      ],
      "DevOps": [
        "Site_Reliability_Engineer",
        "Data_Engineer",
        "Database_Architect",
        "Security_Engineer",
        "DevOps_Practice_Lead"
      ]
    }
  }
  ```
  - **pages/:** contains the React files that pools together various components to generate a page.
  - **router/:** contains the routing logic for the project. It uses the [React-Router library](https://reactrouter.com/docs/en/v6).
  - **templates/:** contains HTML files that are then generated into the regular templates directory. To learn more about how webpack bundle our files, read the [webpack](#webpack-configurations) section of this guide.
  - **index.js:** this file serves as the entry point for all other js files\*. This file is read by webpack, and then bundled into code in the `static` directory.
  - **index.scss:** this file serves as the entry point for all other scss files\*.
- **frontend/static/:** automatically generated by webpack, _DO NOT EDIT_
- **frontend/templates/:** automatically generated by webpack, _DO NOT EDIT_
- **tests/:** contains our test files. To run these files simply use `docker compose run webpack npm run test`.
- **.babelrc:** Babel's configuration. To learn more about this, please visit [babel's documentation](https://babeljs.io/docs/en/config-files#file-relative-configuration).
- **.jest.config.js:** Jest's configuration. To learn more about configuring Jest, please visit [jest's documentation](https://jestjs.io/docs/configuration).
- **package-lock.json & package.json:** These files are created by npm to keep track of dependencies. Please visit [npm's](https://nodejs.org/en/knowledge/getting-started/npm/what-is-the-file-package-json/) [documentation](https://docs.npmjs.com/cli/v8/configuring-npm/package-lock-json) to understand them.
- **webpack.config.js:** webpack's configuration. To learn more about configuring webpack, please visit their [documentation](https://webpack.js.org/configuration/). To learn about our specific configuration, see the [below guide](#webpack-configurations).

###### _\*Note: This is technically a lie. In actuality, **index.js**, reads **index.s** as well as the React files, making it the only entryway for all files bundled in the `src/` directory._

## Components Directory

```yml
├── components/
│   ├── Basics/
│       ├── Colors.scss
│       └── Titles.scss
│   ├── Buttons/
│       ├── Button.js
│       └── Button.scss
│   ├── Cards/
│       ├── Cards.js
│       └── Cards.scss
│   └── <Components>/
```

_<p style="text-align: center;">A closer look at a theoretical expansion of the components directory</p>_

The components directory contains our site components. Each directory in here represents a different class of components, such as `Buttons/`\* or `Cards/`\*. Within these directories are the files necessary that creates these components. Likewise, the special `Basics/` directory contains small CSS classes that are reused, but not, technically, components, such as text-size or text-colors.

###### _\*Note: These files are capitalized to follow React convention for components. When making new components, please make sure to follow this convention. This convention is in place to help React differentiate between modules vs other types of imports._

## Webpack Configurations

```javascript
...

module.exports = {
    mode: 'development',
    entry: {
        index: "./frontend/src/index.js"
    },
    output: {
        clean: {
            keep: '.gitkeep'
        },
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'frontend/static/frontend'),
    },
    devtool: 'inline-source-map',
    module: {
        rules: ...
    },
    optimization: {
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: ...
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: '../../templates/frontend/index.html',
            template: '/frontend/src/templates/index.html',
        }),
    ],
    watchOptions: {
        ignored: /node_modules/,
    },
}
```

_<p style="text-align: center;">webpack.config.js (truncated)</p>_

Our `webpack.config.js` file is one of the most important files to understanding how our frontend architecture comes together. Therefore, this section is dedicated to the settings that we have set for this file. Note that we do not explain all the settings, as some can be found and easily deduced from webpack's [configuration](https://webpack.js.org/configuration/) and [guides](https://webpack.js.org/guides/) documentation.

- **entry:** the file that is ultimately read by webpack to bundle everything together. This file, `index.js` imports all dependencies and files that makes up our product. Note that [advanced multiple entry](https://webpack.js.org/guides/entry-advanced/) is possible, should we ever need it.
- **output:** contains configurations for the files that are generated in the `static/` directory
- **output > clean > keep:** clean is usually used to clear away old files before generating new ones (filenames are variable to force browser css/js recacheing). However, keep notes files that should not be removed\*.
- **output > filename:** this configures the name of the generated js files. [name] is simply the name of the file noted in the _entry_ configuration, and [contenthash] is a randomly generated string, which forces browser recacheing.
- **output > path:** the directory to place the generated file. This directory is the one that Django, by default, detects its static files.
- **optimization:** this contains a catch-all for various ways to enhance either development or deployment. For more on our current configuration, read [this guide](https://webpack.js.org/guides/caching/).
- **plugins > HtmlWebpackPlugin:** this plugin enables us to dynamically generate templates with the correct `<script>` and `<styles>` path by reading the _template_ and outputing it with the path noted by _filename_. This output path follows Django's default template directory structure.
- **watchOptions > ignored:** configures files to ignore when regenerating watched files.

###### _\*Note: The kept `.gitkeep` file is there to give an empty file for git to preserve the otherwise empty directory when pushed onto GitHub. As you might have guessed, git does not push empty directories._

### Why do we separate Babel from webpack?

If you have explored documentation from webpack, you might learn that the _babel-loader_ in **module > rules** can accept the settings noted in `.babelrc`. The reason why we separate these settings into another file is because webpack is not, in theory, the only application that makes use of these settings. Although we have no other apps that makes use of `.babelrc` at the moment, this can change in the future. Therefore, this separation of files is a form of future proofing.

## Testing

### Component Testing

Our tests exists inside the tests directory with subdirectories that follows `frontend/src`. There is also `__mock__/` which contains code that bypasses certain tricky imports, such as svg or SCSS assets, which are not needed when testing. In order to understand how to write tests, be sure to take a look at the documentation for [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/), the parent [DOM Testing Library](https://testing-library.com/docs/dom-testing-library/intro), and the support libraries [jest-dom](https://github.com/testing-library/jest-dom) and [user-event](https://testing-library.com/docs/user-event/intro/).

To run these tests, use the command `docker compose run webpack npm run test` (or with `test:w` for watch mode). The tests are run through jest, while the other libraries support react testing by providing functions to render DOM elements and simulate user behavior.

Note: `jest-environment-jsdom` is a library that is absolutely required to link jsdom to jest. It provides the classes necessary for jest to interpret the jsdom environment. This information is listed here as it is not listed in jest's or jsdom's docs.

### Accessibility Testing

In addition to testing the functioning of our components, we also test the accessability of it via the library, [@axe-core/react](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/react). This library prints out accessibility issues onto the browser console, providing accessibiltiy testing once the HTML has fully rendered. That said, the library is known to give both false positives and false negatives. As always reading the official documentation is best when it comes to resolving these errors.

## Additional Resources

[Sass Documentation](https://sass-lang.com/documentation)<br>
[React Documentation](https://reactjs.org/docs/getting-started.html)<br>
[Webpack Documentation](https://webpack.js.org/concepts/)<br>
[@babel/preset-react Documentation](https://babeljs.io/docs/en/babel-preset-react)<br>
[React Router Documentation](https://reactrouter.com/docs/en/v6)<br>
[Jest Documentation](https://jestjs.io/docs/getting-started)<br>
[React Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro/)<br>
[@axe-core/react Documentation](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/react)<br>
[WAI-ARIA Authoring Practices 1.1](https://www.w3.org/TR/wai-aria-practices-1.1/)<br>
