# Battle of the Books ([App](https://battle-of-the-books.fly.dev/))

Are you an ELA teacher? Do you need an easy way to keep track of how much your students have read? Do you want to be able to track which of your sections has read the most throughout the year? Welcome to Battle of the Books!!

Inspired by the teachers in my family, I created this site to bring their classroom libraries to life. See the original planning materials, including wireframes and an ERD on Whimsical [here](https://whimsical.com/battle-of-the-books-B2SQhkR1HyKXyGb9ULiZmK).

## How it works 📗

Students create tickets for each of the books they finish. Each ticket contains the book's title, author, and page count, as well as the student's 1-2 sentence review of the book. Teachers are able to review and approve the tickets and, once approved, the ticket counts toward the class' total number of points (1 point per 200 pages read).

## Getting started 🏁

Once an admin user has created a district and at least one school within that district, teachers can begin to sign up, at which point they can:
- Create sections for their students to join
- Admit or deny students who request to join their sections
- View and edit admitted students' profiles
- Delete students and/or sections from their roster
- Approve tickets submitted by their students
- Create tickets for entire sections (e.g. if a class read a book together)
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
* Google Books API

## Attributions 🤩

* First and foremost, thank you to the teachers in my life who inspired this app and gave feedback along the way. 
* Thanks to the easy-to-use Font Awesome Icon Library, which can be found [here](https://fontawesome.com/icons)

## Ice Box Features ⏭️

- [x] Add a library sourced by Google Books API in addition to manually entered tickets
- [x] Implement a minimax algorithm up to three levels of recursion.
- [x] Add sound effects for pieces being played.
- [x] Additional styling to add to the existing Shakespearean theme.
- [x] Help modal with gameplay instructions.
- [ ] Add pseudo-randomness to AI given multiple moves of equivalent value.
- [ ] Add animation to pieces when they are flipped.
- [ ] Add a mobile friendly view.
- [ ] Add a Dark/light mode toggle.