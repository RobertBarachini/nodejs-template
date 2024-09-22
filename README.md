# Project description

This is a template for Node.js projects. It is meant to be used as a starting point for new projects.

You are free to do whatever you want with this template. If you find it useful, please consider starring ⭐ the repository or supporting it in some other way. Attribution is not required, but appreciated.

Last update: 2024-09-22T09:28:11.305Z

# Template usage

Initial setup:

1. Clone this repository and change directory to the root of the project
2. Run `./src/scripts/setup.sh` in the root of the project and follow the instructions
3. Change directory to the newly created project or open it in your editor

Have fun `:^)`!

# Guidelines

## Code style

Code uses `ES6` syntax (`"type": "module"` in package.json). It is recommended to use `const` and `let`. Use arrow functions. Function declarations using the `function` keyword is discouraged (hoisting can cause issues and decreases readability).

It is also suggested you use good coding practices, such as early returns, avoiding nested if statements, etc.

## Commit messages

Commit messages should be short and descriptive. They should be written in the imperative mood. Example:

```sh
git commit -m "Add new feature"
```

Commit messages should be written in English. Try to avoid implementing multiple changes / functionalities if not necessary (could be needed for certain situations, such as major changes and refactoring).

## import / export

Imports should occur at the top of the file.

Exports should occur at the bottom of the file in the following pattern:

```js
export { foo, bar, baz }
```

or

```js
export default foo
```

NOTE: Linting doen't play nicely with imports (still broken for some reason). Node.js path aliases are not recognized as valid imports either. This is a known issue and will be fixed in the future.

# Development

It is recommended that you use VS Code as your editor as it provides a seamless development experience (even on remotes) without the need for any additional programs. It has built-in support for ESLint and Prettier. It also has a built-in debugger. If you are developing natively, and have enabled 'smart' auto-attach, the debugged is automatically attached to the running process. If you are using Docker, you can use a launch configuration `Attach to Docker port` to attach to the running process (it is exposed on port 9229).

Development environment uses Nodemon, which enables hot reloading (supported in native and Docker dev environments).

## Native

If you wish to run the project natively, you will need to install Node.js and npm. It is also suggested that you use pnpm instead of npm (it has many advantages). You can install it using `npm install -g pnpm` or natively (check their website).

### Install dependencies

```sh
pnpm install
```

### Run

```sh
pnpm run dev
```

## Using Docker

Run the app using Docker Compose. It is recommended to use Docker Compose for development as it provides a consistent environment.

### Run

```sh
pnpm run compose:up
```

After stopping the server for a longer period of time, it is recommended to run `pnpm run compose:down` to remove the containers and other attached resources.

# Production

## Native

### Install dependencies

```sh
pnpm install --frozen-lockfile --production
```

### Run

```sh
NODE_ENV="production" node src/server/index.js
# Or alternatively
pnpm run start
```

## Using Docker

Build happens when running the Docker Compose command. It is recommended to use Docker Compose for production as it provides a consistent environment.

### Run

```sh
docker compose -f 'docker-compose.yml' up --build --force-recreate --remove-orphans
```

After you are done it is recommended to run `docker compose -f 'docker-compose.yml' down --remove-orphans --volumes --rmi all` to remove the containers and other attached resources.

# Testing

## Unit tests

Testing is done using the Mocha framework. It is recommended you put unit tests in the same folder as the file you are testing. For example, if you are testing `src/server/index.js`, you should put the test in `src/server/index.test.js`.

## Integration tests

TODO

## Contract-based tests

TODO

# Project structure

- `src/` - source code
- `src/scripts/` - scripts (build, ...)
- `src/server/` - server code
- `src/utils/` - utilities
  - It is recommended to use ustils (especially makeRequest) as it provides a unified way of handling errors and responses. Suggested import: `import { makeRequest } from '#utils/requests.js'`. Project uses path aliases, so you can use `#utils/requests.js` instead of `../../utils/requests.js`. Try to avoid using child paths (`../..`) as it makes it harder to move files around.
- `logs/` - logs (mapped using volumes if using Docker)

# Keywords

- nodejs
- template
- express
- ES6
- docker
- eslint
- prettier
- development
- production
- testing
- debug
- mocha

# TODO

- Extend template
- Add env/secrets management
- Add remote logging

# DONE

- Write a README.md
- Add Docker stuff
- Add project setup script (for creating a new project from the template)
- Extend README.md
- Extend the basic router
- Change logging to print to stdout differently (not JSON like to logfile/remote)
- Add middleware for logging (request/response)
