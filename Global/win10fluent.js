var cls = 'main';
debugMode = false;

var originalBG = "transparent",
    x, y, xy, bgWebKit, bgMoz,
    lightColour = "rgba(187,187,187,0.75)",
    darkLightColour = "rgba(68,68,68,0.75)",
    altLightColour = "rgba(0,103,184,0.75)",
    gradientSize = 100;

document.documentElement.onmousemove = function(e) {
    //mouseLeaveTimer = 0;
    var self = this;
    document.querySelectorAll('.buttonReveal').forEach(function(el, id) {
        x = e.clientX - self.offsetLeft - el.offsetLeft;
        y = e.clientY - self.offsetTop - el.offsetTop;
        xy = x + " " + y;
        
        if (debugMode) {
        console.log(xy);
        console.log(x);

        console.log("e.clientX: " + e.clientX);
        console.log("e.clientY: " + e.clientY);
        console.log("self.offsetLeft: " + self.offsetLeft);
        console.log("self.offsetTop: " + self.offsetTop);
        console.log("this.offsetLeft: " + el.offsetLeft);
        console.log("this.offsetTop: " + el.offsetTop);
        }

        bgWebKit = "-webkit-gradient(radial, " + xy + ", 0, " + xy + ", " + gradientSize + ", from(" + altLightColour + "), to(rgba(255,255,255,0.0))), " + originalBG;
        //bgMoz    = "-moz-radial-gradient(" + x + "px " + y + "px 45deg, circle, " + altLightColour + " 0%, " + originalBG + " " + gradientSize + "px)";

        el.style.background = bgWebKit;

        if (debugMode) {
            console.log(bgWebKit);
            console.log(e);
            console.log(self);
        }
    })
    document.querySelectorAll('header.intro div nav div.buttonRevealLight').forEach(function(el, id) {
        x = e.clientX - self.offsetLeft - el.offsetLeft;
        y = e.clientY - self.offsetTop - el.offsetTop;
        xy = x + " " + y;
        
        if (debugMode) {
        console.log(xy);
        console.log(x);

        console.log("e.clientX: " + e.clientX);
        console.log("e.clientY: " + e.clientY);
        console.log("self.offsetLeft: " + self.offsetLeft);
        console.log("self.offsetTop: " + self.offsetTop);
        console.log("this.offsetLeft: " + el.offsetLeft);
        console.log("this.offsetTop: " + el.offsetTop);
        }

        bgWebKit = "-webkit-gradient(radial, " + xy + ", 0, " + xy + ", " + gradientSize + ", from(" + lightColour + "), to(rgba(255,255,255,0.0))), " + originalBG;
        //bgMoz    = "-moz-radial-gradient(" + x + "px " + y + "px 45deg, circle, " + altLightColour + " 0%, " + originalBG + " " + gradientSize + "px)";

        el.style.background = bgWebKit;

        if (debugMode) {
            console.log(bgWebKit);
            console.log(e);
            console.log(self);
        }
    })
}
document.documentElement.onmouseleave = function(e) {
    document.querySelectorAll('.buttonReveal').forEach(function(el, id) {
        el.style.background = originalBG;
    });
}