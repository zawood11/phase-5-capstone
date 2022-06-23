class Movement < ApplicationRecord
    belongs_to :exercise

    validates :name, presence: true, uniqueness: true
    validates :description, presence: true
end
