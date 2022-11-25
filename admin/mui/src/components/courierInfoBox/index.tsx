import React from "react";
import { Box, Avatar, Typography } from "@pankod/refine-mui";

type CourierInfoBoxProps = {
    text: string;
    icon: React.ReactNode;
    value?: string;
};

export const CourierInfoBox: React.FC<CourierInfoBoxProps> = ({
    text,
    icon,
    value,
}) => {
    return (
        <Box
            display="flex"
            alignItems="center"
            sx={{
                maxWidth: "200px",
                borderRadius: "8px",
                color: "white",
                padding: "10px 12px",
                backgroundColor: "primary.main",
                maxHeight: "100px",
            }}
        >
            <Avatar
                sx={{
                    bgcolor: "transparent",
                    color: "white",
                }}
            >
                {icon}
            </Avatar>
            <Box>
                <Typography variant="body1" fontWeight={700}>
                    {text}
                </Typography>
                <Typography>{value}</Typography>
            </Box>
        </Box>
    );
};
