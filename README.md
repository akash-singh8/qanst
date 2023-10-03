# <img src="https://github.com/akash-singh8/qanst/assets/85285176/407a3565-ce3a-417d-91d6-ee1f1e9bc29b" width="48px" style="margin-bottom:-12px"> Qanst


Qanst is a collaborative Q&A platform that empowers curiosity, connects minds, and facilitates meaningful conversations. Create insightful forms, spark engaging discussions, and explore a world of knowledge together.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Form Creation:** Easily create and customize forms to gather insights and questions.
- **Collaborative Inquiry:** Engage in collaborative discussions with users to explore diverse perspectives.
- **Shared Wisdom:** Build a repository of shared knowledge through questions and answers.
- **User Profiles:** Customize your profile, track your contributions, and connect with like-minded individuals.

## Getting Started

To get started with Qanst, follow these steps:

1. **Installation:** Clone the repository and install dependencies.

   ```bash
   git clone https://github.com/akash-singh8/qanst.git
   cd qanst
   npm install
   ```

2. **Configuration:** Set up your environment variables and configure the Prisma database connection in the `prisma/schema.prisma` file.

   ```plaintext
   # .env.local
   DATABASE_URL="your_database_url"
   ```

3. **Database Migration:** Run database migrations to set up your database schema.

   ```bash
   npx prisma migrate dev
   ```

4. **Run the App:** Start the development server.

   ```bash
   npm run dev
   ```

5. **Explore:** Open your browser and navigate to `http://localhost:3000` to start exploring Qanst.


## Contributing

We welcome contributions to this project! Here are some ways you can get involved:

- **Report bugs:** If you encounter any bugs or issues with this package, please let us know by opening a new issue on our [GitHub repository](https://github.com/akash-singh8/qanst/issues).

- **Suggest new features:** If you have an idea for a new feature or improvement, we'd love to hear it! You can suggest a new feature by opening a new issue on our [GitHub repository](https://github.com/akash-singh8/qanst/issues).

- **Submit pull requests:** If you'd like to contribute code to this project, you can submit a pull request with your changes.

To submit a pull request, fork this repository, make your changes, and submit a pull request against the `your-username-feature` branch.

## License

This project is licensed under the [MIT License](LICENSE)
<br>
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

---
