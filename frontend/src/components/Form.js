import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import{ toast } from "react-toastify";
const FormContainer = styled.form`
    display: flex;
    align-items: flex-end;
    gap: 10px;
    background-color: #66CDAA;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
`;

const Input = styled.input`
    width: 120px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    heigth: 40px;
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
    
`;

const Label = styled.label``;

const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    height: 42px;
`;

const Form =({ getUsers, onEdit, setOnEdit }) => {
    const ref = useRef();

    useEffect(() =>{
        if(onEdit) {
            const user = ref.current;

            user.nome.value = onEdit.nome;
            user.email.value = onEdit.email;
            user.fone.value = onEdit.fone;
            user.data.value = onEdit.data;
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = ref.current;

        if(
            !user.nome.value ||
            !user.email.value ||
            !user.fone.value||
            !user.data.value
        ){
            return toast.warn("preencha os dados dos campos!")
        }

        if(onEdit) {
            await axios
            .put("http://localhost:8800/" + onEdit.id, {
                nome: user.nome.value,
                email: user.email.value,
                fone: user.fone.value,
                data: user.data.value,
            })
            .then(({data})=>toast.success(data))
            .catch(({data})=>toast.error(data));

        } else {
            await axios
            .post("http://localhost:8800/", {
                nome: user.nome.value,
                email: user.email.value,
                fone: user.fone.value,
                data: user.data.value,
            })
            .then(({data})=>toast.success(data))
            .catch(({data})=>toast.error(data));
        }

        user.nome.value= "";
        user.email.value = "";
        user.fone.value= "";
        user.data.value = "";

        setOnEdit(null);
        getUsers();
    };

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>Nome</Label>
                <Input name="nome" />
            </InputArea>
            <InputArea>
                <Label>Email</Label>
                <Input name="email" type="email" />
            </InputArea>
            <InputArea>
                <Label>Telefone</Label>
                <Input name="fone" />
            </InputArea>
            <InputArea>
                <Label>Data de nascimento</Label>
                <Input name="data"  type="date" />
            </InputArea>

            <Button type="submit">SALVAR</Button>
        </FormContainer>
    );
};

export default Form;
