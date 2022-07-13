class Api::WorkoutsController < ApplicationController
  before_action :set_workout, only: [:show, :update, :destroy]

  # GET /workouts
  def index
    @workouts = Workout.all

    render json: @workouts
  end

  # GET /workouts/1
  def show
    render json: @workout
  end

  # GET /workouts/user/1
  def workouts_user 
    @workouts = Workout.where(user_id: params[:id])
    render json: @workouts
  end

  # POST /workouts
  def create
    @workout = Workout.create!(workout_params)
    render json: @workout, status: :created
  end

  # PATCH/PUT /workouts/1
  def update
    if @workout.update(workout_params)
      render json: @workout
    else
      render json: @workout.errors, status: :unprocessable_entity
    end
  end

  # DELETE "/workouts/:id"
  def destroy
    @workout.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_workout
      @workout = Workout.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def workout_params
      params.permit(:user_id, :name, :minutes, :calories, :notes)
    end
end
