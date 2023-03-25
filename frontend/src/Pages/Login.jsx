import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/Auth/auth.action";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const Auth = useSelector((store) => store.authReducer.isAuth);
    const dispatch = useDispatch()
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Submit form data to backend
        if (formData.email.length > 0 && formData.password.length > 0) {
            dispatch(login(formData));
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

    useEffect(() => {
        if (Auth) {
            navigate("/")
        }
    }, [Auth])

    
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
                    Login up for PayPal
                </Heading>
                <form onSubmit={handleSubmit}>
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
                        Submit
                    </Button>
                </form>
                <Text fontSize="sm" mt={3}>
                    Don't have an account?{" "}
                    <Link to="/signup" style={{ color: "blue", textDecoration: "underline" }}>
                        Signup
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

export default LoginPage;
