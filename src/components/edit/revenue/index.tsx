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
import { IRevenue, IModal } from "../../../types";

import { DatePicker, DateRangePicker } from "@mantine/dates";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores";

const ModalCreateRevenue = ({
  isOpen,
  onClose,
  refetch,
  recebimento,
}: IModal) => {
  const { token, user } = useSelector((state: RootState) => state.clickState);

  const { mutate } = useMutation(
    async (Revenue: IRevenue) => {
      const { data } = await api.post("/revenues", Revenue, {
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
      },
    }
  );
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
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

  useEffect(() => {
    reset(recebimento);
  }, [recebimento]);

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      fullScreen
      title="Cadastrar gasto!"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <NumberInput
          label="Valor"
          placeholder="Digite seu valor gasto"
          defaultValue={0.0}
          min={0}
          step={0.01}
          precision={2}
          value={watch("value")}
          withAsterisk
          required
          description={"Descreva quanto você gastou"}
          onChange={(e: number) => {
            setValue("value", e);
          }}
        />
        <DatePicker
          placeholder="Data do valor gasto"
          label="Data"
          withAsterisk
          description="Selecione a data em que gastou o valor"
          locale="pt-br"
          value={watch("date")}
          onChange={(e: Date) => {
            setValue("date", e);
          }}
          required
        />
        <Select
          label="Tipo"
          placeholder="Tipo de gasto"
          withAsterisk
          description="Selecione a  frequência do tipo de gasto"
          data={tagList}
          value={watch("type")}
          onChange={(e: string) => {
            setValue("type", e);
          }}
        />
        <Select
          label="Tag"
          placeholder="Classifque o gasto"
          withAsterisk
          description="Classifique o tipo de gasto"
          data={typeList}
          value={watch("frequency")}
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
