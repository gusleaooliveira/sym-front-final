import {
  ActionIcon,
  Box,
  Button,
  Card,
  CloseButton,
  Flex,
  Text,
} from "@mantine/core";
import { IconPencil } from "@tabler/icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  ModalCreateExpense,
  ModalDeleteExpense,
  ModalEditExpense,
} from "../../components";
import { useExpenses } from "../../lib";
import { RootState } from "../../stores";
import { IExpense } from "../../@types";
import CsvDownloadButton from "react-json-to-csv";

const Expenses = () => {
  const { token, user } = useSelector((state: RootState) => state.clickState);
  const { data, refetch } = useExpenses(!!user?.id ? user?.id : 0, token);
  console.log("dt", data);

  const [isCreateExpense, setCreateExpense] = useState(false);
  const [isDeleteExpense, setDeleteExpense] = useState(false);
  const [isEditExpense, setEditExpense] = useState(false);
  const [gasto, setGasto] = useState<IExpense>();

  return (
    <>
      <Flex justify={"space-between"}>
        <Button onClick={() => setCreateExpense(true)}>Cadastrar</Button>

        <Button
          component={CsvDownloadButton}
          data={data}
          disabled={!!data ? false : true}
        >
          Baixar dados
        </Button>
      </Flex>

      {data?.map((chave: IExpense) => {
        return (
          <Box
            sx={(theme) => ({
              background: theme.colors.dark,
              borderLeft: `5px solid ${theme.colors.orange[6]}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px",
              marginTop: "10px",
            })}
          >
            <Text>
              {" "}
              R$ {chave.value.toFixed(2)} - {chave.description}
            </Text>

            <Flex direction="row">
              {" "}
              <ActionIcon
                onClick={() => {
                  setEditExpense(true);
                  setGasto(chave);
                }}
              >
                <IconPencil size={16} />
              </ActionIcon>
              <CloseButton
                title="Excluir recebimento"
                onClick={() => {
                  setDeleteExpense(true);
                  setGasto(chave);
                }}
              />
            </Flex>
          </Box>
        );
      })}

      <ModalCreateExpense
        isOpen={isCreateExpense}
        onClose={() => setCreateExpense(false)}
        refetch={refetch}
      />
      <ModalDeleteExpense
        isOpen={isDeleteExpense}
        onClose={() => setDeleteExpense(false)}
        refetch={refetch}
        gasto={gasto}
      />
      <ModalEditExpense
        isOpen={isEditExpense}
        onClose={() => setEditExpense(false)}
        refetch={refetch}
        gasto={gasto}
      />
    </>
  );
};
export default Expenses;
