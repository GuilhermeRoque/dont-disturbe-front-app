import { 
    Box, 
    Button,
    Dialog,
    DialogContent, 
} from "@mui/material"
import React from "react"
import FormPaper from "./FormPaper"
import MUIDataTable from "mui-datatables";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import RoutinesForm from "./RoutinesForm"
import 'jspdf-autotable';

export default function Routines(){
    const [dataMetaData, setDataMetaData] = React.useState(null)
    const [open, setOpen] = React.useState(null)
    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const downloadPdf = () => {
        const pdf = new jsPDF();
        const tableData = dataMetaData.data.map((item, index) => Object.values(item));
        const headers = Object.keys(dataMetaData.data[0]);
        pdf.autoTable({
          head: [headers],
          body: tableData,
        });
        pdf.save('table.pdf');
    };

    const handleNewData = (newData, metaData) =>{
            const newDataMetaData = {
                data: newData,
                metaData: metaData
            }
            setDataMetaData(newDataMetaData)
            handleClose()
        }

    if(dataMetaData==null){
        return(
            <>
                <Box sx={{flexBasis:"100%", height: "30px"}}></Box>
                <Box sx={{margin: "auto"}}>
                    <FormPaper title={"Rotina de importação"}>
                        <RoutinesForm handleNewData={handleNewData}></RoutinesForm>
                    </FormPaper>
                </Box>
            </>
       )
    }else {
        return (
            <>
            <Box sx={{flexBasis:"100%", height: "30px"}}></Box>
            <Box sx={{margin: "auto"}}>
                <MUIDataTable
                title={"Relatório da rotina de '"+dataMetaData.metaData.name+"'"}
                data={dataMetaData.data}
                columns={dataMetaData.metaData.fieldsMapping}
                options={{
                    print: "false"
                }}
                />
                {dataMetaData.data.length?<Button
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
                            <RoutinesForm handleNewData={handleNewData}></RoutinesForm>
                        </FormPaper>
                    </DialogContent> 
            </Dialog>
            </>

      );  
    }


 
}