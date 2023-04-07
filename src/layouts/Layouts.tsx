import { Fragment, ReactNode } from 'react';
import { Navbar, Stars } from '@/components';

interface LayoutProps {
  children: ReactNode;
}

const Layouts = ({ children }: LayoutProps) => {
  return (
    <Fragment>
      <Navbar />
      <Stars />
      <main>{children}</main>
    </Fragment>
  );
};

export default Layouts;
