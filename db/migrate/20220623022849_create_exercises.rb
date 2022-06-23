class CreateExercises < ActiveRecord::Migration[6.1]
  def change
    create_table :exercises do |t|
      t.belongs_to :workout, null: false, foreign_key: true
      t.belongs_to :movement, null: false, foreign_key: true
      t.integer :sets
      t.integer :reps
      t.text :rest_interval

      t.timestamps
    end
  end
end
