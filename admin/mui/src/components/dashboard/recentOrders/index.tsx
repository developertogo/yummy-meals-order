import React from "react";
import { useNavigation, useTranslate, useUpdate } from "@pankod/refine-core";
import {
    Avatar,
    Button,
    DataGrid,
    GridActionsCellItem,
    GridColumns,
    NumberField,
    Stack,
    Typography,
    useDataGrid,
} from "@pankod/refine-mui";
import { CheckOutlined, CloseOutlined } from "@mui/icons-material";

import { OrderStatus } from "components/orderStatus";
import { IOrder } from "interfaces";

export const RecentOrders: React.FC = () => {
    const t = useTranslate();
    const { show } = useNavigation();
    const { mutate } = useUpdate();

    const { dataGridProps } = useDataGrid<IOrder>({
        resource: "orders",
        initialSorter: [
            {
                field: "createdAt",
                order: "desc",
            },
        ],
        initialPageSize: 4,
        permanentFilter: [
            {
                field: "status.text",
                operator: "eq",
                value: "Pending",
            },
        ],
        syncWithLocation: false,
    });

    const columns = React.useMemo<GridColumns<IOrder>>(
        () => [
            {
                field: "avatar",
                renderCell: function render({ row }) {
                    return (
                        <Avatar
                            sx={{
                                width: { xs: 72, xl: 102 },
                                height: { xs: 72, xl: 102 },
                            }}
                            src={row?.products[0]?.images[0]?.url}
                        />
                    );
                },
                align: "center",
                flex: 1,
                minWidth: 100,
            },
            {
                field: "summary",
                renderCell: function render({ row }) {
                    return (
                        <Stack spacing={1} sx={{ height: "100%", mt: 2 }}>
                            <Typography
                                sx={{ fontWeight: 800, whiteSpace: "pre-wrap" }}
                            >
                                {row.products[0]?.name}
                            </Typography>
                            <Typography
                                sx={{
                                    whiteSpace: "pre-wrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "-webkit-box",
                                    WebkitLineClamp: "3",
                                    WebkitBoxOrient: "vertical",
                                    minWidth: "100px",
                                }}
                            >
                                {row.products[0]?.description}
                            </Typography>
                            <Button
                                variant="text"
                                onClick={() => show("orders", row.id)}
                                size="small"
                                sx={{ width: 80 }}
                            >
                                <Typography
                                    sx={{
                                        color: "text.primary",
                                        fontWeight: 700,
                                    }}
                                >
                                    #{row.orderNumber}
                                </Typography>
                            </Button>
                        </Stack>
                    );
                },
                flex: 2,
                minWidth: 200,
            },
            {
                field: "summary2",
                renderCell: function render({ row }) {
                    return (
                        <Stack
                            spacing={1}
                            sx={{
                                whiteSpace: "pre-wrap",
                                height: "100%",
                                mt: 2,
                            }}
                        >
                            <Typography
                                sx={{ fontWeight: 800 }}
                            >{`${row.courier.name} ${row.courier.surname}`}</Typography>
                            <Typography>{row.adress.text}</Typography>
                        </Stack>
                    );
                },
                flex: 1,
                minWidth: 100,
            },
            {
                field: "amount",
                renderCell: function render({ row }) {
                    return (
                        <NumberField
                            options={{
                                currency: "USD",
                                style: "currency",
                                notation: "standard",
                            }}
                            sx={{ fontWeight: 800 }}
                            value={row.amount / 100}
                        />
                    );
                },
                align: "center",
                flex: 1,
                width: 80,
            },
            {
                field: "status",
                align: "center",
                renderCell: function render({ row }) {
                    return <OrderStatus status={row.status.text} />;
                },
            },
            {
                field: "actions",
                type: "actions",
                width: 80,
                getActions: ({ id }) => [
                    // @ts-expect-error `@mui/x-data-grid@5.17.12` broke the props of `GridActionsCellItem` and requires `onResize` and `onResizeCapture` props which should be optional.
                    <GridActionsCellItem
                        key={1}
                        icon={<CheckOutlined color="success" />}
                        sx={{ padding: "2px 6px" }}
                        label={t("buttons.accept")}
                        showInMenu
                        onClick={() => {
                            mutate({
                                resource: "orders",
                                id,
                                values: {
                                    status: {
                                        id: 2,
                                        text: "Ready",
                                    },
                                },
                            });
                        }}
                    />,
                    // @ts-expect-error `@mui/x-data-grid@5.17.12` broke the props of `GridActionsCellItem` and requires `onResize` and `onResizeCapture` props which should be optional.
                    <GridActionsCellItem
                        key={2}
                        icon={<CloseOutlined color="error" />}
                        sx={{ padding: "2px 6px" }}
                        label={t("buttons.reject")}
                        showInMenu
                        onClick={() =>
                            mutate({
                                resource: "orders",
                                id,
                                values: {
                                    status: {
                                        id: 5,
                                        text: "Cancelled",
                                    },
                                },
                            })
                        }
                    />,
                ],
            },
        ],
        [t],
    );

    return (
        <DataGrid
            {...dataGridProps}
            columns={columns}
            autoHeight
            headerHeight={0}
            rowHeight={200}
            rowsPerPageOptions={[4, 10, 25, 50, 100]}
            sx={{
                paddingX: { xs: 3 },
                border: "none",
            }}
        />
    );
};
