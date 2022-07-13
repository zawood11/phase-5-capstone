class Api::UsersController < ApplicationController
  skip_before_action :authorize, only: :create

  def index
    @users = User.all

    render json: @users
  end

  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
  end

  def show
    render json: @current_user
  end

  def show_friend
    @user = User.find(params[:id])
    render json: @user
  end

  def destroy
    @current_user.destroy
  end

  private

  def user_params
    params.permit(:username, :password, :password_confirmation, :image_url, :bio)
  end

end
