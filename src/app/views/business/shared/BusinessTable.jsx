import React, { useEffect } from 'react';
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
  { id: 'bussiness', label: 'Bussiness name', align: 'left' },
  { id: 'website', label: 'Website', align: 'left' },
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
    label: 'Address',
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
    firstName: 'Silver stores',
    lastName: 'silverstore.com',
    email: 'silver.store@outlook...',
    phone: '(101 021-1324)',
    zipCode: 'Address will b...',
    registered: '04 / 28 / 2022',
  },

  {
    firstName: 'Silver stores',
    lastName: 'silverstore.com',
    email: 'silver.store@outlook...',
    phone: '(101 021-1324)',
    zipCode: 'Address will b...',
    registered: '04 / 28 / 2022',
  },

  {
    firstName: 'Silver stores',
    lastName: 'silverstore.com',
    email: 'silver.store@outlook...',
    phone: '(101 021-1324)',
    zipCode: 'Address will b...',
    registered: '04 / 28 / 2022',
  },

  {
    firstName: 'Silver stores',
    lastName: 'silverstore.com',
    email: 'silver.store@outlook...',
    phone: '(101 021-1324)',
    zipCode: 'Address will b...',
    registered: '04 / 28 / 2022',
  },

  {
    firstName: 'Silver stores',
    lastName: 'silverstore.com',
    email: 'silver.store@outlook...',
    phone: '(101 021-1324)',
    zipCode: 'Address will b...',
    registered: '04 / 28 / 2022',
  },

  {
    firstName: 'Silver stores',
    lastName: 'silverstore.com',
    email: 'silver.store@outlook...',
    phone: '(101 021-1324)',
    zipCode: 'Address will b...',
    registered: '04 / 28 / 2022',
  },

  {
    firstName: 'Silver stores',
    lastName: 'silverstore.com',
    email: 'silver.store@outlook...',
    phone: '(101 021-1324)',
    zipCode: 'Address will b...',
    registered: '04 / 28 / 2022',
  },

  {
    firstName: 'Silver stores',
    lastName: 'silverstore.com',
    email: 'silver.store@outlook...',
    phone: '(101 021-1324)',
    zipCode: 'Address will b...',
    registered: '04 / 28 / 2022',
  },
];
const BusinessTable = () => {
  const [value, setValue] = React.useState(0);
  const [page, setPage] = React.useState(0);
  let navigate = useNavigate();

  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);

  // useEffect(() => {
  //   fetch("https://dev.plugsity.com/plugisty/avi/v1/allInviteBusinessUsers")
  //   .then(response => response.json())
  //       // 4. Setting *dogImage* to the image url that we received from the response above
  //   // .then(data => setDogImage(data.message))
  // },[])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://dev.plugsity.com/plugisty/avi/v1/allInviteBusinessUsers`
      );
      const newData = await response.json();
      setRows(newData);
    };

    fetchData();
  }, []);

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
    navigate('profile', { replace: true, state: { column } });
  };

  const handleSort = () => {
    console.log('sort click');
    rows.sort();
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
            {'Business'}
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
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    key={index}
                    className="tableRowData"
                    onClick={() => handleRowClick(row)}
                  >
                    <TableCell key={row.id} className="tableColumnData" align="left">
                      {row.businessName}
                    </TableCell>
                    <TableCell key={row.id} className="tableColumnData" align="center">
                      {row.website}
                    </TableCell>
                    <TableCell key={row.id} className="tableColumnData" align="center">
                      {row.email}
                    </TableCell>
                    <TableCell key={row.id} className="tableColumnData" align="center">
                      {row.phoneNumber}
                    </TableCell>
                    <TableCell key={row.id} className="tableColumnData" align="center">
                      {row.address ? row.address : '-'}
                    </TableCell>
                    <TableCell key={row.id} className="tableColumnData" align="center">
                      {moment(row.registeredOn).format('YYYY-MM-DD')}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            {/* </TableContainer> */}
          </ProductTable>

          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
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

// const productList = [
//   {
//     imgUrl: '/assets/images/products/headphone-2.jpg',
//     name: 'earphone',
//     price: 100,
//     available: 15,
//   },
//   {
//     imgUrl: '/assets/images/products/headphone-3.jpg',
//     name: 'earphone',
//     price: 1500,
//     available: 30,
//   },
//   {
//     imgUrl: '/assets/images/products/iphone-2.jpg',
//     name: 'iPhone x',
//     price: 1900,
//     available: 35,
//   },
//   {
//     imgUrl: '/assets/images/products/iphone-1.jpg',
//     name: 'iPhone x',
//     price: 100,
//     available: 0,
//   },
//   {
//     imgUrl: '/assets/images/products/headphone-3.jpg',
//     name: 'Head phone',
//     price: 1190,
//     available: 5,
//   },
// ];

export default BusinessTable;
