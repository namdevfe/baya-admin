import DashboardIcon from '@mui/icons-material/Dashboard'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import SettingsIcon from '@mui/icons-material/Settings'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Fragment, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const SIDEBAR_MENUS = [
  {
    text: 'Dashboard',
    icon: <DashboardIcon color='primary' />,
    path: '/'
  },
  {
    text: 'Setting',
    icon: <SettingsIcon color='primary' />,
    children: [
      {
        text: 'Roles',
        icon: <></>,
        path: '/setting/roles'
      },
      {
        text: 'Permissions',
        icon: <></>,
        path: '/setting/permissions'
      }
    ]
  }
]

const Sidebar = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [menuSelected, setMenuSelected] = useState<string>(pathname)
  const [indexMenuActives, setIndexMenuActives] = useState<number[]>([])

  const handleMenuItemClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    itemLink: string
  ) => {
    e.stopPropagation()
    setMenuSelected(itemLink)
  }

  const handleToggleMenuItem = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    e.stopPropagation()
    setIndexMenuActives((prev) => {
      if (!prev.includes(index)) {
        return [...prev, index]
      } else {
        return prev.filter((prevIndex) => prevIndex !== index)
      }
    })
  }

  const DrawerList = (
    <Box sx={{ width: 250 }}>
      <Box>Logo</Box>
      <List>
        {SIDEBAR_MENUS.map(({ text, icon, path, children = [] }, index) => (
          <Fragment key={path || new Date().getTime() + index}>
            <ListItem disablePadding>
              <ListItemButton
                selected={path === menuSelected}
                onClick={(e) => {
                  if (path) {
                    navigate(path)
                    handleMenuItemClick(e, path)
                  } else {
                    handleToggleMenuItem(e, index)
                  }
                }}
              >
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText primary={text} />
                {children.length > 0 && (
                  <>
                    {indexMenuActives.includes(index) ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )}
                  </>
                )}
              </ListItemButton>
            </ListItem>

            {children.length > 0 && (
              <Collapse
                in={indexMenuActives.includes(index)}
                timeout='auto'
                unmountOnExit
              >
                <List>
                  {children.map((childItem, index) => (
                    <ListItem
                      key={childItem.path || new Date().getTime() + index}
                      disablePadding
                    >
                      <ListItemButton
                        selected={childItem.path === menuSelected}
                        onClick={(e) => {
                          navigate(childItem.path)
                          handleMenuItemClick(e, childItem.path)
                        }}
                      >
                        {childItem.icon && (
                          <ListItemIcon>{childItem.icon}</ListItemIcon>
                        )}
                        <ListItemText primary={childItem.text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </Fragment>
        ))}
      </List>
    </Box>
  )

  return (
    <Drawer variant='permanent' anchor='left'>
      {DrawerList}
    </Drawer>
  )
}

export default Sidebar
