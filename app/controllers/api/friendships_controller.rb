class Api::FriendshipsController < ApplicationController
  before_action :set_friendship, only: [:show, :update, :destroy]

  # GET /friendships
  def index
    @friendships = Friendship.all

    render json: @friendships
  end

  # GET /friendships/1
  def show
    render json: @friendship
  end

  def show_user_friends
    @friendships = Friendship.where(requestor_id: params[:id])
    render json: @friendships
  end

  # POST /friendships
  def create
    @friendship = Friendship.create!(friendship_params)
    render json: @friendship, status: :created
  end

  # PATCH/PUT /friendships/1
  def update
    if @friendship.update(friendship_params)
      render json: @friendship
    else
      render json: @friendship.errors, status: :unprocessable_entity
    end
  end

  # DELETE /friendships/1
  def destroy
    @friendship.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_friendship
      @friendship = Friendship.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def friendship_params
      params.permit(:requestor_id, :recipient_id, :status)
    end
end
