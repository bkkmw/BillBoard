import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';

const GameResult = ({isModalOpen, setIsModalOpen, userList, setUserList, setIsInGame}) => {
    
    const [winners, setWinners] = useState([])
    const [players, setPlayers] = useState([])
    useEffect(()=>{
        setPlayers(userList)
    },[userList])

    useEffect(()=>{
        const players = userList.filter((user)=>{
            return 
        })
    },[winners])
    const setResult = () => {
        let Result = []
        for (const winner of winners) {
            console.log(winner)
            Result = [...userList.filter(user => user.id!==winner.id), {...winner, score:winner.score+1} ]
        }
        const sorted = Result.sort((a, b) => b.score - a.score);
        setUserList(sorted)


    }
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    return (
      <>
        <Modal title="Basic Modal" open={isModalOpen} footer={null}>
          <h3>winners</h3>
          {winners.map((user,i)=>{
          return(
          <Button key={`${i}${user.id}`} onClick={()=>{
            setWinners(winners.filter(winner => winner.id !== user.id))
            setPlayers([...players, user])
          }}>{user.id}</Button>)})}
          <hr/>
          <h3>players</h3>
          {players.map((user,i)=>{
          return(
          <Button key={`${i}${user.id}`} onClick={()=>{
            setWinners([...winners, user])
            setPlayers(players.filter(player => player.id!==user.id))
          }}>{user.id}</Button>)})}
          <Button onClick={()=>{
            setResult()
            handleOk()
            setIsInGame(false)
          }}>submit</Button>
        </Modal>
      </>
    );
};

export default GameResult;
