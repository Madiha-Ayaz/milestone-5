"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jspdf_1 = require("jspdf");
var updateResume = function (resume) {
    var resumeOutput = document.getElementById('resumeOutput');
    if (resumeOutput) {
        resumeOutput.innerHTML = "\n      <h2>".concat(resume.name, "</h2>\n      <p><strong>Email:</strong> ").concat(resume.email, "</p>\n      <p><strong>Phone:</strong> ").concat(resume.phone, "</p>\n      <p><strong>Location:</strong> ").concat(resume.location, "</p>\n      <h3>Education</h3>\n      <p>").concat(resume.education, "</p>\n      <h3>Skills</h3>\n      <p>").concat(resume.skills, "</p>\n      <h3>Experience</h3>\n      <p>").concat(resume.experience, "</p>\n    ");
    }
    else {
        console.error('Resume Output element not found');
    }
};
var downloadResumeAsPDF = function (resume) {
    var _a;
    var downloadResumeAsPDF = function (resume) {
        var doc = new jspdf_1.jsPDF();
        doc.text("Name: ".concat(resume.name), 10, 10);
        doc.text("Email: ".concat(resume.email), 10, 20);
        doc.text("Phone: ".concat(resume.phone), 10, 30);
        doc.text("Location: ".concat(resume.location), 10, 40);
        doc.text('Education:', 10, 50);
        doc.text(resume.education, 10, 60);
        doc.text('Skills:', 10, 80);
        doc.text(resume.skills, 10, 90);
        doc.text('Experience:', 10, 110);
        doc.text(resume.experience, 10, 120);
        doc.save("".concat(resume.name, "_resume.pdf"));
    };
    (_a = document.getElementById("resume-form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (event) {
        event.preventDefault();
        var nameElement = document.getElementById("name");
        var emailElement = document.getElementById("email");
        var phoneElement = document.getElementById("phone");
        var locationElement = document.getElementById("location");
        var educationElement = document.getElementById("education");
        var skillsElement = document.getElementById("skills");
        var experienceElement = document.getElementById("experience");
        if (!nameElement || !emailElement || !phoneElement || !locationElement || !educationElement || !skillsElement || !experienceElement) {
            console.error('One or more form elements are missing');
            return;
        }
        var username = nameElement.value.toLowerCase().replace(/\s+/g, '-');
        var resumeData = {
            name: nameElement.value,
            email: emailElement.value,
            phone: phoneElement.value,
            location: locationElement.value,
            education: educationElement.value,
            skills: skillsElement.value,
            experience: experienceElement.value,
        };
        updateResume(resumeData);
        var shareLinkElement = document.getElementById('shareLink');
        var resumeLink = "https://vercel.app/resume/".concat(username);
        if (shareLinkElement) {
            shareLinkElement.innerHTML = "\n      <p>Share your resume at: <a href=\"".concat(resumeLink, "\" target=\"_blank\">").concat(resumeLink, "</a></p>\n      <button id=\"downloadBtn\">Download as PDF</button>\n    ");
        }
        else {
            console.error('Share Link element not found');
        }
        var downloadBtn = document.getElementById('downloadBtn');
        downloadBtn === null || downloadBtn === void 0 ? void 0 : downloadBtn.addEventListener('click', function () { return downloadResumeAsPDF(resumeData); });
    });
};
var handleResize = function () {
    var mobileView = window.matchMedia("(max-width: 600px)");
    if (mobileView.matches) {
        console.log("Switching to mobile view");
        document.body.style.fontSize = "14px";
    }
    else {
        console.log("Switching to desktop view");
        document.body.style.fontSize = "16px";
    }
};
window.addEventListener("resize", handleResize);
handleResize();
