let ratings = [];
let votes = [];
let images = [];

// ---------- LOAD DATA (AJAX) ----------
fetch("data.json")
.then(res => res.json())
.then(data => {
images = data;
initialize();
})
.catch(err => console.error("Error loading JSON:", err));

// ---------- BUILD GALLERY ----------
function initialize() {
const gallery = document.getElementById("gallery");

images.forEach((img, index) => {
ratings[index] = 0;
votes[index] = 0;

```
const div = document.createElement("div");
div.className = "photo";

div.innerHTML = ` <img src="${img.url}" alt="${img.title}">

<p>${img.title}</p>
<p id="rating${index}">Avg: 0 (Votes: 0)</p>

<div class="buttons">
  <button onclick="rateImage(${index},1)">1</button>
  <button onclick="rateImage(${index},2)">2</button>
  <button onclick="rateImage(${index},3)">3</button>
  <button onclick="rateImage(${index},4)">4</button>
  <button onclick="rateImage(${index},5)">5</button>
</div>
`;


gallery.appendChild(div);
```

});
}

// ---------- INTERACTION (DOM + VARIABLES) ----------
function rateImage(index, score) {
ratings[index] += score;
votes[index]++;

updateDisplay(index);
}

function updateDisplay(index) {
const avg = votes[index] === 0 ? 0 : (ratings[index] / votes[index]).toFixed(1);

document.getElementById("rating" + index).innerText =
`Avg: ${avg} (Votes: ${votes[index]})`;
}

// ---------- SAVE (localStorage = pseudo AJAX write) ----------
document.getElementById("saveBtn").addEventListener("click", () => {
const data = { ratings, votes };
localStorage.setItem("photoRatings", JSON.stringify(data));
alert("Ratings saved!");
});

// ---------- LOAD (pseudo AJAX read) ----------
document.getElementById("loadBtn").addEventListener("click", () => {
const saved = JSON.parse(localStorage.getItem("photoRatings"));

if (!saved) {
alert("No saved data found.");
return;
}

ratings = saved.ratings;
votes = saved.votes;

images.forEach((_, index) => updateDisplay(index));

alert("Ratings loaded!");
});
