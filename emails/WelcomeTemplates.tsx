import React from "react";
import {
  Html,
  Body,
  Container,
  Text,
  Link,
  Preview,
} from "@react-email/components";

const WelcomeTemplates = ({name}: {name: string}) => {
  return (
    <html>
      <Preview>Hello Welcome Aboard !</Preview>
      <Body>
        <Container>
          <Text>Hello {name}</Text>
          <Link href="https://localhost:3000">go to dev</Link>
        </Container>
      </Body>
    </html>
  );
};

export default WelcomeTemplates;
