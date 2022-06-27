class Friendship < ApplicationRecord
    belongs_to :requestor, class_name: 'User', foreign_key: :requestor_id
    belongs_to :recipient, class_name: 'User', foreign_key: :recipient_id

    validates :status, inclusion: { in: ['Pending', 'Denied', 'Accepted'], allow_blank: false }
end
