class DropPrices < ActiveRecord::Migration[6.1]
  def change
    drop_table :prices, force: :cascade
  end
end
