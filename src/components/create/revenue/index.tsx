import {
  Button,
  Modal,
  NumberInput,
  PasswordInput,
  Select,
  TextInput,
} from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { api, queryClient } from "../../../lib";
import { IExpense, IModal, IRevenue } from "../../../@types";

import { DatePicker, DateRangePicker } from "@mantine/dates";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores";
import { toast } from "react-toastify";
import "dayjs/locale/pt-br";

const ModalCreateRevenue = ({ isOpen, onClose, refetch }: IModal) => {
  const { token, user } = useSelector((state: RootState) => state.clickState);

  const { mutate } = useMutation(
    async (expense: IRevenue) => {
      const { data } = await api.post("/revenues", expense, {
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

        toast.info("Criou um novo recebimento!", {
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
      onError: (resp) => {
        queryClient.invalidateQueries({ queryKey: ["login"] });
        toast.error("Erro ao cadastrar recebimento!", {
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
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IRevenue>({
    defaultValues: {
      user_id: user?.id,
    },
  });
  const onSubmit = (data: IRevenue) => {
    mutate(data);
  };

  let [typeList, setTypeList] = useState([
    { label: "Frequente", value: "Frequente" },
    { label: "Único", value: "Único" },
  ]);

  let [tagList, setTagList] = useState([
    { label: "Salário", value: "Salário" },
    { label: "Freelancer", value: "Freelancer" },
    { label: "Outro", value: "Outro" },
  ]);

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      overlayBlur={3}
      centered
      overlayOpacity={0.55}
      padding={25}
      radius={"lg"}
      title="Cadastrar recebimento!"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <NumberInput
          label="Valor"
          placeholder="Digite seu valor do seu recebimento"
          defaultValue={0.0}
          min={0}
          step={0.01}
          precision={2}
          value={watch("value")}
          withAsterisk
          required
          description={"Descreva quanto você  do seu recebimento"}
          onChange={(e: number) => {
            setValue("value", e);
          }}
        />
        <DatePicker
          placeholder="Data do valor recebimento"
          label="Data"
          withAsterisk
          description="Selecione a data em que recebeu o valor"
          locale="pt-br"
          value={new Date(watch("date"))}
          onChange={(e: Date) => {
            setValue("date", e);
          }}
          required
        />
        <Select
          label="Tipo"
          placeholder="Tipo  do seu recebimento"
          withAsterisk
          description="Selecione  o tipo de recebimento"
          data={tagList}
          onChange={(e: string) => {
            setValue("type", e);
          }}
        />
        <Select
          label="Frequência "
          placeholder="Frequência em que o recebimento é feito"
          withAsterisk
          description="Selecione a frequência em que o recebimento é feito"
          data={typeList}
          onChange={(e: string) => {
            setValue("frequency", e);
          }}
        />
        <Button type="submit" fullWidth mt="xl" size="md">
          Cadastrar
        </Button>
      </form>
    </Modal>
  );
};

export default ModalCreateRevenue;
