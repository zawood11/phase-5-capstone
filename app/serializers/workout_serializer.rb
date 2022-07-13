class WorkoutSerializer < ActiveModel::Serializer
  attributes :id, :name, :minutes, :calories, :notes
  belongs_to :user
  has_many :exercises
  has_many :movements, serializer:ExerciseMovementSerializer
end
