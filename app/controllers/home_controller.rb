class HomeController < ApplicationController
  require 'open_weather'
  OPTIONS = { units: "metric", APPID: "33c47fc2ff491a3a6d1ac66ab8f76fd2" }

  def index
  end

  def fetch_weather
    if weather_params && weather_params[:city]
      weather = OpenWeather::Current.city("#{weather_params[:city]}, #{weather_params[:country]}", OPTIONS)
    end

    respond_to do |format|
      format.json {
        if weather.present? && weather["cod"] != '404'
          render status: 200, json: weather.to_json
        else
          render status: 404, json: weather.to_json
        end
      }
    end
  end

  def weather_params
    params.require(:location).permit(:city, :country)
  end
end
