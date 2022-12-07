import { Box, Flex, Grid, RingProgress, Text } from "@mantine/core";
import { useSelector } from "react-redux";
import { useDasboard } from "../../lib";
import { RootState } from "../../stores";
import Emoji from "react-emojis";

const Dashboard = () => {
  const { token, user } = useSelector((state: RootState) => state.clickState);
  const { data } = useDasboard(!!user?.id ? user?.id : 0, token);
  console.log("dt", data);

  return (
    <Box>
      <Grid gutter={5} grow>
        <Grid.Col
          xs={12}
          sm={3}
          md={4}
          lg={4}
          xl={3}
          m={5}
          sx={(theme) => ({
            backgroundColor: theme.colors.blue,
            color: theme.colors.white,
            borderRadius: "10px",
            padding: "10px",
          })}
        >
          <Flex direction={"column"}>
            <Text
              sx={(theme) => ({
                fontFamily: "Roboto",
                fontStyle: "normal",
                fontWeight: 700,
                fontSize: "20px",
                lineHeight: "23px",
              })}
            >
              Saldo
            </Text>
            <Text
              sx={(theme) => ({
                fontFamily: "Roboto",
                fontStyle: "normal",
                fontWeight: 700,
                fontSize: "28px",
                lineHeight: "33px",
              })}
            >
              R$ {data?.total_saldo?.toFixed(2)}
            </Text>
          </Flex>
        </Grid.Col>

        <Grid.Col
          xs={12}
          sm={3}
          md={4}
          lg={4}
          xl={3}
          m={5}
          sx={(theme) => ({
            backgroundColor: theme.colors.orange,
            color: theme.colors.white,
            borderRadius: "10px",
            padding: "10px",
          })}
        >
          <Text
            sx={(theme) => ({
              fontFamily: "Roboto",
              fontStyle: "normal",
              fontWeight: 700,
              fontSize: "20px",
              lineHeight: "23px",
            })}
          >
            Entradas
          </Text>
          <Text
            sx={(theme) => ({
              fontFamily: "Roboto",
              fontStyle: "normal",
              fontWeight: 700,
              fontSize: "28px",
              lineHeight: "33px",
            })}
          >
            R$ {data?.total_recebimentos?.toFixed(2)}
          </Text>
        </Grid.Col>

        <Grid.Col
          xs={12}
          sm={3}
          md={4}
          lg={4}
          xl={3}
          m={5}
          sx={(theme) => ({
            backgroundColor: theme.colors.red,
            color: theme.colors.white,
            borderRadius: "10px",
            padding: "10px",
          })}
        >
          <Text
            sx={(theme) => ({
              fontFamily: "Roboto",
              fontStyle: "normal",
              fontWeight: 700,
              fontSize: "20px",
              lineHeight: "23px",
            })}
          >
            Saídas
          </Text>
          <Text
            sx={(theme) => ({
              fontFamily: "Roboto",
              fontStyle: "normal",
              fontWeight: 700,
              fontSize: "28px",
              lineHeight: "33px",
            })}
          >
            R$ {data?.total_gastos?.toFixed(2)}
          </Text>
        </Grid.Col>
      </Grid>

      <Grid gutter={5} grow>
        <Grid.Col
          xs={12}
          sm={11}
          md={11}
          m={5}
          sx={(theme) => ({
            backgroundColor: theme.colors.blue,
            color: theme.colors.white,
            borderRadius: "10px",
            padding: "10px",
          })}
        >
          <Text
            sx={(theme) => ({
              fontFamily: "Roboto",
              fontStyle: "normal",
              fontWeight: 700,
              fontSize: "20px",
              lineHeight: "23px",
            })}
          >
            {data?.status ? "Muito bem!" : "O que pena!"}
            {data?.status ? (
              <Emoji emoji="grinning-face-with-big-eyes" />
            ) : (
              <Emoji emoji="loudly-crying-face" />
            )}
          </Text>
          <Text
            sx={(theme) => ({
              fontFamily: "Roboto",
              fontStyle: "normal",
              fontWeight: 700,
              fontSize: "20px",
              lineHeight: "23px",
            })}
          >
            {data?.status
              ? "Sua carteira está positiva!"
              : "Sua carteira está negativa!"}
            {data?.status ? (
              <Emoji emoji="money-bag" />
            ) : (
              <Emoji emoji="credit-card" />
            )}
          </Text>
        </Grid.Col>
      </Grid>

      <Grid gutter={5} grow>
        <Grid.Col
          xs={12}
          sm={4}
          md={6}
          lg={5}
          xl={5}
          m={5}
          sx={(theme) => ({
            backgroundColor: theme.colors.orange,
            color: theme.colors.white,
            borderRadius: "10px",
            padding: "10px",
          })}
        >
          <Text
            sx={(theme) => ({
              fontFamily: "Roboto",
              fontStyle: "normal",
              fontWeight: 700,
              fontSize: "20px",
              lineHeight: "23px",
            })}
          >
            Entradas Eventuais
          </Text>
          <Text
            sx={(theme) => ({
              fontFamily: "Roboto",
              fontStyle: "normal",
              fontWeight: 700,
              fontSize: "28px",
              lineHeight: "33px",
            })}
          >
            R$ {data?.total_entradas_eventuais?.toFixed(2)}
          </Text>
        </Grid.Col>

        <Grid.Col
          xs={12}
          sm={4}
          md={6}
          lg={5}
          xl={5}
          m={5}
          sx={(theme) => ({
            backgroundColor: theme.colors.orange,
            color: theme.colors.white,
            borderRadius: "10px",
            padding: "10px",
          })}
        >
          <Text
            sx={(theme) => ({
              fontFamily: "Roboto",
              fontStyle: "normal",
              fontWeight: 700,
              fontSize: "20px",
              lineHeight: "23px",
            })}
          >
            Entradas recorrentes
          </Text>
          <Text
            sx={(theme) => ({
              fontFamily: "Roboto",
              fontStyle: "normal",
              fontWeight: 700,
              fontSize: "28px",
              lineHeight: "33px",
            })}
          >
            R$ {data?.total_entradas_recorrentes?.toFixed(2)}
          </Text>
        </Grid.Col>
      </Grid>

      <Grid gutter={5} grow>
        <Grid.Col
          xs={12}
          sm={4}
          md={6}
          lg={5}
          xl={5}
          m={5}
          sx={(theme) => ({
            backgroundColor: theme.colors.red,
            color: theme.colors.white,
            borderRadius: "10px",
            padding: "10px",
          })}
        >
          <Text
            sx={(theme) => ({
              fontFamily: "Roboto",
              fontStyle: "normal",
              fontWeight: 700,
              fontSize: "20px",
              lineHeight: "23px",
            })}
          >
            Saídas Eventuais
          </Text>
          <Text
            sx={(theme) => ({
              fontFamily: "Roboto",
              fontStyle: "normal",
              fontWeight: 700,
              fontSize: "28px",
              lineHeight: "33px",
            })}
          >
            R$ {data?.total_saidas_eventuais?.toFixed(2)}
          </Text>
        </Grid.Col>

        <Grid.Col
          xs={12}
          sm={4}
          md={6}
          lg={5}
          xl={5}
          m={5}
          sx={(theme) => ({
            backgroundColor: theme.colors.red,
            color: theme.colors.white,
            borderRadius: "10px",
            padding: "10px",
          })}
        >
          <Text
            sx={(theme) => ({
              fontFamily: "Roboto",
              fontStyle: "normal",
              fontWeight: 700,
              fontSize: "20px",
              lineHeight: "23px",
            })}
          >
            Saídas recorrentes
          </Text>
          <Text
            sx={(theme) => ({
              fontFamily: "Roboto",
              fontStyle: "normal",
              fontWeight: 700,
              fontSize: "28px",
              lineHeight: "33px",
            })}
          >
            R$ {data?.total_saidas_recorrentes?.toFixed(2)}
          </Text>
        </Grid.Col>
      </Grid>
    </Box>
  );
};
export default Dashboard;
