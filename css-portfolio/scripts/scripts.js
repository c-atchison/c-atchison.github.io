const educationSection = document.querySelector(".education");
const softwareSection = document.querySelector(".software-experience");
const employmentSection = document.querySelector(".work-experience");
const projectsSection = document.querySelector(".projects");
const contactSection = document.querySelector("#contact");

const homeBtn = document.querySelector("#homeBtn");
const eduBtn = document.querySelector("#eduBtn");
const softBtn = document.querySelector("#softBtn");
const workBtn = document.querySelector("#workBtn");
const projBtn = document.querySelector("#projBtn");
const contactsBtn = document.querySelector("#contactsBtn");

function displayPanels(btnName) {
   switch(btnName) {
       case 'homeBtn':
            // if home is clicked, open all sections
            educationSection.classList.add("active");
            softwareSection.classList.add("active");
            employmentSection.classList.add("active");
            projectsSection.classList.add("active");

            // and display the corresponding panel
            educationSection.style.display = "block";
            softwareSection.style.display = "block";
            employmentSection.style.display = "block";
            projectsSection.style.display = "block";
            break;
        case 'eduBtn':
            // display edu section
            educationSection.classList.add("active");
            educationSection.style.display = "block";
            
            // remove all other sections
            softwareSection.classList.remove("active");
            employmentSection.classList.remove("active");
            projectsSection.classList.remove("active");
            
            softwareSection.style.display = "none";
            employmentSection.style.display = "none";
            projectsSection.style.display = "none";
            break;
        case 'softBtn':
            // display software section
            softwareSection.classList.add("active");
            softwareSection.style.display = "block";
            
            // remove all other sections
            educationSection.classList.remove("active");
            employmentSection.classList.remove("active");
            projectsSection.classList.remove("active");
            
            educationSection.style.display = "none";
            employmentSection.style.display = "none";
            projectsSection.style.display = "none";
            break;
        case 'workBtn':
            // display employment section
            employmentSection.classList.add("active");
            employmentSection.style.display = "block";

            // remove all other sections
            educationSection.classList.remove("active");
            softwareSection.classList.remove("active");
            projectsSection.classList.remove("active");
            
            educationSection.style.display = "none";
            softwareSection.style.display = "none";
            projectsSection.style.display = "none";
            break;
        case 'projBtn':
            // display projects section
            projectsSection.classList.add("active");
            projectsSection.style.display = "block";

            // remove all other sections
            educationSection.classList.remove("active");
            softwareSection.classList.remove("active");
            employmentSection.classList.remove("active");
            
            educationSection.style.display = "none";
            softwareSection.style.display = "none";
            employmentSection.style.display = "none";
            break;
        default:
            // same behavior as homeBtn
            educationSection.classList.add("active");
            softwareSection.classList.add("active");
            employmentSection.classList.add("active");
            projectsSection.classList.add("active");

            // and display the corresponding panel
            educationSection.style.display = "block";
            softwareSection.style.display = "block";
            employmentSection.style.display = "block";
            projectsSection.style.display = "block";
    }
}

homeBtn.addEventListener("click",  () => { displayPanels("homeBtn"); }, false);
eduBtn.addEventListener("click",  () => { displayPanels("eduBtn"); }, false);
softBtn.addEventListener("click",  () => { displayPanels("softBtn"); }, false);
workBtn.addEventListener("click",  () => { displayPanels("workBtn"); }, false);
projBtn.addEventListener("click",  () => { displayPanels("projBtn"); }, false);