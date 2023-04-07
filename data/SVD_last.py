import pandas as pd

def recommendByUserOrderById(algo, userID, unplayed_games):
    predictions = [algo.predict(str(userID), str(gameId))
                   for gameId in unplayed_games]

    top_game_ratings = [pred.est for pred in predictions]
    return top_game_ratings

def recommendByUsers(algo, userIDs, total_games, top_n):
    dataframes = [pd.DataFrame(total_games)]
    for id in userIDs:
        dataframes.append(pd.DataFrame(recommendByUserOrderById(algo, id, total_games)))
    res_df = pd.concat(dataframes, axis=1, ignore_index=True)
    res_df = res_df.set_index(res_df.columns[0])
    meandf = res_df.mean(axis='columns')
    result = pd.DataFrame(meandf, columns=['mean'])
    result = result.sort_values(by='mean', ascending=False)
    li = result.iloc[:top_n]
    return list(li.index)

def getGameList(ratings, total_games, userID):
    played_games = ratings[ratings['userId'] == userID]['gameId'].tolist()
    unplayed_games = [game for game in total_games if game not in played_games]
    print(f'{userID} 유저가 플레이한 게임 수: {len(played_games)}\n 플레이하지 않은 게임 수: {len(unplayed_games)}')
    return played_games, unplayed_games

def recommendByUser(algo, userID, unplayed_games, top_n=10):
    predictions = [algo.predict(str(userID), str(gameId))
                   for gameId in unplayed_games]

    def sortkey_est(pred):
        return pred.est
    predictions.sort(key=sortkey_est, reverse=True)
    top_predictions = predictions[:top_n]
    return [int(pred.iid) for pred in top_predictions]
