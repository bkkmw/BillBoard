import pandas as pd

def recomm_game_by_surprise_sortbyiid(algo, userID, unplayed_games):
    predictions = [algo.predict(str(userID), str(gameId)) for gameId in unplayed_games]

    def sortkey_est(pred):
        return pred.iid
    predictions.sort(key=sortkey_est, reverse=True)
    top_game_ratings = [pred.est for pred in predictions]
    return top_game_ratings

def recomm_combi(algo, userIDs, total_games, top_n):
    dataframes = [pd.DataFrame(total_games)]
    for id in userIDs:
        dataframes.append(pd.DataFrame(recomm_game_by_surprise_sortbyiid(algo, id, total_games)))
    res_df = pd.concat(dataframes, axis=1, ignore_index=True)
    res_df = res_df.set_index(res_df.columns[0])
    meandf = res_df.mean(axis='columns')
    result = pd.DataFrame(meandf, columns = ['mean'])
    result = result.sort_values(by='mean',ascending=False)
    li = result.iloc[0:top_n]
    return([{'gameId':f'{idx}', 'rating':f'{rat[0]}'} for idx, rat in zip(list(li.index),li.values.tolist())])


def get_unplayed_surprise(ratings, total_games, userID):
    played_games = ratings[ratings['userId']==userID]['gameId'].tolist()
    unplayed_games = [game for game in total_games if game not in played_games]
    print(f'{userID} 유저가 플레이한 게임 수: {len(played_games)}\n 플레이하지 않은 게임 수: {len(unplayed_games)}')
    return unplayed_games

def recomm_game_by_surprise(algo, userID, unplayed_games, games, top_n=10):
    predictions = [algo.predict(str(userID), str(gameId)) for gameId in unplayed_games]

    def sortkey_est(pred):
        return pred.est
    predictions.sort(key=sortkey_est, reverse=True)
    top_predictions = predictions[:top_n]
    top_game_ids = [int(pred.iid) for pred in top_predictions]
    top_game_ratings = [pred.est for pred in top_predictions]
    top_game_titles = games[games.gameId.isin(top_game_ids)]['name']
    top_game_preds = [(ids, ratings, title) for ids, ratings, title in zip(top_game_ids, top_game_ratings, top_game_titles)]
    for top_game in top_game_preds:
        print('추천게임이름',top_game[2])
        print('예측평점:',top_game[1])
        print()     
    return top_game_preds