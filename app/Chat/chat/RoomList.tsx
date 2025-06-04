import React from "react"

import {
  Button,
  Card,
  Text,
  Flex,
  Group,
  Loader,
  ScrollArea,
} from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import { IconPlus, IconX } from "@tabler/icons-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Chatroom, GetChatroomsForUserQuery } from "@/gql/graphql"
import { GET_CHATROOMS_FOR_USER } from "@/graphql/queries/GetChatroomsForUser"
import { DELETE_CHATROOM } from "@/graphql/mutations/DeleteChatroom"
import { useMutation, useQuery } from "@apollo/client"
import OverlappingAvatars from "./OverlappingAvatars"
import { RootState } from "@/store/store"
import { useSelector } from "react-redux"
import { toggleCreateRoomModal } from "@/store/chatUser/generalSlice"
function RoomList() {
  const userId = useSelector((state: RootState) => state.chatUser.id)

  const { data, loading, error } = useQuery<GetChatroomsForUserQuery>(
    GET_CHATROOMS_FOR_USER,
    {
      variables: {
        userId: userId,
      },
    }
  )
  const isSmallDevice = useMediaQuery("(max-width: 768px)")
  const defaultTextStyles: React.CSSProperties = {
    textOverflow: isSmallDevice ? "unset" : "ellipsis",
    whiteSpace: isSmallDevice ? "unset" : "nowrap",
    overflow: isSmallDevice ? "unset" : "hidden",
  }

  const defaultFlexStyles: React.CSSProperties = {
    maxWidth: isSmallDevice ? "unset" : "200px",
  }
const router = useRouter()
  const params = useParams()
  const roomId = Array.isArray(params?.id) ? params.id[0] : params?.id || "0"
  const [activeRoomId, setActiveRoomId] = React.useState<number | null>(
    parseInt(roomId)
  )

  const [deleteChatroom] = useMutation(DELETE_CHATROOM, {
    variables: {
      chatroomId: activeRoomId,
    },
    refetchQueries: [
      {
        query: GET_CHATROOMS_FOR_USER,
        variables: {
          userId: userId,
        },
      },
    ],
    onCompleted: () => {
      router.push("/")
    },
  })
  const isMediumDevice = useMediaQuery("(max-width: 992px)")
  return (
    <Flex direction={"row"} h={"100vh"} ml={"100px"}>
      <Card shadow="md" p={0}>
        <Flex direction="column" align="start">
          <Group position="apart" w={"100%"} mb={"md"} mt={"md"}>
            <Button
              onClick={toggleCreateRoomModal}
              variant="light"
              leftIcon={<IconPlus />}
            >
              Create a room
            </Button>
          </Group>
          <ScrollArea
            h={"83vh"}
            w={isMediumDevice ? "calc(100vw - 100px)" : "450px"}
          >
            <Flex direction={"column"}>
              <Flex justify="center" align="center" h="100%" mih={"75px"}>
                {loading && (
                  <Flex align="center">
                    <Loader mr={"md"} />
                    <Text c="dimmed" italic>
                      Loading...
                    </Text>
                  </Flex>
                )}
              </Flex>
              {data?.getChatroomsForUser.map((chatroom) => (
                <Link
                  style={{
                    transition: "background-color 0.3s",
                    cursor: "pointer",
                  }}
                  href={`/chatrooms/${chatroom.id}`}
                  passHref
                  key={chatroom.id}
                  onClick={() => setActiveRoomId(parseInt(chatroom.id || "0"))}
                >
                  <Card
                    style={
                      activeRoomId === parseInt(chatroom.id || "0")
                        ? { backgroundColor: "#f0f1f1" }
                        : undefined
                    }
                    mih={120}
                    py={"md"}
                    withBorder
                    shadow="md"
                  >
                    <Flex justify={"space-around"}>
                      {chatroom.users && (
                        <Flex align={"center"}>
                          <OverlappingAvatars users={chatroom.users} />
                        </Flex>
                      )}
                      {chatroom.messages && chatroom.messages.length > 0 ? (
                        <Flex
                          style={defaultFlexStyles}
                          direction={"column"}
                          align={"start"}
                          w={"100%"}
                          h="100%"
                        >
                          <Flex direction={"column"}>
                            <Text size="lg" style={defaultTextStyles}>
                              {chatroom.name}
                            </Text>
                            <Text style={defaultTextStyles}>
                              {chatroom.messages[0].content}
                            </Text>
                            <Text c="dimmed" style={defaultTextStyles}>
                              {new Date(
                                chatroom.messages[0].createdAt
                              ).toLocaleString()}
                            </Text>
                          </Flex>
                        </Flex>
                      ) : (
                        <Flex align="center" justify={"center"}>
                          <Text italic c="dimmed">
                            No Messages
                          </Text>
                        </Flex>
                      )}
                      {chatroom?.users && chatroom.users[0].id === userId && (
                        <Flex h="100%" align="end" justify={"end"}>
                          <Button
                            p={0}
                            variant="light"
                            color="red"
                            onClick={(e: any) => {
                              e.preventDefault()
                              deleteChatroom()
                            }}
                          >
                            <IconX />
                          </Button>
                        </Flex>
                      )}
                    </Flex>
                  </Card>
                </Link>
              ))}
            </Flex>
          </ScrollArea>
        </Flex>
      </Card>
    </Flex>
  )
}

export default RoomList
