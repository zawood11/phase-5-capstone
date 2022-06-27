class Exercise < ApplicationRecord
    belongs_to :workout
    belongs_to :movement

    validates :sets, presence: true
    validates :reps, presence: true
    validates :rest_interval, presence: true
end
