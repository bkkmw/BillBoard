import pandas as pd
import pymysql
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.cors import CORSMiddleware
from surprise import Reader, Dataset, SVD
from SVD_last import recomm_combi, recomm_game_by_surprise, get_unplayed_surprise

ratings = []
total_games = []
games = []
algo = SVD(n_factors=50, n_epochs=20, random_state=42)
reader = Reader(line_format='user item rating',
                sep=',', rating_scale=(0.5, 10))


def init():
    print("init_start")
    global ratings, total_games, games

    conn = pymysql.connect(
        user='ssafy',
        passwd='ssafy',
        host='j8a505.p.ssafy.io',
        db='billboard',
        charset='utf8'
    )

    sql = "SELECT CAST(gameId AS CHAR) AS gameId, name FROM boardgameInfo"
    games = pd.read_sql(sql, conn)
    total_games = sorted(games['gameId'].tolist())
    sql = "SELECT userId, CAST(gameId AS CHAR) AS gameId, rating FROM review"
    ratings = pd.read_sql(sql, conn)
    print("read ratings end")

    data = Dataset.load_from_df(ratings, reader)
    trainset = data.build_full_trainset()
    algo.fit(trainset)
    print("init_end")


def reset():
    print("reset_start")
    global ratings, algo

    conn = pymysql.connect(
        user='ssafy',
        passwd='ssafy',
        host='j8a505.p.ssafy.io',
        db='billboard',
        charset='utf8'
    )

    sql = "SELECT userId, CAST(gameId AS CHAR) AS gameId, rating FROM review"
    ratings = pd.read_sql(sql, conn)
    print("read_ratings_end")

    data = Dataset.load_from_df(ratings, reader)
    trainset = data.build_full_trainset()
    algo.fit(trainset)
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


@app.get("/")
async def root2():
    return ()


@app.post("/")
async def root():
    return {"message": "Hello World!@#$"}


@app.get("/recommendation/{user_id}")
async def recommend_movie(user_id: str):
    return recomm_game_by_surprise(algo, user_id, get_unplayed_surprise(ratings, total_games, user_id), 10)


@app.post('/recommendation')
async def recommend_combination(ids: list):
    return recomm_combi(algo, ids, total_games, 10)


@app.post('/recommendation/reset')
async def reset_model():
    reset()
    return {"message": "reset completed"}

init()
