class WorkoutSerializer < ActiveModel::Serializer
  attributes :id, :name, :minutes, :calories, :notes
  belongs_to :user
  has_many :exercises
end
