import pandas as pd
ratings = pd.read_csv('./bgg-19m-reviews.csv')
ratings.to_csv('./ratings_noh1.csv', index=False, header=False)