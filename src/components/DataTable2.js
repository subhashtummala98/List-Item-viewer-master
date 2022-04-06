import * as React from "react";
import {v4 as uuid} from 'uuid';
import moment from 'moment';
import PropTypes from "prop-types";
import clsx from 'clsx';
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import {Card,TextField,Button,FormControl} from '@mui/material';
import {makeStyles} from '@mui/styles';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const useStyles = makeStyles({
    popup: {
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(4px)',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        position: 'absolute',
        top: '0',
        left: '0',
    },
    innerpop: {
        width: '500px',
        height: '500px',
        borderRadius: '5px',
        padding: '1rem',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',

        '@media(max-width:600px)':{
            width: '300px',
            height: '400px',
        }
    },
    popUPClose: {
        width: '500px',
        margin: '1rem 0',

        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',

        '@media(max-width:600px)':{
            width: '300px',
        }
    },
    ButtonPOP: {
        width: '500px',
        height: '40px',
        background: 'blue',
        boxShadow: 'none',

        "&:hover": {
            background: 'blue',
            boxShadow: 'none',
        },

        '@media(max-width:600px)':{
            width: '300px',
        }
    },
    ButtonPOPD: {
        width: '500px',
        height: '40px',
        background: 'red',
        boxShadow: 'none',

        "&:hover": {
            background: 'red',
            boxShadow: 'none',
        },

        '@media(max-width:600px)':{
            width: '300px',
        }
    },
    inputPOP: {
        width: '500px',
        margin: '1rem 0',

        '@media(max-width:600px)':{
            width: '300px',
        }
    },
    inputPopBig: {
        width: '500px',
        height: '300px',
        margin: '1rem 0',

        '@media(max-width:600px)':{
            width: '300px',
            height: '300px',
        }
    },
    chkicon: {
        borderRadius: 2,
        width: 20,
        height: 20,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: '#ffffff',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '$root.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2,
        },
        'input:hover ~ &': {
            backgroundColor: '#ebf1f5',
        },
        'input:disabled ~ &': {
            boxShadow: 'none',
            background: 'rgba(206,217,224,.5)',
        },
    },
    checkedIcon: {
        backgroundColor: '#137cbd',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
            display: 'block',
            width: 20,
            height: 20,
            backgroundImage:
                "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
                " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
                "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: '#106ba3',
        },
    },
    icons: {
        width: '50px',
        height: '50px',
    }
})

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: "text",
        numeric: false,
        disablePadding: false,
        label: "Text",
    },
    {
        id: "date",
        numeric: false,
        disablePadding: false,
        label: "Date",
    },
    {
        id: "owner",
        numeric: false,
        disablePadding: false,
        label: "Owner",
    },
    {
        id: "active",
        numeric: false,
        disablePadding: false,
        label: "Active",
    },
];

function EnhancedTableHead(props) {
    const {
        order,
        orderBy,
        onRequestSort,
        //onSelectAllClick,
        //numSelected,
        //rowCount,
        //isHovered,
    } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow key={uuid()}>
                {/*
                    isHovered
                    ?   <TableCell padding="checkbox">
                            <Checkbox
                                color="primary"
                                indeterminate={numSelected > 0 && numSelected < rowCount}
                                checked={rowCount > 0 && numSelected === rowCount}
                                onChange={onSelectAllClick}
                                inputProps={{
                                    "aria-label": "select all desserts",
                                }}
                            />
                        </TableCell>
                    :   ''*/
                }
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? "right" : "left"}
                        padding={headCell.disablePadding ? "none" : "normal"}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : "asc"}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
    const { numSelected,handleEdit,hoveredItem } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(
                            theme.palette.primary.main,
                            theme.palette.action.activatedOpacity
                        ),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: "1 1 100%" }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: "1 1 100%" }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Item List
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton onClick={()=>handleEdit(hoveredItem)}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default function DataTable2(props) {

    const styles = useStyles();

    const {rows,setRows} = props;
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("text");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [hoveredItem,setHoveredItem] = React.useState(-1);
    const [isHovered,setHovered] = React.useState(false);

    const [isPopOpen,setPopOpen] = React.useState(false);
    const [iskey,setKey] = React.useState(-1);
    const [popText,setpopText] = React.useState('');
    const [popDate,setpopDate] = React.useState(new Date());
    const [popOwner,setpopOwner] = React.useState('');
    const [popActive,setpopActive] = React.useState(true);
    const [isPopsEntered,setPopsEntered] = React.useState(false);

    React.useEffect(()=>{
        if(popText.length > 0 && popOwner.length > 0){
            setPopsEntered(true);
        }
        else{
            setPopsEntered(false);
        }
    },[popText,popOwner])

    React.useEffect(()=>{
        if(iskey !== -1){
            let pos = 0;
            for(let i=0;i<rows.length;i++){
                if(rows[i].id === iskey){
                    pos = i;
                }
            }
            setpopText(rows[pos].text);
            setpopOwner(rows[pos].owner);
            setpopDate(rows[pos].date);
            setpopActive(rows[pos].active);
        }
    },[iskey,rows])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleClick = (event, id) => {
        let newList=[]

        for(let i=0;i<rows.length;i++){
            if(i === id){
                newList.push(rows[i].text);
            }
        }
        setSelected(newList);
        console.log(selected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const handleEdit = (id) => {
        setKey(id);
        setPopOpen(true);
    }

    const isSelected = (text) => selected.indexOf(text) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
    <>
        <Box sx={{ width: "80%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
                <EnhancedTableToolbar 
                    numSelected={selected.length} 
                    handleEdit={handleEdit}
                    hoveredItem={hoveredItem}
                />
                <TableContainer>
                    <Table
                        aria-labelledby="tableTitle"
                        size={dense ? "small" : "medium"}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                            isHovered={isHovered}
                        />
                        <TableBody>
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                               rows.slice().sort(getComparator(order, orderBy)) */}
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.text);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    
                                    return (
                                        <TableRow
                                        hover
                                        onClick={(event) => {
                                            handleClick(event, row.id);
                                            setKey(row.id);
                                        }}
                                        onMouseOver={() => {
                                            setHoveredItem(row.id);
                                            setHovered(true)
                                        }}
                                        onMouseLeave={()=>{
                                            setHoveredItem(-1);
                                            setHovered(false)
                                        }}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        selected={isItemSelected}                  
                                        tabIndex={-1}
                                        key={uuid()}
                                        id={labelId}
                                        >
                                            <TableCell
                                                scope="row"
                                                align="left"
                                                style={{
                                                    width: '700px',
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-around',
                                                    alignItems: 'center',
                                                }}
                                                id={labelId}
                                                >
                                                {
                                                    hoveredItem === row.id || isItemSelected
                                                    ?   <Checkbox
                                                                color="primary"
                                                                checked={isItemSelected}
                                                                style={{padding: '0 1rem'}}
                                                                inputProps={{
                                                                    'aria-labelledby': labelId,
                                                                }}                                        
                                                            />
                                                    :   ''
                                                }
                                                {row.text}
                                            </TableCell>
                                            <TableCell align="left">{row.date}</TableCell>
                                            <TableCell align="left">{row.owner}</TableCell>
                                            <TableCell align="left">
                                                {
                                                    row.active
                                                    ? <CheckIcon style={{color: 'green'}} />
                                                    : <ClearIcon style={{color: 'red'}} />
                                                }
                                                {
                                                //<Checkbox 
                                                //    checked={row.active} 
                                                //    name="remember me" 
                                                //    checkedIcon={<span className={clsx(styles.chkicon, styles.checkedIcon)} />}
                                                //    icon={<span className={styles.chkicon} />
                                                }
                                            </TableCell>
                                        </TableRow>
                                    );  
                                })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: (dense ? 33 : 53) * emptyRows,
                                        }}
                                        key={uuid()}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[2,4,8]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                sx={{mb:2}}
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        </Box>
        {
            isPopOpen
            ? <Box className={styles.popup}>
                <Card className={styles.innerpop}>
                    <Box 
                        className={styles.popUPClose}
                        onClick={()=>{
                            setPopOpen(false);
                            setpopText('');
                            setpopOwner('');
                        }}
                    >
                        <ClearRoundedIcon className={styles.icons}/>
                    </Box>
                    <TextField 
                        className={styles.inputPopBig}
                        id="input-text-update"
                        value={popText}
                        onChange={(e)=>{
                            setpopText(e.target.value)
                        }}
                        variant="outlined"
                        label="Text"
                        multiline
                    />
                    <FormControl className={styles.inputPOP}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Select Date"
                                value={popDate}
                                onChange={(newValue)=>{
                                    setpopDate(moment(newValue).format())
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
                    <TextField 
                        required
                        className={styles.inputPOP}
                        id="input-owner-update"
                        value={popOwner}
                        onChange={(e)=>{
                            setpopOwner(e.target.value);
                        }}
                        variant="outlined"
                        label="Date"
                    />
                    <FormControl className={styles.chkBox}>
                        <FormControlLabel
                            control={
                                <Checkbox 
                                    checked={popActive} 
                                    name="remember me" 
                                    onClick={()=>{
                                        setpopActive(!popActive)
                                    }}
                                    //checkedIcon={<span className={clsx(styles.chkicon, styles.checkedIcon)} />}
                                    icon={<span className={styles.chkicon} />}
                                />
                            }
                            label="Active : "
                            className={styles.checker}
                            labelPlacement="start"
                        />
                    </FormControl>
                    {
                        isPopsEntered
                        ? <Button 
                        className={styles.ButtonPOP}
                        onClick={() => {
                            let pos = 0;
                            for(let i=0;i<rows.length;i++){
                                if(rows[i].id === iskey){
                                    pos = i;
                                }
                            }
                            console.log(pos,iskey);

                            rows[pos].text = popText;
                            rows[pos].date = popDate;
                            rows[pos].owner = popOwner;
                            rows[pos].active = popActive;
                            //let prevArr = rows.slice(0,pos);
                            //let endArr = rows.slice(pos,rows.length);
                            //let resultArr = [...prevArr,{"text": popText,"id": iskey,"date": popDate,"owner": popOwner,"active": popActive ,"userId": rows[pos].userId},...endArr];
                            //setRows(resultArr);
                            setRows(rows);
                            setPopOpen(false);
                            setpopText('')
                            setpopOwner('')
                            setpopDate(new Date())
                            setpopActive(false);
                            setSelected([])
                            console.log(rows);
                        }}
                        >save</Button>
                        : <Button className={styles.ButtonPOPD}>Fill Values</Button>
                    }
                </Card>
            </Box>
            : ''
        }
    </>
    );
}
