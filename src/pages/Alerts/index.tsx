import { Box, Button, Flex, Loader, Slider, Text } from "@mantine/core";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { api, queryClient, useAlerts, useDasboard } from "../../lib";
import { RootState } from "../../stores";
import { IAlert } from "../../@types";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const Alerts = () => {
  const { token, user } = useSelector((state: RootState) => state.clickState);

  const {
    data,
    isFetched: isFetchedAlerts,
    refetch,
  } = useAlerts(!!user?.id ? user?.id : 0, token);
  const { data: dtDashboard, isFetched: isFetchedDash } = useDasboard(
    !!user?.id ? user?.id : 0,
    token
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IAlert>({
    defaultValues: {
      user_id: !!user?.id ? user?.id : 0,
    },
  });

  const { mutate } = useMutation(
    async (alert: IAlert) => {
      const { data } = await api.post("/alerts", alert, {
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
        toast.info("Criou um novo alerta!", {
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

  const { mutate: mutateEdit } = useMutation(
    async (alert: IAlert) => {
      const { data } = await api.put(`/alerts/${alert?.id}`, alert, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    {
      onSuccess: (resp) => {
        queryClient.invalidateQueries({ queryKey: ["edit"] });
        console.log(resp);
        if (!!refetch) refetch();

        toast.info("Editou o alerta!", {
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

  const onSubmit = (data: IAlert) => {
    console.log(data, "resp post");
    mutate(data);
  };

  const onEdit = (data: IAlert) => {
    console.log(data, "resp edit");
    mutateEdit(data);
  };

  useEffect(() => {
    if (!!data) {
      reset(data);
      console.log(data, "log");
    } else {
      setValue(
        "value",
        dtDashboard?.total_recebimentos - dtDashboard?.total_recebimentos * 0.1
      );
    }
  }, [data, isFetchedAlerts, isFetchedDash]);

  return (
    <>
      <Text>Defina abaixo o quanto deseja gastar:</Text>
      <br />
      {isFetchedDash && watch("id") === undefined ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Slider
            label={(value) => value.toFixed(2)}
            min={0}
            max={
              dtDashboard?.total_recebimentos
                ? dtDashboard?.total_recebimentos
                : 0
            }
            step={0.1}
            defaultValue={
              dtDashboard?.total_recebimentos -
              dtDashboard?.total_recebimentos * 0.1
            }
            labelAlwaysOn
            onChange={(e) => {
              setValue("value", e);
            }}
            value={watch("value")}
          />
          <br />
          <Flex justify={"flex-end"} sx={(theme) => ({})}>
            <Button type="submit">Salvar</Button>
          </Flex>
        </form>
      ) : (
        <form onSubmit={handleSubmit(onEdit)}>
          <Slider
            label={(value) => value.toFixed(2)}
            min={0}
            max={
              dtDashboard?.total_recebimentos
                ? dtDashboard?.total_recebimentos
                : 0
            }
            step={0.1}
            defaultValue={
              dtDashboard?.total_recebimentos -
              dtDashboard?.total_recebimentos * 0.1
            }
            labelAlwaysOn
            onChange={(e) => {
              setValue("value", e);
            }}
            value={watch("value")}
          />
          <br />
          <Flex justify={"flex-end"} sx={(theme) => ({})}>
            <Button type="submit">Salvar</Button>
          </Flex>
        </form>
      )}
    </>
  );
};

export default Alerts;
