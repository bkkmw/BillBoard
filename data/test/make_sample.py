import pandas as pd 
import os

import pandas as pd

import numpy as np


data = pd.read_csv("./bgg-19m-reviews.csv", encoding='UTF-8')
data = data[1:20]
data = data[['user','ID','rating' ]]
data.to_csv('./ratings_sample.csv', index=False, header=False, encoding='UTF-8')