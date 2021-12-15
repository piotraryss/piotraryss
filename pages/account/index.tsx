import React, { ReactElement } from 'react'
import Layout from '../../components/layout'
import LayoutNested from '../../components/layout-nested'
import Login from './login'

export default function Account () {
  return (
    <>
      <h2>Account</h2>
      <Login />
    </>
  )
}

Account.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Layout>
        <LayoutNested>{page}</LayoutNested>
      </Layout>
    </>
  )
}
