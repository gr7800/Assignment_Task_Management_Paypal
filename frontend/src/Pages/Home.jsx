import React from 'react';
import {
  Stack,
  Text,
  HStack,
  Button,
  Flex,
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { addSprintsFailure, addSprintsRequest, addSprintsSuccess } from '../Redux/SprintReducer/action';
import { useEffect } from 'react';
import CreateSprintModal from '../Components/SprintPopup';
import CreateTaskModal from '../Components/TaskPopup';

const Home = () => {

  const SprintsData = useSelector((store) => store.SprintReducer.sprints);
  let Token = JSON.parse(localStorage.getItem("token")) || "";
  const dispatch = useDispatch();

  const fetchData = (url) => {
    dispatch(addSprintsRequest('...Loading'));
    fetch(url, {
      method: "GET",
      headers: {
        "authorization": `${Token}`
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        dispatch(addSprintsSuccess(res.sprints));

      }).catch((err) => {
        dispatch(addSprintsFailure(err));
      });

  }

  const HandleUpdate = (el) => {
    el["status"] = !el["status"];

    fetch(`https://paypal-j03v.onrender.com/sprint/${el._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "authorization": `${Token}`
      },
      body: JSON.stringify(el)
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        fetchData("https://paypal-j03v.onrender.com/sprint");
        alert(res.message);
        dispatch(addSprintsSuccess(res.sprints));
      })
      .catch((err) => {
        alert(err.message);
        dispatch(addSprintsFailure(err));
      });
  };


  const handleDelete = (el) => {
    fetch(`https://paypal-j03v.onrender.com/sprint/${el._id}`, {
      method: "DELETE",
      headers: {
        "authorization": `${Token}`
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        fetchData("https://paypal-j03v.onrender.com/sprint")
        alert(res.message)
        dispatch(addSprintsSuccess(res.sprints));
      }).catch((err) => {
        alert(err.message);
        dispatch(addSprintsFailure(err));

      });
  }
  useEffect(() => {
    fetchData("https://paypal-j03v.onrender.com/sprint");
  }, [])
  // console.log(SprintsData)

  return (
    <>
      <CreateSprintModal fetchData={fetchData} />
      <Stack>
        {SprintsData && SprintsData.length > 0 && SprintsData?.map((e) =>
          <HStack border={"1px solid red"} p={"5px"} bg="pink.100" color={e.status ? 'black' : 'red'} key={e._id} display="flex" flexDirection={"column"} gap={"20px"} justifyContent="space-evenly">
            <Flex justifyContent={"space-evenly"} w={"80%"}>
              <Text>Sprint :{e.title}</Text>
              <Text>Status :{e.status ? "Active" : "Pending"}</Text>
            </Flex>
            <Flex justifyContent={"space-evenly"} w={"80%"} >
              <Text>Description :{e.description}</Text>
              <Text>StartDate : {e.startDate}   TargetDate:{e.targetDate}</Text>
            </Flex>
            <Flex justifyContent={"space-evenly"} w={"80%"}>
              <Button bg={e.status ? "green" : "red"} color={e.status ? "red" : "white"} onClick={() => HandleUpdate(e)}>Change Status</Button>
              <Button bg={"red"} color="white" onClick={() => handleDelete(e)}>Delete</Button>
              <CreateTaskModal sprintID={e._id}/>
            </Flex>
          </HStack>
        )}
      </Stack>
    </>
  )
}

export default Home