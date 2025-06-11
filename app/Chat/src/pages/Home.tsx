import RoomList from "../components/RoomList"
import JoinRoomOrChatwindow from "../components/JoinRoomOrChatwindow"
import { useIsMobile } from "@/hooks/UseIsMobile"

function Home() {
  const isMobile = useIsMobile()

  return (
    
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <RoomList />
          <JoinRoomOrChatwindow />
        </div>
      </div>
    
  )
}

export default Home