require 'rails_helper'

RSpec.describe HomeController, type: :controller do

  describe "GET #index" do
    it "returns http success" do
      get :index
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #fetch_weather" do
    it "returns http success" do
      params = {
        location: {
          city: 'Bangalore',
          country: 'IN'
        }
      }
      get :fetch_weather, params: params, format: :json
      expect(response).to have_http_status(:success)
    end

    it "returns 404 when city not found" do
      params = {
        'location' => {
          city: 'jlkjlkjljlkjlkj',
          country: ''
        }
      }
      get :fetch_weather, params: params, format: :json
      expect(response).to have_http_status(404)
    end

    it "eturns 404 when empty form is submitted" do
      params = {
        'location' => {
          city: '',
          country: ''
        }
      }
      get :fetch_weather, params: params, format: :json
      expect(response).to have_http_status(404)
    end
  end

end
