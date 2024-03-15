import * as React from 'react';
import {
  Avatar,
  Box,
  Card,
  Icon,
  IconButton,
  Grid,
  MenuItem,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
  Button,
} from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import DownloadIcon from '@mui/icons-material/Download';
import { Paragraph } from 'app/components/Typography';
import TablePagination from '@mui/material/TablePagination';
import { useLocation } from 'react-router-dom';
import user from '../../../images/user.svg';
import moment from 'moment';

const CardHeader = styled(Box)(() => ({
  display: 'flex',
  marginTop: '10px',
  paddingLeft: '24px',
  paddingRight: '24px',
  marginBottom: '27px',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  textTransform: 'capitalize',
}));

const ProductTable = styled(Table)(() => ({
  minWidth: 400,
  whiteSpace: 'pre',
  '& small': {
    width: 50,
    height: 15,
    borderRadius: 500,
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
  },
  '& td': { borderBottom: 'none' },
  '& td:first-of-type': { paddingLeft: '16px !important' },
}));

const Small = styled('small')(({ bgcolor }) => ({
  width: 50,
  height: 15,
  color: '#fff',
  padding: '2px 8px',
  borderRadius: '4px',
  overflow: 'hidden',
  background: bgcolor,
  boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
}));

const Heading = styled('span')(() => ({
  fontSize: 24,
  paddingLeft: 24,
  fontWeight: 700,
}));

const SubHeading = styled('h6')(() => ({
  fontSize: 14,
  margin: 0,
  fontWeight: 400,
  color: '#919191',
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const columns = [
  { id: 'firstName', label: 'First name', align: 'left' },
  { id: 'lastName', label: 'Last name', align: 'left' },
  {
    id: 'emailId',
    label: 'Email ID',
    align: 'left',
  },
  {
    id: 'phoneNumber',
    label: 'Phone number',
    align: 'left',
  },
  {
    id: 'zipCode',
    label: 'Zip Code',
    align: 'left',
  },
  {
    id: 'registered',
    label: 'Registered',
    align: 'left',
  },
];

const rows = [
  {
    firstName: 'john',
    lastName: 'doe',
    email: 'john@gmail.com',
    phone: '(101 021-1324)',
    zipCode: 10001,
    registered: 'yes',
  },

  {
    firstName: 'tessa',
    lastName: 'frr',
    email: 'tessa@gmail.com',
    phone: '(101 021-1324)',
    zipCode: 10001,
    registered: 'yes',
  },

  {
    firstName: 'allen',
    lastName: 'wendy',
    email: 'allen@gmail.com',
    phone: '(101 021-1324)',
    zipCode: 10001,
    registered: 'yes',
  },

  {
    firstName: 'diana',
    lastName: 'toss',
    email: 'diana@gmail.com',
    phone: '(101 021-1324)',
    zipCode: 10001,
    registered: 'yes',
  },

  {
    firstName: 'rahul',
    lastName: 'yadav',
    email: 'rahul@gmail.com',
    phone: '(101 021-1324)',
    zipCode: 10001,
    registered: 'yes',
  },

  {
    firstName: 'kessy',
    lastName: 'bryan',
    email: 'kessy@gmail.com',
    phone: '(101 021-1324)',
    zipCode: 10001,
    registered: 'yes',
  },

  {
    firstName: 'james',
    lastName: 'cassegne',
    email: 'james@gmail.com',
    phone: '(101 021-1324)',
    zipCode: 10001,
    registered: 'no',
  },

  {
    firstName: 'lucy',
    lastName: 'brown',
    email: 'brown@gmail.com',
    phone: '(101 021-1324)',
    zipCode: 10001,
    registered: 'no',
  },
];

const CommonTable = (props) => {
  const { state } = useLocation();
  // const { id, color } = state;
  const [value, setValue] = React.useState(0);
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  console.log('props', state);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleRowClick = (column) => {
    console.log('click', column);
  };

  const { palette } = useTheme();

  return (
    <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
      {state.user == 'customer' ? (
        <Heading gutterBottom variant="subtitle1">
        {state.column.firstName.charAt(0).toUpperCase() +
          state.column.firstName.slice(1) +
          ' ' +
          state.column.lastName.charAt(0).toUpperCase() +
          state.column.lastName.slice(1)}
        </Heading>
      ): (
        <Heading gutterBottom variant="subtitle1">
        {state.column.businessName}
      </Heading>
      )}
     
      <CardHeader>
        <Grid container spacing={2}>
          {/* <Grid item>
            <img src={user} alt="logo" />
          </Grid> */}
          <Grid item xs={12} sm container sx={{ pt: 24 }}>
            <Grid item xs container direction="column" spacing={2} sx={{ pl: '8px' }}>
              <Grid item xs>
                <SubHeading gutterBottom variant="subtitle1">
                  Email id
                </SubHeading>
                <span className="profileSubDetail">{state.column.email}</span>
              </Grid>
              <Grid item>
                <SubHeading gutterBottom variant="subtitle1">
                  Phone number
                </SubHeading>
                <span className="profileSubDetail">{state.column.phone ? state.column.phone : '-'}</span>
              </Grid>
            </Grid>

            {state.user == 'customer' ? (
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <SubHeading gutterBottom variant="subtitle1">
                    Zip Code
                  </SubHeading>
                  <span className="profileSubDetail">{state.column.zipCode ? state.column.zipCode : '-'}</span>
                </Grid>
                <Grid item>
                  <SubHeading gutterBottom variant="subtitle1">
                    Registered no
                  </SubHeading>
                  <span className="profileSubDetail">{moment(state.column.registeredOn).format("YYYY-MM-DD")}</span>
                </Grid>
              </Grid>
            ) : (
              <>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <SubHeading gutterBottom variant="subtitle1">
                      Website
                    </SubHeading>
                    <span className="profileSubDetail">{state.column.website ? state.column.website : '-'}</span>
                  </Grid>
                  <Grid item>
                    <SubHeading gutterBottom variant="subtitle1">
                      Address
                    </SubHeading>
                    <span className="profileSubDetail">{moment(state.column.registeredOn).format("YYYY-MM-DD")}</span>
                  </Grid>
                </Grid>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <SubHeading gutterBottom variant="subtitle1">
                      Social Media
                    </SubHeading>
                    <span className="profileSubDetail">100001</span>
                  </Grid>
                  <Grid item>
                    <SubHeading gutterBottom variant="subtitle1">
                      Registered on
                    </SubHeading>
                    <span className="profileSubDetail">04/08/2022</span>
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </CardHeader>
      <Heading gutterBottom variant="subtitle1">
        User's invited
      </Heading>
      <Box overflow="auto">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{ pl: '24px', pr: '24px', mt: '13px', borderColor: 'divider' }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            className="commonTabHead"
          >
            <Tab label="Customers" {...a11yProps(0)} />
            <Tab label="Businesses" {...a11yProps(1)} />
          </Tabs>
          <Button variant="contained" endIcon={<DownloadIcon />} className="tableDownloadBtn">
            Download Excel
          </Button>
        </Box>
        <TabPanel value={value} index={0}>
          <ProductTable>
            <TableHead>
              <TableRow className="tableRow">
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      fontFamily: 'DMSans-Medium',
                      fontSize: '16px',
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    key={index}
                    className="tableRowData"
                    onClick={() => handleRowClick(row)}
                  >
                    <TableCell key={row.id} className="tableColumnData" align="left">
                      {row.firstName.charAt(0).toUpperCase() + row.firstName.slice(1)}
                    </TableCell>
                    <TableCell key={row.id} className="tableColumnData" align="center">
                      {row.lastName.charAt(0).toUpperCase() + row.lastName.slice(1)}
                    </TableCell>
                    <TableCell key={row.id} className="tableColumnData" align="center">
                      {row.email}
                    </TableCell>
                    <TableCell key={row.id} className="tableColumnData" align="center">
                      {row.phone}
                    </TableCell>
                    <TableCell key={row.id} className="tableColumnData" align="center">
                      {row.zipCode}
                    </TableCell>
                    <TableCell key={row.id} className="tableColumnData" align="center">
                      {row.registered == 'yes' ? (
                        <Small className="registerUser ">{row.registered.toUpperCase()}</Small>
                      ) : (
                        <Small className="unregisterUser">{row.registered.toUpperCase()}</Small>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            {/* </TableContainer> */}
          </ProductTable>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            className="tablePagination"
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
      </Box>
    </Card>
  );
};

export default CommonTable;
