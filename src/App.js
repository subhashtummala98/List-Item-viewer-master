import React from 'react';
import './App.css';
import {Paper,Grid,Typography,AppBar,Toolbar,IconButton,Switch} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {ThemeProvider,createTheme} from '@mui/material/styles';
import AddItemBar from './components/AddItemBar';
import DataTable2 from './components/DataTable2';
import {DataRows} from './components/DataRows';

const useStyles = makeStyles({
  paper:{
    height: 'auto',
    minHeight: '100vh',
  },
  colGrid: {
    width: '100%',
    height: '80%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

function App() {

  const styles = useStyles();

  const [darkMode,setdarkMode] = React.useState(true);
  const [rows,setRows] = React.useState(DataRows);

  const Theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });
  

  return (
    <ThemeProvider theme={Theme}>
      <Paper className={styles.paper}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Welcome!
            </Typography>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              >
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  switch theme
                </Typography>
            </IconButton>
            <Switch color="primary" checked={darkMode} onClick={()=>setdarkMode(!darkMode)}/>
          </Toolbar>
        </AppBar>
        <Grid direction="column" className={styles.colGrid}>
          <AddItemBar rows={rows} setRows={setRows}/>
          <DataTable2 rows={rows} setRows={setRows}/>
        </Grid>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
