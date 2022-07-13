Rails.application.routes.draw do

  namespace :api do
    resources :friendships
    resources :exercises
    get "/workouts/user/:id", to: "workouts#workouts_user"
    resources :workouts
    resources :movements
    resources :recipes, only: [:index, :create]
    post 'auth/:provider/callback', to: 'sessions#google_auth'
    post "/signup", to: "users#create"
    get "/me", to: "users#show"
    get "/users/:id", to: "users#show_friend"
    post "/login", to: "sessions#create"
    delete "/logout", to: "sessions#destroy"
    resources :users, only: [:index, :destroy]

    
  end
  # all other routes will be load our React application
  # this route definition matches:
  # - *path: all paths not matched by one of the routes defined above
  # - constraints:
  #   - !req.xhr?: it's not a XHR (fetch) request
  #   - req.format.html?: it's a request for a HTML document
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
