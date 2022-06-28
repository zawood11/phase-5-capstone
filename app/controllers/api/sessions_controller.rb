class Api::SessionsController < ApplicationController
  skip_before_action :authorize, only: [:create, :google_auth]

  def create
    user = User.find_by(username: params[:username])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user
    else
      render json: { errors: ["Invalid username or password"] }, status: :unauthorized
    end
  end

  def destroy
    session.delete :user_id
    head :no_content
  end

  def google_auth
    auth = {username: params["email"], provider: params["provider"]}
    user = User.from_omniauth(auth)
    if user.id
      session[:user_id] = user.id
      render json: user
    else
      render json: {error: user.errors.full_messages.to_sentence}, status: :unauthorized
    end
  end
  
end
