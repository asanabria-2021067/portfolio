# Complete Go Course
This is a code repository for a workout tracking API project built in the [Complete Go](https://frontendmasters.com/courses/complete-go) course on Frontend Masters.
[![Frontend Masters](https://static.frontendmasters.com/assets/brand/logos/full.png)](https://frontendmasters.com/courses/complete-go)

## Setup

The API project is built from scratch. Before watching the course, you should install:
- [Go](https://go.dev/doc/install) (version 1.24.2 or higher)
- [Postgres](https://www.postgresql.org/download/) and any DB tool like psql or Sequel Ace to run SQL queries.
- [Docker and Docker Compose](https://www.docker.com/)

## Setup Tips
- In the [Postgres Database Container lesson][database], the Docker container exposes Postgres on the default port of `5432`. If you already have Postgres or something else running on that port and you get a connection error, you can use an alternate port but updating the `docker-compose.yml` to be something like `"5433:5432"`.
- In the [SQL Migrations with Goose lesson][goose], if you get a "command not found" error when running `goose -version`, it's because the `$HOME/go/bin` directory is not added to your `PATH`. You can fix this temporarily by running `export PATH=$HOME/go/bin:$PATH`, but this will not persist if you close your terminal. A permanent fix would require adding `export PATH=$HOME/go/bin:$PATH` to your `.zshrc` or `.bashrc`.

## Code Checkpoints

The commits on the main branch are noted in lessons throughout the course and can be used to check your code or get the latest version of the application.
- [first commit][commit15] - Starting code for the **Parsing Command-Line Flags** lesson
- [1.5 + post notes][commit15] - Starting code for the **Getting Workouts By ID** lesson
- [1.5, 1.6, 1.7][commit17] - Starting code for the **Deleting Workouts** lesson
- [1.8][commit18] - Starting code for the **Logging & JSON Error Responses** lesson
- [3.1][commit31] - Starting code for the **Token Authentication & OAuth 2.0** lesson
- [3.2][commit32] - Starting code for the **Testing the Authentication Routes** lesson
- main branch - Final code for the course

[database]: https://frontendmasters.com/courses/complete-go/postgres-database-docker-container/
[goose]: https://rc.frontendmasters.com/courses/complete-go/sql-migrations-with-goose/
[commit0]: https://github.com/Melkeydev/fem-project-live/commit/050148ae8ee404d63a854b5f2d009168cdd7ffe7
[commit15]: https://github.com/Melkeydev/fem-project-live/commit/906b53e39aa4d99507a0fb0e8005f22966746694
[commit17]: https://github.com/Melkeydev/fem-project-live/commit/420a1a8910e528b3fa6af48a901b68502b0ee3e4
[commit18]: https://github.com/Melkeydev/fem-project-live/commit/0152bf2362188f2a6e496afe5082ca588376dcbf
[commit31]: https://github.com/Melkeydev/fem-project-live/commit/0f82adb67aaff0ba7ee51dd8fc5bc1e55cedde07
[commit32]: https://github.com/Melkeydev/fem-project-live/commit/efb3ae2bad4c15f1f77bb63279da77ae9f075715

## Tests

After the `workout_store_test.go` migration is added, the test will fail due to a foreign key violation. This is becasue the tests create a workout without a `user_id`. Creating a test user for the tests will fix this issue. The `main` branch has the working tests. See [this commit](https://github.com/Melkeydev/fem-project-live/commit/3d6880e49e638b1c319acbbacb3e4fa9bebc53d5) for the fix.
