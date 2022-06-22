class DropUsers < ActiveRecord::Migration[6.1]
  def change
    drop_table :users, force: :cascade
  end
end
