/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
var navbar = document.getElementById("navbar__list"), // navigation container
    main = document.getElementsByTagName("main")[0], // sections container
    menueItems = document.querySelectorAll('navbar__list li'), // items of navigation list
    sections = document.querySelectorAll('section'), // sections show data
    topButton = document.getElementById('top-button'), // button to go up
    fragement = document.createDocumentFragment();
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// main  function to build html of page and set our data
(function () {
    for(var i of sections) { // looping on page data     
        // build the nav
        var navItemTxt = i.getAttribute('data-nav'); // get text from data nav attribute
        var item = document.createElement("li"); // creat new item  
        item.innerHTML = `<a>${navItemTxt}</a>`;
        fragement.appendChild(item);
    }
    navbar.appendChild(fragement); //  add item to nav items
})()


window.addEventListener("scroll", () => {

    // check if scroll at end of page to show Top Button 
    if((window.scrollY + window.innerHeight ) > (document.body.offsetHeight)) {
        topButton.style.bottom = "25px";
    } else {
        topButton.style.bottom = "-100px";
    }

    sections.forEach((secElement, i) => {
        var secDim = secElement.getBoundingClientRect();
        
        if(secDim.top > -(secDim.height /2) && secDim.top < (window.innerHeight/2) ) {
            var secNav = secElement.getAttribute('data-nav'); 

            setActive(secElement, 'your-active-class');

            var navLinks = document.querySelectorAll('a');
            navLinks.forEach(lastNavActive => {
                if(lastNavActive.innerText == secNav) {
                    setActive(lastNavActive.parentElement, 'active');
                }
            })
        } 
    });
    
    // check if scroll at start of page
    if(document.getElementsByClassName('your-active-class').length != 0 
    && window.scrollY + 100 < sections[0].offsetTop){
        document.getElementsByClassName('your-active-class')[0].classList.remove('your-active-class');
        document.getElementsByClassName('active')[0].classList.remove('active');
    }
})

/**
 * End Main Functions
 * Begin Events
 * 
*/

// add function on Button to go up  
topButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


// Scroll to section on click 
function navItemClick(e) {
    var navItemLink = e.target;
    // check if item clicked is A link
    if (navItemLink.nodeName === 'A') {  
        e.preventDefault();
        sections.forEach(secEl => {
            if(secEl.getAttribute('data-nav') == navItemLink.innerText) {
                window.scrollTo({
                    top: secEl.offsetTop,
                    behavior: 'smooth'
                });
            }
        })
    }
}
document.body.addEventListener('click', navItemClick);


function setActive(el, className) {
    if(document.getElementsByClassName(className).length == 1) {
        document.getElementsByClassName(className)[0].classList.remove(className);
        el.classList.add(className);
    } else {
        el.classList.add(className);
    }
}

