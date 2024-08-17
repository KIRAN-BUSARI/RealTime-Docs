import Image from "next/image";
import React, { useState } from "react";
import UserTypeSelector from "./UserTypeSelector";
import { Button } from "./ui/button";
import {
  removeCollaborator,
  updateDocumentAccess,
} from "@/lib/actions/room.actions";

const Collaborator = ({
  user,
  roomId,
  collaborator,
  email,
  creatorId,
}: CollaboratorProps) => {
  const [userType, setuserType] = useState(collaborator.userType || "viewer");
  const [loading, setloading] = useState(false);

  const shareDocumentHandler = async (type: string) => {
    setloading(true);

    await updateDocumentAccess({
      email,
      roomId,
      userType: type as UserType,
      updatedBy: user,
    });

    setloading(false);
  };
  const removeCollaboratorHandler = async (email: string) => {
    setloading(true);

    await removeCollaborator({ roomId, email });

    setloading(false);
  };
  return (
    <li className="flex items-center justify-between gap-2 py-3">
      <div className="flex gap-2">
        <Image
          src={collaborator.avatar}
          alt={collaborator.name}
          width={36}
          height={36}
          className="size-9 rounded-full"
        />
        <div className="">
          <p className="text-sm line-clamp-1 font-semibold leading-4 text-white">
            {collaborator.name}
            <span className="text-10-regular pl-2 text-blue-100">
              {loading && "updating..."}
            </span>
          </p>
          <p className="text-sm font-light text-blue-100">
            {collaborator.email}
          </p>
        </div>
      </div>
      {creatorId === collaborator.id ? (
        <p className="text-sm text-blue-100">owner</p>
      ) : (
        <div className="flex items-center">
          <UserTypeSelector
            userType={userType as UserType}
            setUserType={setuserType || "viewer"}
            onClickHandler={shareDocumentHandler}
          />
          <Button
            type="button"
            onClick={() => removeCollaboratorHandler(collaborator.email)}
            className="gradient-red px-4 gap-1 flex h-9"
          >
            Remove
          </Button>
        </div>
      )}
    </li>
  );
};

export default Collaborator;
