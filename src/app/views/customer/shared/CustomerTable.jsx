import React, {useEffect} from 'react';
import {
  Avatar,
  Box,
  Card,
  Icon,
  IconButton,
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
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';


const CardHeader = styled(Box)(() => ({
  display: 'flex',
  paddingLeft: '24px',
  paddingRight: '24px',
  marginBottom: '12px',
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

// const rows = [
//   {
//     firstName: 'john',
//     lastName: 'doe',
//     email: 'john@gmail.com',
//     phone: '(101 021-1324)',
//     zipCode: 10001,
//     registered: '04 / 28 / 2022',
//   },

//   {
//     firstName: 'tessa',
//     lastName: 'frr',
//     email: 'tessa@gmail.com',
//     phone: '(101 021-1324)',
//     zipCode: 10001,
//     registered: '04 / 28 / 2022',
//   },

//   {
//     firstName: 'allen',
//     lastName: 'wendy',
//     email: 'allen@gmail.com',
//     phone: '(101 021-1324)',
//     zipCode: 10001,
//     registered: '04 / 28 / 2022',
//   },

//   {
//     firstName: 'diana',
//     lastName: 'toss',
//     email: 'diana@gmail.com',
//     phone: '(101 021-1324)',
//     zipCode: 10001,
//     registered: '04 / 28 / 2022',
//   },

//   {
//     firstName: 'rahul',
//     lastName: 'yadav',
//     email: 'rahul@gmail.com',
//     phone: '(101 021-1324)',
//     zipCode: 10001,
//     registered: '04 / 28 / 2022',
//   },

//   {
//     firstName: 'kessy',
//     lastName: 'bryan',
//     email: 'kessy@gmail.com',
//     phone: '(101 021-1324)',
//     zipCode: 10001,
//     registered: '04 / 28 / 2022',
//   },

//   {
//     firstName: 'james',
//     lastName: 'cassegne',
//     email: 'james@gmail.com',
//     phone: '(101 021-1324)',
//     zipCode: 10001,
//     registered: '04 / 28 / 2022',
//   },

//   {
//     firstName: 'lucy',
//     lastName: 'brown',
//     email: 'brown@gmail.com',
//     phone: '(101 021-1324)',
//     zipCode: 10001,
//     registered: '04 / 28 / 2022',
//   },
// ];
const CustomerTable = () => {
  const [value, setValue] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rowData, setRowData] = React.useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://dev.plugsity.com/plugisty/avi/v1/allInvitedCustomers`);
      const newData = await response.json();
      setRowData(newData);
    };
  
  
    fetchData();
  },[]);

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
    navigate('profile', { replace: true, state: { column, user: 'customer' } });
  };

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const handleSort = () => {
    // setRowData(rows.sort((a, b) => a.firstname.localeCompare(b.firstname)));
    setRowData(
      rowData.sort(function (a, b) {
        if (a.firstName < b.firstName) {
          return -1;
        }
        if (a.firstName > b.firstName) {
          return 1;
        }
        return 0;
      })
    );

    // console.log('sort click', rows);

    // rows.sort();
  };

  const { palette } = useTheme();
  const bgError = palette.error.main;
  const bgPrimary = palette.primary.main;
  const bgSecondary = palette.secondary.main;

  return (
    <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
      <Box overflow="auto">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{ pl: '24px', pr: '24px', borderColor: 'divider' }}
        >
          <Typography variant="h5" component="h5" className="tableSubhead">
            {'Customers'}
          </Typography>

          <Box>
            <Button
              sx={{ mr: '40px' }}
              variant="outlined"
              endIcon={<SwapVertIcon />}
              onClick={handleSort}
              className="tableSortBtn"
            >
              Sort
            </Button>
            <Button variant="contained" endIcon={<DownloadIcon />} className="tableDownloadBtn">
              Download Excel
            </Button>
          </Box>
        </Box>
        <TabPanel value={value} index={0}>
          <ProductTable>
            <TableHead>
              <TableRow>
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
              {rowData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    className="tableRowData"
                    key={index}
                    onClick={() => handleRowClick(row)}
                  >
                    <TableCell
                      key={row.id}
                      className="tableColumnData"
                      align="left"
                      style={{
                        paddingLeft: '0 !important',
                      }}
                    >
                      {row.firstName.charAt(0).toUpperCase() + row.firstName.slice(1)}
                    </TableCell>
                    <TableCell key={row.id} className="tableColumnData" align="center">
                      {row.lastName.charAt(0).toUpperCase() + row.lastName.slice(1)}
                    </TableCell>
                    <TableCell key={row.id} className="tableColumnData" align="center">
                      {row.email}
                    </TableCell>
                    <TableCell key={row.id} className="tableColumnData" align="center">
                      {row.phoneNumber}
                    </TableCell>
                    <TableCell key={row.id} className="tableColumnData" align="center">
                      {row.zipCode ? row.zipCode : '-'}
                    </TableCell>
                    <TableCell key={row.id} className="tableColumnData" align="center">
                      {moment(row.registeredOn).format("YYYY-MM-DD")}

                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            {/* </TableContainer> */}
          </ProductTable>

          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rowData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TabPanel>
      </Box>
    </Card>
  );
};

export default CustomerTable;
