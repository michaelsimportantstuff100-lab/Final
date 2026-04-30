let counts = [0, 0, 0];

const images = [
"https://picsum.photos/400/250?1",
"https://picsum.photos/400/250?2",
"https://picsum.photos/400/250?3"
];

// ---------- BUILD PAGE ----------
function init() {
const gallery = document.getElementById("gallery");

images.forEach((img, index) => {
const card = document.createElement("div");
card.className = "photo";

```
card.innerHTML = `
  <img src="${img}">
  <p>Image ${index + 1}</p>

  <p id="count${index}">Clicks: 0</p>

  <button onclick="addClick(${index})">Click Me</button>
  <button onclick="resetClick(${index})">Reset</button>
`;

gallery.appendChild(card);
```

});
}

// ---------- VARIABLES + DOM UPDATE ----------
function addClick(i) {
counts[i]++;
update(i);
}

function resetClick(i) {
counts[i] = 0;
update(i);
}

function update(i) {
document.getElementById("count" + i).innerText =
"Clicks: " + counts[i];
}

// ---------- “AJAX STYLE” STORAGE ----------
function saveData() {
localStorage.setItem("clickData", JSON.stringify(counts));
alert("Saved!");
}

function loadData() {
const data = JSON.parse(localStorage.getItem("clickData"));

if (!data) return alert("No saved data");

counts = data;

counts.forEach((_, i) => update(i));
}

// ---------- START ----------
init();
