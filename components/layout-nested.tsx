import styles from '../styles/layout/layout-nested.module.scss'

interface IProps {
  children: any
  // any other props that come into the component
}

export default function LayoutNested({ children, ...props }: IProps) {
  return (
    <>
      <div className={styles.content}>{children}</div>
    </>
  )
}
