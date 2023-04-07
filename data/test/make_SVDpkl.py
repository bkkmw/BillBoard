# SVD로 학습한 모델을 SVD.pkl로 저장
import pandas as pd
from surprise import Reader, Dataset
from surprise.model_selection import train_test_split
from surprise import SVD, SVDpp, SlopeOne, NMF, NormalPredictor, KNNBasic, KNNBaseline, KNNWithMeans, KNNWithZScore, BaselineOnly, CoClustering
from surprise import accuracy
from surprise.model_selection import cross_validate
import joblib

ratings = pd.read_csv('./ratings.csv', encoding='UTF-8')
reader = Reader(line_format='user item rating',sep=',',rating_scale=(1, 10))

data = Dataset.load_from_df(ratings, reader)

trainset, testset = train_test_split(data, test_size=.25, random_state=0)

algo = SVD(n_factors=10, random_state=0)

algo.fit(trainset)

joblib.dump(algo, './SVD.pkl')