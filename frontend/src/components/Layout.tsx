import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import Navbar from './Navbar';

export interface LayoutProps {
  children: React.ReactElement;
}

const LayoutRoot = styled('div')(() => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
}));

export const Layout = (props: LayoutProps) => (
  <>
    <Navbar />
    <LayoutRoot data-testid="layout">
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        {props.children}
      </Container>
    </LayoutRoot>
  </>
);
