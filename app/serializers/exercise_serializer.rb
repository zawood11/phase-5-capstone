class ExerciseSerializer < ActiveModel::Serializer
  attributes :id, :sets, :reps, :rest_interval
  belongs_to :workout
  belongs_to :movement
end
