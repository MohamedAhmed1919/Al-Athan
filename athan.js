let imageRandom= ["architecture.jpg", "Madina.jpg", "sheikh-zayed-grand-mosque.jpg", "sheikh-zayed-mosque.jpg"];
let container = document.querySelector('.container'); 
function randomizeImgs() {
    setInterval(() => {
        // get random number
        let randomNumber = Math.floor(Math.random() * imageRandom.length);
        
        // change background image url
        container.style.backgroundImage = `url("imges/${imageRandom[randomNumber]}")`;
    }, 10000);
};
randomizeImgs();

let Cities = [
    {arabicName :"القاهرة ",name: "cairo"},
    {arabicName :"الاسكندرية ",name: "Alexandria"},
    {arabicName :"أسوان ",name: "Aswan"} ]

for ( let city of Cities){
    const content = `
    <option> ${city.arabicName}</option>
    `
    document.getElementById("cities").innerHTML += content ;
    
}

document.getElementById("cities").addEventListener("change",function(){
    // to change time of prayer 
    document.getElementById("government").innerHTML =this.value ;
    let cityName = "";
    for( let city of Cities){
        if (city.arabicName == this.value){
            cityName= city.name
        }
    }
    // console.log(this.value)
    GetPrayerTimingOfCity(cityName)
   
});

//  axios الكود يحتاج لاستدعاء مكتبة 
// function GetPrayerTimingOfCity(cityName){ //this param to change name of city automatically
//     let params ={
//         country :"EG",
//         city : cityName  
//     };
//     const axios = require('axios');
//     axios.get('http://api.aladhan.com/v1/timingsByCity',{
//         params : params 
//     })
//     .then(function(response){
//         const timings =response.data.data.timings 
//         // document.getElementById("Fagr-time").innerHTML = timings.Fagr
//         fillTimeForPrayer ("Fajr-time" , timings.Fajr)
//         fillTimeForPrayer ("sunrise-time" , timings.Sunrise)
//         fillTimeForPrayer ("dhuhr-time" , timings.Dhuhr)
//         fillTimeForPrayer ("asr-time", timings.Asr)
//         fillTimeForPrayer ("sunset-time" , timings.Sunset)
//         fillTimeForPrayer ("isha-time", timings.Isha)
    
//         const readableDate = response.data.data.data.readable ;
//         const weekday = response.data.data.data.hijri.weekday.ar ;
//         const date =  weekday +" " + readableDate ;
//         document.getElementById("Date").innerText= date ;
//         console.log( weekday +" " + readableDate );
//     })
//     .catch(function(error){
//         console.log(error);
//     });
    
// };

// GetPrayerTimingOfCity("cairo");

// function fillTimeForPrayer (id , time){
//     document.getElementById(id).innerHTML= time ; 
// }

function GetPrayerTimingOfCity(cityName) {
    let params = {
        country: "EG",
        city: cityName
    };

    fetch('https://api.aladhan.com/v1/timingsByCity?country=' + params.country + '&city=' + params.city)
        .then(response => response.json())
        .then(data => {
            const timings = data.data.timings;
            fillTimeForPrayer("Fajr-time", timings.Fajr);
            fillTimeForPrayer("sunrise-time", timings.Sunrise);
            fillTimeForPrayer("dhuhr-time", timings.Dhuhr);
            fillTimeForPrayer("asr-time", timings.Asr);
            fillTimeForPrayer("sunset-time", timings.Sunset);
            fillTimeForPrayer("isha-time", timings.Isha);

            const readableDate = data.data.date.readable;
            const weekday = data.data.date.hijri.weekday.ar;
            const date = `${weekday} ${readableDate}`;
            document.getElementById("Date").innerHTML = date;
            console.log(`${weekday} ${readableDate}`);
        })
        .catch(error => console.log(error));
}

GetPrayerTimingOfCity("cairo");

function fillTimeForPrayer (id , time){
    document.getElementById(id).innerHTML= time ; 
}