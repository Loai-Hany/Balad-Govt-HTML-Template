var selectBox = document.getElementById("selectBox");
var optionBox = document.getElementById("optionBox");
var countryFlag = document.getElementById("countryFlag");
var countryArm = document.getElementById("countryArm");
var TrueUnitedNations = document.getElementById("TrueUnitedNations");
var FalseUnitedNations = document.getElementById("FalseUnitedNations");
var TrueIndependent = document.getElementById("TrueIndependent");
var FalseIndependent = document.getElementById("FalseIndependent");
var population = document.getElementById("population");
var region = document.getElementById("region");
var startWeek = document.getElementById("startWeek");
var timeZone = document.getElementById("timeZone");
var capital = document.getElementById("capital");
var myIframe = document.getElementById("myIframe");
var NewsBox = document.getElementById("NewsBox");


fetch("https://restcountries.com/v3.1/all?fields=name")
.then(response => response.json())
.then(data => {

    var allCountries = data;
    allCountries.forEach (country => {
        optionBox.innerHTML += `<option>${country.name.common}<option>`;
    });

})

selectBox.addEventListener("change" , function () {
    var country = selectBox.value;
    fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => {
        
        data.forEach(countryData => {
            countryFlag.src = countryData.flags.png;
            countryArm.src = countryData.coatOfArms.png;
            
                function UnitedNations () {
                    if(countryData.unMember) {
                        FalseUnitedNations.style.cssText = "display: none";
                        TrueUnitedNations.style.cssText = "display: inline";
                    }
                    else {
                        TrueUnitedNations.style.cssText = "display: none";
                        FalseUnitedNations.style.cssText = "display: inline";
                    }
                
                }

                function Independent () {
                                
                    if(countryData.independent) {
                        FalseIndependent.style.cssText = "display: none";
                        TrueIndependent.style.cssText = "display: inline";
                    }
                    else {
                        TrueIndependent.style.cssText = "display: none";
                        FalseIndependent.style.cssText = "display: inline";
                    }
                }

                UnitedNations();
                Independent();

                population.innerHTML = countryData.population.toLocaleString();
                region.innerHTML = countryData.region;
                startWeek.innerHTML = countryData.startOfWeek;
                timeZone.innerHTML = countryData.timezones;
                capital.innerHTML = countryData.capital;

                var lat = countryData.latlng[0];
                var lng = countryData.latlng[1];
            
                myIframe.src = `https://www.google.com/maps/embed/v1/view?key=AIzaSyDCCfoXSZoK3UBns2vOgqjxikkomxkSp6k&center=${lat},${lng}&zoom=6`;
                
                var countryCode = countryData.cca2;
                getNews(countryCode);

        });
    })
    
});


function getNews(countryCode) {
    fetch(`https://api.worldnewsapi.com/search-news?api-key=d348e5ae2876496ab7fdfea0e633196b&source-countries=${countryCode}`)
    .then(response => response.json())
    .then(dataNews => {
        
        var News = dataNews.news;
        NewsBox.innerHTML = ``;
        News.forEach(info => {
    
            NewsBox.innerHTML += `
            
            <div class="col-md-3 col-sm-6">
               <div class="news-box my-1">
                 <div class="new-thumb"> <span class="cat c1">News</span> <img src=${info.image} alt=""> </div>
                 <div class="new-txt">
                   <ul class="news-meta">
                     <li>${info.publish_date}</li>
                   </ul>
                   <h6><a href="index.html#">${info.title}</a></h6>
                   <p>${info.text.split(" ").slice(0, 20).join(" ")}</p>
                 </div>
                 <div class="news-box-f"> <img src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png" alt=""> ${info.authors[1]} <a href="index.html#"><i class="fas fa-arrow-right"></i></a> </div>
               </div>
            </div> 
            
            `

        });

    })
}

var fullName = document.getElementById("fullName");
var email = document.getElementById("email");
var message = document.getElementById("message");
var btn = document.getElementById("btn");

btn.addEventListener("click" , function () {
    var params = {
        from_name : fullName.value ,
        email_id : email.value ,
        message : message.value
    }
    emailjs.send("service_mvkkrgo","template_ty7eo01", params).then(function (result) {
        alert(`Sucsess! ${result.status}`);
    })
});



