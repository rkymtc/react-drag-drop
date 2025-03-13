import { useState, useEffect } from 'react'
import { LayoutOptions, LayoutState } from '../types'

const useLayout = (options: LayoutOptions = {}): LayoutState => {
  const { 
    sidebarInitialState = true,
    breakpoint = 768
  } = options
  

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })
  
 
  const [isSidebarOpen, setIsSidebarOpen] = useState(sidebarInitialState)
  
  useEffect(() => {
    const handleResize = () => {
     
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
      
    
      if (window.innerWidth < breakpoint) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    window.addEventListener('resize', handleResize)
    
    handleResize()
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [breakpoint])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return {
  
    isMobile: windowSize.width < breakpoint,
    isTablet: windowSize.width >= breakpoint && windowSize.width < 1024,
    isDesktop: windowSize.width >= 1024,
    

    isSidebarOpen,
    toggleSidebar
  }
}

export default useLayout 