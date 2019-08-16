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

var jsonUri = "data:text/plain;base64," + window.btoa(JSON.stringify(particles));

particlesJS.load("particles-js", jsonUri, function() {
    console.log("callback - particles.js config loaded");
});

var navPos = $(".nav").position().top;

$(window).on("scroll", function() {
    var here = $(window).scrollTop();

    if (here > navPos + 53 && !$(".nav").hasClass("fixed")) {
        $(".nav").toggleClass("fixed");
    } else if (here < navPos && $(".nav").hasClass("fixed")) {
        $(".nav").toggleClass("fixed");
    }
});

var options = {
    rootmargin: "20px",
    threshold: 1.0
};

var callback = function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            var animate = entry.target.dataset.animation;
            var delay = entry.target.dataset.delay;
            console.log(delay);
            console.log(animate);
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
