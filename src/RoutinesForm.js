import { 
    Box, 
    Button,
    Input,
    MenuItem,
    InputLabel,
    Select
} from "@mui/material"
import React from "react"
import axios from "axios"

export default function RoutinesForm({handleNewData}){
    const [file, setFile] = React.useState(null)
    const importRoutinesOptions = [
        {
            path: "/cleanup-phones",
            name: "Limpeza de contatos",
            fieldsMapping: [
                {label: 'CPF', name: 'cpf'},
                {label: 'Telefone', name: 'phone'},
            ]
        },
        {
            path: "/phones",
            name: "Importação de contatos",
            fieldsMapping: [
                {label: 'CPF', name: 'cpf'},
                {label: 'Telefone', name: 'phone'},
            ]
        },
        {
            path: "/users",
            name: "Importação de usuários",
            fieldsMapping: [
                {label: 'CPF', name: 'cpf'},
                {label: 'E-mail', name: 'email'},
                {label: 'Nome', name: 'name'},
                {label: 'Instituição Financeira', name: 'provider'},
            ]
        },
    ]
    const [currentImportOption, setCurrentImportOption] = React.useState(importRoutinesOptions[0].path)

    const importRoutinesMenuItems = importRoutinesOptions.map((importRoutineOption, index) => <MenuItem value={importRoutineOption.path} key={index}>{importRoutineOption.name}</MenuItem>)

    const handleFileChange = (event) => {
        event.preventDefault();
        const newFile = event.target.files[0];
        setFile(newFile)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const uploadFormData = new FormData();
        uploadFormData.append('file', file);
        const path = formData.get("routine")
        const importOptionName = importRoutinesOptions.find((importOption) => importOption.path===path)
        axios.post("http://localhost/api/import-routines"+path, uploadFormData)
        .then((resp) => {
            handleNewData(resp.data, importOptionName)
        })
        .catch((err)=>{
            console.error(err)
        })

    }
    
    const handleChangeImportOption = (event) =>{
        const targetValue = event.target.value
        setCurrentImportOption(targetValue)
    }


    return(
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, maxWidth:1000}}>
            <InputLabel id="routine-select-id-input">Tipo da rotina</InputLabel>
            <Select
                required
                fullWidth
                id="routine"
                name="routine"
                value={currentImportOption}
                labelId='routine-select-label'
                onChange={handleChangeImportOption}
            >
                {importRoutinesMenuItems}
            </Select>
            <br></br>
            <br></br>
            <Input
                type="file"
                onChange={handleFileChange}
            >
            </Input>
            <br></br>
            <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
            Importar
            </Button>
        </Box>
    )


}