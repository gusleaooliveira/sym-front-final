import { UnstyledButtonProps } from "@mantine/core";

export interface UserButtonProps extends UnstyledButtonProps {
    image: string;
    name: string;
    email: string;
    icon?: React.ReactNode;
}
