# GitHub Search App

A modern web application built with Next.js that allows users to search and explore GitHub repositories, users, and their contents. The app provides an intuitive interface to browse through GitHub's vast ecosystem of projects and developers.

## Features

- Search GitHub repositories and users
- View detailed repository information
- Browse repository contents and README files
- Responsive and modern UI design
- Real-time search results
- Markdown rendering support

## Technology Stack

- **Frontend Framework**: Next.js 15
- **Language**: TypeScript
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **HTTP Client**: Axios
- **Styling**: CSS Modules
- **Markdown Rendering**: React Markdown with syntax highlighting
- **Icons**: Lucide React

## Project Structure

```
github_search_app/
├── app/                    # Next.js app directory (pages and routes)
├── components/            # Reusable React components
├── constants/            # Application constants
├── domains/             # Domain-specific logic and types
├── public/              # Static assets
├── stores/              # Zustand store definitions
├── types/               # TypeScript type definitions
└── utils/               # Utility functions and helpers
```

## Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm
- GitHub API Token (for higher rate limits)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/zulhijaya18/github_search_app.git
   cd github_search_app
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Create a `.env` file based on the provided example:

   ```bash
   cp env-example .env
   ```

   Add your GitHub API token to the `.env` file.

   - For GitHub API token documentation, refer to [Creating a personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).

## Development

To start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

## Building for Production

To create a production build:

```bash
pnpm build
```

To start the production server:

```bash
pnpm start
```
