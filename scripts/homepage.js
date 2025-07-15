document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last modified: ${document.lastModified}`;

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector("nav");

  hamburger.addEventListener("click", function () {
      nav.classList.toggle("show-nav");
  });
});



const courses = [
    { name: "WDD 230", credits: 3, completed: true },
    { name: "CSE 121b", credits: 3, completed: false },
    // Add more courses
  ];
  
  const displayCourses = (filter = "all") => {
    const filteredCourses = courses.filter(course => filter === "all" || course.name.startsWith(filter));
    const courseContainer = document.querySelector('#courses');
    courseContainer.innerHTML = filteredCourses.map(course => `
      <div class="course ${course.completed ? 'completed' : ''}">
        <h3>${course.name}</h3>
        <p>Credits: ${course.credits}</p>
      </div>
    `).join('');
    const totalCredits = filteredCourses.reduce((total, course) => total + course.credits, 0);
    document.querySelector('#totalCredits').textContent = `Total Credits: ${totalCredits}`;
  };
  
  document.querySelectorAll('.filter-button').forEach(button => {
    button.addEventListener('click', () => displayCourses(button.dataset.filter));
  });
  
  displayCourses();
  