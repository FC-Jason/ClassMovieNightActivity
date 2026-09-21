// ===== Data =====
const STUDENTS = ["Alex", "Bailey", "Cameron", "Jordan", "Morgan", "Riley"];

const MOVIES = [
  { id: "galaxy",   title: "Galaxy Explorers",      genre: "Science Fiction", rating: "PG", runtime: 105, emoji: "🚀", color: "#4a6cf7",
    description: "A group of young explorers travels across the galaxy to find a missing research ship." },
  { id: "treehouse", title: "The Secret Treehouse",  genre: "Adventure",       rating: "PG", runtime: 92,  emoji: "🌳", color: "#2fa36b",
    description: "Three friends discover that their treehouse contains a doorway to another world." },
  { id: "robodog",  title: "Robo-Dog Returns",      genre: "Comedy",          rating: "G",  runtime: 88,  emoji: "🤖", color: "#f2994a",
    description: "A helpful robotic dog creates chaos while trying to save its neighborhood." },
  { id: "moonlake", title: "Mystery at Moon Lake",  genre: "Mystery",         rating: "PG", runtime: 101, emoji: "🔦", color: "#5b4b8a",
    description: "Young detectives investigate strange lights appearing over a summer camp lake." },
  { id: "dragon",   title: "The Last Dragon Egg",   genre: "Fantasy",         rating: "PG", runtime: 115, emoji: "🐉", color: "#c0392b",
    description: "A young apprentice must protect the last dragon egg from a mysterious collector." },
  { id: "champions", title: "Champions of Tomorrow", genre: "Sports",          rating: "PG", runtime: 97,  emoji: "🏆", color: "#e0a800",
    description: "An inexperienced school team learns to work together before a championship game." },
];

const GENRES = ["All", ...MOVIES.map(m => m.genre === "Adventure" ? "Adventure " : m.genre)];

// ===== State =====
const STORAGE_KEY = "movieNightStateQA";
const STUDENT_KEY = "currentStudentQA";
const TEACHER_PIN = "1234";

let state = loadState();
let currentStudent = sessionStorage.getItem(STUDENT_KEY) || "";
let currentGenre = "All";

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && typeof saved.votingOpen === "boolean" && saved.votes) return saved;
  } catch (e) { /* ignore bad data */ }
  return { votingOpen: true, votes: {} };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function movieById(id) {
  return MOVIES.find(m => m.id === id);
}

// ===== Helpers =====
const $ = id => document.getElementById(id);

let toastTimer;
function showToast(message, type = "") {
  const toast = $("toast");
  toast.textContent = message;
  toast.className = "toast show " + type;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.className = "toast"; }, 3500);
}

function showSection(name) {
  document.querySelectorAll(".section").forEach(s => s.classList.toggle("active", s.id === name));
  document.querySelectorAll(".tab").forEach(t => t.classList.toggle("active", t.dataset.section === name));
  window.scrollTo({ top: 0 });
}

function tally() {
  const counts = {};
  MOVIES.forEach(m => counts[m.id] = 0);
  Object.values(state.votes).forEach(id => { if (counts[id] !== undefined) counts[id]++; });
  return counts;
}

// ===== Actions =====
function vote(movieId) {
  if (!currentStudent) {
    showToast("Please choose your name on the Home page first.", "error");
    showSection("home");
    return;
  }
  if (!state.votingOpen) {
    showToast("Sorry, voting is closed. You can't vote right now.", "error");
    return;
  }
  const movie = movieById(movieId);
  const previous = state.votes[currentStudent];
  if (previous === movieId) {
    showToast(`You already voted for ${movie.title}!`);
    return;
  }
  state.votes[currentStudent] = movieId;
  saveState();
  render();
  showToast(`You voted for ${movie.title}!`, "success");
}

function setVotingOpen(open) {
  state.votingOpen = open;
  saveState();
  render();
  showToast(open ? "Voting is now open!" : "Voting is now closed.", open ? "success" : "error");
}

function resetVotes() {
  const ok = confirm("Reset all votes? Every student's vote will be removed and voting will open again.");
  if (!ok) return;
  state = { votingOpen: true, votes: {} };
  saveState();
  render();
  showToast("All votes have been reset. Voting is open!", "success");
}

// ===== Rendering =====
function render() {
  document.body.className = state.votingOpen ? "voting-open" : "voting-closed";
  $("status-pill").textContent = state.votingOpen ? "Voting is OPEN" : "Voting is CLOSED";
  renderHome();
  renderMovies();
  renderMyVote();
  renderResults();
  renderTeacher();
}

function renderHome() {
  $("home-status").textContent = state.votingOpen
    ? "✅ Voting is open! Pick your name and choose a movie."
    : "🛑 Voting is closed. You can look at the results, but you can't vote right now.";
  $("student-select").value = currentStudent;
  $("greeting").textContent = currentStudent ? `Hi, ${currentStudent}! 👋` : "";
}

function renderGenreFilters() {
  const wrap = $("genre-filters");
  wrap.innerHTML = "";
  GENRES.forEach(g => {
    const b = document.createElement("button");
    b.className = "filter-btn" + (g === currentGenre ? " active" : "");
    b.textContent = g;
    b.addEventListener("click", () => { currentGenre = g; renderMovies(); });
    wrap.appendChild(b);
  });
}

function renderMovies() {
  renderGenreFilters();
  const banner = $("movies-banner");
  if (!state.votingOpen) {
    banner.textContent = "🛑 Voting is closed. Voting is no longer available.";
  } else if (!currentStudent) {
    banner.textContent = "👋 Choose your name on the Home page before you vote.";
  } else {
    banner.textContent = `You are voting as ${currentStudent}. You can change your vote any time while voting is open.`;
  }

  const myVote = currentStudent ? state.votes[currentStudent] : null;
  const grid = $("movie-grid");
  grid.innerHTML = "";
  MOVIES.filter(m => currentGenre === "All" || m.genre === currentGenre).forEach(m => {
    const chosen = myVote === m.id;
    const card = document.createElement("article");
    card.className = "movie-card" + (chosen ? " chosen" : "");
    card.innerHTML = `
      <div class="poster" style="background:${m.color}">
        <span>${m.emoji}</span>
        ${chosen ? '<span class="badge">⭐ Your vote</span>' : ""}
      </div>
      <div class="movie-body">
        <h3 class="movie-title">${m.title}</h3>
        <div class="movie-meta">
          <span class="chip">${m.genre}</span>
          <span class="chip">Rated ${m.rating}</span>
          <span class="chip">${m.runtime} min</span>
        </div>
        <p class="movie-desc">${m.description}</p>
        <button class="btn ${chosen ? "btn-voted" : ""}" ${state.votingOpen ? "" : "disabled"}>
          ${chosen ? "Voted ✓" : "Vote for this movie"}
        </button>
      </div>`;
    card.querySelector("button").addEventListener("click", () => vote(m.id));
    grid.appendChild(card);
  });
}

function renderMyVote() {
  const box = $("myvote-content");
  if (!currentStudent) {
    box.innerHTML = `<div class="card"><p>👋 You haven't chosen your name yet.</p>
      <button class="btn" onclick="showSection('home')">Go to Home</button></div>`;
    return;
  }
  const id = state.votes[currentStudent];
  if (!id) {
    box.innerHTML = `<div class="card"><p><strong>${currentStudent}</strong>, you haven't voted yet.</p>
      ${state.votingOpen
        ? `<button class="btn" onclick="showSection('results')">Pick a movie</button>`
        : `<p class="empty-note">Voting is closed, so you can't vote right now.</p>`}
    </div>`;
    return;
  }
  const m = movieById(id);
  box.innerHTML = `<div class="card">
      <p><strong>${currentStudent}</strong>, your current vote is:</p>
      <div class="movie-card chosen" style="max-width:340px">
        <div class="poster" style="background:${m.color}"><span>${m.emoji}</span><span class="badge">⭐ Your vote</span></div>
        <div class="movie-body">
          <h3 class="movie-title">${m.title}</h3>
          <div class="movie-meta"><span class="chip">${m.genre}</span><span class="chip">Rated ${m.rating}</span><span class="chip">${m.runtime} min</span></div>
        </div>
      </div>
      ${state.votingOpen
        ? `<p class="hint">Changed your mind? <button class="btn" onclick="showSection('movies')">Change my vote</button></p>`
        : `<p class="hint">Voting is closed, so your vote can't be changed.</p>`}
    </div>`;
}

function resultsHTML() {
  const counts = tally();
  const total = Object.keys(state.votes).length;
  if (total === 0) {
    return `<p class="empty-note">No students have voted yet.</p>`;
  }
  const max = Math.max(...Object.values(counts));
  const leaders = MOVIES.filter(m => counts[m.id] === max);
  let banner;
  if (leaders.length > 1) {
    banner = `<div class="winner-banner tie">🤝 It's a tie between ${leaders.map(m => m.title).join(" and ")}! The teacher will decide what happens next.</div>`;
  } else {
    banner = `<div class="winner-banner">🏆 The winner is ${leaders[0].title}!</div>`;
  }
  const rows = [...MOVIES].sort((a, b) => counts[b.id] - counts[a.id]).map(m => {
    const c = counts[m.id];
    const pct = max ? (c / max) * 100 : 0;
    return `<li class="result-row ${c === max ? "top" : ""}">
      <span class="result-emoji">${m.emoji}</span>
      <span class="result-name">${m.title}</span>
      <div class="result-bar-wrap"><div class="result-bar" style="width:${pct}%"></div></div>
      <span class="result-count">${c} vote${c === 1 ? "" : "s"}</span>
    </li>`;
  }).join("");
  return banner + `<ul class="result-list">${rows}</ul>`;
}

function renderResults() {
  const box = $("results-content");
  if (state.votingOpen) {
    box.innerHTML = `<div class="card"><p>🔒 Results are a secret until the teacher closes voting. Check back later!</p></div>`;
  } else {
    box.innerHTML = resultsHTML();
  }
}

function renderTeacher() {
  const voted = Object.keys(state.votes).length;
  $("teacher-status").textContent = state.votingOpen ? "OPEN" : "CLOSED";
  $("open-btn").disabled = state.votingOpen;
  $("close-btn").disabled = !state.votingOpen;
  $("voted-count").textContent = voted;
  $("not-voted-count").textContent = STUDENTS.length - voted + 1;
  $("teacher-results").innerHTML = state.votingOpen
    ? `<p class="empty-note">Close voting to see the final results.</p>`
    : resultsHTML();
}

// ===== Teacher PIN popup =====
const pinModal = $("pin-modal");
const pinBoxes = [...document.querySelectorAll(".pin-box")];

function openPinModal() {
  pinBoxes.forEach(b => { b.value = ""; b.classList.remove("filled"); });
  $("pin-error").textContent = "";
  pinModal.hidden = false;
  pinBoxes[0].focus();
}

function closePinModal() {
  pinModal.hidden = true;
}

function checkPin() {
  const entered = pinBoxes.map(b => b.value).join("");
  if (entered.length < 4) {
    $("pin-error").textContent = "Please enter all 4 digits.";
    pinBoxes.find(b => !b.value).focus();
    return;
  }
  if (entered === TEACHER_PIN) {
    closePinModal();
    showSection("teacher");
    showToast("Welcome, teacher!", "success");
  } else {
    $("pin-error").textContent = "Wrong PIN. Try again.";
    const card = pinModal.querySelector(".modal-card");
    card.classList.remove("shake");
    void card.offsetWidth; // restart animation
    card.classList.add("shake");
    pinBoxes.forEach(b => { b.value = ""; b.classList.remove("filled"); });
    pinBoxes[0].focus();
  }
}

function setupPinBoxes() {
  pinBoxes.forEach((box, i) => {
    box.addEventListener("input", () => {
      box.value = box.value.replace(/\D/g, "").slice(-1);
      box.classList.toggle("filled", box.value !== "");
      $("pin-error").textContent = "";
      if (box.value && i < pinBoxes.length - 1) pinBoxes[i + 1].focus();
      if (box.value && i === pinBoxes.length - 1) checkPin();
    });
    box.addEventListener("keydown", e => {
      if (e.key === "Backspace" && !box.value && i > 0) {
        pinBoxes[i - 1].value = "";
        pinBoxes[i - 1].classList.remove("filled");
        pinBoxes[i - 1].focus();
      } else if (e.key === "Enter") {
        checkPin();
      } else if (e.key === "Escape") {
        closePinModal();
      }
    });
    box.addEventListener("paste", e => {
      e.preventDefault();
      const digits = (e.clipboardData.getData("text") || "").replace(/\D/g, "").slice(0, 4);
      digits.split("").forEach((d, j) => { pinBoxes[j].value = d; pinBoxes[j].classList.add("filled"); });
      if (digits.length === 4) checkPin(); else pinBoxes[Math.min(digits.length, 3)].focus();
    });
  });
  pinModal.addEventListener("click", e => { if (e.target === pinModal) closePinModal(); });
}

// ===== Setup =====
function init() {
  const select = $("student-select");
  STUDENTS.forEach(name => {
    const opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    select.appendChild(opt);
  });
  select.addEventListener("change", () => {
    currentStudent = select.value;
    sessionStorage.setItem(STUDENT_KEY, currentStudent);
    render();
    if (currentStudent) showToast(`Hi, ${currentStudent}!`);
  });

  $("start-btn").addEventListener("click", () => {
    if (!currentStudent) {
      showToast("Please choose your name first.", "error");
      select.focus();
      return;
    }
    showSection("movies");
  });

  document.querySelectorAll(".tab").forEach(t =>
    t.addEventListener("click", () => {
      if (t.dataset.section === "teacher") {
        openPinModal();
        return;
      }
      showSection(t.dataset.section);
    }));

  $("open-btn").addEventListener("click", () => setVotingOpen(true));
  $("close-btn").addEventListener("click", () => setVotingOpen(false));
  $("reset-btn").addEventListener("click", resetVotes);
  setupPinBoxes();

  render();
}

init();
