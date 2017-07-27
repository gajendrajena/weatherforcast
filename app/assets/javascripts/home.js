$(document).ready(function(){

  $(document).on('submit', '#weather_form', function(event){
    event.preventDefault();
    if($('#location_city').val().length > 0){

      $.ajax({
        url: '/home/fetch_weather',
        dataType: 'json',
        data: $('#weather_form').serialize(),
        before: function(){
          $('#weather').html('Loading');
        },
        success: (data) => {
          $('#notification').html(`<div class="alert alert-success alert-dismissible" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> <strong>Warning!</strong> Successfully Fetched Weather Info </div>`)
          formHtml(data);
          $('#weather-container').removeClass('hide');
        },
        error: function(jqXHR, textStatus, errorThrown) {
          $('#notification').html(`<div class="alert alert-danger alert-dismissible" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> <strong>Error!</strong> ${jqXHR.responseJSON.message} </div>`)
        }
      });
    }
  });
});

var formHtml = function(weather) {
  if(weather !== 'undefined'){
    $('#lat .value').text(weather.coord.lat)
    $('#lon .value').text(weather.coord.lon)
    $('#humidity .value').text(weather.main.humidity)
    $('#pressure .value').text(weather.main.pressure)
    $('#temp .value').text(weather.main.temp)
    $('#temp_max .value').text(weather.main.temp_max)
    $('#temp_min .value').text(weather.main.temp_min)
    $('#weather .value').text(weather.weather[0].description)
    $('#name .value').text(weather.name + ', ' + weather.sys.country)
    $('#deg .value').text(weather.wind.deg)
    $('#speed .value').text(weather.wind.speed)
  }
}

