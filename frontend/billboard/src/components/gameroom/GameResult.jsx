import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { postGameHistory, selectgameroom, setGame, setGameEnd, setPlayTime, setPlayer } from '../../store/gameroom';


const GameResult = ({ isModalOpen, setIsModalOpen }) => {
  const dispatch = useDispatch()

  const userList = useSelector(selectgameroom).players
  const gameInfo = useSelector(selectgameroom).gameInfo
  const playTime = parseInt(useSelector(selectgameroom).playTime / 60)
  const [winners, setWinners] = useState([])
  const [players, setPlayers] = useState([])
  useEffect(() => {
    setPlayers(userList)
  }, [userList])

  const setResult = () => {
    console.log(players)
    console.log(winners)
    let Result = [...userList]

    for (const winner of winners) {

      Result = [...Result.filter(user => user.userId !== winner.userId), { ...winner, winCount: winner.winCount + 1 }]

    }

    const sorted = Result.sort((a, b) => b.winCount - a.winCount);
    dispatch(setPlayer(sorted))
    const data = {
      'gameId': gameInfo.gameId,
      'users': players.map(player => player.userId),
      'winners': winners.map(player => player.userId),
      'playTime': playTime,

    }
    dispatch(postGameHistory(data))
      .then((res) => {
        console.log(res)
        handleOk()
        dispatch(setGameEnd())
      })
      .catch((err) => {
        console.log(err)
      })




  }
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal title="Basic Modal" open={isModalOpen} footer={null} >
        <>{playTime}</>
        <h3>winners</h3>
        {winners.map((user, i) => {
          return (
            <Button key={`${i}${user.userId}`} onClick={() => {
              setWinners(winners.filter(winner => winner.userId !== user.userId))
              setPlayers([...players, user])
            }}>{user.userId}</Button>)
        })}
        <hr />
        <h3>players</h3>
        {players.map((user, i) => {
          return (
            <Button key={`${i}${user.userId}`} onClick={() => {
              setWinners([...winners, user])
              setPlayers(players.filter(player => player.userId !== user.userId))
            }}>{user.userId}</Button>)
        })}

        <Button onClick={() => {
          setResult()

        }}>submit</Button>
      </Modal>
    </>
  );
};

export default GameResult;
