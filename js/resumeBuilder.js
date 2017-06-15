/* resumeBuilder.js contains data objects and encapsulated functions that create
new DOM elements on the resume website
*/

// Create a "bio" object using Object Literal Notation
var bio = {
    "name": "Benjamin Coate",
    "role": "Web Developer",
    "contacts": {
        "location": "Dayton, OH",
        "email": "bentocode@gmail.com",
        "mobile": "(937) 555-0700",
        "github": "bentocoder",
        "twitter": "bentocoder",
        "blog": "bentocode"
    },
    "bioPic": "images/ben_headshot.jpg",
    "welcomeMessage": "Detail-oriented, technically accomplished information" +
    "technology professional with more than 10 years experience",
    "skills": ["HTML5", "CSS3", "Javascript", "Responsive Web Design",
                "Software Testing", "Technical Documentation"]
};

// Create a "projects" object using Object Literal Notation
var projects = {
    "projects": [{
        "title": "Movie Trailer Website",
        "dates": "April 2017",
        "description": "Python generated website to show movie trailers.",
        "image": "images/movie_trailer_project.jpg",
        "url": "https://github.com/bentocode/Movie-Trailer-Site"
    }, {
        "title": "Personal Portfolio Website",
        "dates": "May 2017",
        "description": "Portfolio Website created with HTML and CSS for" +
        "Udacity Full Stack Developer Nanodegree.",
        "image": "images/portfolio_project.jpg",
        "url": "https://github.com/bentocode/Portfolio-Site"
    }, {
        "title": "Personal Resume Website",
        "dates": "June 2017",
        "description": "Resume Website created with HTML, CSS and Javascript" +
        "for Udacity Front End Developer Nanodegree",
        "image": "images/resume_project.jpg",
        "url": "https://github.com/bentocode/Resume-Site"
    }]
};



// Create a "work" object using Object Literal Notation
var work = {
    "jobs": [{
        "title": "Software Test Lead",
        "employer": "US Oncology",
        "dates": "2007 to 2009",
        "location": "Houston, TX",
        "description": "Responsible for writing and executing test scripts"
    }, {
        "title": "Business Systems Testing Analyst",
        "employer": "El Paso Corporation",
        "dates": "2006 to 2007",
        "location": "Houston, TX",
        "description": "Created business requirements documentation"
    }, {
        "title": "QA Automated Test Lead",
        "employer": "Carreker Corporation",
        "dates": "2003 to 2006",
        "location": "Dallas, TX",
        "description": "Developed and executed test scripts for primary and" +
        "regression testing"
    }, {
        "title": "Quality Assurance Engineer",
        "employer": "Carlson Restaurants Worldwide",
        "dates": "2000 to 2003",
        "location": "Dallas, TX",
        "description": "Created test scripts for testing hardware and 3rd party" +
        "software"
    }, {
        "title": "Software Quality Assurance Tester",
        "employer": "Argus Financial Software",
        "dates": "1998 to 2000",
        "location": "Houston, TX",
        "description": "Executed test scripts for testing of real estate" +
        "analysis software"
    }]
};


// Create an "education" object using Object Literal Notation
var education = {
    "schools": [{
        "name": "University of South Florida",
        "dates": "1991 to 1993",
        "location": "Tampa, FL",
        "degree": "Bachelor of Arts",
        "major": "Liberal Arts"
    }, {
        "name": "Universiy of Paris",
        "dates": "1992",
        "location": "Paris, France",
        "degree": "Certificate d'Etude",
        "major": "French History"
    }],
    "onlineCourses": [{
        "school": "Udacity",
        "date": "April 2017 to October 2017",
        "title": "Front End Developer Nanodegree",
        "url": "https://www.udacity.com"
    }]
};



// Function to display formatted bio info on the page
bio.display = function() {
    // format bio info -except for skills (see for loop below)
    var formattedName = HTMLheaderName.replace("%data%", bio.name);
    var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
    var formattedMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
    var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
    var formattedTwitter = HTMLtwitter.replace("%data%", bio.contacts.twitter);
    var formattedGithub = HTMLgithub.replace("%data%", bio.contacts.github);
    var formattedBlog = HTMLblog.replace("%data%", bio.contacts.blog);
    var formattedLocation = HTMLlocation.replace("%data%", bio.contacts.location);
    var formattedBiophoto = HTMLbioPic.replace("%data%", bio.bioPic);
    var formattedWelcomeMsg = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);
    var formattedEmailIcon = HTMLemailIcon.replace("%data%", bio.contacts.email);
    var formattedTwitterIcon = HTMLtwitterIcon.replace("%data%", bio.contacts.twitter);
    var formattedGithubIcon = HTMLgithubIcon.replace("%data%", bio.contacts.github);
    var formattedBlogIcon = HTMLblogIcon.replace("%data%", bio.contacts.blog);
    // append all bio info to the header section -except for skills (see for loop below)
    $("#header").prepend(formattedName, formattedRole);
    $("#header").append(formattedBiophoto, formattedMobile, formattedEmail,
        formattedTwitter, formattedGithub, formattedBlog, formattedLocation,
        formattedWelcomeMsg);

    // display skills on the page
    $("#header").append(HTMLskillsStart);

    // repeat append for all skills in the array
    bio.skills.forEach(function(skill) {
        var formattedSkill = HTMLskills.replace("%data%", skill);
        $("#skills").append(formattedSkill);
    });

    // append social contact icons to footer
    $("#footerContacts").append(formattedEmailIcon, formattedTwitterIcon,
        formattedGithubIcon, formattedBlogIcon);

};

// Call the function to fill in the page
bio.display();

// Function to display formatted work info on index.html
work.display = function() {
    // create new div for work experience
    $("#workExperience").append(HTMLworkStart);

    // iterate through the jobs array to format and append work history info
    work.jobs.forEach(function(job) {
        // format and concat employer and title
        var formattedEmployer = HTMLworkEmployer.replace("%data%", job.employer);
        var formattedTitle = HTMLworkTitle.replace("%data%", job.title);
        var formattedEmployerTitle = formattedEmployer + formattedTitle;
        var formattedLocation = HTMLworkLocation.replace("%data%", job.location);
        $(".work-entry:last").append(formattedEmployerTitle, formattedLocation);

        // format and append dates to each job
        var formattedDates = HTMLworkDates.replace("%data%", job.dates);
        $(".work-entry:last").append(formattedDates);

        //format and append description to each job
        var formattedDescription = HTMLworkDescription.replace("%data%",
            job.description);
        $(".work-entry:last").append(formattedDescription);
    });

};

// Call the function to fill in the page
work.display();

// Function to display formatted projects info on index.html
projects.display = function() {
    // create new div for projects
    $("#projects").append(HTMLprojectStart);

    // iterate through projects object to format and append project info to page
    projects.projects.forEach(function(project){
        var formattedTitle = HTMLprojectTitle.replace("%data%", project.title);
        var formattedDates = HTMLprojectDates.replace("%data%", project.dates);
        var formattedDescription = HTMLprojectDescription.replace("%data%",
            project.description);
        var formattedImage = HTMLprojectImage.replace("%data%", project.image);

        $(".project-entry:last").append(formattedTitle,formattedDates,
            formattedDescription, formattedImage);
    });

};

projects.display();

// Function to display formatted education info on index.html
education.display = function() {
    // create new div for education
$("#education").append(HTMLschoolStart);

    // iterate through education object to format and append info to page
    // forEach loop to iterate brick and mortar schools
    education.schools.forEach(function(school) {
        var formattedSchool = HTMLschoolName.replace("%data%", school.name);
        var formattedDegree = HTMLschoolDegree.replace("%data%", school.degree);
        var formattedDates = HTMLschoolDates.replace("%data%", school.dates);
        var formattedLocation = HTMLschoolLocation.replace("%data%", school.location);
        var formattedMajor = HTMLschoolMajor.replace("%data%", school.major);

        $(".education-entry:last").append(formattedSchool, formattedDegree,
            formattedDates, formattedLocation, formattedMajor);
    });

    // forEach loop to iterate online classes
    education.onlineCourses.forEach(function(course) {
        var formattedCourse = HTMLonlineTitle.replace("%data%", course.title);
        var formattedOnlineSchool = HTMLonlineSchool.replace("%data%", course.school);
        var formattedOnlineDates = HTMLonlineDates.replace("%data%", course.date);
        var formattedOnlineURL = HTMLonlineURL.replace("%data%", course.url);

        $(".education-entry:last").append(formattedCourse, formattedOnlineSchool,
            formattedOnlineDates, formattedOnlineURL);

    });


};

education.display();

// Display the customized Google Map
  $("#mapDiv").append(googleMap);