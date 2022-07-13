class FriendshipSerializer < ActiveModel::Serializer
  attributes :id, :requestor_id, :recipient_id, :friend_name, :status

  def friend_name
    "#{self.object.recipient.username}"
  end
end
