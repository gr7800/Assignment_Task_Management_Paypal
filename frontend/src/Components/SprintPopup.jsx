import React, { useState } from "react"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useDisclosure, Box, Input } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import {  addSprintRequest, addSprintSuccess } from "../Redux/SprintReducer/action"

const CreateSprintModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [startDate, setStartDate] = useState("")
    const [targetDate, setTargetDate] = useState("")
    const dispatch = useDispatch()

    let Token = JSON.parse(localStorage.getItem("token")) || "";
    let user = JSON.parse(localStorage.getItem("user")) || "";
    console.log(Token, user)
    let isAuth = useSelector((store) => store.authReducer.isAuth);
    const handleSprint = async () => {

        dispatch(addSprintRequest('...Loading'));

        let data = { title, description, startDate, targetDate, users: [user], status: false, userID: user._id }

        const response = await fetch("https://paypal-j03v.onrender.com/sprint/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `${Token}`
            },
            body: JSON.stringify(data),
        });
        const gt = await response.json();
        // console.log(gt)
        dispatch(addSprintSuccess(gt.sprint));
        alert(gt.message);
        onClose();

    }

    return (
        <>
            <Box display={'flex'} justifyContent="space-evenly" p='2%'>
                <Box fontSize={"20px"} fontWeight={"bold"} color="red"> {isAuth ? `Welcome to Paypal Task Mangement App ${user.name}` : "Please Login Fist"}</Box>
                <Button onClick={onOpen}>Create Sprint</Button>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create a Sprint</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input type={"text"} placeholder="Enter a sprint title..." onChange={(e) => setTitle(e.target.value)} />
                        <Input type={"text"} placeholder="Enter a sprint description..." mt={4} onChange={(e) => setDescription(e.target.value)} />
                        <Input type={"date"} placeholder="Enter a start date..." mt={4} onChange={(e) => setStartDate(e.target.value)} />
                        <Input type={"date"} placeholder="Enter a target date..." mt={4} onChange={(e) => setTargetDate(e.target.value)} />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleSprint}>
                            Create
                        </Button>
                        <Button variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CreateSprintModal
