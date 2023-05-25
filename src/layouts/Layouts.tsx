import { Navbar, Stars } from '@/components';
import { Fragment, ReactNode } from 'react';

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
