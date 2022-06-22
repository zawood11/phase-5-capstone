class DropStocks < ActiveRecord::Migration[6.1]
  def change
    drop_table :stocks, force: :cascade
  end
end
