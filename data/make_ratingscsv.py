import pandas as pd 
import os

import pandas as pd

import numpy as np


data = pd.read_csv("./bgg-19m-reviews.csv", encoding='UTF-8')
data = data.drop(data.columns[[0,3]], axis=1)
data = data[['user','ID','rating' ]]
data = data.dropna()
data.to_csv('./ratings.csv', index=False, header=False, encoding='UTF-8')