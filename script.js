function generateWeather(time, temp, icon) {
    var date = new Date(time);
    var today = new Date();
    var day = '';
    if (date.getDate() === today.getDate()) {
        day = 'dzisiaj'
    } else if (date.getDate() - 1 === today.getDate()) {
        day = 'jutro'
    } else {
        day = ` ${date.getDate()}.0${date.getMonth()+1}`;
        if(day <10 ) day = "0"+ day;
    }
    var formatedTime = `${day} ${date.getHours()}:00`
    
    var result = `
    <div class="dzien">
        <h2>${formatedTime}</h2>
        <p>${Math.round(temp)}°C</p>
        <img src="https://openweathermap.org/img/w/${icon}.png" />
    </div>
    `
    return result;
}


 


function getWeather() {
    
    if(event){
        event.preventDefault();
    }
    
    let city = $('#cityName').val() ||'rzeszow';
    
    $.ajax({
        url: `http://api.openweathermap.org/data/2.5/forecast?q=${city}%2Cpl&units=metric&appid=f3c08ceff7f970ccc92f3aab10216c6b`,
        type: 'GET',
        success: function (data) {
            console.log(data);
            var html = '';
            data.list.forEach(function (element) {
                html += generateWeather(element.dt_txt, element.main.temp, element.weather[0].icon)
                
                

            })

            $('#list').html('');
            $('list').innerHTML = "";
            $('#list').append($.parseHTML(html))

            $('#weather-icon')[0].src = 'https://openweathermap.org/img/w/' + data.list[0].weather[0].icon + ".png";

            $('#weather-city')[0].innerHTML = data.city.name;

           
                
                $('#weather-temp')[0].innerHTML = Math.round(data.list[0].main.temp) + '°C';
            

            var dat = new Date();
                    dzien = dat.getDay();
                    switch(dzien){
                        case 0: $('#data')[0].innerHTML =("<h5>Dziś jest niedziela!</h5>"); break;
                        case 1: $('#data')[0].innerHTML =("<h5>Dziś jest poniedziałek!</h5>"); break;
                        case 2: $('#data')[0].innerHTML =("<h5>Dziś jest wtorek!</h5>"); break;
                        case 3: $('#data')[0].innerHTML =("<h5>Dziś jest środa!</h5>"); break;
                        case 4: $('#data')[0].innerHTML =("<h5>Dziś jest czwartek!</h5>"); break;
                        case 5: $('#data')[0].innerHTML =("<h5>Dziś jest piątek!</h5>"); break;
                        case 6: $('#data')[0].innerHTML =("<h5>Dziś jest sobota!</h5>"); break;
                    }
           // var today = new Date();
           // $('#data')[0].innerHTML = today.getHours();

            var pressure = data.list[0].main.pressure
            $('#weather-pressure')[0].innerHTML = 'Ciśnienie:  ' + Math.floor(pressure) + ' hPa';

            $('#weather-humidity')[0].innerHTML = 'Wilgotność:  ' + data.list[0].main.humidity + ' %';


            var speed = data.list[0].wind.speed
            $('#weather-wind')[0].innerHTML = 'Prędkość wiatru:  ' + Math.floor(speed) + ' m/s';



       
        },
            error: function(error){
                    console.log(error);
        }
        
        
    })  
     
    }

getWeather();