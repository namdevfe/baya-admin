import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

interface UserConfirmDialogProps {
  isOpen?: boolean
  onClose?: () => void
  onOk?: () => void
}

const UserConfirmDialog = (props: UserConfirmDialogProps) => {
  const { isOpen = false, onClose, onOk } = props

  return (
    <Dialog
      open={isOpen}
      onClose={() => onClose?.()}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        Confirm delete this user
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Are you sure want delete this user?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose?.()}>Disagree</Button>
        <Button
          onClick={() => {
            onOk?.()
          }}
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UserConfirmDialog
