import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useColorScheme } from '@mui/material/styles'
import LightModeIcon from '@mui/icons-material/LightMode'
import Box from '@mui/material/Box'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import DarkModeIcon from '@mui/icons-material/DarkMode'

const ModeSelect = () => {
  const { mode, setMode } = useColorScheme()

  if (!mode) {
    return null
  }

  const handleModeChange = (e: SelectChangeEvent) => {
    setMode(e.target.value as 'system' | 'light' | 'dark')
  }

  return (
    <FormControl sx={{ minWidth: 140 }} size='small'>
      <InputLabel id='mode-select-small-label'>Select Mode</InputLabel>
      <Select
        labelId='mode-select-small-label'
        id='mode-select-small'
        value={mode}
        label='Select Mode'
        onChange={handleModeChange}
      >
        <MenuItem value='light'>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LightModeIcon fontSize='small' />
            Light
          </Box>
        </MenuItem>
        <MenuItem value='dark'>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DarkModeIcon fontSize='small' />
            Dark
          </Box>
        </MenuItem>
        <MenuItem value='system'>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Brightness4Icon fontSize='small' />
            System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

export default ModeSelect
