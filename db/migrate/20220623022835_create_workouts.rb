class CreateWorkouts < ActiveRecord::Migration[6.1]
  def change
    create_table :workouts do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.string :name
      t.integer :minutes
      t.integer :calories
      t.text :notes
      
      t.timestamps
    end
  end
end
