import pandas as pd
from surprise import Reader, Dataset
from sklearn.model_selection import train_test_split
from numpy import 
 
ratings = pd.read_csv('./ratings.csv')
reader = Reader(rating_scale=(1, 10))
 
# ratings DataFrame 에서 컬럼은 사용자 아이디, 아이템 아이디, 평점 순서를 지켜야 합니다.
data = Dataset.load_from_df(ratings, reader)
trainset, testset = train_test_split(data, test_size=.25, random_state=0)
 
algo = SVD(n_factors=50, random_state=0)
algo.fit(trainset)
predictions = algo.test( testset )
accuracy.rmse(predictions)