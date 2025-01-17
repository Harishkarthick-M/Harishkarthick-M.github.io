document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      navLinks.forEach(nav => nav.classList.remove('active'));
      this.classList.add('active');
    });
  });
});

// Updated Skill Data with Scores and Level for Problem Solving
const skills = [
  { name: "HTML", score: 4, icon: "fab fa-html5", color: "#e34f26" },
  { name: "CSS", score: 4, icon: "fab fa-css3-alt", color: "#1572b6" },
  { name: "JS", score: 3, icon: "fab fa-js-square", color: "#f7df1e" },
  { name: "Python", score: 3, icon: "fab fa-python", color: "#306998" },
  { name: "MySQL", score: 4, icon: "fas fa-database", color: "#4479a1" },
  { name: "English", score: 4, icon: "fas fa-language", color: "#ff6347" },
  { name: "Life Skills", score: 3.5, icon: "fas fa-user-friends", color: "#32cd32" },
  { name: "Problem Solving", score: null, icon: "fas fa-lightbulb", color: "#ffa500", level: "Level 4" },
];

// Function to dynamically update the chart and legend
function updateChart(data) {
  const maxMarks = 5; // Each skill has a total of 5 marks
  const totalPossibleMarks = maxMarks * (data.length - 1); // Exclude "Problem Solving" from total
  const totalMarks = data.reduce((sum, skill) => (skill.score !== null ? sum + skill.score : sum), 0);
  const totalMark = `${totalMarks}/${totalPossibleMarks}`;
  const average = ((totalMarks / totalPossibleMarks) * 100).toFixed(1);
  const percen = `${average}% `;

  // Update Total Marks and Average Score
  document.getElementById("total-marks").innerText = totalMark;
  document.getElementById("average-score").innerText = percen;

  // Calculate stroke-dasharray for the chart
  const percentage = (totalMarks / totalPossibleMarks) * 100;
  const circle = document.getElementById("skill-chart");
  circle.setAttribute("stroke-dasharray", `${percentage}, 100`);

  // Update Legend
  const legendContainer = document.getElementById("legend");
  legendContainer.innerHTML = ""; // Clear previous legend
  data.forEach(skill => {
    const legendItem = document.createElement("div");
    legendItem.classList.add("legend-item");
    legendItem.innerHTML = `
      <i class="${skill.icon}" style="background-color: ${skill.color};"></i>
      <span>${skill.name}: ${
      skill.score !== null ? `${skill.score} / ${maxMarks}` : `${skill.level}`
    }</span>
    `;
    legendContainer.appendChild(legendItem);
  });
}

// Initialize the chart
updateChart(skills);
