import { 
    Box, 
    Button,
    Dialog,
    DialogContent, 
} from "@mui/material"
import React  from "react"
import FormPaper from "./FormPaper"
import SearchForm from "./SearchForm"
import axios from "axios"
import MUIDataTable from "mui-datatables";
import jsPDF from 'jspdf';
import 'jspdf-autotable';


export default function Home(){
    const [data, setData] = React.useState(null)
    const [open, setOpen] = React.useState(null)
    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }
    const downloadPdf = () => {
        const pdf = new jsPDF();
        const tableData = data.map((item, index) => Object.values(item));
        const headers = Object.keys(data[0]);
        pdf.autoTable({
          head: [headers],
          body: tableData,
        });
        pdf.save('table.pdf');
    };



    const handleSubmit = (event) =>{
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const queryParams = {
          cpf: data.get("cpf_filter").match(/\d+/g).join(""),
          email: data.get("email_filter"),
          phone: data.get("phone_filter").match(/\d+/g).join(""),
        }
        console.log("QUERY PARAMS", queryParams)
        axios.get("http://localhost:5000/users_active",{params: queryParams})
            .then((resp) => {
                let expanded_data = []
                for (let index = 0; index < 10; index++) {
                    expanded_data = [...expanded_data, ...resp.data]
                    
                }
                // setData(resp.data)
                setData(expanded_data)
                handleClose()
            })
        
        }


    if(data==null){
        return(
            <>
                <Box sx={{flexBasis:"100%", height: "30px"}}></Box>
                <Box sx={{margin: "auto"}}>
                    <FormPaper title={"Busca de registros"}>
                        <SearchForm handleSubmit={handleSubmit}></SearchForm>
                    </FormPaper>
                </Box>
            </>
       )
    }else {
        const columns = [
            {name: "name", label:"Nome", options: { filterOptions: { fullWidth: true } } },
            {name: "email", label: "E-mail"},
            {name: "cpf", label: "CPF"},
            {name: "phone", label: "Telefone"},
          ];
    

        return (
            <>
                <Box sx={{flexBasis:"100%", height: "30px"}}></Box>
                <Box sx={{margin: "auto"}}>
                    <MUIDataTable
                    title={"Registros ativos não-perturbe"}
                    data={data}
                    columns={columns}
                    options={{
                        print: "false"
                    }}
                    />
                    {data.length?                    
                    <Button
                        variant="contained"
                        sx={{ mt: 3, mb: 2 , marginRight: 3}}
                        onClick={downloadPdf}
                    >
                    Baixar PDF
                    </Button>:""}
                    <Button 
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}                
                        onClick={handleOpen}>
                        Atualizar
                    </Button>
                </Box>
                <Dialog open={open} onClose={handleClose}>
                    <DialogContent>
                        <FormPaper title={"Busca de registros"}>
                            <SearchForm handleSubmit={handleSubmit}></SearchForm>
                        </FormPaper>
                    </DialogContent> 
                </Dialog>
            </>
      );  
    }


 
}