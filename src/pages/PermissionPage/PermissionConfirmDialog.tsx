import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

interface PermissionConfirmDialogProps {
  isOpen?: boolean
  onClose?: () => void
  onOk?: () => void
}

const PermissionConfirmDialog = (props: PermissionConfirmDialogProps) => {
  const { isOpen = false, onClose, onOk } = props

  return (
    <Dialog
      open={isOpen}
      onClose={() => onClose?.()}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        Confirm delete permission
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Are you sure want delete this role?
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

export default PermissionConfirmDialog
