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
import { IExpense, IModal } from "../../../@types";

import { DatePicker, DateRangePicker } from "@mantine/dates";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores";
import { toast } from "react-toastify";
//import "dayjs/locale/pt-br";

const ModalCreateExpense = ({ isOpen, onClose, refetch, gasto }: IModal) => {
  const { token, user } = useSelector((state: RootState) => state.clickState);

  const { mutate } = useMutation(
    async (expense: IExpense) => {
      const { data } = await api.post("/expenses", expense, {
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

        toast.info("Editou um   gasto!", {
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
        toast.error("Erro ao editar gasto!", {
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
    reset,
    formState: { errors },
  } = useForm<IExpense>({
    defaultValues: {
      user_id: user?.id,
    },
  });
  const onSubmit = (data: IExpense) => {
    mutate(data);
  };

  let [typeList, setTypeList] = useState([
    { label: "Frequente", value: "Frequente" },
    { label: "Único", value: "Único" },
  ]);

  let [tagList, setTagList] = useState([
    { label: "Aluguel", value: "Aluguel" },
    { label: "Transporte", value: "Transporte" },
    { label: "Saúde", value: "Saúde" },
    { label: "Parcela", value: "Parcela" },
    { label: "Mensalidade", value: "Mensalidade" },
    { label: "Alimentação", value: "Alimentação" },
    { label: "Plano", value: "Plano" },
    { label: "Outro", value: "Outro" },
  ]);

  useEffect(() => {
    reset(gasto);
  }, [gasto]);

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      overlayBlur={3}
      overlayOpacity={0.55}
      centered
      padding={25}
      radius={"lg"}
      title="Editar gasto!"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Descrição"
          value={watch("description")}
          onChange={(e: any) => {
            setValue("description", e?.target?.value);
          }}
        />
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
          value={new Date(watch("date"))}
          onChange={(e: Date) => {
            setValue("date", e);
          }}
          required
        />
        <Select
          label="Tipo"
          placeholder="Tipo de gasto"
          withAsterisk
          description="Selecione o  tipo de gasto"
          data={tagList}
          value={watch("type")}
          onChange={(e: string) => {
            setValue("type", e);
          }}
        />
        <Select
          label="Frequência "
          placeholder="Frequência em que o gasto é feito"
          withAsterisk
          description="Selecione a frequência em que o gasto é feito"
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

export default ModalCreateExpense;
