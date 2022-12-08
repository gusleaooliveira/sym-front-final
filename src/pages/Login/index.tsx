import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
  Image,
  Flex,
  Box,
} from "@mantine/core";
import { favicon, imageLogin } from "../../assets";
import { useForm } from "react-hook-form";
import { ILogin } from "../../@types";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../lib";
import { api } from "../../lib";
import { useState } from "react";
import { CreateModalUser } from "../../components";
import { useDispatch } from "react-redux";
import { SET_TOKEN, SET_USER } from "../../stores/actions";
import { toast } from "react-toastify";

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 900,
    backgroundSize: "cover",
    backgroundImage: `url(${imageLogin})`,
  },

  form: {
    borderRight: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: 900,
    maxWidth: 450,
    paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  logo: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    width: 120,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

const Login = () => {
  const dispatch = useDispatch();
  const { classes } = useStyles();
  const { mutate, data } = useMutation(
    async (login: ILogin) => {
      const { data } = await api.post("/authorize", login);
      return data;
    },
    {
      onSuccess: (resp) => {
        queryClient.invalidateQueries({ queryKey: ["login"] });

        dispatch({ type: SET_TOKEN, token: resp?.token });
        dispatch({ type: SET_USER, user: resp?.user });

        console.log(resp);
      },
      onError: (resp) => {
        queryClient.invalidateQueries({ queryKey: ["login"] });
        toast.error("Email e/ou senha inválidos!", {
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
  } = useForm<ILogin>();
  const onSubmit = (data: ILogin) => {
    mutate(data);
  };

  const [isCreateModal, setCreateModal] = useState(false);

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title
          order={2}
          className={classes.title}
          align="center"
          mt="md"
          mb={50}
        >
          Seja bem-vindo!
        </Title>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <Checkbox label="Mantenha-me logado" mt="xl" size="md" />
          <Button type="submit" fullWidth mt="xl" size="md">
            Entrar
          </Button>
        </form>

        <Text align="center" mt="md">
          Ainda não tem conta?{" "}
          <Anchor<"a">
            href="#"
            weight={700}
            onClick={() => setCreateModal(true)}
          >
            Cadastre-se
          </Anchor>
        </Text>
      </Paper>

      <CreateModalUser
        isOpen={isCreateModal}
        onClose={() => setCreateModal(false)}
      />
    </div>
  );
};

export default Login;
