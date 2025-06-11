import { useRouter } from "next/router"
import ChatWindow from "./Chatwindow"
import styles from "./JoinRoomOrChatwindow.module.scss"

export default function JoinRoomOrChatwindow() {
  const router = useRouter()
  const id = router.query.chatroom

  if (!id) {
    return (
      <div className={styles.container}>
        <p className={styles.message}>Please choose a room</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <ChatWindow />
    </div>
  )
}
