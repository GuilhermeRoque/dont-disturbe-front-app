import { 
    Box, 
    TextField,  
    Button,
} from "@mui/material"

import InputMask from 'react-input-mask';

export default function SearchForm({handleSubmit, }){


    return(
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, maxWidth:1000}}>
            <InputMask mask="999.999.999-99" maskPlaceholder={null}>
            {() => <TextField
                margin="normal"
                fullWidth
                id="cpf_filter"
                label="Filtro de CPF"
                name="cpf_filter"
            
            />}
            </InputMask>

            <TextField
                margin="normal"
                fullWidth
                id="email_filter"
                label="Filtro de e-mail"
                name="email_filter"
            />
            <InputMask mask="(99) 99999-9999" maskPlaceholder={null}>
                {() => <TextField 
                    margin="normal"
                    fullWidth
                    id="phone_filter"
                    label="Filtro de telefone"
                    name="phone_filter"                
                />}
            </InputMask>
            <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
            Pesquisar
            </Button>
        </Box>
    )


}