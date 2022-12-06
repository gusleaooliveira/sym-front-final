import {
  Modal,
  NumberInput,
  Select,
  Button,
  Alert,
  Flex,
  Text,
  Box,
  Overlay,
  Dialog,
  ActionIcon,
} from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { api, queryClient } from "../../../lib";
import { RootState } from "../../../stores";
import { IModal } from "../../../@types";
import { toast } from "react-toastify";

const ModalDeleteRevenue = ({
  isOpen,
  onClose,
  refetch,
  recebimento,
}: IModal) => {
  const { token, user } = useSelector((state: RootState) => state.clickState);
  const { mutate } = useMutation(
    async (id: number) => {
      const { data } = await api.delete(`/revenues/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    {
      onSuccess: (resp) => {
        queryClient.invalidateQueries({ queryKey: ["create"] });
        console.log(resp);
        if (!!refetch) refetch();
        onClose();

        toast.info("Apagou  um recebimento!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      },
    }
  );
  return (
    <Dialog
      shadow="xl"
      opened={isOpen}
      onClose={() => {
        onClose();
      }}
      withCloseButton
      sx={(theme) => ({
        zIndex: 9999,
      })}
    >
      <Flex direction={"column"}>
        <Text>
          {" "}
          Deseja apagar esse recebimento de R$ {recebimento?.value.toFixed(
            2
          )}{" "}
          referente ao/à {recebimento?.type}?{" "}
        </Text>
        <br />
        <Flex direction={"row"} justify={"flex-end"}>
          {" "}
          <Flex
            justify={"space-between"}
            sx={(theme) => ({
              width: "150px",
            })}
          >
            <Button variant="default" onClick={onClose}>
              Não
            </Button>
            <Button
              variant="default"
              onClick={() => {
                mutate(recebimento?.id ? recebimento?.id : 0);
              }}
            >
              Sim
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Dialog>
  );
};

export default ModalDeleteRevenue;
