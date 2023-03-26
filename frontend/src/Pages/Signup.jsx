import React, { useState } from "react";
import {
    Box,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Button,
    Heading,
    Text,
    Image,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const SignupForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Submit form data to backend
        if (formData.email.length > 0 && formData.password.length > 0) {
            const response = await fetch("https://paypal-j03v.onrender.com/user/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (data) {
                console.log(data);
                alert(data.message);
                if(data.message==="Congratulation,User has been signup successfully"){
                    navigate("/login")
                }
            }
            console.log("data:", data);
        }else{
            alert("Please fill all the details")
        }
    };

    const handleInputChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <Flex
            align="center"
            justify={{ base: "center", md: "space-around", xl: "space-between" }}
            direction={{ base: "column-reverse", md: "row" }}
            gap={"20px"}
            padding={"20px"}
            wrap="no-wrap"
            minH="70vh"
            px={8}
            mb={16}
        >
            <Box borderRadius="15px" w={{ base: "80%", sm: "60%", md: "50%" }} p={"20px"} mb={{ base: 12, md: 0 }}>
                <Heading size="xl" fontWeight="bold" color="primary.800" mb={5}>
                    Sign up for PayPal
                </Heading>
                <form onSubmit={handleSubmit}>
                    <FormControl mb={3}>
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <Input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your name"
                            autoComplete="on"
                            isRequired
                        />
                    </FormControl>
                    <FormControl mb={3}>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email address"
                            autoComplete="on"
                            isRequired
                        />
                    </FormControl>
                    <FormControl mb={3}>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter your password"
                            autoComplete="on"
                            isRequired
                        />
                        <Text fontSize="sm" mt={1} color="gray.600">
                            Password must be at least 8 characters long
                        </Text>
                    </FormControl>
                    <Button
                        type="submit"
                        colorScheme="primary"
                        variant="solid"
                        width="full"
                        mt={8}
                        bg="blue.900"
                    >
                        Sign up
                    </Button>
                </form>
                <Text fontSize="sm" mt={3}>
                    Already have an account?{" "}
                    <Link to="/login" style={{ color: "blue", textDecoration: "underline" }}>
                        Login
                    </Link>
                </Text>
                <hr />
            </Box>
            <Box
                w={{ base: "80%", sm: "40%", md: "50%" }}
                mb={{ base: 12, md: 0 }}
                textAlign={{ base: "center", md: "left" }}
            >
                <Image
                    src="https://cutewallpaper.org/24/paypal-png/paypal-card-icon-png-transparent-png-640x4804457771-pngfind.png"
                    alt="PayPal logo"
                    borderRadius="50px"
                />
                <Text fontSize="xl" color="gray.500" mt={5}>
                    PayPal is the world's leading online payment processor
                </Text>
                <hr />
            </Box>
        </Flex>
    );
};

export default SignupForm;
