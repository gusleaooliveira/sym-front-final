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
  ModalCreateRevenue,
  ModalDeleteRevenue,
  ModalEditRevenue,
} from "../../components";
import { useRevenues } from "../../lib";
import { RootState } from "../../stores";
import { IRevenue } from "../../@types";

const Revenue = () => {
  const { token, user } = useSelector((state: RootState) => state.clickState);
  const { data, refetch } = useRevenues(!!user?.id ? user?.id : 0, token);
  console.log("dt", data);

  const [isCreateRevenue, setCreateRevenue] = useState(false);
  const [isDeleteRevenue, setDeleteRevenue] = useState(false);
  const [isEditRevenue, setEditRevenue] = useState(false);
  const [recebimento, setRecebimento] = useState<IRevenue>();

  return (
    <>
      <Button onClick={() => setCreateRevenue(true)}>Cadastrar</Button>

      {data?.map((chave: IRevenue) => {
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
              R$ {chave.value.toFixed(2)} - {chave.type}
            </Text>

            <Flex direction="row">
              {" "}
              <ActionIcon
                onClick={() => {
                  setEditRevenue(true);
                  setRecebimento(chave);
                }}
              >
                <IconPencil size={16} />
              </ActionIcon>
              <CloseButton
                title="Excluir recebimento"
                onClick={() => {
                  setDeleteRevenue(true);
                  setRecebimento(chave);
                }}
              />
            </Flex>
          </Box>
        );
      })}

      <ModalCreateRevenue
        isOpen={isCreateRevenue}
        onClose={() => setCreateRevenue(false)}
        refetch={refetch}
      />
      <ModalDeleteRevenue
        isOpen={isDeleteRevenue}
        onClose={() => setDeleteRevenue(false)}
        refetch={refetch}
        recebimento={recebimento}
      />
      <ModalEditRevenue
        isOpen={isEditRevenue}
        onClose={() => setEditRevenue(false)}
        refetch={refetch}
        recebimento={recebimento}
      />
    </>
  );
};
export default Revenue;
