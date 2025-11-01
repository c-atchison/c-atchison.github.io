const summarySection = document.querySelector(".summary");
const educationSection = document.querySelector(".education");
const softwareSection = document.querySelector(".software-experience");
const employmentSection = document.querySelector(".work-experience");
const contactSection = document.querySelector("#contact");

const homeBtn = document.querySelector("#homeBtn");
const eduBtn = document.querySelector("#eduBtn");
const softBtn = document.querySelector("#softBtn");
const workBtn = document.querySelector("#workBtn");
const contactsBtn = document.querySelector("#contactsBtn");

function displayPanels(btnName) {
   switch(btnName) {
       case 'homeBtn':
            // Back to Top
            document.body.scrollTo({top: 0, behavior: 'smooth'});
            document.documentElement.scrollTo({top: 0, behavior: 'smooth'});
            break;
        case 'eduBtn':
            scrollToTargetAdjusted(educationSection);
            break;
        case 'softBtn':
            scrollToTargetAdjusted(softwareSection);
            break;
        case 'workBtn':
            scrollToTargetAdjusted(employmentSection);
            break;
        default:
            // Back to Top
            document.body.scrollTo({top: 0, behavior: 'smooth'});
            document.documentElement.scrollTo({top: 0, behavior: 'smooth'});
    }
}
function scrollToTargetAdjusted(element){
    var headerOffset = 60;
    var elementPosition = element.offsetTop;
    var offsetPosition = elementPosition - headerOffset;
    document.documentElement.scrollTop = offsetPosition;
    document.body.scrollTop = offsetPosition; // For Safari
}

homeBtn.addEventListener("click",  () => { displayPanels("homeBtn"); }, false);
eduBtn.addEventListener("click",  () => { displayPanels("eduBtn"); }, false);
softBtn.addEventListener("click",  () => { displayPanels("softBtn"); }, false);
workBtn.addEventListener("click",  () => { displayPanels("workBtn"); }, false);