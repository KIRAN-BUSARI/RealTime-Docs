"use server";

import { clerkClient } from "@clerk/nextjs/server";
import { parseStringify } from "../utils";
import { liveblocks } from "../liveblocks";

export const getClerkUsers = async ({ userIds }: { userIds: string[] }) => {
  try {
    const { data } = await clerkClient.users.getUserList({
      emailAddress: userIds,
    });

    const users = data.map((user) => ({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.emailAddresses[0].emailAddress,
      avatar: user.imageUrl,
    }));

    const sortedUsers = userIds.map((email) =>
      users.find((user) => user.email === email)
    );

    return parseStringify(sortedUsers);
  } catch (error) {
    console.log(`Error fetching users ${error}`);
  }
};

export const getDocumentUsers = async ({
  roomId,
  text,
  currentUser,
}: {
  roomId: string;
  text: string;
  currentUser: string;
}) => {
  try {
    const room = await liveblocks.getRoom(roomId);

    const roomUsers = Object.keys(room.usersAccesses).filter(
      (email) => email !== currentUser
    );
    if (text.length) {
      const lowerText = text.toLowerCase();

      const filteredUsers = roomUsers.filter((email: string) =>
        email.toLowerCase().includes(lowerText)
      );

      return parseStringify(filteredUsers);
    }
    return parseStringify(roomUsers);
  } catch (error) {
    console.log(`Error fetching users ${error}`);
  }
};
