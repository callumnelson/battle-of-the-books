# Battle of the Books ([App](https://battle-of-the-books.fly.dev/))

Are you an ELA teacher? Do you need an easy way to keep track of your students' reading? Do you want to be able to know which of your sections has read the most throughout the year? Welcome to Battle of the Books!!

Inspired by the teachers in my family, I created this site to bring their classroom libraries and reading competitions to life. See the original planning materials, including wireframes and an ERD on Whimsical [here](https://whimsical.com/battle-of-the-books-B2SQhkR1HyKXyGb9ULiZmK).

![App screenshot](https://github.com/callumnelson/battle-of-the-books/blob/main/public/assets/images/screenshot.png)

## How it works 📗

To track their reading, students submit tickets for each book they finish. A ticket contains the book's title, author, and page count, as well as the student's 1-2 sentence review of their reading experience (did they like it? were they surprised by the plot twists?). Teachers can then review and approve the tickets students have submitted and, once approved, tickets count toward the class' total number of points (1 point per 200 pages read).

## Getting started 🏁

Once an admin user creates a district and corresponding school or schools, teachers can sign up, after which they can:
- Create sections for their students to join
- Admit or deny students who request to join their sections
- View and edit admitted students' profiles
- Delete students and/or sections from their roster
- Approve tickets submitted by their students
- Create tickets on behalf of their sections (e.g. if a whole class read a book together)
- View the scoreboard for all of their classes

After being approved to join a section, students can:
- Search for books in the "library", which queries Google's Books API and returns the most relevant results
- Check out one of the books returned in the search results, which adds the book to the student's "currently reading" list
- Submit tickets when they finish reading a book. Tickets can be submitted for books that were checked out of the library or for books that are manually entered by the student.
- View the scoreboard, which shows reading stats for all of the sections taught by their teacher

## Technologies used 💾

* MEN Stack
  * MongoDB
  * Express.js
  * Node.js
* EJS
* Bootstrap
* Fly.io
* Git

## Attributions 🤩

* First and foremost, thank you to the teachers in my life who inspired this app and gave invaluable feedback along the way. 
* The app utilizes the Font Awesome Icon Library, which can be found [here](https://fontawesome.com/icons).
* Battle of the Books relies on (Bootstrap v5)[https://getbootstrap.com/docs/5.3/getting-started/introduction/] for basic layout and consistent styling elements, especially buttons, tables, and the navbar.
* The books library queries the (Google Books API)[https://developers.google.com/books/docs/overview] and returns, at most, the top 40 most relevant volumes to the user.

## Ice Box Features ⏭️

- [x] Add a library sourced by Google Books API in addition to manually entered tickets
- [x] Implement the ability to track the books that students are currently reading in addition to finished books tracked through submitted tickets
- [x] Add sound effects for pieces being played.
- [x] Add a mobile-friendly view
- [ ] Add dark mode
- [ ] Implement 'view only' co-teacher functionality
- [ ] Enable profile 'impersonation' for users with admin privileges
- [ ] Add ability to import roster of students from CSV for users with teacher privileges