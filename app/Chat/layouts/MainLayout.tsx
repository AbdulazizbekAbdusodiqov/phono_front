import { Flex } from "@mantine/core"

const MainLayout = ({ children }: { children: React.ReactElement }) => {
  return (
    <Flex direction="row" h="100%" ml="100%">
      <Flex>{children}</Flex>
    </Flex>
  )
}

export default MainLayout
