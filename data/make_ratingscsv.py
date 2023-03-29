import pandas as pd 
import os

import pandas as pd

import numpy as np


data = pd.read_csv("./bgg-19m-reviews.csv", encoding='cp949')
data = data.drop(data.columns[[0,3]], axis=1)
data = data[['user','ID','rating' ]]
data = data.dropna()
data.to_csv('./ratings949.csv', index=False, header=False, encoding='cp949')