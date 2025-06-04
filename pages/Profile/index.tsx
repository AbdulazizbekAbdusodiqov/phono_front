// import { client } from "@/apolloClient";
import { Chat, Profile } from "@/app";
// import { ApolloProvider } from "@apollo/client";
import React from "react";

const ProfilePage = () => {
  return (
    <>
      <Profile>
        {/* <ApolloProvider client={client}> */}
          <Chat />
        {/* </ApolloProvider> */}
      </Profile>
    </>
  );
};

export default ProfilePage;
