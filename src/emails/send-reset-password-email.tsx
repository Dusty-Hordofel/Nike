import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

const SendResetPasswordEmail = ({
  resetPasswordCode,
}: {
  resetPasswordCode: number;
}) => {
  return (
    <Html lang="fr" dir="ltr">
      <Head />
      <Preview>Voici ton code de vérification unique </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logo}>
            <Img
              width="100%"
              src="https://res.cloudinary.com/dgsc66scx/image/upload/v1718098586/nike/nike_banner.png"
            />
          </Section>
          <Section>
            <div style={section}>
              <Heading as="h1" style={title}>
                Le code de ton profil de membre Nike
              </Heading>
              <Text style={text}>
                Voici le code de vérification unique que tu nous as demandé :
              </Text>
            </div>

            <Hr />
            <Text style={code}>{resetPasswordCode}</Text>
            <Hr />
            <div style={section}>
              <Text style={duration}>Ce code expirera dans 15 minutes.</Text>
              <Text style={text}>
                Si tu as déjà reçu ce code ou si tu n&apos;en as plus besoin, tu
                peux ignorer cet e-mail.
              </Text>
              <Link style={websiteLink}>Nike.com</Link>
            </div>
            <div style={section}>
              <Hr />
              <Text style={text}>
                {" "}
                © 2024 Nike, Inc. Tous droits réservés{" "}
              </Text>
              <Text style={text}>
                NIKE Retail B.V., Colosseum 1, 1213 NL, Hilversum, The
                Netherlands
              </Text>
              <Text style={text}>
                Politique de confidentialitéObtenir de l&apos;aide
              </Text>
            </div>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  // backgroundColor: "brown",
};
const container = {};
const logo = {};
const title = {
  fontSize: "30px",
};

const section = {
  paddingBottom: "40px",
  paddingLeft: "20px",
  paddingRight: "20px",
};

const code = {
  fontSize: "42px",
  fontWeight: "bold",
  height: "100px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const duration = {
  fontWeight: "bold",
  fontSize: "16px",
};
const text = {
  color: "#757575",
};

const websiteLink = {
  fontWeight: "bold",
  fontSize: "24px",
  color: "#000000",
};

export default SendResetPasswordEmail;
