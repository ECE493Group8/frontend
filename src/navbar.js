import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const NavToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

const NavLinkContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const NavLink = styled(Link)({
  color: 'white',
  textDecoration: 'none',
  marginLeft: '1rem',
  '&:hover': {
    textDecoration: 'underline',
  },
});

export default function Navbar() {
  return (
    <AppBar position="static">
      <NavToolbar>
        <Typography variant="h6" component="div">
          Word2Med
        </Typography>
        <NavLinkContainer>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/neighbourhood">Neighbourhood</NavLink>
          <NavLink to="/analogy">Analogy Testing</NavLink>
          <NavLink to="/visualization">Visualization</NavLink>
          {/* <NavLink to="/vector">Vector Inference</NavLink> */}
        </NavLinkContainer>
      </NavToolbar>
    </AppBar>
  );
}