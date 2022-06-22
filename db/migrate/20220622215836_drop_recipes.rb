class DropRecipes < ActiveRecord::Migration[6.1]
  def change
    drop_table :recipes, force: :cascade
  end
end
