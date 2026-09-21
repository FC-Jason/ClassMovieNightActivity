# Class Movie Night: QA Test Plan

Site under test: https://fc-jason.github.io/ClassMovieNightActivity/qa/

Run the tests in order. For each one, follow the steps, compare what you see
to the expected result, and mark **Pass** or **Fail**. If a test fails, write
down exactly what happened instead. Take a screenshot if you can.

Teacher PIN: **1234**

Before you start: open the site, go to the Teacher tab, and press
**Reset all votes** so you begin with no votes and voting open.

---

## Test 1: Home page and choosing a name

**Steps**
1. Open the site.
2. Read the Home page.
3. Choose **Alex** from the name list.
4. Press **Start reviewing movies**.

**Expected result**
- The title "Class Movie Night" is shown with a short explanation of voting.
- The page clearly shows that voting is open.
- After choosing Alex, a greeting with Alex's name appears.
- Pressing the button opens the Movies tab.

Result: ☐ Pass  ☐ Fail

---

## Test 2: Movie list details

**Steps**
1. On the Movies tab, look at every movie card.

**Expected result**
- Six movies are shown: Galaxy Explorers, The Secret Treehouse, Robo-Dog Returns, Mystery at Moon Lake, The Last Dragon Egg, Champions of Tomorrow.
- Each card shows a title, genre, rating, runtime, description, a picture or placeholder, and a vote button.

Result: ☐ Pass  ☐ Fail

---

## Test 3: Filtering movies by genre

**Steps**
1. On the Movies tab, press each genre filter button one at a time: Science Fiction, Adventure, Comedy, Mystery, Fantasy, Sports.
2. Press **All**.

**Expected result**
- Each genre button shows exactly one movie, the one with that genre.
- **All** shows all six movies again.

Result: ☐ Pass  ☐ Fail

---

## Test 4: My Vote page before voting

**Steps**
1. Make sure Alex is selected and has not voted yet.
2. Open the **My Vote** tab.
3. Press the **Pick a movie** button.

**Expected result**
- The page says Alex has not voted yet.
- Pressing **Pick a movie** opens the Movies tab so a movie can be chosen.

Result: ☐ Pass  ☐ Fail

---

## Test 5: Casting a first vote

**Steps**
1. On the Movies tab, press **Vote for this movie** on Galaxy Explorers.
2. Open the **My Vote** tab.

**Expected result**
- A message confirms the vote, for example "You voted for Galaxy Explorers!"
- The Galaxy Explorers card is marked as your vote.
- The My Vote tab shows Galaxy Explorers as Alex's current choice.

Result: ☐ Pass  ☐ Fail

---

## Test 6: Changing a vote

**Steps**
1. Go back to the Movies tab.
2. Press **Vote for this movie** on The Last Dragon Egg.
3. Open the **My Vote** tab.

**Expected result**
- A message confirms that the vote was **changed**, for example "Your vote was changed to The Last Dragon Egg!"
- Only The Last Dragon Egg is marked as your vote. Galaxy Explorers is no longer marked.
- The My Vote tab shows The Last Dragon Egg.

Result: ☐ Pass  ☐ Fail

---

## Test 7: Results are hidden while voting is open

**Steps**
1. Open the **Results** tab while voting is still open.

**Expected result**
- No vote counts are shown and no winner is shown.
- A message explains that results are hidden until the teacher closes voting.

Result: ☐ Pass  ☐ Fail

---

## Test 8: Teacher vote counts

**Steps**
1. Open the **Teacher** tab and enter the PIN 1234.
2. Look at the "Who has voted?" section.

**Expected result**
- The teacher can see that voting is open.
- It shows **1** student has voted and **5** have not voted. The two numbers add up to 6, the number of students.
- The teacher cannot see which movie Alex picked.

Result: ☐ Pass  ☐ Fail

---

## Test 9: Closing voting

**Steps**
1. On the Teacher tab, press **Close voting**.
2. Look at the top of the page, then open the **Movies** tab and try to vote.
3. Open the **Results** tab.

**Expected result**
- The status at the top changes to "Voting is CLOSED" and turns from green to red.
- The Movies tab explains that voting is closed and the vote buttons cannot be used.
- The Results tab now shows a vote count for all six movies, including the ones with 0 votes, and names The Last Dragon Egg as the winner.

Result: ☐ Pass  ☐ Fail

---

## Test 10: Resetting the vote

**Steps**
1. Open the **Teacher** tab.
2. Press **Reset all votes**.
3. Press **Cancel** on the confirmation. Then press **Reset all votes** again and confirm.
4. Check the Teacher counts, then open the **My Vote** tab.

**Expected result**
- A confirmation box appears before anything is reset. Cancelling changes nothing.
- After confirming, a message says all votes were reset.
- Voting is open again, 0 students have voted, 6 have not voted.
- The My Vote tab shows Alex has not voted yet.
- The student list and movie list are unchanged.

Result: ☐ Pass  ☐ Fail

---

## Summary

| Test | Pass / Fail | Notes |
|------|-------------|-------|
| 1  | | |
| 2  | | |
| 3  | | |
| 4  | | |
| 5  | | |
| 6  | | |
| 7  | | |
| 8  | | |
| 9  | | |
| 10 | | |
