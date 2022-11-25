import {
    HttpError,
    IResourceComponentsProps,
    useTranslate,
} from "@pankod/refine-core";
import { Controller, useForm } from "@pankod/refine-react-hook-form";
import {
    FormControl,
    FormControlLabel,
    Avatar,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography,
    FormHelperText,
    Create,
    TextFieldProps,
} from "@pankod/refine-mui";
import InputMask from "react-input-mask";

import { IStore } from "interfaces";

export const StoreCreate: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();
    const {
        register,
        control,
        formState: { errors },
        saveButtonProps,
    } = useForm<IStore, HttpError, IStore>();

    return (
        <Create saveButtonProps={saveButtonProps}>
            <form>
                <Grid
                    container
                    marginTop="8px"
                    sx={{
                        marginX: { xs: "0px" },
                        paddingX: { xs: 1, md: 4 },
                    }}
                >
                    <Grid mb={1} item xs={12} md={4}>
                        <Stack
                            gap={1}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Avatar
                                src="/images/default-store-img-lg.png"
                                sx={{
                                    width: {
                                        xs: 180,
                                        md: 256,
                                    },
                                    height: {
                                        xs: 180,
                                        md: 256,
                                    },
                                }}
                            />
                            <Typography fontWeight="bold" variant="body2">
                                {t("stores.selectLocation")}
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Stack gap="24px">
                            <FormControl>
                                <FormLabel
                                    required
                                    sx={{
                                        marginBottom: "8px",
                                        fontWeight: "700",
                                        fontSize: "14px",
                                        color: "text.primary",
                                    }}
                                >
                                    {t("stores.fields.title")}
                                </FormLabel>
                                <TextField
                                    {...register("title", {
                                        required: t("errors.required.field", {
                                            field: "Title",
                                        }),
                                    })}
                                    size="small"
                                    margin="none"
                                    variant="outlined"
                                />
                                {errors.title && (
                                    <FormHelperText error>
                                        {errors.title.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl>
                                <FormLabel
                                    required
                                    sx={{
                                        marginBottom: "8px",
                                        fontWeight: "700",
                                        fontSize: "14px",
                                        color: "text.primary",
                                    }}
                                >
                                    {t("stores.fields.email")}
                                </FormLabel>
                                <TextField
                                    {...register("email", {
                                        required: t("errors.required.field", {
                                            field: "Email",
                                        }),
                                    })}
                                    size="small"
                                    margin="none"
                                    variant="outlined"
                                />
                                {errors.email && (
                                    <FormHelperText error>
                                        {errors.email.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl>
                                <FormLabel
                                    required
                                    sx={{
                                        marginBottom: "8px",
                                        fontWeight: "700",
                                        fontSize: "14px",
                                        color: "text.primary",
                                    }}
                                >
                                    {t("stores.fields.gsm")}
                                </FormLabel>
                                <Controller
                                    control={control}
                                    name="gsm"
                                    rules={{
                                        required: t("errors.required.field"),
                                    }}
                                    defaultValue={""}
                                    render={({ field }) => (
                                        <InputMask
                                            {...field}
                                            mask="(999) 999 99 99"
                                            disabled={false}
                                        >
                                            {/* 
                                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                            // @ts-expect-error */}
                                            {(props: TextFieldProps) => (
                                                <TextField
                                                    {...props}
                                                    size="small"
                                                    margin="none"
                                                    variant="outlined"
                                                />
                                            )}
                                        </InputMask>
                                    )}
                                />
                                {errors.gsm && (
                                    <FormHelperText error>
                                        {errors.gsm.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl>
                                <FormLabel
                                    sx={{
                                        marginBottom: "8px",
                                        fontWeight: "700",
                                        fontSize: "14px",
                                        color: "text.primary",
                                    }}
                                    required
                                >
                                    {t("products.fields.isActive")}
                                </FormLabel>
                                <Controller
                                    control={control}
                                    name="isActive"
                                    rules={{
                                        required: t("errors.required.common"),
                                    }}
                                    render={({ field }) => (
                                        <RadioGroup
                                            id="isActive"
                                            {...field}
                                            row
                                        >
                                            <FormControlLabel
                                                value={true}
                                                control={<Radio />}
                                                label={t("status.enable")}
                                            />
                                            <FormControlLabel
                                                value={false}
                                                control={<Radio />}
                                                label={t("status.disable")}
                                            />
                                        </RadioGroup>
                                    )}
                                />
                                {errors.isActive && (
                                    <FormHelperText error>
                                        {errors.isActive.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Stack>
                    </Grid>
                    <Grid
                        sx={{
                            paddingX: {
                                xs: 0,
                                md: 4,
                            },
                        }}
                        item
                        xs={12}
                        md={4}
                    >
                        <FormControl fullWidth>
                            <FormLabel
                                required
                                sx={{
                                    marginBottom: "8px",
                                    fontWeight: "700",
                                    fontSize: "14px",
                                    color: "text.primary",
                                }}
                            >
                                {t("stores.fields.address")}
                            </FormLabel>
                            <TextField
                                {...register("address.text", {
                                    required: t("errors.required.field", {
                                        field: "Address",
                                    }),
                                })}
                                margin="none"
                                variant="outlined"
                                multiline
                                minRows={5}
                                required
                                fullWidth
                            />
                            {errors.address && (
                                <FormHelperText error>
                                    {errors.address.text?.message}
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                </Grid>
            </form>
        </Create>
    );
};
