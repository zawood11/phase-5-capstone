class ExerciseSerializer < ActiveModel::Serializer
  attributes :id, :movement_name, :sets, :reps, :rest_interval
  belongs_to :workout
  belongs_to :movement

  def movement_name
    "#{self.object.movement.name}"
  end
end
