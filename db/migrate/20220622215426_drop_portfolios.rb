class DropPortfolios < ActiveRecord::Migration[6.1]
  def change
    drop_table :portfolios, force: :cascade
  end
end
