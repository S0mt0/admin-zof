/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { EventEditor } from "./components/event-editor";
import { PublishForm } from "./components/publish-form";
import { EventEditorContext } from "@/lib/contexts";
import { initEventStructure } from "./components";
import { getEvent } from "@/lib/api/requests";

export const EventEditorPage = ({ type }: { type: "new" | "edit" }) => {
  const [eventData, setEventData] =
    useState<EventStructure>(initEventStructure);
  const [editorState, setEditorState] = useState<EditorState>("editor");
  const [draftState, setDraftState] = useState<boolean>(false);
  const [date, setDate] = useState<Date>();

  const eventId = useParams().eventId || "";

  if (type === "edit") {
    const { data: event, isSuccess } = useQuery({
      queryKey: ["event", eventId],
      queryFn: () => getEvent(eventId),
    });

    useEffect(() => {
      if (isSuccess && event) setEventData(event);
    }, [event, isSuccess]);
  }

  return (
    <EventEditorContext.Provider
      value={{
        eventData,
        setEventData,
        editorState,
        setEditorState,
        draftState,
        setDraftState,
        type,
        date,
        setDate,
      }}
    >
      {editorState === "editor" ? <EventEditor /> : <PublishForm />}
    </EventEditorContext.Provider>
  );
};
