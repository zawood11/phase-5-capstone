class Workout < ApplicationRecord
    belongs_to :user
    has_many :exercises
    has_many :movements, through: :exercises

    validates :name, presence: true
end
