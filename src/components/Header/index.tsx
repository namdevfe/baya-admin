import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Account from '~/components/Account'
import ModeSelect from '~/components/ModeSelect'

const Header = () => {
  return (
    <Box component='header' sx={{ height: '60px' }}>
      <Container sx={{ height: '100%' }}>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          sx={{ width: '100%', height: '100%' }}
        >
          <Box>Left</Box>
          <Stack direction='row' gap={2}>
            <ModeSelect />
            <Account />
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

export default Header
