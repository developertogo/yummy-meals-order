import React from "react";
import {
    CrudFilters,
    getDefaultFilter,
    HttpError,
    IResourceComponentsProps,
    useTranslate,
} from "@pankod/refine-core";
import {
    DataGrid,
    Grid,
    GridColumns,
    Avatar,
    useDataGrid,
    BooleanField,
    DateField,
    ShowButton,
    Button,
    TextField,
    Box,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CardHeader,
    Card,
    CardContent,
    List,
} from "@pankod/refine-mui";
import { Controller, useForm } from "@pankod/refine-react-hook-form";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import { IUser, IUserFilterVariables } from "interfaces";

export const UserList: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();

    const { dataGridProps, search, filters } = useDataGrid<
        IUser,
        HttpError,
        IUserFilterVariables
    >({
        initialPageSize: 10,
        onSearch: (params) => {
            const filters: CrudFilters = [];
            const { q, gender, isActive } = params;

            filters.push({
                field: "q",
                operator: "eq",
                value: q !== "" ? q : undefined,
            });

            filters.push({
                field: "gender",
                operator: "eq",
                value: gender !== "" ? gender : undefined,
            });

            filters.push({
                field: "isActive",
                operator: "eq",
                value: isActive !== "" ? isActive : undefined,
            });

            return filters;
        },
    });

    const columns = React.useMemo<GridColumns<IUser>>(
        () => [
            {
                field: "gsm",
                headerName: t("users.fields.gsm"),
                minWidth: 150,
                flex: 1,
            },
            {
                field: "avatar",
                headerName: t("users.fields.avatar.label"),
                renderCell: function render({ row }) {
                    return <Avatar src={row.avatar[0].url} />;
                },
                minWidth: 100,
                flex: 1,
                sortable: false,
            },
            {
                field: "firstName",
                headerName: t("users.fields.firstName"),
                minWidth: 150,
                flex: 1,
            },
            {
                field: "lastName",
                headerName: t("users.fields.lastName"),
                minWidth: 150,
                flex: 1,
            },
            {
                field: "gender",
                headerName: t("users.fields.gender.label"),
                valueGetter: ({ row }) =>
                    t(`users.fields.gender.${row.gender}`),
            },
            {
                field: "isActive",
                headerName: t("users.fields.isActive.label"),
                align: "center",
                headerAlign: "center",
                renderCell: function render({ row }) {
                    return (
                        <BooleanField
                            svgIconProps={{
                                sx: { width: "16px", height: "16px" },
                            }}
                            value={row.isActive}
                        />
                    );
                },
                minWidth: 80,
                flex: 0.5,
            },
            {
                field: "createdAt",
                headerName: t("users.fields.createdAt"),
                renderCell: function render({ row }) {
                    return <DateField value={row.createdAt} format="LLL" />;
                },
                minWidth: 200,
                flex: 1,
            },
            {
                field: "actions",
                headerName: t("table.actions"),
                renderCell: function render({ row }) {
                    return (
                        <ShowButton
                            size="small"
                            hideText
                            recordItemId={row.id}
                        />
                    );
                },
                align: "center",
                headerAlign: "center",
                flex: 1,
                minWidth: 80,
            },
        ],
        [t],
    );

    const { register, handleSubmit, control } = useForm<
        IUser,
        HttpError,
        IUserFilterVariables
    >({
        defaultValues: {
            q: getDefaultFilter("q", filters, "eq"),
            gender: getDefaultFilter("gender", filters, "eq") || "",
            isActive: getDefaultFilter("isActive", filters, "eq") || "",
        },
    });

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} lg={3}>
                <Card sx={{ paddingX: { xs: 2, md: 0 } }}>
                    <CardHeader title={t("users.filter.title")} />
                    <CardContent sx={{ pt: 0 }}>
                        <Box
                            component="form"
                            sx={{ display: "flex", flexDirection: "column" }}
                            autoComplete="off"
                            onSubmit={handleSubmit(search)}
                        >
                            <TextField
                                {...register("q")}
                                label={t("users.filter.search.label")}
                                placeholder={t(
                                    "users.filter.search.placeholder",
                                )}
                                margin="normal"
                                fullWidth
                                autoFocus
                                size="small"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchOutlinedIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Controller
                                control={control}
                                name="gender"
                                render={({ field }) => (
                                    <FormControl margin="normal" size="small">
                                        <InputLabel id="gender-select">
                                            {t("users.filter.gender.label")}
                                        </InputLabel>
                                        <Select
                                            {...field}
                                            labelId="gender-select"
                                            label={t(
                                                "users.filter.gender.label",
                                            )}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value="Male">
                                                {t("users.filter.gender.male")}
                                            </MenuItem>
                                            <MenuItem value="Female">
                                                {t(
                                                    "users.filter.gender.female",
                                                )}
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                )}
                            />
                            <Controller
                                control={control}
                                name="isActive"
                                render={({ field }) => (
                                    <FormControl margin="normal" size="small">
                                        <InputLabel id="isActive-select">
                                            {t("users.filter.isActive.label")}
                                        </InputLabel>
                                        <Select
                                            {...field}
                                            labelId="isActive-select"
                                            label={t(
                                                "users.filter.isActive.label",
                                            )}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value="true">
                                                {t(
                                                    "users.filter.isActive.true",
                                                )}
                                            </MenuItem>
                                            <MenuItem value="false">
                                                {t(
                                                    "users.filter.isActive.false",
                                                )}
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                )}
                            />

                            <br />
                            <Button type="submit" variant="contained">
                                {t("orders.filter.submit")}
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} lg={9}>
                <List cardProps={{ sx: { paddingX: { xs: 2, md: 0 } } }}>
                    <DataGrid
                        {...dataGridProps}
                        columns={columns}
                        filterModel={undefined}
                        autoHeight
                        rowsPerPageOptions={[10, 20, 50, 100]}
                    />
                </List>
            </Grid>
        </Grid>
    );
};
