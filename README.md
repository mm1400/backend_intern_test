# LUDEX INTERNSHIP TEST

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org)
- [Docker](https://www.docker.com/get-started/)
- [Git](https://git-scm.com/)
- _(Recommended)_ [VS Code](https://code.visualstudio.com/)
  - If you install VS Code, it is recommended to also install the following extensions:
    - **ESLint** (for linting and code formatting)
    - **GraphQL** (for syntax highlighting and validation)
    - **Prisma** (for schema editing and database insights)

### Setting Up Your Repository

This project is provided as a **GitHub template**. To begin, follow these steps:

1. Navigate to the template repository on GitHub.
2. Click the **"Use this template"** button to create a new repository under your own GitHub account.
3. Clone your newly created repository to your local machine.
4. Ensure that your repository is **public**, or if you choose to keep it private, grant access to the GitHub user `mccjul`.
5. Once you have completed the test, provide the link to your repository in your submission.

### Running the Project

#### Launch the Database

First, ensure that you have **Docker Desktop** installed and running. To verify that Docker is installed and accessible from your terminal, run:

```sh
docker --version
```

If Docker is installed, navigate to the project directory and start the database container by running:

```sh
docker compose up -d
```

This will launch a **PostgreSQL** database inside a Docker container, which will be used in later steps.

#### Run Migrations

With the database running, install the project dependencies by executing:

```sh
npm install
```

Once all dependencies are installed, apply database migrations to ensure the schema is correctly set up:

```sh
npm run prisma:migrate
```

#### Run the Application

Now that everything is set up, you can start the application. To run it in **watch mode** (which automatically restarts the app on file changes), use the following command:

```sh
npm run dev:watch
```

This command also performs two additional tasks before starting the app:

1. **Generates TypeScript types** from the Prisma schema.
2. **Generates GraphQL types** in `typeDefinitions`.

These generated types will help improve your development experience, especially if you have **ESLint** enabled in your IDE.

#### Testing Using GraphQL Playground

Once the application is running, open your browser and navigate to:

```
http://localhost:4000/graphql
```

This will open the GraphQL Playground, a UI where you can execute GraphQL queries and mutations.

To run a **query**, use the following example:

```graphql
query {
  hello
}
```

To run a **mutation**, use:

```graphql
mutation {
  createSomething(input: { name: "Bob" }) {
    id
    name
  }
}
```

The response from the backend will appear on the right-hand side of the UI.

## The Test

Your task is to implement a **CRUD (Create, Read, Update, Delete) Todo backend** using GraphQL. The backend should support the following functionalities:

- Create todos
- Mark todos as complete or incomplete
- Update the title of a todo
- Retrieve all todos
- Retrieve all incomplete todos
- Retrieve all completed todos
- Retrieve a single todo by ID
- Delete todos

## **Technical Requirements**

To successfully complete this test, ensure that your implementation meets the following requirements:

- **Use TypeScript:** Your project should be fully typed, and TypeScript configurations should be properly set up.
- **Use Prisma as ORM:** The database interactions should be handled using Prisma.
- **GraphQL API Implementation:** The API should be implemented using GraphQL with appropriate queries and mutations.
- **Follow Best Practices:** Code should be well-structured, modular, and follow standard best practices (e.g. error handling, and meaningful variable names).
- **Database Schema:** The `Todo` entity should have at least the following fields:
  - `id` (UUID)
  - `title` (string)
  - `completed` (boolean)
  - `createdAt` (timestamp)
  - `updatedAt` (timestamp)
- **Environment Variables:** Use an `.env` file to configure database connections securely.
- **Linting & Formatting:** Ensure that your code is properly formatted using ESLint and Prettier.
- **Validations & Error Handling:**
  - Validate user inputs before processing mutations.
  - Handle potential errors, such as trying to update a non-existent todo.
- **Version Control:** Use Git for version control with clear commit messages.

## **Bonus Features (Optional)**

These additional features are not required but will help your submission stand out:

- **Pagination:** Implement pagination for retrieving todos.
- **Filtering & Sorting:** Allow filtering by `completed` status and sorting by `createdAt`.
- **(MEDIUM-HARD) Due Date:** Add a `dueDate` field to todos. Implement filtering for **overdue/upcoming** tasks and sort todos by time.
- **(HARD) Testing:** Write unit and integration tests using Mocha to ensure the API functions correctly.

## **Relevant Documentation**

- [Prisma Documentation](https://www.prisma.io/docs/orm/prisma-client/queries/crud)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html)
- [GraphQL Guide](https://graphql.org/learn/)
