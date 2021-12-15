import React, { ReactChild, ReactNode, ReactPropTypes } from 'react'
import Link from "next/link"
import Zoom from './zoom'
import ThemeSelector from './theme-selector'
import styles from '../styles/layout/layout.module.scss'
import Image from 'next/image'
import Head from 'next/head'
import { IThemeSelector } from '../components/theme-selector'
import { IZoom } from '../components/zoom'
import { RiUserFill } from "react-icons/ri"

class HeadElement extends React.Component {
  componentDidMount() {
    document.querySelector("body")?.classList.add(`theme-${IThemeSelector.getThemeId()}`)
    document.documentElement.style.setProperty('--vct-multiplier', String(IZoom.getZoom()))
  }

  render() {
      return <Head>
        <title>Vectorki</title>
        <meta name="description" content="Vectorki Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
  }
}

interface IProps {
  children: any
  // any other props that come into the component
  // componentThemeSelector: any
}

export default function Layout({ children, ...props }: IProps) {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/vectorki">
            <a>
              <Image className={styles.image} width="150" height="150" src={"/img/vectorki-logo.png"} alt="Vectorki Logo" />
            </a>
          </Link>
        </div>
        <nav className={styles.nav}>
          <Zoom></Zoom>
          <ThemeSelector></ThemeSelector>
          <Link href="/account">
            <a className={styles.navLink}>
              <RiUserFill />
              <span>My account</span>
            </a>
          </Link>
        </nav>
      </header>
      <main className={styles.main}>
        <div>{children}</div>
      </main>
    </>
  )
}
