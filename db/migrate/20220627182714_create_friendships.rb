class CreateFriendships < ActiveRecord::Migration[6.1]
  def change
    create_table :friendships do |t|
      t.belongs_to :requestor, null: false, foreign_key: {to_table: :users}
      t.belongs_to :recipient, null: false, foreign_key: {to_table: :users}
      t.string :status
      
      t.timestamps
    end
  end
end
