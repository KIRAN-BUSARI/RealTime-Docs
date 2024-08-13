"use client";

import { deleteDocument } from "@/lib/actions/room.actions";
import Image from "next/image";
import React from "react";

const DeleteDocumentBtn = ({
  roomId,
  email,
}: {
  roomId: string;
  email: string;
}) => {
  const deleteDocumenrtHandler = async () => {
    try {
      const room = await deleteDocument(roomId, email);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="">
      <button type="submit" onClick={deleteDocumenrtHandler}>
        <Image
          src={"/assets/icons/delete.svg"}
          alt="Delete"
          width={24}
          height={24}
          className="inline text-red-500 hover:text-red-700 text-base"
        />
      </button>
    </div>
  );
};

export default DeleteDocumentBtn;
