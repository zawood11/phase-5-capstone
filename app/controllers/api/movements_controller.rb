class Api::MovementsController < ApplicationController
  before_action :set_movement, only: [:show, :update, :destroy]

  # GET /movements
  def index
    @movements = Movement.all

    render json: @movements
  end

  # GET /movements/1
  def show
    render json: @movement
  end

  # POST /movements
  def create
    @movement = Movement.create!(movement_params)
    render json: @movement, status: :created
  end

  # PATCH/PUT /movements/1
  def update
    if @movement.update(movement_params)
      render json: @movement
    else
      render json: @movement.errors, status: :unprocessable_entity
    end
  end

  # DELETE /movements/1
  def destroy
    @movement.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_movement
      @movement = Movement.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def movement_params
      params.permit(:name, :image_url, :description)
    end
end
