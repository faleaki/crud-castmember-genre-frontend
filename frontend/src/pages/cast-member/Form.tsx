import * as React from 'react';
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import castMemberHttp from "../../util/http/cast-member-http";

import { Box, Button, Radio, FormControl, FormControlLabel, FormLabel, makeStyles, RadioGroup, TextField, Theme } from '@material-ui/core';
import {ButtonProps} from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) => {
    return {
        submit: {
            margin: theme.spacing(1)
        }
    }
})

export const Form = () => {

    const classes = useStyles();

    const buttonProps: ButtonProps = {
        className: classes.submit,
        color: 'secondary',
        variant: "contained",
    };

    const {register, handleSubmit, getValues, setValue} = useForm();

    useEffect( () => {
        register({name: "type"})
    }, [register]);

    function onSubmit(formData, event) {
        console.log(event);
        castMemberHttp
            .create(formData)
            .then((response) => console.log(response));
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                name="name"
                label="Nome"
                fullWidth
                variant={"outlined"}
                inputRef={register}
            />
            <FormControl margin={"normal"}>
                <FormLabel component="legend">Tipo</FormLabel>
                <RadioGroup
                    name="type"
                    onChange={(e) => {
                        setValue('type', parseInt(e.target.value));
                    }}>
                    <FormControlLabel value="1" control={<Radio color={"primary"}/>} label="Director"/>
                    <FormControlLabel value="2" control={<Radio color={"primary"}/>} label="Ator"/>
                </RadioGroup>
            </FormControl>
            <Box dir={"rtl"}>
                <Button {...buttonProps} onClick={() => onSubmit(getValues(), null)}>Salvar</Button>
                <Button {...buttonProps} type="submit">Salvar e continuar editando</Button>
            </Box>
        </form>
    );
};