//object for the particle.js information
var particles = {
    particles: {
        number: {
            value: 100,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#ffffff"
        },
        shape: {
            type: "triangle",
            stroke: {
                width: 0,
                color: "#000000"
            },
            polygon: {
                nb_sides: 5
            },
            image: {
                src: "img/github.svg",
                width: 100,
                height: 100
            }
        },
        opacity: {
            value: 0.62,
            random: false,
            anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 2,
            random: true,
            anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 160,
            color: "#86c232",
            opacity: 0.9,
            width: 1
        },
        move: {
            enable: true,
            speed: 4,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "grab"
            },
            onclick: {
                enable: true,
                mode: "push"
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 250,
                line_linked: {
                    opacity: 1
                }
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
            },
            repulse: {
                distance: 200,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            },
            remove: {
                particles_nb: 2
            }
        }
    },
    retina_detect: true
};

//parseing the object to correct format to be called by the particlesJS library
var jsonUri = "data:text/plain;base64," + window.btoa(JSON.stringify(particles));

//loading the particle animation
particlesJS.load("particles-js", jsonUri, function() {
    console.log("callback - particles.js config loaded");
});

//global variable to fin the top position of the nav bar
var navPos = $(".nav").position().top;

//add scroll event handlers here
//fixed navbar when passed the jumbotron
//highlights nav links when in relevant section
$(window).on("scroll", function() {
    var here = $(window).scrollTop();
    var header = here + 50;
    if (here > navPos + 53 && !$(".nav").hasClass("fixed")) {
        $(".nav").toggleClass("fixed");
    } else if (here < navPos && $(".nav").hasClass("fixed")) {
        $(".nav").toggleClass("fixed");
    }

    if (header > $("#jumbotron").offset().top){ highlight("#jumbotron")};
    if (header > $("#about").offset().top){ highlight("#about")};
    if (header > $("#portfolio").offset().top){ highlight("#portfolio")};
    if (header > $("#contact").offset().top){ highlight("#contact")};


});

//function to highlight the links
function highlight(id){
    $(".nav-links a").removeClass('highlight')
    $(".nav-links").find('[data-dest="' + id + '"]').addClass("highlight");
}

//options for our IntersectionObserver
var options = {
    rootmargin: "20px",
    threshold: 1.0
};

//callback function for our intersection observer that applys animations to divs
//when they are 100% in the viewport
var callback = function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            var animate = entry.target.dataset.animation;
            var delay = entry.target.dataset.delay;
            entry.target.style.animation = animate +" 0.75s ease"

            if(delay){
                entry.target.style.animationDelay = delay;
            }

            entry.target.style.animationFillMode = "forwards"
        }
    });
};

var observer = new IntersectionObserver(callback, options);

var targets = document.querySelectorAll(".intersect");

targets.forEach(function(target) {
    observer.observe(target);
});

//click event for the menu icon to toggle the nav links
$(".menu-icon").on("click", function(){
    $(".nav-links").toggleClass("toggle-menu");
})

//when link is clicked, closes the menu and highlights the relevant section
//scroll animation to smoothly transition to the relevant section
$(".link").on("click", function(event){
    event.preventDefault();
    var link = $(this).attr("data-dest");
    $(".nav-links").removeClass("toggle-menu")
    $(".nav-links").find('[dest="' + link + '"]').addClass('highlight');
    $(".nav-links a").not($(this)).removeClass("highlight");

    $("html, body").animate({
        scrollTop: $(link).offset().top - 25
    }, 500);
});

//required delays for portolio image animations
var delays = {
    small: ["0s", "0s", "0s", "0s", "0s", "0s"],
    medium: ["0s", "0.3s", "0s", "0.3s", "0s", "0.3s"],
    large: ["0s", "0.3s", "0.6s", "0s", "0.3s", "0.6s"],
}

//function to determine what animation delay the image needs 
//based on the screen size
function setDelays(){

    var width = $(window).width();
    var delay;
    if(width > 1200) {
        delay = delays.large;
    } else if (width > 816 && width <= 1200) {
        delay = delays.medium;
    } else {
        delay = delays.small;
    }

    console.log(delay);
    
    var images = $(".task");
    images.each(function(index){
        $(this).attr("data-delay", delay[index])
    })
    
}

//event that handles animation delays of the portfolio images
//if the window happens to be resized before they are activated
$(window).on('resize', debounce(function(){
    
    setDelays();

}, 250));

//generic debounce function so resize isnt called 10000000x
function debounce(func, wait, immediate) {
    var timeout;
  
    // This is the function that is actually executed when
    // the DOM event is triggered.
    return function executedFunction() {
      // Store the context of this and any
      // parameters passed to executedFunction
      var context = this;
      var args = arguments;
          
      // The function to be called after 
      // the debounce time has elapsed
      var later = function() {
        // null timeout to indicate the debounce ended
        timeout = null;
          
        // Call function now if you did not on the leading end
        if (!immediate) func.apply(context, args);
      };
  
      // Determine if you should call the function
      // on the leading or trail end
      var callNow = immediate && !timeout;
      
      // This will reset the waiting every function execution.
      // This is the step that prevents the function from
      // being executed because it will never reach the 
      // inside of the previous setTimeout  
      clearTimeout(timeout);
      
      // Restart the debounce waiting period.
      // setTimeout returns a truthy value (it differs in web vs node)
      timeout = setTimeout(later, wait);
      
      // Call immediately if you're dong a leading
      // end execution
      if (callNow) func.apply(context, args);
    };
  };


$(".task").hover(function(){
    $(this).children("img").addClass("fade");
    $(this).children(".section-header").addClass("move-in");
    $(this).children("a").addClass("move-down");
}, function(){
    $(this).children().removeClass('fade');
    $(this).children().removeClass('move-in');
    $(this).children().removeClass("move-down");
})

$(document).ready(function(){
    setDelays();
});



