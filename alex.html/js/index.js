portfolioList = [];



function loadImage() {
    var image = document.getElementById("image-header1");

    var spinner = document.getElementById("image-load-spinner");

    setTimeout(function() {


        animateImage(image)



        spinner.style.display = "none";
    }, 1000);
}

function animateImage(image) {


    if (image.style.opacity < 1) {

        setTimeout(function() {



            var imageOpacity = parseFloat(image.style.opacity) + 0.1;



            image.style.opacity = imageOpacity;
            animateImage(image)


        }, 30);
    }


}

function onLoadPortfolio() {


    var xmlHttpRequest = new XMLHttpRequest();


    xmlHttpRequest.open("GET", "../js/data/portfolio.json", false);
    xmlHttpRequest.onreadystatechange = function() {
        if (xmlHttpRequest.readyState === 4) {
            if (xmlHttpRequest.status === 200 || xmlHttpRequest.status == 0) {
                var textContents = xmlHttpRequest.responseText;




                var jsonifiedText = JSON.parse(textContents);



                portfolioList = jsonifiedText['data'];




                for (var portfolio of portfolioList) {


                    var languages = portfolio['languages'];



                    var languageToolTips = "";

                    for (var language of languages) {
                        languageToolTips +=
                            "<span class=\"badge badge-dark language-tool-tip\" >" + language + "</span>"
                    }

                    var portfolioParent = document.getElementById("portfolio-body-div");


                    portfolioParent.innerHTML +=

                        "<div class=\"portfolio-body\">" +

                        "<div class=\"portfolio-body-header\">" +



                        "</div>" +

                        "<div class=\"language-tool-tip-div\">" +

                        languageToolTips +

                        "</div>" +


                        "<div class=\"portfolio-body-description\">" +



                        "<div class=\"portfolio-body-title-div\"><span class=\"portfolio-body-title\">" + portfolio['name'] + "</span></div>" +


                        "<img src=\"images/speech.svg\" id=\"about-me-speech-icon\"  class=\"opac-icons\">" +

                        portfolio['description'] +

                        "</div>" +


                        "<div class=\"portfolio-body-title-div portfolio-button\">" +

                        "<a href='" + portfolio['url'] + "'<button type=\"button\" class=\"btn btn-secondary btn-sm portfolio-button-sm\">View Project</button> </a>" +
                        "</div>" +




                        "</div>";

                }
            }
        }
    }


    xmlHttpRequest.send(null);
}


var toolTipTimeOut, onToolTip;


function showToolTip(id) {


    var tooltip = document.getElementById("custom-tool-tip");


    tooltip.textContent = "Jump to " + id;
    tooltip.style.display = "initial";





}

function hideToolTipMobile() {

    console.log("test");
    var tooltip = document.getElementById("custom-tool-tip");
    // for mobile devices after click once

    if (toolTipTimeOut !== undefined) {
        clearTimeout(toolTipTimeOut);
        toolTipTimeOut = undefined;

        console.log("Cleared tooltip");
    }

    toolTipTimeOut = setTimeout(function() {

        tooltip.style.display = "none";
        //your code to be executed after 1 second
    }, 1000);
}


function hideToolTip() {
    var tooltip = document.getElementById("custom-tool-tip");
    tooltip.style.display = "none";
}


class SectionState {

    constructor(name, offsetHeight) {
        this.name = name;
        this.offsetHeight = offsetHeight;
    }

    activated = false;

}



var sectionStates = []
refreshSection();


function refreshSection() {

    sectionStates = [new SectionState("home", 0), new SectionState("about-me", 100), new SectionState("portfolio", 300)];
}




var pageViewer;

var aboutMeGreet;

var aboutMeGreetText, aboutMeGreetEnabled = false;



function onScrollListener() {


    if (aboutMeGreet === undefined) {
        aboutMeGreet = document.getElementById("about-me-greet");
        aboutMeGreetText = aboutMeGreet.textContent
    }


    if (window.scrollY - document.getElementById("about-me").offsetTop < -500 ||
        window.scrollY - document.getElementById("about-me").offsetTop > 1600) {

        aboutMeGreetEnabled = false;
    } else if (window.scrollY - document.getElementById("about-me").offsetTop > -300 &&
        window.scrollY - document.getElementById("about-me").offsetTop < 300) {





        if (document.getElementById("about-me-greet").textContent === aboutMeGreetText && !aboutMeGreetEnabled) {
            console.log("near");

            var test = buildWord("about-me-greet");
            console.log(test);


        }


    }



    for (var i = 0; i < sectionStates.length; i++) {


        const currentState = sectionStates[i];
        const nextState = sectionStates[i + 1];






        if (currentState.activated)
            continue;

        if (pageViewer === undefined)
            pageViewer = document.getElementById("page-viewer-destination");

        var currentStateElement = document.getElementById(currentState.name);


        //console.log(document.getElementById(nextState.name).offsetTop + " " + window.scrollY);



        if (nextState === undefined ||
            (window.scrollY < document.getElementById(nextState.name).offsetTop - nextState.offsetHeight)) {

            refreshSection();

            currentState.activated = true;


            var title = currentState.name.replace("-", " ");
            var editedTitle = "";


            if (title === "home") {
                pageViewer.parentElement.parentElement.classList.add("hide");

                return;
            }


            for (const word of title.split(" ")) {

                var tempWord = word.slice(0, 1).toUpperCase() + word.slice(1);

                editedTitle += tempWord + " ";


            }



            pageViewer.textContent = editedTitle;
            pageViewer.parentElement.parentElement.classList.remove("hide");
            //console.log(pageViewer.parentElement)

            break;




        }
    }










}

function checkCurrentSectionState(section) {

    if (section) {
        return true;
    }

    return true;
}








window.addEventListener('load', function() {

    window.addEventListener("scroll", onScrollListener);
})

function removeSkeletonLoaders() {
    document.querySelectorAll(".skeleton-loader, .skeleton-loader2").forEach((element) => {

        console.log(element)
        element.classList.remove("skeleton-loader");
        element.classList.remove("skeleton-loader2");

        loadedUp = true;

    });
}

var loadedUp = false;

window.addEventListener("load", (event) => {
    removeSkeletonLoaders();


    buildWord("title-text");




});

setTimeout(function() {

    if (!loadedUp) { // for browsers that dont listen to the load event?
        removeSkeletonLoaders();
    }


}, 5000)


async function buildWord(elementId) {

    var subText = document.getElementById(elementId);
    var subTextDesc = subText.innerHTML.trim();

    console.log(subText.offsetWidth)

    var subTextBold, skipTag = 0;

    subText.textContent = "";

    console.log(subTextDesc);


    for (var i = 0; i < subTextDesc.length; i++) {


        var letter = subTextDesc[i];

        await delayAwait();


        if (letter.startsWith("<")) {
            if (subTextDesc[i + 1] === 'b' && subTextDesc[i + 2] === '>') {


                subTextBold = document.createElement("span");
                subTextBold.classList.add("bold");

                subText.appendChild(subTextBold);

                skipTag = 3; // <b>
            } else if (subTextDesc[i + 1] === '/' && subTextDesc[i + 2] === 'b' && subTextDesc[i + 3] === '>') {
                subTextBold = undefined;

                skipTag = 4; // </b>
            }
        }

        if (skipTag > 0) {
            skipTag--;
            continue;
        }



        if (subTextBold !== undefined) {
            subTextBold.innerHTML += letter;

            continue;
        }

        subText.innerHTML += letter;


    }

    aboutMeGreetEnabled = true;
}

function delayAwait() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("done");

        }, 100);
    });
}