import React from "react"
import Image from 'next/image'

export default function TrackSearchResult({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track)
  }

  
  return (
    <div
      className="d-flex m-2 align-items-center"
      style={{ cursor: "pointer" }}
      onClick={handlePlay}
    >
      <Image src={track.albumUrl} style={{ height: "64px", width: "64px" }} />
      <div className="ml-3">
        <div>{track.title}</div>
        <div className="text-muted">{track.artist}</div>
      </div>
    </div>
  )
}