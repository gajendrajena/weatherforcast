Rails.application.routes.draw do
  get 'home/index'
  get 'home/fetch_weather', format: :json
  root to: 'home#index'
end
