import React, { useEffect } from "react"
import { useParams } from "next/navigation"
import ChatWindow from "./Chatwindow"
import { Flex, Text } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"

function JoinRoomOrChatwindow() {
  const params = useParams()
  const id = typeof params?.id === "string" ? params.id : Array.isArray(params?.id) ? params.id[0] : undefined

  const [content, setContent] = React.useState<string | React.ReactNode>("")

  useEffect(() => {
    if (!id) {
      setContent("Please choose a room")
    } else {
      setContent(<ChatWindow />)
    }
  }, [setContent, id])

  return (
    <Flex h="100vh" align={"center"} justify={"center"}>
      <Text ml={!id ? "xl" : "none"} size={!id ? "xl" : ""}>
        {content}
      </Text>
    </Flex>
  )
}

export default JoinRoomOrChatwindow
