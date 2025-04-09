
# Academic Records Central System

## Project info

**URL**: https://lovable.dev/projects/78a560fc-da66-410a-b1c3-5d78ef34ec9b

## About

This application is an academic records management system that allows different user types (Students, Institutes, and Government) to access and manage student academic records.

## Features

- Student login to view and manage personal academic information
- Institute login to manage student records
- Government login to search and view all student records across institutions
- Responsive design for all device types

## Technologies Used

- Vite
- TypeScript
- React
- Tailwind CSS
- shadcn/ui
- TanStack Query

## Running Locally

If you want to work locally using your own IDE, you can clone this repo and push changes.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## Deploying to GitHub Pages

To deploy this project to GitHub Pages:

1. Create a GitHub repository for your project
2. Update the repository name in `vite.config.ts` if different from "acad-record-central"
3. Push the code to your GitHub repository
4. Install the gh-pages package:
   ```
   npm install --save-dev gh-pages
   ```
5. Add the following scripts to your package.json:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
6. Add a homepage field to your package.json:
   ```json
   "homepage": "https://yourusername.github.io/acad-record-central"
   ```
7. Run the deploy command:
   ```
   npm run deploy
   ```

After deployment, your app will be available at: `https://yourusername.github.io/acad-record-central`

Note: When using GitHub Pages with React Router, you'll need to configure your routes to work with the GitHub Pages URL structure.
