import { Box, Flex, Text } from "@mantine/core";
import { useSelector } from "react-redux";
import { useDasboard } from "../../lib";
import { RootState } from "../../stores";

const Dashboard = () => {
  const { token, user } = useSelector((state: RootState) => state.clickState);
  const { data } = useDasboard(!!user?.id ? user?.id : 0, token);
  console.log("dt", data);

  return (
    <Box>
      <Flex gap={"10px"}>
        <Box
          sx={(theme) => ({
            backgroundColor: theme.colors.blue,
            color: theme.colors.white,
            width: "100%",
            height: "157px",
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
        </Box>

        <Box
          sx={(theme) => ({
            backgroundColor: theme.colors.orange,
            color: theme.colors.white,
            width: "100%",
            height: "157px",
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
        </Box>

        <Box
          sx={(theme) => ({
            backgroundColor: theme.colors.red,
            color: theme.colors.white,
            width: "100%",
            height: "157px",
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
        </Box>
      </Flex>

      <Flex mt={"10px"} gap={"10px"}>
        <Box
          sx={(theme) => ({
            backgroundColor: theme.colors.blue,
            color: theme.colors.white,
            width: "100%",
            height: "157px",
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
          </Text>
        </Box>
        <Box
          sx={(theme) => ({
            width: "100%",
            height: "157px",
            borderRadius: "10px",
            padding: "10px",
          })}
        ></Box>
      </Flex>

      <Flex mt={"10px"} gap={"10px"}>
        <Box
          sx={(theme) => ({
            backgroundColor: theme.colors.orange,
            color: theme.colors.white,
            width: "100%",
            height: "157px",
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
        </Box>
        <Box
          sx={(theme) => ({
            backgroundColor: theme.colors.orange,
            color: theme.colors.white,
            width: "100%",
            height: "157px",
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
        </Box>
      </Flex>

      <Flex mt={"10px"} gap={"10px"}>
        <Box
          sx={(theme) => ({
            backgroundColor: theme.colors.red,
            color: theme.colors.white,
            width: "100%",
            height: "157px",
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
        </Box>
        <Box
          sx={(theme) => ({
            backgroundColor: theme.colors.red,
            color: theme.colors.white,
            width: "100%",
            height: "157px",
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
        </Box>
      </Flex>
    </Box>
  );
};
export default Dashboard;
