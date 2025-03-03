/* eslint-disable no-unused-vars */
import { SxProps } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { ReactNode } from 'react'

export interface ColumnProps {
  name: string
  label: ReactNode
}

interface TableComponentProps {
  columns: ColumnProps[]
  data: any[]
  loading?: boolean
  className?: string
  sx?: SxProps
  onEdit?: (item: any) => void
  onRemove?: (item: any) => void
}

const TableComponent = ({
  columns = [],
  data,
  loading = false,
  className = '',
  sx = {},
  onEdit,
  onRemove
}: TableComponentProps) => {
  return (
    <TableContainer
      component={Paper}
      sx={{ minHeight: '60vh', position: 'relative', ...sx }}
      className={className}
    >
      {!loading && data.length > 0 && (
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={column.name || new Date().getTime() + index}>
                  {column.label}
                </TableCell>
              ))}
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 &&
              data.map((row, index) => (
                <TableRow key={row.id || new Date().getTime() + index}>
                  {columns.map((column) => (
                    <TableCell key={column.name}>{row[column.name]}</TableCell>
                  ))}
                  <TableCell>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 1
                      }}
                    >
                      <Button
                        color='primary'
                        size='small'
                        onClick={() => onEdit?.(row)}
                      >
                        Edit
                      </Button>
                      <Button
                        color='error'
                        size='small'
                        onClick={() => {
                          onRemove?.(row)
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}

      {loading && (
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <CircularProgress size={30} />
        </Box>
      )}
    </TableContainer>
  )
}

export default TableComponent
