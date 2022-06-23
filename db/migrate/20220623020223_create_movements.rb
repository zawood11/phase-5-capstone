class CreateMovements < ActiveRecord::Migration[6.1]
  def change
    create_table :movements do |t|
      t.string :name
      t.string :image_url
      t.text :description
      
      t.timestamps
    end
  end
end
