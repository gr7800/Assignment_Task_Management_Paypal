import React, { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Textarea, Button, useDisclosure, Box, Input, Select } from "@chakra-ui/react";
import axios from "axios";

const CreateTaskModal = ({ sprintID }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [assign, setAssign] = useState("");
    const [startDate, setStartDate] = useState("");
    const [targetDate, setTargetDate] = useState("");

    let Token = JSON.parse(localStorage.getItem("token")) || "";
    let user = JSON.parse(localStorage.getItem("user")) || "";

    const handleTask = async () => {
        console.log({
            title,
            description,
            type,
            assign,
            startDate,
            targetDate,
            status: false,
            userID: user._id,
            sprintID: sprintID // Replace this with the actual sprint ID if it is available in the component state
        })
        try {
            const res = await axios.post(
                "https://paypal-j03v.onrender.com/task/",
                {
                    title,
                    description,
                    type,
                    assign,
                    startDate,
                    targetDate,
                    status: false,
                    userID: user._id,
                    sprintID: sprintID // Replace this with the actual sprint ID if it is available in the component state
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        authorization: Token
                    }
                }
            );
            alert(res.data.message);
            onClose();
        } catch (error) {
            alert("Failed to create task");
        }
    };

    return (
        <>
            <Box display="flex" justifyContent="flex-end" p="2%">
                <Button onClick={onOpen}>Create Task for this Sprint</Button>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create a Task</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            type="text"
                            placeholder="Enter a Task title..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            isRequired
                        />
                        <Textarea
                            placeholder="Enter a Task description..."
                            mt={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            isRequired
                        />
                        <Select
                            placeholder="Select a Task type..."
                            mt={4}
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            isRequired
                        >
                            <option value="Personal">Personal</option>
                            <option value="Official">Official</option>
                            <option value="Physical">Physical</option>
                            <option value="Sports">Sports</option>
                        </Select>
                        <Input
                            type="text"
                            placeholder="Enter a Task assignee..."
                            mt={4}
                            value={assign}
                            onChange={(e) => setAssign(e.target.value)}
                            isRequired
                        />
                        <Input
                            type="date"
                            placeholder="Enter a start date..."
                            mt={4}
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            isRequired
                        />
                        <Input
                            type="date"
                            placeholder="Enter a target date..."
                            mt={4}
                            value={targetDate}
                            onChange={(e) => setTargetDate(e.target.value)}
                            isRequired
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleTask}>
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

export default CreateTaskModal
