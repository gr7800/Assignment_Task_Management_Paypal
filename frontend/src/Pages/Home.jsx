import React, { useState } from 'react';
import {
  Stack,
  Text,
  HStack,
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { addSprintsFailure, addSprintsRequest, addSprintsSuccess } from '../Redux/SprintReducer/action';
import { useEffect } from 'react';
import CreateSprintModal from '../Components/SprintPopup';

const Home = () => {

  const SprintsData = useSelector((store) => store.SprintReducer.sprints);

  const dispatch = useDispatch();

  const fetchData = (url) => {

    dispatch(addSprintsRequest('...Loading'));

    let Token = JSON.parse(localStorage.getItem("token")) || "";

    fetch(url, {

      method: "GET",

      headers: {
        "authorization": `${Token}`
      },

    })

      .then((res) => res.json())

      .then((res) => {
        console.log(res);
        dispatch(addSprintsSuccess(res.sprints));

      }).catch((err) => {

        dispatch(addSprintsFailure(err));

      });

  }

  useEffect(() => {

    fetchData("http://localhost:8080/sprint");

  }, [])
  console.log(SprintsData)

  return (
    <>
      <Stack>
        {SprintsData && SprintsData.length > 0 && SprintsData?.map((e) =>
          <HStack border={"1px solid red"} p={"5px"} color={e.status ? 'orange' : 'green'} key={e._id} display="flex" gap={"20px"} justifyContent="space-evenly">
            <Text>Sprint :{e.title}</Text>
            <Text>Status :{e.status ? "Active" : "Pending"}</Text>
          </HStack>
        )}
      </Stack>
      <CreateSprintModal />
    </>
  )
}

export default Home