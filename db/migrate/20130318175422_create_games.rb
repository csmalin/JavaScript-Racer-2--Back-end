class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :url
      t.integer :winner
      t.float :game_time
      t.timestamps
    end
  end
end
