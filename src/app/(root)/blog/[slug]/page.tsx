import React from 'react'

const BlogBySlug = ({params}:{params:{slug:string}}) => {
  return (
    <div>BlogBySlug {params.slug}</div>
  )
}

export default BlogBySlug