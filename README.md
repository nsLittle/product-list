## Product List

This project was created by Mutsumi Hata, a student at Parsity, an online software engineering program. The work in this repository is wholly of the student based on a sample starter project that can be accessed by looking at the repository that this project forks.

If you have any questions about this project or the program in general, visit [parsity.io](https://parsity.io/) or email hello@parsity.io.

### Project Description

This fullstack project was created using Node Express for the backend, and React Nextjs for the frontend.  Using fake data generated from Fakerjs.dev, this project mmimcs an online product list.  

The project currently has reviews stored in the backend for each product.  This has not been tied in with the frontend for rendering at the moment.

This can ultimately be built into an online store with shopping carts and user authentication into online order histories, etc.

### Table of Contents

- product-list
  - client
    - app
      - DropDownCategory
        - page.js
      - DropDownPrice
        - page.js
      - ProductList
        - page.js
      - ReturnLink
        - page.js
      - SearchBar
        - page.js
      - redux
        - actions
          - productActions.js
        - reducers
          - index.js
          - productReducers.js
        - store.sj
      - globals.css
      - layout.js
      - page.js
  - models
    - product.js
  - routes
    - main.js
  - package.json
  - README.md
  - server.js

### How to Run Application

1. Open terminal
2. Type: 'brew services start mongodb/brew/mongodb-community@5.0'
3. Type: 'mongosh'
4. Locate file: product-list
5. Make sure Node.js is installed  If not, type: npm install
6. Type: npm run dev
7. Type: open http://localhost:8000 (or other appropriate host)
8. Go to: http://localhost:8000/generate-fake-data
9. Locate file: client
10. Type: npm run dev
11. Locate file: product-list
12. Type: npm run dev
13. Type: open http://localhost:3000 (or other appropriate host)

### Things to Add/Edit

1. REREAD INSTRUCTIONS
