import React from 'react'
import { Outlet } from 'react-router-dom'
import { MeniMain } from './stilovi'

export default function Meni() {
  return (
    <><MeniMain>Meni</MeniMain><Outlet /></>
  )
}
