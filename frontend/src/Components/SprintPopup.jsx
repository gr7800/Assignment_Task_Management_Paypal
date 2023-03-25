import React, { useState } from "react"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Textarea, Button, useDisclosure, Box } from "@chakra-ui/react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { addSprintFailure, addSprintRequest, addSprintSuccess, createSprint } from "../Redux/SprintReducer/action"

const CreateSprintModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [startDate, setStartDate] = useState("")
    const [targetDate, setTargetDate] = useState("")
    const dispatch = useDispatch()

    const handleSprint = async () => {
        onClose();
        let user = localStorage.getItem("user")
        dispatch(addSprintRequest('...Loading'));

        let Token = JSON.parse(localStorage.getItem("token")) || "";

        fetch("http://localhost:8080/sprint", {

            method: "POST",

            headers: {

                "authorization": `${Token}`

            },

            body: JSON.stringify({ title, description, startDate, targetDate, users: [user], status: false })

        }).then((res) => res.json())

            .then((res) => {

                alert(res.message);
                console.log(res);
                // dispatch(addSprintSuccess({ title, description, startDate, targetDate, status: false }));

            }).catch((err) => {

                dispatch(addSprintFailure(err));

            });
    }

    return (
        <>
            <Box display={'flex'} justifyContent='flex-end' p='2%'>
                <Button onClick={onOpen}>Create Sprint</Button>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create a Sprint</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Textarea placeholder="Enter a sprint title..." onChange={(e) => setTitle(e.target.value)} />
                        <Textarea placeholder="Enter a sprint description..." mt={4} onChange={(e) => setDescription(e.target.value)} />
                        <Textarea placeholder="Enter a start date..." mt={4} onChange={(e) => setStartDate(e.target.value)} />
                        <Textarea placeholder="Enter a target date..." mt={4} onChange={(e) => setTargetDate(e.target.value)} />
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
