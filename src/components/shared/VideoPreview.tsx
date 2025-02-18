"use client"
import React from 'react'
import ReactPlayer from 'react-player/youtube'

const VideoPreview = ({ url }: { url: string }) => {
    return (
        <ReactPlayer
            url={url}
            width="100%"
            height="100%"
        />
    )
}

export default VideoPreview
