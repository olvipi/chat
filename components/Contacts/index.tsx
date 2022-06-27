import React, { FC } from "react";
import { ScrollView } from "react-native";
import { observer, useQuery, useSession } from "startupjs";
import { alert } from "@startupjs/ui";
import { ListItem } from "components";

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  description?: string;
  avatarUrl?: string;
}

const Contacts: FC = () => {
  const [user] = useSession<IUser>("user");
  const [users] = useQuery<IUser[]>("users", { _id: { $ne: user?.id } });

  return (
    <ScrollView>
      {users?.map((item) => (
        <ListItem
          key={item.id}
          title={`${item.firstName} ${item.lastName}`}
          description={item.description || " "}
          avatar={item.avatarUrl}
          onPress={() => alert(JSON.stringify(item))}
        />
      ))}
    </ScrollView>
  );
};

export default observer(Contacts);
