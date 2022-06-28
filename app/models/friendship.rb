class Friendship < ApplicationRecord
    belongs_to :requestor, class_name: 'User', foreign_key: :requestor_id
    belongs_to :recipient, class_name: 'User', foreign_key: :recipient_id

    
    validates :requestor, presence: true, uniqueness: { scope: :recipient_id }
    validates :recipient, presence: true
    validates :status, presence: true, inclusion: { in: ['Pending', 'Denied', 'Accepted'] }
end
