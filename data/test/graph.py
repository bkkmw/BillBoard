import os
import pandas as pd

from surprise import Reader, Dataset
from plotly.offline import  plot, iplot
import plotly.graph_objs as go
from surprise import SVD, SVDpp, SlopeOne, NMF, NormalPredictor, KNNBasic, KNNBaseline, KNNWithMeans, KNNWithZScore, BaselineOnly, CoClustering
# from sklearn.model_selection import cross_validate 사이킷런의 크로스벨리데이션이 아니다.
from surprise.model_selection import cross_validate
# py파일로 실행할 경우 노트북에서 실행시키기 위한 함수.
# init_notebook_mode(connected=True)
ratings=pd.read_csv("./ratings.csv", encoding='UTF-8')
ratings.columns=['userId','gameId','rating']



# ☆여기까지 그래프  
# 데이터프레임에서 한 컬럼만 뽑아낸 시리즈를 종류별로 카운트하고, 인덱스에 따라 내림차순 정렬
data = ratings['rating'].value_counts().sort_index(ascending=False)

# # 유효하지 않은 데이터를 삭제하는 코드(걸러진것 없음)
# min_game_ratings = 5
# filter_games = ratings['gameId'].value_counts() >= min_game_ratings
# filter_games = filter_games[filter_games].index.tolist()

# ratings_new = ratings[ratings['gameId'].isin(filter_games)]
# print('The original data frame shape:\t{}'.format(ratings.shape))
# print('The new data frame shape:\t{}'.format(ratings_new.shape))

# # x에는 index로 평점 1~5를 나타내고, y는 평점 당 카운트 값이다.
# trace = go.Bar(x = data.index,
#                text = ['{:.1f} %'.format(val) for val in (data.values / ratings.shape[0] * 100)],
#                textposition = 'auto',
#                textfont = dict(color = '#000000'),
#                y = data.values,
#                )
               
      
# # 레이아웃 생성하기.
# layout = dict(title = 'Distribution Of {} gameID-ratings'.format(ratings.shape[0]),
#               xaxis = dict(title = 'Rating'),
#               yaxis = dict(title = 'Count'))
# # 그래프 생성하기
# fig = go.Figure(data=[trace], layout=layout)
# iplot(fig)
# # 영화 한 편당 평점 개수. groupby 함수로 카운팅한다.
# data = ratings.groupby('gameId')['rating'].count().clip(upper=100)

# # trace 생성하기.
# trace = go.Histogram(x = data.values,
#                      name = 'Ratings',
#                      xbins = dict(start = 0,
#                                   end = 50,
#                                   size = 2))
# # 레이아웃 생성하기
# layout = go.Layout(title = 'Distribution Of Number of Ratings Per game (Clipped at 100)',
#                    xaxis = dict(title = 'Number of Ratings Per game'),
#                    yaxis = dict(title = 'Count'),
#                    bargap = 0.2)

# # 그래프 생성하기.
# fig = go.Figure(data=[trace], layout=layout)
# iplot(fig)               
# # ☆여기까지 그래프

