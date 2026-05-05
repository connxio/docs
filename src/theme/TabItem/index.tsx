import React from 'react';

interface TabItemProps {
  value: string;
  label: string;
  default?: boolean;
  children: React.ReactNode;
}

export default function TabItem({ children }: TabItemProps): JSX.Element {
  return <>{children}</>;
}
