from typing import List, Union
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
import pymysql
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware
import certifi
import pandas as pd
from surprise import Reader, Dataset, SVD
from surprise.dataset import DatasetAutoFolds
from SVD_last import recomm_combi, recomm_game_by_surprise, recomm_game_by_surprise_sortbyiid, get_unplayed_surprise
from fastapi import FastAPI

ratings = []
total_games = []
games = []
algo = SVD(n_factors=50, n_epochs=20, random_state=42)
reader = Reader(line_format = 'user item rating', sep=',', rating_scale=(0.5,10))

conn = pymysql.connect(
        user='ssafy', 
        passwd='ssafy', 
        host='j8a505.p.ssafy.io', 
        db='billboard', 
        charset='utf8'
    )
def init():
    print("init_start")
    global ratings, total_games, games
    
    sql = "SELECT gameId, name FROM boardgameInfo"
    
    games = pd.read_sql(sql, conn)
    total_games = sorted(games['gameId'].tolist())

    sql = "SELECT userId, gameId, rating FROM review"
    ratings = pd.read_sql(sql, conn)

    print("read_rating_end")
    
    data = Dataset.load_from_df(ratings[["userId", "gameId", "rating"]], reader)
    train_set = data.build_full_trainset()
    algo.fit(train_set)

    print("init_end")

def reset():
    print("reset_start")
    global ratings, algo
    sql = "SELECT userId, gameId, rating FROM review"
    tmp_ratings = pd.read_sql(sql, conn)

    data = Dataset.load_from_df(tmp_ratings[["userId", "gameId", "rating"]], reader)
    train_set = data.build_full_trainset()
    tmp_algo = SVD(n_factors=50, n_epochs=20, random_state=42)
    tmp_algo.fit(train_set)

    ratings = tmp_ratings
    algo = tmp_algo
    print("reset_end")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    # allow_origins = origins,
    # # Todo: 일단 포함안함, 나중에 수정할수도 있음
    # allow_credentials = False,
    # allow_methods=['*'],
    # allow_headers=['*']
)

class CombinationModel(BaseModel):
    ids:list

@app.get("/")
async def root():
    return ()

@app.post("/")
async def root():
    return {"message": "Hello World!@#$"}

@app.get("/recommendation/{user_id}")
async def recommend_movie(user_id:str):

    # -----------추천 알고리즘------------
    top_n = 10
    unplayed_games = get_unplayed_surprise(ratings, total_games, user_id)
    top_games_preds = recomm_game_by_surprise(algo, user_id, unplayed_games, games, top_n)
    return {"result": top_games_preds}


@app.post('/recommendation')
async def recommend_combination(ids:CombinationModel):

    gameset=recomm_combi(algo, ids, total_games, games, 20)

    return gameset


@app.post('/recommendation/reset')
async def reset_model():
    reset()

init()