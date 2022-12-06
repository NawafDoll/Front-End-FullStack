import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react"
import LogInPage from "./Pages/LoginPages"
import Router from "./Pages/Router"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router />
  </ChakraProvider>
)
