import DocSidebarItemCategory from '@theme-original/DocSidebarItem/Category';
import type {Props} from '@theme/DocSidebarItem/Category';

export default function Category(props: Props) {
  const sidebarHref = props.item.customProps?.sidebarHref;

  if (typeof sidebarHref !== 'string') {
    return <DocSidebarItemCategory {...props} />;
  }

  return (
    <DocSidebarItemCategory
      {...props}
      item={{
        ...props.item,
        href: sidebarHref,
        className: [props.item.className, 'sidebar-category-link']
          .filter(Boolean)
          .join(' '),
      }}
    />
  );
}
