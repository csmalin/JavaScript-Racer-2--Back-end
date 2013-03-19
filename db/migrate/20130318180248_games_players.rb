class GamesPlayers < ActiveRecord::Migration
  def change
    create_table :games_players do |t|
      t.references :player, :game
    end
  end
end
