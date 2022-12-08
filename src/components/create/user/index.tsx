import { Button, Modal, PasswordInput, TextInput } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { api, queryClient } from "../../../lib";
import { IModal, IUser } from "../../../@types";
import { toast } from "react-toastify";

const CreateModalUser = ({ isOpen, onClose }: IModal) => {
  const { mutate } = useMutation(
    async (user: IUser) => {
      const { data } = await api.post("/singup", user);
      return data;
    },
    {
      onSuccess: (resp) => {
        queryClient.invalidateQueries({ queryKey: ["create"] });
        console.log(resp);
        onClose();

        toast.info("Conta criada com sucesso!", {
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
        toast.error("Dados inválidos, ou já cadastrados!", {
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
    formState: { errors },
  } = useForm<IUser>();
  const onSubmit = (data: IUser) => {
    mutate(data);
  };
  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      overlayBlur={3}
      overlayOpacity={0.55}
      centered
      padding={25}
      radius={"lg"}
      title="Cadastre-se!"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Nome:"
          placeholder="Digite seu nome"
          size="md"
          {...register("name")}
        />
        <TextInput
          label="E-mail:"
          placeholder="Digite seu email"
          size="md"
          {...register("email")}
        />
        <PasswordInput
          label="Senha:"
          placeholder="Digite sua senha"
          mt="md"
          size="md"
          {...register("password")}
        />
        <Button type="submit" fullWidth mt="xl" size="md">
          Cadastrar
        </Button>
      </form>
    </Modal>
  );
};
export default CreateModalUser;
