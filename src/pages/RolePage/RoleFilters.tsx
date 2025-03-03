import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { ROLE_SORT_OPTIONS } from '~/constants/general'
import { ListParams } from '~/types/common'

interface RoleFiltersProps {
  filters: ListParams
  onChange?: (e: SelectChangeEvent) => void
}

const RoleFilters = ({ filters, onChange }: RoleFiltersProps) => {
  return (
    <MenuItem>
      <FormControl fullWidth>
        <InputLabel id='select-sort-label'>Select sort</InputLabel>
        <Select
          labelId='select-sort-label'
          id='select-sort-label'
          label='Select option'
          size='small'
          value={filters?.sortBy}
          onChange={(e) => onChange?.(e)}
        >
          {ROLE_SORT_OPTIONS.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </MenuItem>
  )
}

export default RoleFilters
