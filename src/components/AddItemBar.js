import React from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import {Card,Box,FormControl,TextField,Button} from '@mui/material';
import {makeStyles} from '@mui/styles';
import AddIcon from '@mui/icons-material/Add';

const useStyles=makeStyles({
    outer: {
        width: '80%',
        height: '20%',
        minHeight: '150px',
        margin: '1rem 0',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        '@media (max-width:600px)':{
            width: '100%',
            height: '300px',
            flexDirection: 'column',
        }
    },
    inner: {
        width: '90%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        '@media (max-width:600px)':{
            width: '95%',
            flexDirection: 'column',
            justifyContent: 'space-around',
            boxShadow: 'none',
            dropShadow: 'none',
        }
    },
    formControls: {
        width: '25%',

        '@media (max-width: 600px)':{
            width: '90%',
        }
    },
    button: {
        width: '15%',

        '@media (max-width: 600px)':{
            width: '90%',
        }
    }
})

toast.configure();
function AddItemBar(props) {

    const styles = useStyles();

    const {rows,setRows} = props;
    const rowLength = rows.length
    const [values,setValues] = React.useState({
        TextValue : '',
        DateValue : new Date('2021-10-22T12:59:59'),
        OwnerValue : '',
        status: '',
    })

    const handleValues = (event) => {
        setValues({...values, [event.target.name] : event.target.value});
    }

    const addItem = () => {
        if(values.TextValue.length > 1 && values.OwnerValue.length > 1){
            let dataPacket = {
                "date": moment(values.DateValue).format(),
                "text": values.TextValue,
                "id": rowLength+1,
                "active": true,
                "userId": Math.floor(Math.random()*100),
                "owner": values.OwnerValue,
            }
            let sampleRows = rows;
            sampleRows.push(dataPacket);
            setRows(sampleRows);
            setValues({
                TextValue : '',
                DateValue : new Date('2014-08-18T21:11:54'),
                OwnerValue : '',
                status: '',
            })
            toast.success('Successfully added!',{
                autoClose: 1000,
            });
            console.log(rows);
        }else{
            toast.error('Please enter values before adding an item!',{
                autoClose: 2000,
            })
        }
    }

    return (
        <Card className={styles.outer}>
            <Box className={styles.inner}>
                <FormControl className={styles.formControls}>
                    <TextField                        
                        id="input-textname"
                        name="TextValue"
                        onChange={handleValues}
                        value={values.TextValue}
                        placeholder="Enter Text"
                        variant="outlined"
                    />
                </FormControl>
                <FormControl className={styles.formControls}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            placeholder="Select Date (default today)"
                            value={values.DateValue}
                            onChange={(newValue)=>{
                                setValues({...values,DateValue: moment(newValue).format()})
                            }}
                            renderInput={(params) => 
                                <TextField 
                                {...params} 
                                name="DateValue"
                                variant="outlined"
                            />}
                        />
                    </LocalizationProvider>
                </FormControl>
                <FormControl className={styles.formControls}>
                    <TextField                        
                        id="input-ownername"
                        name="OwnerValue"
                        onChange={handleValues}
                        value={values.OwnerValue}
                        placeholder="Owner Name"
                        variant="outlined"
                    />
                </FormControl>
                <Button 
                    variant="contained" 
                    endIcon={<AddIcon />}
                    onClick={addItem}
                    className={styles.button}
                >
                    Add Item
                </Button>
            </Box>
        </Card>
    )
}

export default AddItemBar
