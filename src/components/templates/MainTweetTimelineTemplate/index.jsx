import React from 'react'
import Header from '../../organisms/Header'

function MainTweetTimelineTemplate({ children }) {
  return (
    <>
      <Header />
      <section style={{width: '100%', display: 'flex', flexDirection:'column', alignItems: 'center'}}>
        {children}
      </section>
    </>
  )
}

export default MainTweetTimelineTemplate