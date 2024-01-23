import React from 'react'
import Header from '../../organisms/Header'
import { MainContainer } from './styles'

function MainTweetTimelineTemplate({ children }) {
  return (
    <>
    {/* Sidebar */}
      <MainContainer>
      <Header />
        {children}
      </MainContainer>
    </>
  )
}

export default MainTweetTimelineTemplate