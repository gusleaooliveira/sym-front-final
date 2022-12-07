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
import { IRevenue, IModal } from "../../../@types";

import { DatePicker, DateRangePicker } from "@mantine/dates";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores";
import { toast } from "react-toastify";

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

        toast.info("Editou um recebimento!", {
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
      overlayBlur={3}
      overlayOpacity={0.55}
      centered
      padding={25}
      radius={"lg"}
      title="Editar recebimento!"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <NumberInput
          label="Valor"
          placeholder="Digite seu valor recebido"
          defaultValue={0.0}
          min={0}
          step={0.01}
          precision={2}
          value={watch("value")}
          withAsterisk
          required
          description={"Descreva quanto você recebeu"}
          onChange={(e: number) => {
            setValue("value", e);
          }}
        />
        <DatePicker
          label="Data"
          withAsterisk
          description="Selecione a data em que recebeu o valor"
          locale="pt-br"
          defaultValue={watch("date")}
          value={watch("date")}
          onChange={(e: Date) => {
            setValue("date", e);
          }}
          placeholder="Data do valor recebido"
          required
        />
        <Select
          label="Tipo"
          placeholder="Tipo de recebimento"
          withAsterisk
          description="Selecione o  tipo de recebimento"
          data={tagList}
          value={watch("type")}
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
