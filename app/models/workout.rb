class Workout < ApplicationRecord
    t.belongs_to :user

    validates :name, presence: true
end
