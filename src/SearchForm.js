import { 
    Box, 
    TextField,  
    Button,
    Input
} from "@mui/material"
import axios from "axios";
export default function SearchForm({handleSubmit, }){


    return(
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, maxWidth:1000}}>
            <TextField
                margin="normal"
                fullWidth
                id="cpf_filter"
                label="Filtro de CPF"
                name="cpf_filter"
            />
            <TextField
                margin="normal"
                fullWidth
                id="email_filter"
                label="Filtro de e-mail"
                name="email_filter"
            />
            <TextField
                margin="normal"
                fullWidth
                id="phone_filter"
                label="Filtro de telefone"
                name="phone_filter"
            />
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