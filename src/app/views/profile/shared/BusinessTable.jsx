import * as React from 'react';
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
// import Typography from '@mui/material/Typography';
import DownloadIcon from '@mui/icons-material/Download';
import { Paragraph, Typography } from 'app/components/Typography';
import TablePagination from '@mui/material/TablePagination';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';

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
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

const BusinessTable = () => {
  const [value, setValue] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
          <Typography variant="h5" component="h5">
            {'Business'}
          </Typography>

          <Box>
            <Button
              sx={{ mr: '40px' }}
              variant="outlined"
              endIcon={<SortByAlphaIcon />}
              onClick={handleSort}
            >
              Sort
            </Button>
            <Button variant="contained" endIcon={<DownloadIcon />}>
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
                    style={{ minWidth: column.minWidth, fontFamily: 'DMSans' }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                {/* <TableCell sx={{ px: 3 }} colSpan={4}>
                  Name
                </TableCell>
                <TableCell sx={{ px: 0 }} colSpan={2}>
                  Revenue
                </TableCell>
                <TableCell sx={{ px: 0 }} colSpan={2}>
                  Stock Status
                </TableCell>
                <TableCell sx={{ px: 0 }} colSpan={1}>
                  Action
                </TableCell> */}
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.code}
                    onClick={() => handleRowClick(row)}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
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
