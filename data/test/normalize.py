import pandas as pd 
import os

import pandas as pd

import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.model_selection import train_test_split

# movielens 데이터 불러오기 
r_cols = ['user_id', 'game_id', 'rating']
ratings = pd.read_csv('./ratings.csv', names=r_cols ,encoding='UTF-8')

#rating matrix 생성
x = ratings.copy()
y = ratings['user_id']

x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.25,  random_state=12)
rating_matrix = x_train.pivot(values='rating', index='user_id', columns='game_id')

matrix_dummy = rating_matrix.copy().fillna(0)
user_similarity = cosine_similarity(matrix_dummy, matrix_dummy)
user_similarity = pd.DataFrame(user_similarity, index=rating_matrix.index, columns=rating_matrix.index)



## 다른 부분 
# 모든 사용자의 개별 평점 평균 계산 
rating_mean = rating_matrix.mean(axis=1)
print(rating_mean)
#bias from mean 추천 
def ubcf_bias(user_id, game_id):
    import numpy as np
    # 현 user의 평균 가져오기(나중에 계산 위해서)
    user_mean = rating_mean[user_id]
    
    if game_id in rating_matrix:
        # 해당 user와 다른 user들의 유사도 가져오기
        sim_scores = user_similarity[user_id]
        
        # 현재 item의 rating 모두 가져오기 
        game_ratings = rating_matrix[game_id]
        
        # 모든 user의 rating 평균 가져오기
        others_mean = rating_mean
        
        # 해당 item에 대한 rating이 없는 user 삭제
        none_rating_idx = game_ratings[game_ratings.isnull()].index
        game_ratings = game_ratings.drop(none_rating_idx)
        sim_scores = sim_scores.drop(none_rating_idx)
        others_mean = others_mean.drop(none_rating_idx)
        
        # 평균으로부터의 편차 예측치 계산
        game_ratings = game_ratings - others_mean
        prediction = np.dot(sim_scores, game_ratings) / sim_scores.sum()
        
        # 편차 예측치에 해당 user의 평균 더하기
        prediction = prediction + user_mean
    else:
        prediction = user_mean #해당 영화가 없으면 해당 사용자의 평균 평점으로 예측 
    return prediction

score(ubcf_bias)