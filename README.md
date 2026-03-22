
  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Deploying to GitHub Pages

  Push the `main` branch to GitHub.

  In the GitHub repository, open `Settings > Pages` and set:
  - `Source`: `GitHub Actions`

  After that, each push to `main` will build and deploy automatically.

  This workflow builds with `VITE_BASE_PATH=/` so the deployed site works on the
  configured custom domain.
  
