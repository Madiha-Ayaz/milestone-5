import { jsPDF } from 'jspdf';
interface Resume {
  name: string;
  email: string;
  phone: string;
  location: string | number;
  education: string;
  skills: string;
  experience: string;
}

type InputElement = HTMLInputElement;
type TextAreaElement = HTMLTextAreaElement;

const updateResume = (resume: Resume): void => {
  const resumeOutput = document.getElementById('resumeOutput');
  if (resumeOutput) {
    resumeOutput.innerHTML = `
      <h2>${resume.name}</h2>
      <p><strong>Email:</strong> ${resume.email}</p>
      <p><strong>Phone:</strong> ${resume.phone}</p>
      <p><strong>Location:</strong> ${resume.location}</p>
      <h3>Education</h3>
      <p>${resume.education}</p>
      <h3>Skills</h3>
      <p>${resume.skills}</p>
      <h3>Experience</h3>
      <p>${resume.experience}</p>
    `;
  } else {
    console.error('Resume Output element not found');
  }
};

const downloadResumeAsPDF = (resume: Resume): void => {
  const downloadResumeAsPDF = (resume: Resume): void => {
    const doc = new jsPDF();
  
  doc.text(`Name: ${resume.name}`, 10, 10);
  doc.text(`Email: ${resume.email}`, 10, 20);
  doc.text(`Phone: ${resume.phone}`, 10, 30);
  doc.text(`Location: ${resume.location}`, 10, 40);
  doc.text('Education:', 10, 50);
  doc.text(resume.education, 10, 60);
  doc.text('Skills:', 10, 80);
  doc.text(resume.skills, 10, 90);
  doc.text('Experience:', 10, 110);
  doc.text(resume.experience, 10, 120);
  
  doc.save(`${resume.name}_resume.pdf`);
};

document.getElementById("resume-form")?.addEventListener("submit", function (event) {
  event.preventDefault();

  const nameElement = document.getElementById("name") as InputElement;
  const emailElement = document.getElementById("email") as InputElement;
  const phoneElement = document.getElementById("phone") as InputElement;
  const locationElement = document.getElementById("location") as InputElement;
  const educationElement = document.getElementById("education") as TextAreaElement;
  const skillsElement = document.getElementById("skills") as TextAreaElement;
  const experienceElement = document.getElementById("experience") as TextAreaElement;

  if (!nameElement || !emailElement || !phoneElement || !locationElement || !educationElement || !skillsElement || !experienceElement) {
    console.error('One or more form elements are missing');
    return;
  }

  const username = nameElement.value.toLowerCase().replace(/\s+/g, '-');
  const resumeData: Resume = {
    name: nameElement.value,
    email: emailElement.value,
    phone: phoneElement.value,
    location: locationElement.value,
    education: educationElement.value,
    skills: skillsElement.value,
    experience: experienceElement.value,
  };

  updateResume(resumeData);

  const shareLinkElement = document.getElementById('shareLink');
  const resumeLink = `https://vercel.app/resume/${username}`;
  if (shareLinkElement) {
    shareLinkElement.innerHTML = `
      <p>Share your resume at: <a href="${resumeLink}" target="_blank">${resumeLink}</a></p>
      <button id="downloadBtn">Download as PDF</button>
    `;
  } else {
    console.error('Share Link element not found');
  }

  const downloadBtn = document.getElementById('downloadBtn');
  downloadBtn?.addEventListener('click', () => downloadResumeAsPDF(resumeData));
});
}
const handleResize = (): void => {
  const mobileView = window.matchMedia("(max-width: 600px)");

  if (mobileView.matches) {
    console.log("Switching to mobile view");
    document.body.style.fontSize = "14px";
  } else {
    console.log("Switching to desktop view");
    document.body.style.fontSize = "16px";
  }
};

window.addEventListener("resize", handleResize);
handleResize();
