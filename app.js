let ratings = [0, 0, 0];
let votes = [0, 0, 0];

// hardcoded images (NO fetch = no failure point)
const images = [
{ title: "Neon Night", url: "https://picsum.photos/400/250?1" },
{ title: "Mountain View", url: "https://picsum.photos/400/250?2" },
{ title: "City Lights", url: "https://picsum.photos/400/250?3" }
];

// ---------- BUILD PAGE ----------
function init() {
const gallery = document.getElementById("gallery");

images.forEach((img, index) => {
const card = document.createElement("div");
card.className = "photo";

```
card.innerHTML = `
  <img src="${img.url}">
  <p>${img.title}</p>

  <p id="rating${index}">Avg: 0 (Votes: 0)</p>

  <button onclick="rate(${index},1)">1</button>
  <button onclick="rate(${index},2)">2</button>
  <button onclick="rate(${index},3)">3</button>
  <button onclick="rate(${index},4)">4</button>
  <button onclick="rate(${index},5)">5</button>
`;

gallery.appendChild(card);
```

});
}

// ---------- CORE FUNCTIONALITY ----------
function rate(i, score) {
ratings[i] += score;
votes[i]++;
update(i);
}

function update(i) {
const avg = votes[i] === 0 ? 0 : (ratings[i] / votes[i]).toFixed(1);

document.getElementById("rating" + i).innerText =
`Avg: ${avg} (Votes: ${votes[i]})`;
}

// ---------- SAVE / LOAD (safe AJAX substitute) ----------
function saveData() {
localStorage.setItem("ratings", JSON.stringify(ratings));
localStorage.setItem("votes", JSON.stringify(votes));
alert("Saved!");
}

function loadData() {
const r = JSON.parse(localStorage.getItem("ratings"));
const v = JSON.parse(localStorage.getItem("votes"));

if (!r || !v) return alert("No saved data");

ratings = r;
votes = v;

images.forEach((_, i) => update(i));

alert("Loaded!");
}

// ---------- START ----------
init();
