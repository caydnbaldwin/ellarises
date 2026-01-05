# Ella Rises
 This repo provides the source code for the Ella Rises analytics solution built during Brigham Young University - Marriott School of Business - Information Systems INTEX Fall of 2025. This is a community-oriented site aimed at empowering young women through STEAM (Science, Technology, Engineering, Arts, Mathematics) and cultural programs.

## INTEX

We received broad guidelines, a trashed dataset, and a four-day time constraint.

Brady Bates, Jacob Woodward, Peter Young and I normalized the data using Excel, performed an exploratory data analysis using Python, visualized insights using Tableau, and presented our findings to executives using Canva.

We designed a relational database ERD using draw.io, authored SQL scripts to build and seed the PostgreSQL database, formalized a SDLC standard for the team, deployed separate development and production environments using AWS Elastic Beanstalk and RDS, and configured AWS code pipeline to integrate with the team GitHub repository.

We architected a modular MVC backend using Node.js, componentized the frontend through EJS partial injection, implemented safeguards against SQL injection and XSS through disciplined input management and graceful error handling, threw in an easter egg, and included a successful product demo in our presentation. 

## Project Structure

- index.js – Main server entry point for the application.

- package.json / package-lock.json – Node dependencies and scripts.

- Frontend templates / views – EJS or equivalent markup for site pages.

- Subdirectories (e.g., events, persons, surveys, etc.) – Domain content and logic.

- .ebextensions / .platform/hooks – Deployment configuration (e.g., for AWS Elastic Beanstalk).

- Other folders – Middleware, database config, public assets, and donation integration.
