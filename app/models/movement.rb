class Movement < ApplicationRecord
    has_many :exercises
    has_many :workouts, through: :exercises

    validates :name, presence: true, uniqueness: true
    validates :description, presence: true
end
