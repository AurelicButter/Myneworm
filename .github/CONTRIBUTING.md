# Contributing

## Guidelines

Contributions, wheither it is code, bug reporting, or documentation, is always welcome. Just fork, code, commit, and pull request!

For coding standards, we use ESLint and Prettier to ensure everything is good. While not required in your editor of choice, using ESLint while developing is highly recommended as Prettier will prevent any commit if it fails to fix/meet with the current code standards.

### Reporting Bugs and Issues

Bug reporting is handled through the issue tracker on the [GitHub repository](https://github.com/Butterstroke/Myneworm/issues/new/choose) and fixes are tracked on the [Myneworm kanboard](https://kanboard.katsurin.com/?controller=BoardViewController&action=readonly&token=00ab148e01a355885744e79894b444bef14000e35e8459ec7e66848fa9fa).

For bugs and issues, please use the bug report template and fill out as much useful information as possible to help replicate and help fix the issues you have found.

## Setting Up Locally

To setup Myneworm locally, please refer to the following steps in order to setup correctly.

1. Install dependancies & verify that Myneworm's API is online
2. Run `npm start` to build and launch the website
3. Visit the address given on successful launch

## Developing the Website

1. Fork & clone the repository. 
2. Create a new branch from development.
3. Setup the website locally
4. Develop your changes
5. Test your changes
   * There is automated testing for code quality with ESLint and Prettier. You can check your status with these checks through the `npm run lint` command.
   * However, there is no automated testing for visuals or functionality with the site at the moment. You will need to manually verify your edits before making a PR.
6. Commit your changes and submit a [Pull Request](https://github.com/Butterstroke/Myneworm/pulls). 
> All changes are staged on the development branch. Please make sure you are merging there before submitting!

### Naming Conventions

Good names are descriptive names! Consider calling something `getBookData` instead of something like `APIFetchInfo`. Myneworm also uses different cases to be able to tell what an item is based on how it is labeled.

For Angular components and services, names should contain dashes where there is spacing, ie: `book-page` or `myneworm-api`.

For constants, enums, and interfaces, PascalCase is used, ie: `BookData` or `PublisherData`.

For other general purposes like functions and classes, use camelCase; ie: `myNewFunction` or `myNewClass`.

## Pull Requests 

Please note that all pull requests will be reviewed by a reviewer and automated checks (GitHub Actions & Jenkins). Pull requests will have to pass all checks before merging.

Any pull request with the following is are acceptable contributions:
* New features or methods to help the site function
* Bug fixes to pre-existing problems or potential problems
* Optimization of existing features
* etc...

Pull requests that just consist of the following will be automatically rejected unless with good reason:
* Minor spelling mistakes or word changes
* Dependancy updates
