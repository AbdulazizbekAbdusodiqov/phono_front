import MainLayout from "./layouts/MainLayout"
import Sidebar from "./chat/Sidebar"
// import ProfileSettings from "./chat/ProfileSettings"
import RoomList from "./chat/RoomList"
import { Flex } from "@mantine/core"
import AddChatroom from "./chat/AddChatroom"
import JoinRoomOrChatwindow from "./chat/JoinRoomOrChatwindow"

function Chat() {

  return (
    <MainLayout>
      <div
        style={{
          position: "absolute",
        }}
      >
        {/* <ProfileSettings /> */}
        <Sidebar />
        <AddChatroom />
        <Flex direction={{ base: "column", md: "row" }}>
          <RoomList />
          <JoinRoomOrChatwindow />
        </Flex>
      </div>
    </MainLayout>
  )
}

export default Chat
