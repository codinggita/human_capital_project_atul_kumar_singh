# Human Capital Project

Backend API for the Human Capital project, built with Node.js, Express, and MongoDB.

## Getting Started

1.  Clone the repository.
2.  Install dependencies: `npm install`
3.  Copy `.env.example` to `.env` and configure your MongoDB URI.
4.  Run the development server: `npm run dev`

## Dataset

The original dataset is available [here](https://drive.google.com/file/d/11qaP8A5QpJF7s-wBF0tpAt9GG5rsj35-/view?usp=drive_link). It's a ~48MB JSON file containing 190k+ records.

*Note: Please do not commit `human_capital_project.json` or any large dataset files directly to this repository.*

## API Endpoints

-   `GET /api/v1/health` - Health check

More endpoints will be documented as they are implemented.
