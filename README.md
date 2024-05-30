# DLG Intake Form API

This project is created to serve as the backend provider
of the DLG Inake Form system

## Setting Up for Development

- Clone the repository from BitBuket
- Install the project's dependencies
- Migrate the database and seed
- Start the application
  - Nodemon will start the application from the application's entrypoint

```shell
$ git clone https://<user>@bitbucket.org/hybrain/dlg-intake-form.git
$ cd dlg-intake-form
$ npm install
$ npm run prisma:dev:initialize
$ npm run dev
```

## Setting Up with Docker

- Install docker
- Open the terminal and navigate to the project folder
- Execute docker-compose up --build
- Open an interactive terminal in the application
- Execute prisma initialization

```shell
$ cd /path/to/project/dlg-intake-form
$ docker-compose up --build
$ docker exec -it dlg_intake_api /bin/sh
$ npm run prisma:dev:initialize
```

## Contribution

To contribute to this repository, a pull request must be submitted for review.
The pull request must be branched out from the development branch of the repository.
The target branch of the pull request must be the development branch.
The pull request must be approved by at least 1 release manager


## Resources
- [**Prisma Documentation**](https://www.prisma.io/docs)
- [**Jest Documentation**](https://jestjs.io/docs/getting-started)
