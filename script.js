/********** DOM ELEMENTS ***********/

var menuBtn = document.querySelector(".menu-container");
var lines = document.getElementsByClassName("line");
var accountBtn = document.querySelector(".account-btn");
var sideContainer = document.querySelector(".side-container");
var advertContainer = document.querySelector(".advert-container");

/************* MENU BUTTON HANDLING *************/

accountBtn.addEventListener('click', toMyAccount);

function toMyAccount() {
    console.log("Works!");
}

/*********** MENU EFFECTS ************/

menuBtn.addEventListener('click', menuBtnActive);
sideContainer.addEventListener('mouseover', sideMenuActive);
sideContainer.addEventListener('mouseout', sideMenuPassive);

function menuBtnActive() {
    
    for(var linesActivated = 0; linesActivated < lines.length; linesActivated++) {
        lines[linesActivated].classList.toggle("active"); 
    };
    
    menuBtn.classList.toggle("active");
    
    if(menuBtn.classList.contains("active") === true) {
        sideMenuActive();
        sideContainer.removeEventListener('mouseout', sideMenuPassive);
        sideContainer.addEventListener('mouseout', sideMenuActive);
    } else {
        sideMenuPassive();
        sideContainer.removeEventListener('mouseout', sideMenuActive);
        sideContainer.addEventListener('mouseout', sideMenuPassive);
    };
    
};

function sideMenuActive() {
    sideContainer.classList.add("active");
};

function sideMenuPassive() {
    sideContainer.classList.remove("active");
};

/************** CONNECT TO SERVERS ***************/

function getServerData(method, url) {
    
    return new Promise(function(resolve, reject) {
        
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.onload = function() {
            if(xhr.readyState === 4 && xhr.status == 200) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject(errorMsg());
            }
        };
        xhr.send();
    });
};

/************** DISPLAY ADVERT PHOTOS FROM JSON SERVER ************/

async function getAdvertPhotos() {
    getServerData("GET", "./adverts.json")
    .then(function(advertPhotosValues){return Object.values(advertPhotosValues)})
    .then(function(advertPhotosSources)
          {var advertPhotosArray = [];
           for(var i = 0; i < advertPhotosSources[0].length; i++) {
              
                advertPhotosArray[i] = new Image();
                advertPhotosArray[i].src = Object.values(advertPhotosSources[0][i]).toString(); 
            }
           return advertPhotosArray;
          })
    .then(function(loopPhotosArray){
        
        var imgIndex = 0;
        (function showPhotos() {
            
            if(imgIndex <= loopPhotosArray.length) {
                displayPhoto(loopPhotosArray[imgIndex]);
                imgIndex++;
                if(imgIndex > loopPhotosArray.length - 1){
                    imgIndex = 0;
                };
                setTimeout(showPhotos, 5000);
            }
        })();
        })
    .catch(function(errorHandling){
        errorMsg();
    })
  };

getAdvertPhotos();

function errorMsg() {
    alert("Something went wrong!");
};

function displayPhoto(photo) {
    advertContainer.appendChild(photo);
};


/**************** GET USER DATA FROM JSON SERVER **************/

/*var url = "./users.json";
var method = "GET";
var getUserData = new XMLHttpRequest();

getUserData.open(method, url , true);
getUserData.onload = function() {
    if(this.readyState === 4 && this.status == 200) {
        var userData = JSON.parse(this.responseText);
        console.log(userData);
    } else {
        alert("Something went wrong!");
    };    
};

getUserData.send();*/
