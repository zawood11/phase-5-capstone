class Exercise < ApplicationRecord
    t.belongs_to :workout
    t.belongs_to :movement

    validates :sets, presence: true
    validates :reps, presence: true
    validates :rest_interval, presence: true
end
