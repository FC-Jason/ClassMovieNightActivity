# QA Practice Site: Answer Key

The site in this folder is a copy of the Class Movie Night voting website with
**five intentional bugs**. Testers should use the site like a student and a
teacher would and write down anything that seems wrong.

Live site: https://fc-jason.github.io/ClassMovieNightActivity/qa/
Working version for comparison: https://fc-jason.github.io/ClassMovieNightActivity/

Teacher PIN: **1234**

## The bugs

| # | Where | What a tester sees | Cause |
|---|-------|--------------------|-------|
| 1 | Movies tab, genre filter | Clicking **Adventure** shows no movies, even though *The Secret Treehouse* is an Adventure movie. Every other genre works. | `app.js` line 19: the Adventure filter button has a trailing space in its value, so it never matches the movie's genre. |
| 2 | My Vote tab, before voting | The **Pick a movie** button opens the Results tab instead of the Movies tab. | `app.js` line 192: the button calls `showSection('results')` instead of `showSection('movies')`. |
| 3 | Header, after closing voting | The pill says "Voting is CLOSED" and the page turns red, but the pill itself **stays green**. | `styles.css`: the `body.voting-closed .status-pill` rule that turns the pill red was removed. |
| 4 | Teacher tab, "Who has voted?" | The **have not voted** number is one too high. With 1 vote cast it shows 1 voted and 6 not voted, which adds up to 7 students instead of 6. | `app.js` line 255: the count is `STUDENTS.length - voted + 1`. |
| 5 | Movies tab, changing a vote | Changing your vote shows "You voted for X!" The spec says a **changed** vote must show a different confirmation, such as "Your vote was changed to X!" | `app.js` line 91: the check for a previous vote was removed and both cases show the same message. |

## What still works

Testers can still choose a name, vote, change a vote, view results after
voting closes, open the Teacher tab with the PIN, open and close voting, and
reset all votes. None of the bugs block the main flow.

## How to repeat a test from scratch

Each browser keeps its own copy of the votes. To start over, use the Teacher
tab's **Reset all votes** button, or open the site in a private window.
