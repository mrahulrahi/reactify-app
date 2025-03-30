'use client'
import { Box, Flex, Card, Text, Heading, Input, InputGroup, FormControl, FormLabel, InputRightElement, Button, Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator, Image, Link, Checkbox, Stack, CheckboxGroup, FormErrorMessage } from "@chakra-ui/react"
import React from "react"

export default function LoginPage() {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    return (
        <Flex flexFlow="column" w="100%" h="100vh">
            <Box mx="auto" py="40px" mb="14px">
                <Box w="105px"><Image objectFit='cover' src='/bitbrand-logo.png' alt='Bitbrand logo' /></Box>
            </Box>
            <Card maxW={344} w="100%" mx="auto" borderRadius={10} bg="#fff" p="30px 22px" boxShadow="1px 1px 100px 0px rgba(0, 0, 0, 0.25)">
                <Flex alignItems="center" justifyContent="space-between" mb="20px">
                    <Heading as='h1' fontSize={14} m={0} fontWeight="700">Welcome to Bitbrand</Heading>
                    <Box as="a" w="10px" h="10px" href="/" ><Image objectFit='cover' src='close-icon.svg' alt='Bitbrand logo' /></Box>
                </Flex>
                <Box>
                    <Tabs position="relative" variant="unstyled">
                        <TabList gap="32px" pb="5px" _after={{ content: '""', w: '100%', h: '2px', bg: 'bitbrand.gray.300', position: 'absolute', top: '19px', left: '0', }}>
                            <Tab p={0} fontSize="14px" fontWeight="400" lineHeight={1} _selected={{ fontWeight: 'bold' }}>Sign in</Tab>
                            <Tab p={0} fontSize="14px" fontWeight="400" lineHeight={1} _selected={{ fontWeight: 'bold' }}>Register</Tab>
                        </TabList>
                        <TabIndicator h="2px" bg="bitbrand.black.500" borderRadius="1px" />
                        <TabPanels mt="20px">
                            <TabPanel p={0}>
                                <FormControl mb="28px" isInvalid>
                                    <FormLabel lineHeight={1}>Email *</FormLabel>
                                    <Input p="8px 12px" type='email' _focusWithin={{ boxShadow: "none" }} _invalid={{ borderColor: "#E70909", boxShadow: "none" }} />
                                </FormControl>
                                <FormControl mb="12px" isInvalid>
                                    <FormLabel lineHeight={1}>Password *</FormLabel>
                                    <InputGroup size='md' gap="10px">
                                        <Input p="8px 12px" pr="45px" type={show ? 'text' : 'password'} _focusWithin={{ boxShadow: "none" }} _invalid={{ borderColor: "#E70909", boxShadow: "none" }} />
                                        <InputRightElement w="40px" h="40px" position="relative" border="1px solid" borderColor="bitbrand.gray.800" borderRadius="5px" flexShrink={0}>
                                            <Flex as="button" w="18px" h="18px" alignItems="center" justifyContent="center" bg="transparent" _hover={{ bg: 'transparent' }} onClick={handleClick} >
                                                {show ?
                                                    <Image objectFit='contain' src='password-open-eye.svg' />
                                                    : <Image objectFit='contain' src='password-close-eye.svg' />
                                                }
                                            </Flex>
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>

                                <Flex justifyContent="end" mb="15px" fontSize="12px" lineHeight={1}><Link textDecoration="underline" _hover={{ textDecoration: 'none' }}>Forgot password?</Link></Flex>
                                <Flex alignItems="center" gap="8px" padding="6px 10px" bg="#FFDBDB" w="100%" borderRadius="5px" mb="15px">
                                    <Image objectFit='cover' src='error-icon.svg' alt='' />
                                    <Text fontSize="12px" lineHeight={1} color="#E70909">Wrong email or password</Text>
                                </Flex>
                                <Box><Button type="submit" w="100%" mb="28px" lineHeight={1}>Sign In</Button></Box>
                                <Flex justifyContent="center" fontSize="12px" lineHeight={1}>Don’t have an account? <Link ml="4px" textDecoration="underline" _hover={{ textDecoration: 'none' }}>Register</Link></Flex>
                            </TabPanel>
                            <TabPanel p={0}>
                                <FormControl mb="28px" isInvalid >
                                    <FormLabel lineHeight={1}>Email *</FormLabel>
                                    <Box position="relative" w="100%">
                                        <Input p="8px 12px" type='email' _focusWithin={{ boxShadow: "none" }} _invalid={{ borderColor: "#E70909", boxShadow: "none" }} />
                                        <FormErrorMessage position="absolute" top="0" right="13px" mt="10px"><Image objectFit='cover' src='error-icon.svg' alt='' /></FormErrorMessage>
                                    </Box>
                                    <FormErrorMessage position="absolute" top="100%" left={0} fontSize="12px" lineHeight={1} mt="10px" color="#E70909">Please enter a valid email address.</FormErrorMessage>
                                </FormControl>
                                <FormControl mb="28px">
                                    <FormLabel lineHeight={1}>First Name</FormLabel>
                                    <Input p="8px 12px" type='text' _focusWithin={{ boxShadow: "none" }} />
                                </FormControl>
                                <FormControl mb="28px">
                                    <FormLabel lineHeight={1}>Last Name</FormLabel>
                                    <Input p="8px 12px" type='text' _focusWithin={{ boxShadow: "none" }} />
                                </FormControl>
                                <FormControl mb="40px" isInvalid>
                                    <FormLabel lineHeight={1}>Password *</FormLabel>
                                    <InputGroup size='md' gap="10px">
                                        <Box position="relative" w="100%">
                                            <Input p="8px 12px" pr="45px" type={show ? 'text' : 'password'} _focusWithin={{ boxShadow: "none" }} _invalid={{ borderColor: "#E70909", boxShadow: "none" }} />
                                            <FormErrorMessage position="absolute" top="0" right="13px" mt="10px"><Image objectFit='cover' src='error-icon.svg' alt='' /></FormErrorMessage>
                                        </Box>
                                        <InputRightElement w="40px" h="40px" position="relative" border="1px solid" borderColor="bitbrand.gray.800" borderRadius="5px" flexShrink={0}>
                                            <Flex as="button" w="18px" h="18px" alignItems="center" justifyContent="center" bg="transparent" _hover={{ bg: 'transparent' }} onClick={handleClick} >
                                                {show ?
                                                    <Image objectFit='contain' src='password-open-eye.svg' />
                                                    : <Image objectFit='contain' src='password-close-eye.svg' />
                                                }
                                            </Flex>
                                        </InputRightElement>
                                    </InputGroup>
                                    <FormErrorMessage position="absolute" top="100%" left={0} fontSize="12px" lineHeight={1} mt="10px" color="#E70909">Must to be at least 8 characters</FormErrorMessage>
                                </FormControl>

                                <Box mb="44px">
                                    <Text mb="32px" fontSize="12px">I agree to Bitbrand's <Link textDecoration="underline" _hover={{ textDecoration: 'none' }}>Terms and Conditions</Link>, <Link textDecoration="underline" _hover={{ textDecoration: 'none' }}>Digital Product Owner Agreement</Link>, and <Link textDecoration="underline" _hover={{ textDecoration: 'none' }}>Privacy Policy</Link>.</Text>
                                    <CheckboxGroup colorScheme='gray'>
                                        <Stack spacing="23px" >
                                            <Checkbox size="lg" alignItems="start" spacing="14px" borderColor="black" _focus={{ boxShadow: "none" }} _checked={{
                                                "& .chakra-checkbox__control": { background: "black", borderColor: "black", borderRadius: "5px" }
                                            }} >
                                                <Text fontSize="12px">I confirm that I have access to the email address provided above and therefore any digital purchases delivered to that address.</Text>
                                                <Text fontSize="12px" lineHeight={1} color="#E70909" mt="5px">This field is required.</Text></Checkbox>
                                            <Checkbox size="lg" alignItems="start" spacing="14px" borderColor="black" _focus={{ boxShadow: "none" }} _checked={{
                                                "& .chakra-checkbox__control": { background: "black", borderColor: "black", borderRadius: "5px" }
                                            }} >
                                                <Text fontSize="12px">Sign up to never miss new collections.</Text>
                                                <Text fontSize="12px" lineHeight={1} color="#E70909" mt="5px">This field is required.</Text></Checkbox>
                                        </Stack>
                                    </CheckboxGroup>
                                </Box>

                                <Box><Button w="100%" lineHeight={1}>Register</Button></Box>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Card>
        </Flex>
    );
}
