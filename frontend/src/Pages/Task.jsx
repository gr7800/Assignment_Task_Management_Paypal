import React, { useState } from 'react';
import {
  Stack,
  Text,
  HStack,
  Button,
  Flex,
} from '@chakra-ui/react'
import { useEffect } from 'react';

const Task = () => {

  const [task, setTask] = useState();

  let Token = JSON.parse(localStorage.getItem("token")) || "";

  const fetchData = (url) => {
    fetch(url, {
      method: "GET",
      headers: {
        "authorization": `${Token}`
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setTask(res.task);
      }).catch((err) => {
        alert(err.message)
      });

  }

  const HandleUpdate = (el) => {
    el.status = !el.status;
    console.log(el)
    fetch(`https://paypal-j03v.onrender.com/task/${el._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "authorization": `${Token}`
      },
      body: JSON.stringify(el)
    })
      .then((res) => res.json())
      .then((res) => {
        fetchData("https://paypal-j03v.onrender.com/task");
        alert(res.message);
      })
      .catch((err) => {
        alert(err.message);
      });
  };


  const handleDelete = (el) => {
    fetch(`https://paypal-j03v.onrender.com/task/${el._id}`, {
      method: "DELETE",
      headers: {
        "authorization": `${Token}`
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        fetchData("https://paypal-j03v.onrender.com/task")
        alert(res)
      }).catch((err) => {
        alert(err.message);
      });
  }
  useEffect(() => {
    fetchData("https://paypal-j03v.onrender.com/task");
  }, [])


  return (
    <>
      <Stack>
        {task && task.length > 0 && task?.map((e) =>
          <HStack border={"1px solid red"} p={"5px"} bg="pink.100" color={e.status ? 'black' : 'red'} key={e._id} display="flex" flexDirection={"column"} gap={"20px"} justifyContent="space-evenly">
            <Flex justifyContent={"space-evenly"} w={"80%"}>
              <Text>Task :{e.title}</Text>
              <Text>Status :{e.status ? "Active" : "Pending"}</Text>
              <Text>Assigned to : {e.assign}</Text>
            </Flex>
            <Flex justifyContent={"space-evenly"} w={"80%"} >
              <Text>Description :{e.description}</Text>
              <Text>StartDate : {e.startDate}   TargetDate:{e.targetDate}</Text>
            </Flex>
            <Flex justifyContent={"space-evenly"} w={"80%"}>
              <Button bg={e.status ? "green" : "red"} color={e.status ? "red" : "white"} onClick={() => HandleUpdate(e)}>Change Status</Button>
              <Button bg={"red"} color="white" onClick={() => handleDelete(e)}>Delete</Button>
            </Flex>
          </HStack>
        )}
      </Stack>
    </>
  )
}

export default Task