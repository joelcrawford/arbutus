import { useEffect } from 'react'

export default({ children }) => {
    const retryTimer = 700
    useEffect(() => {
        let retries = 0
        const scroll = () => {
            const element = document.getElementById(window.location.hash.replace("#", ""))
            retries += 1
            if (retries > 6) return
            if (element) {
                setTimeout(() => {
                    window.scrollTo({
                        behavior: element ? "smooth" : "auto",
                        top: element ? element.offsetTop : 0
                    })
                }, 100)
            } else {
                setTimeout(scroll, retryTimer)
            }
        }
        scroll()
    })
  return children
}