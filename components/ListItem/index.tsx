import React, { FC } from "react";
import { Avatar, Row, Div, H6, Span } from "@startupjs/ui";
import "./index.styl";

interface ListItemProps {
  avatar?: string;
  title?: string;
  description?: string;
  descriptionPosition?: "right" | "left";
  italic?: boolean;
  onPress: () => void;
}

const ListItem: FC<ListItemProps> = ({
  avatar,
  title,
  description,
  descriptionPosition,
  italic,
  onPress,
}) => {
  return (
    <Row styleName="root" onPress={onPress}>
      <Avatar size="s" src={avatar} name="title" />
      <Div styleName="main">
        <H6>{title}</H6>
        <Span
          styleName={[
            "description",
            { right: descriptionPosition === "right" },
          ]}
          description
          italic={italic}
        >
          {description}
        </Span>
      </Div>
    </Row>
  );
};

export default ListItem;
