import React, { FC } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { observer, useQuery } from "startupjs";
import { alert } from "@startupjs/ui";
import { ListItem } from "components";

const Chats: FC = observer(() => {
  const [messages = [], $messages] = useQuery<any[]>("messages", {});

  const arr: string[] = new Array(50).fill("_");

  return (
    <ScrollView>
      {arr.map((__, index) => (
        <ListItem
          title={"Chat " + index}
          description="06/12/2022"
          key={index}
          descriptionPosition="right"
          italic
          onPress={() => alert("allert")}
        />
      ))}
    </ScrollView>
  );
});

export default Chats;
