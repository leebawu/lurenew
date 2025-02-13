"use client"

import { useEffect } from "react"

interface WeChatShareProps {
  title: string
  desc: string
  link: string
  imgUrl: string
}

declare global {
  interface Window {
    wx: any
  }
}

export default function WeChatShare({ title, desc, link, imgUrl }: WeChatShareProps) {
  useEffect(() => {
    // Load WeChat JS SDK
    const script = document.createElement("script")
    script.src = "https://res.wx.qq.com/open/js/jweixin-1.6.0.js"
    script.async = true
    document.body.appendChild(script)

    script.onload = () => {
      // Configure WeChat Share
      window.wx.config({
        // Your WeChat configuration here
      })

      window.wx.ready(() => {
        window.wx.updateAppMessageShareData({
          title: title,
          desc: desc,
          link: link,
          imgUrl: imgUrl,
          success: () => {
            // Callback after successful share setting
          },
        })

        window.wx.updateTimelineShareData({
          title: title,
          link: link,
          imgUrl: imgUrl,
          success: () => {
            // Callback after successful share setting
          },
        })
      })
    }

    return () => {
      document.body.removeChild(script)
    }
  }, [title, desc, link, imgUrl])

  return null
}

