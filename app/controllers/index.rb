get '/' do
  # Look in app/views/index.erb
  erb :index
end

post '/game' do
  p params["newgame"]["player1"]
  player1 = Player.find_or_create_by_name(:name => params["newgame"]["player1"])
  player2 = Player.find_or_create_by_name(:name => params["newgame"]["player2"])
  game = Game.create(:url => SecureRandom.urlsafe_base64)
  game.players << player1 << player2
  session[:url] = game.url
  redirect '/game'
end

get '/game' do
  @game = Game.find_by_url(session[:url])
  erb :game
end

post '/gameover' do
  @game = Game.find_by_url(session[:url])
  winner = (params["winner"] == 1 ? @game.players.first : @game.players.last)
  @game.update_attributes(:winner => winner.id, :game_time => params["game_time"].to_f)
  ''
end

get '/gameover' do
  @game = Game.last
  erb :gameover
end

get '/stats/:url' do
  @game = Game.find_by_url(params[:url])
  puts @game
  erb :stats
end
