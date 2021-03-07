class Button {
    
    constructor(element, classname) {
        this.element = element;
    };
    
    eventHandler() {
        let self = this;
        window.addEventListener("click", function(e){self.linesTransform()})
        window.addEventListener("click", function(e){self.classChanger()})
        };
    
    linesTransform() {
        let lines = document.getElementsByClassName("line");
        for(var linesActivated = 0; linesActivated < lines.length; linesActivated++) {
            lines[linesActivated].classList.toggle("active");
        };
    };
    
    classChanger() {
        
        let menuBtn = document.querySelector(".menu-container");
        
        menuBtn.classList.toggle("active");
        
        /* ha itt definiálom a menuBtn-t, akkor működik*/
    
        this.classlist.toggle("active");
        
        /* itt meg csak undefined jön vissza */
    } 
    
}

let menuBtn = new Button(document.querySelector(".menu-container"));
menuBtn.eventHandler();
console.log(menuBtn);