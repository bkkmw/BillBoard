# import sys
# from collections import defaultdict
# import pandas as pd
# from surprise import Reader, Dataset, SVD, accuracy
import pandas as pd
from surprise import Reader, Dataset
from surprise.model_selection import train_test_split
from surprise import SVD, SVDpp, SlopeOne, NMF, NormalPredictor, KNNBasic, KNNBaseline, KNNWithMeans, KNNWithZScore, BaselineOnly, CoClustering
from surprise import accuracy
from surprise.model_selection import cross_validate
import joblib
SVD = joblib.load('./SVD.pkl')


games = pd.read_csv('./games_detailed_info.csv', encoding='UTF-8', usecols=[2,5])
ratings = pd.read_csv("./bgg-19m-reviews.csv", encoding='UTF-8')

def get_not_played_game(ratings, games, userId):
    played_games = ratings[ratings["user"] == userId]['ID'].tolist()
    total_games = games
    not_played_games = [game for game in total_games if game not in played_games]
    print(f'특정{userId} 유저가 플레이한 게임 수: {len(played_games)}\n 추천한 게임 개수: {len(not_played_games)}\n 전체 게임수:{len(total_games)}')
    not_played_games = list(set(not_played_games))
    return not_played_games

def recommend(algo, userId, not_played_games, top_n):
    predictions = [algo.predict(str(userId), str(gameId)) for gameId in not_played_games]

    def sortkey_est(pred):
        return pred.est
    
    predictions.sort(key=sortkey_est, reverse=True)
    top_predictions =predictions[:top_n]
    top_game_ids = [int(pred.iid) for pred in top_predictions]
    top_game_ratings = [pred.est for pred in top_predictions]
    top_game_titles = games[games.id.isin(top_game_ids)]['primary']
    top_game_preds = [(ids, round(rating,1)) for ids, rating, title in zip(top_game_ids, top_game_ratings, top_game_titles)]

    return top_game_preds
unplayed_lst = get_not_played_game(ratings, games, 'Torsten')
top_games_preds = recommend(SVD, 'Torsten', unplayed_lst, top_n=10)


print()
print('추천게임 리스트')

for top_game in top_games_preds:
    print('추천게임이름',top_game[2])
    print('예측평점:',top_game[1])
    print()     