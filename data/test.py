import pandas as pd
from surprise import Reader, Dataset
from surprise.model_selection import train_test_split
from surprise import SVD
from surprise import accuracy
 
ratings = pd.read_csv('./ratings.csv', encoding='UTF-8')
reader = Reader(line_format='user item rating',sep=',',rating_scale=(1, 10))
 
# ratings DataFrame 에서 컬럼은 사용자 아이디, 아이템 아이디, 평점 순서를 지켜야 합니다.
data = Dataset.load_from_df(ratings, reader)

trainset, testset = train_test_split(data, test_size=.25, random_state=0)
print(1)
 
algo = SVD(n_factors=10, random_state=0)
algo.fit(trainset)
predictions = algo.test( testset )
accuracy.rmse(predictions)