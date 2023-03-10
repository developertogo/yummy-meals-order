import React from "react";
import {
    IResourceComponentsProps,
    useNavigation,
    useShow,
    useTranslate,
    useUpdate,
} from "@pankod/refine-core";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    DataGrid,
    GridColumns,
    GridRowsProp,
    GridValidRowModel,
    IconButton,
    Stack,
    Step,
    StepLabel,
    Stepper,
    Typography,
    List,
    Paper,
    useMediaQuery,
    useTheme,
} from "@pankod/refine-mui";
import dayjs from "dayjs";

import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import MopedIcon from "@mui/icons-material/Moped";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import { CourierInfoBox, Map, MapMarker } from "components";

import { IEvent, IYOrder, IYMeal } from "interfaces";
import { useOrderCustomKbarActions } from "hooks";

import { useLocation } from 'react-router-dom';

export const OrderShow: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();

    const location = useLocation();
    const orderId = location.pathname.split('/').slice(-1).pop() ?? "";
    const record = location.state as GridRowsProp;
    //const record = location.state as IYMeal;

    // TODO: For future use
    //const { queryResult } = useShow<IYOrder>();
    //const record = queryResult.data?.d ?? ""ata;

    const canAcceptOrder = false;
    // TODO: For future use
    // const canAcceptOrder = record?.status.text === "Pending";

    const canRejectOrder = false;
    /* TODO: For future use
        record?.status.text === "Pending" ||
        record?.status.text === "Ready" ||
        record?.status.text === "On The Way";
    */

    const { goBack } = useNavigation();
    const { mutate } = useUpdate();

    const theme = useTheme();

    const isSmallOrLess = useMediaQuery(theme.breakpoints.down("sm"));

    const columns = React.useMemo<GridColumns<GridValidRowModel>>(
    //const columns = React.useMemo<GridColumns<IProduct>>(
        () => [
            {
                field: "name",
                headerName: t("orders.deliverables.fields.items"),
                width: 300,
                renderCell: function render({ row }) {
                    return (
                        <Stack direction="row" spacing={4} alignItems="center">
                            <Avatar
                                sx={{ width: 108, height: 108 }}
                                src={row.image_url}
                            />
                            <Box>
                                <Typography
                                    variant="body1"
                                    whiteSpace="break-spaces"
                                >
                                    {row.name} - {row.description}
                                </Typography>
                                <Typography variant="caption">
                                    #{row.id}
                                </Typography>
                            </Box>
                        </Stack>
                    );
                },
            },
            {
                field: "quantity",
                headerName: t("orders.deliverables.fields.quantity"),
                width: 150,
                type: "number",
            },
            // TODO: For future use
            /*
            {
                field: "price",
                headerName: t("orders.deliverables.fields.price"),
                width: 100,
                type: "number",
            },
            {
                field: "price",
                headerName: t("orders.deliverables.fields.total"),
                width: 100,
                type: "number",
            },
            */
        ],
        [t],
    );

    const CustomFooter = () => (
        <Stack direction="row" spacing={4} justifyContent="flex-end" p={1}>
            <Typography sx={{ color: "primary.main" }} fontWeight={700}>
                {t("orders.deliverables.mainTotal")}
            </Typography>
        </Stack>
            // TODO: For future use
            // <Typography>{record?.amount}$</Typography>
    );

    const handleMutate = (status: { id: number; text: string }) => {
        if (record) {
            mutate({
                resource: "orders",
                //id: "1",
                id: orderId,
                // TODO: For future use
                //id: record.id.toString(),
                values: {
                    status,
                },
            });
        }
    };

    //useOrderCustomKbarActions(record);

    return (
        <Stack spacing={2}>
            <Card>
                <CardHeader
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 2,
                    }}
                    title={
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography variant="h6">
                                {t("orders.fields.orderID")}
                            </Typography>
                            <Typography variant="caption">{`#${
                                orderId
                            }`}</Typography>
                        </Stack>
                    }
                    avatar={
                        <IconButton onClick={goBack}>
                            <ArrowBackIcon />
                        </IconButton>
                    }
                    action={
                        <Stack direction="row" spacing={2}>
                            <Button
                                disabled={!canAcceptOrder}
                                variant="outlined"
                                size="small"
                                startIcon={<CheckOutlinedIcon />}
                                onClick={() =>
                                    handleMutate({
                                        id: 2,
                                        text: "Ready",
                                    })
                                }
                            >
                                {t("buttons.accept")}
                            </Button>
                            <Button
                                disabled={!canRejectOrder}
                                variant="outlined"
                                size="small"
                                color="error"
                                startIcon={
                                    <CloseOutlinedIcon sx={{ bg: "red" }} />
                                }
                                onClick={() =>
                                    handleMutate({
                                        id: 5,
                                        text: "Cancelled",
                                    })
                                }
                            >
                                {t("buttons.reject")}
                            </Button>
                        </Stack>
                    }
                />
                {/* TODO: For future use
                <CardContent>
                    <Stepper
                        nonLinear
                        activeStep={record?.events.findIndex(
                            (el) => el.status === record?.status?.text,
                        )}
                        orientation={isSmallOrLess ? "vertical" : "horizontal"}
                    >
                        {record?.events.map((event: IEvent, index: number) => (
                            <Step key={index}>
                                <StepLabel
                                    optional={
                                        <Typography variant="caption">
                                            {event.date &&
                                                dayjs(event.date).format(
                                                    "L LT",
                                                )}
                                        </Typography>
                                    }
                                    error={event.status === "Cancelled"}
                                >
                                    {event.status}
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </CardContent>
                */}
            </Card>

            {/* TODO: For future use
            <Box sx={{ height: 500 }}>
                <Map
                    center={{
                        lat: 40.73061,
                        lng: -73.935242,
                    }}
                    zoom={9}
                >
                    <MapMarker
                        key={`user-marker-${record?.user.id}`}
                        icon={{
                            url: "/images/marker-location.svg",
                        }}
                        position={{
                            lat: Number(record?.adress.coordinate[0]),
                            lng: Number(record?.adress.coordinate[1]),
                        }}
                    />
                    <MapMarker
                        key={`user-marker-${record?.user.id}`}
                        icon={{
                            url: "/images/marker-courier.svg",
                        }}
                        position={{
                            lat: Number(record?.store.address.coordinate[0]),
                            lng: Number(record?.store.address.coordinate[1]),
                        }}
                    />
                </Map>
            </Box>
            */}

            {/* TODO: For future use
            <Paper sx={{ padding: 2 }}>
                <Stack
                    direction="row"
                    flexWrap="wrap"
                    justifyContent={isSmallOrLess ? "center" : "space-between"}
                >
                    <Stack
                        direction={isSmallOrLess ? "column" : "row"}
                        alignItems={isSmallOrLess ? "center" : "flex-start"}
                        textAlign={isSmallOrLess ? "center" : "left"}
                        gap={2}
                    >
                        <Avatar
                            alt={record?.courier.name}
                            src={record?.courier.avatar[0].url}
                            sx={{ width: 100, height: 100 }}
                        />
                        <Box>
                            <Typography>COURIER</Typography>
                            <Typography variant="h6">
                                {record?.courier.name} {record?.courier.surname}
                            </Typography>
                            <Typography variant="caption">
                                ID #{record?.courier.id}
                            </Typography>
                        </Box>
                    </Stack>
                    <Stack
                        direction="row"
                        gap={2}
                        padding={1}
                        flexWrap="wrap"
                        justifyContent="center"
                    >
                        <CourierInfoBox
                            text={t("orders.courier.phone")}
                            icon={<PhoneIphoneIcon sx={{ fontSize: 36 }} />}
                            value={record?.courier.gsm}
                        />
                        <CourierInfoBox
                            text={t("orders.courier.deliveryTime")}
                            icon={<MopedIcon sx={{ fontSize: 36 }} />}
                            value="15:05"
                        />
                    </Stack>
                </Stack>
            </Paper>
            */}

            <List
                cardHeaderProps={{
                    title: t("orders.deliverables.deliverables"),
                }}
            >
                <DataGrid
                    autoHeight
                    columns={columns}
                    rows={record || []}
                    hideFooterPagination
                    rowHeight={124}
                    // TODO: For future use
                    /*
                    components={{
                        Footer: CustomFooter,
                    }}
                    */
                />
            </List>
        </Stack>
    );
};
