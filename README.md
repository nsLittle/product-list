## Product List

This project has been created by Mutsumi Hata, a student at Parsity, an online software engineering program. The work in this repository is wholly of the student based on a sample starter project that can be accessed by looking at the repository that this project forks.

If you have any questions about this project or the program in general, visit [parsity.io](https://parsity.io/) or email hello@parsity.io.

### Project Description

This first fullstack project was created using Node Express for the backend, while the frontend was created using React Nextjs.

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
5. Type: npm run dev
6. Type: open http://localhost:8000 (or other appropriate host)
7. Locate file: client
8. Type: npm run dev
9. Type: open http://localhost:3000 (or other appropriate host)

### Things to Add/Edit

1. REREAD INSTRUCTIONS
2. Reviews?
3. Make the stats pretty
4. Last Page link and Next Page link
5. Search results must clear before DropDownCategory and DropDownPrice
6. Search Bar value needs to align with url query string
7. Move All Products link to top of page
